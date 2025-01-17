import React, { ChangeEvent, SyntheticEvent, useEffect, useState } from 'react';
import './Search.scss';
import { MMContainer } from '../../../components/MMContainer/MMContainer';
import { MMBox } from '../../../components/MMBox/MMBox';
import { MMTitle } from '../../../components/MMTitle/MMTitle';
import { StyledFlex, StyledFlexColumn } from '../../../styles/styledComponents';
import { MMButton } from '../../../components/MMButton/MMButton';
import axios from 'axios';
import { errorSnackbar, warningSnackbar } from '../../../components/Snackbar/Snackbar';
import { Artist } from '../../../models/Artist';
import { Venue } from '../../../models/Venue';
import { Producer } from '../../../models/Producer';
import { PaginatedApiResponse } from '../../../models/Generic';
import { usePagination } from '../../../components/searcher/usePagination';
import { MMVerticalNav } from '../../../components/MMVerticalNav/MMVerticalNav';
import { MMArtistIcon } from '../../../components/icons/MMArtistIcon';
import { MMVenueIcon } from '../../../components/icons/MMVenueIcon';
import { MMProducerIcon } from '../../../components/icons/MMProducerIcon';
import { useInfiniteScroll } from '../../../components/hooks/useInfiniteScroll';
import { Link, useLocation } from 'react-router-dom';
import { MMButtonResponsive } from '../../../components/MMButton/MMButtonResponsive';
import { FaPlus, FaSearch, FaSearchPlus } from 'react-icons/fa';
import { Loader } from '../../../components/Loader/Loader';
import { MMModal } from '../../../components/Modal/MMModal';
import { useModal } from '../../../components/hooks/useModal';
import { ArtistForm } from '../../../components/forms/artist/ArtistForm';
import { ProducerForm } from '../../../components/forms/producer/ProducerForm';
import { VenuesForm } from '../../../components/forms/venues/VenuesForm';
import { NoData } from '../../../components/NoData/NoData';
import { useAuth } from '../../../context/authContext';
import { usePolicy } from '../../../components/hooks/usePolicy';

type ProfileSearchApiResponse = {
  artists: PaginatedApiResponse<Artist>;
  venues: PaginatedApiResponse<Venue>;
  producers: PaginatedApiResponse<Producer>;
};

const FormsByProfile = {
  artist: ArtistForm,
  producer: ProducerForm,
  venue: VenuesForm
};

const Search = () => {
  const location = useLocation();
  const { user } = useAuth();
  const [inputValue, setInputValue] = useState<string>(location.state?.inputValue ?? '');
  const { isModalOpen, openModal, closeModal } = useModal();
  const [artists, setArtists] = useState<Artist[]>([]);
  const [venues, setVenues] = useState<Venue[]>([]);
  const [producers, setProducers] = useState<Producer[]>([]);
  const [isFirstSearchLoading, setIsFirstSearchLoading] = useState<Boolean>(true);
  const { policies: artistPolicies } = usePolicy({ controllerClassName: 'ArtistsController' });
  const { policies: producerPolicies } = usePolicy({ controllerClassName: 'ProducersController' });
  const { policies: venuePolicies } = usePolicy({ controllerClassName: 'VenuesController' });

  const [profileClassToCreate, setProfileClassToCreate] = useState<'artist' | 'venue' | 'producer'>('artist');
  const Form = FormsByProfile[profileClassToCreate];

  const { pagination: artistsPagination, setPagination: setArtistsPagination } = usePagination<Artist>({
    url: `${process.env.REACT_APP_API_URL}/profiles/search_artists`,
    isLoading: false,
    requestCallback: (data) => setArtists([...artists, ...data]),
    page: 1
  });

  const { pagination: venuesPagination, setPagination: setVenuesPagination } = usePagination<Venue>({
    url: `${process.env.REACT_APP_API_URL}/profiles/search_venues`,
    isLoading: false,
    requestCallback: (data) => setVenues([...venues, ...data]),
    page: 1
  });

  const { pagination: producersPagination, setPagination: setProducersPagination } = usePagination<Producer>({
    url: `${process.env.REACT_APP_API_URL}/profiles/search_producers`,
    isLoading: false,
    requestCallback: (data) => setProducers([...producers, ...data]),
    page: 1
  });

  const { lastElementRef: artistsLastElementRef } = useInfiniteScroll({
    pagination: artistsPagination,
    setPagination: setArtistsPagination
  });

  const { lastElementRef: venuesLastElementRef } = useInfiniteScroll({
    pagination: venuesPagination,
    setPagination: setVenuesPagination
  });

  const { lastElementRef: producersLastElementRef } = useInfiniteScroll({
    pagination: producersPagination,
    setPagination: setProducersPagination
  });

  useEffect(() => {
    searchProfiles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const searchProfiles = async () => {
    try {
      const response = await axios.get<ProfileSearchApiResponse>(
        `${process.env.REACT_APP_API_URL}/profiles/search?page=1&per_page=10&q[name_cont]=${inputValue}`
      );

      setArtists(response.data.artists.data);
      setArtistsPagination((pagination) => ({ ...pagination, page: 1, total: response.data.artists.pagination.total }));

      setVenues(response.data.venues.data);
      setVenuesPagination((pagination) => ({ ...pagination, page: 1, total: response.data.venues.pagination.total }));

      setProducers(response.data.producers.data);
      setProducersPagination((pagination) => ({
        ...pagination,
        page: 1,
        total: response.data.producers.pagination.total
      }));
    } catch (error) {
      errorSnackbar('Error al buscar perfiles. Contacte a soporte');
    } finally {
      setIsFirstSearchLoading(false);
    }
  };

  const setProfilesByKlass = {
    artist: setArtists,
    venue: setVenues,
    producer: setProducers
  };

  const setPaginationByKlass = {
    artist: setArtistsPagination,
    venue: setVenuesPagination,
    producer: setProducersPagination
  };

  const formSuccessCallback = (profile: Artist | Venue | Producer) => {
    const klass = profileClassToCreate;

    const setPagination = setPaginationByKlass[klass];
    setPagination((pagination) => ({ ...pagination, total: pagination.total + 1 }));

    const setProfiles = setProfilesByKlass[klass];
    setProfiles((profiles: Array<any>) => [profile, ...profiles]);
  };

  const handleCreateArtist = () => {
    if (artistPolicies?.create) {
      setProfileClassToCreate('artist');

      openModal();
    } else {
      warningSnackbar(
        'No tienes permisos para crear Artistas. Debes alcanzar un nivel de confianza más alto para desbloquear esta función.'
      );
    }
  };

  const handleCreateVenue = () => {
    if (venuePolicies?.create) {
      setProfileClassToCreate('venue');
      openModal();
    } else {
      warningSnackbar(
        'No tienes permisos para crear Espacios de Eventos. Debes alcanzar un nivel de confianza más alto para desbloquear esta función.'
      );
    }
  };

  const handleCreateProducer = () => {
    if (producerPolicies?.create) {
      setProfileClassToCreate('producer');
      openModal();
    } else {
      warningSnackbar(
        'No tienes permisos para crear Productoras. Debes alcanzar un nivel de confianza más alto para desbloquear esta función.'
      );
    }
  };

  return (
    <>
      <MMModal isModalOpen={isModalOpen} closeModal={closeModal} maxWidth="lg">
        <Form successCallback={formSuccessCallback} closeFormModal={closeModal} />
      </MMModal>

      <MMContainer maxWidth="xxl">
        <MMBox className="profiles-search-box ">
          <div className="profiles-title-container">
            <MMTitle content="Perfiles" />

            <StyledFlex $justifyContent="flex-end">
              <MMButton
                onClick={() => {
                  if (user) {
                    handleCreateArtist();
                  } else {
                    warningSnackbar('Debe iniciar sesión para crear un perfil');
                  }
                }}
                className="profile-create-button"
              >
                <span className="icons">
                  <FaPlus />
                  <MMArtistIcon />
                </span>
                <span className="label">Crear Artista</span>
              </MMButton>
              <MMButton
                onClick={() => {
                  if (user) {
                    handleCreateVenue();
                  } else {
                    warningSnackbar('Debe iniciar sesión para crear un perfil');
                  }
                }}
                className="profile-create-button"
              >
                <span className="icons">
                  <FaPlus />
                  <MMVenueIcon />
                </span>
                <span className="label">Crear Espacio de Evento</span>
              </MMButton>
              <MMButton
                onClick={() => {
                  if (user) {
                    handleCreateProducer();
                  } else {
                    warningSnackbar('Debe iniciar sesión para crear un perfil');
                  }
                }}
                className="profile-create-button"
              >
                <span className="icons">
                  <FaPlus />
                  <MMProducerIcon />
                </span>
                <span className="label">Crear Productora</span>
              </MMButton>
            </StyledFlex>
          </div>

          <form
            onSubmit={(e: SyntheticEvent) => {
              e.preventDefault();

              searchProfiles();
            }}
          >
            <StyledFlex $gap="10px" $justifyContent="space-between" $alignItems="center" $padding="10px 5px">
              <div className="profile-search-bar">
                <FaSearch color="black" />

                <input
                  placeholder="Buscar Artistas, Espacios de Eventos y Productoras"
                  value={inputValue}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
                ></input>
              </div>

              <MMButton type="submit">
                <FaSearchPlus /> Buscar
              </MMButton>
            </StyledFlex>
          </form>

          {isFirstSearchLoading ? (
            <div>
              <Loader />
            </div>
          ) : (
            <MMVerticalNav
              Tabs={[
                {
                  href: '#artist',
                  Icon: MMArtistIcon,
                  label: 'Artistas',
                  chip: { color: 'primary', value: artistsPagination.total }
                },
                {
                  href: '#venue',
                  Icon: MMVenueIcon,
                  label: 'Espacio de Eventos',
                  chip: { color: 'primary', value: venuesPagination.total }
                },
                {
                  href: '#producer',
                  Icon: MMProducerIcon,
                  label: 'Productoras',
                  chip: { color: 'primary', value: producersPagination.total }
                }
              ]}
              Content={[
                <ProfileTabContent profileKlass="artist" data={artists} lastElementRef={artistsLastElementRef} />,
                <ProfileTabContent profileKlass="venue" data={venues} lastElementRef={venuesLastElementRef} />,
                <ProfileTabContent profileKlass="producer" data={producers} lastElementRef={producersLastElementRef} />
              ]}
            />
          )}
        </MMBox>
      </MMContainer>
    </>
  );
};

export default Search;

type ProfileTabContentProps = {
  profileKlass: 'artist' | 'venue' | 'producer';
  data: Artist[] | Venue[] | Producer[];
  lastElementRef: (node: HTMLDivElement) => void;
};

const IconByProfileKlass = {
  artist: MMArtistIcon,
  venue: MMVenueIcon,
  producer: MMProducerIcon
};

const ProfileTabContent = ({ profileKlass, data, lastElementRef }: ProfileTabContentProps) => {
  const Icon = IconByProfileKlass[profileKlass];

  return (
    <StyledFlexColumn $maxHeight="800px">
      {data.length === 0 ? (
        <NoData message="No hay perfiles para mostrar" />
      ) : (
        data.map((profile, index) => (
          <Link
            key={profile.id}
            to={`${profileKlass}s/${profile.id}`}
            style={{ textDecoration: 'none', color: 'var(--text_color)' }}
          >
            <div ref={data.length === index + 1 ? lastElementRef : undefined} className="profile-search-item">
              <Icon size={'1.5rem'} />

              <span>{profile.name}</span>

              <MMButtonResponsive Icon={FaSearch}>Consultar Perfil</MMButtonResponsive>
            </div>
          </Link>
        ))
      )}
    </StyledFlexColumn>
  );
};
