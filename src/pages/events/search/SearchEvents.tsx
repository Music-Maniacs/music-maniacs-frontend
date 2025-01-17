import React, { FormEvent, useRef } from 'react';
import { MMContainer } from '../../../components/MMContainer/MMContainer';
import { MMBox } from '../../../components/MMBox/MMBox';
import { MMTitle } from '../../../components/MMTitle/MMTitle';
import { MMButtonResponsive } from '../../../components/MMButton/MMButtonResponsive';
import { FaPlus, FaSearchPlus } from 'react-icons/fa';
import { FaFilterCircleXmark } from 'react-icons/fa6';
import { useModal } from '../../../components/hooks/useModal';
import { MMModal } from '../../../components/Modal/MMModal';
import { EventsForm } from '../../../components/forms/events/EventsForm';
import { useEvents } from '../context/eventsContext';
import { Grid } from '@mui/material';
import { EventCard } from '../components/EventCard';
import '../Events.scss';
import { Event } from '../../../models/Event';
import { SearchInputText } from '../../../components/searcher/InputText/SearchInputText';
import { SearchInputDate } from '../../../components/searcher/InputDate/SearchInputDate';
import { SearchInputAsyncSelect } from '../../../components/searcher/InputAsyncSelect/SearchInputAsyncSelect';
import { MMButton } from '../../../components/MMButton/MMButton';
import { styled } from 'styled-components';
import Select from 'react-select/dist/declarations/src/Select';
import { GroupBase } from 'react-select';
import { SearcherSkeleton } from './Skeleton';
import { useInfiniteScroll } from '../../../components/hooks/useInfiniteScroll';
import { NoData } from '../../../components/NoData/NoData';
import { warningSnackbar } from '../../../components/Snackbar/Snackbar';
import { useAuth } from '../../../context/authContext';
import { GoogleAutocomplete, PlaceDetails } from '../../../components/forms/venues/GoogleAutocomplete';
import { googleAutocompleteKeys } from '../../../components/forms/venues/VenuesForm';
import { SelectCollection } from '../../../models/Generic';

const StyledSearchbarForm = styled.form`
  padding: 1rem 0 2rem 0;
`;

const SearchEvents = () => {
  const { user } = useAuth();
  const { pagination, events, queryParams, setPagination, cleanQueryParams, setEvents, eventPolicies } = useEvents();
  const { isModalOpen, openModal, closeModal } = useModal();
  const formRef = useRef<HTMLFormElement>(null);
  const artistInputRef = useRef<Select<any, boolean, GroupBase<any>>>(null);
  const venueInputRef = useRef<Select<any, boolean, GroupBase<any>>>(null);
  const producerInputRef = useRef<Select<any, boolean, GroupBase<any>>>(null);
  const placesInputRef = useRef<Select<any, boolean, GroupBase<any>>>(null);
  const { lastElementRef } = useInfiniteScroll({ pagination, setPagination });

  const handleCreateButton = () => {
    openModal();
  };

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPagination((prevState) => ({ ...prevState, isLoading: true, page: 1 }));
  };

  const cleanFilters = () => {
    cleanQueryParams();
    if (formRef.current) formRef.current.reset();
    if (artistInputRef.current) artistInputRef.current.clearValue();
    if (venueInputRef.current) venueInputRef.current.clearValue();
    if (producerInputRef.current) producerInputRef.current.clearValue();
    if (placesInputRef.current) placesInputRef.current.clearValue();
    setPagination((prevState) => ({ ...prevState, isLoading: true, page: 1 }));
  };

  const handlePlaceSelected = (place: PlaceDetails) => {
    queryParams.current.venue_location_city_cont = '';
    queryParams.current.venue_location_province_cont = '';
    queryParams.current.venue_location_country_cont = '';

    if (place.address_components) {
      place.address_components.forEach((addComponent) => {
        const type = addComponent.types[0];
        const value = addComponent.long_name;

        const venueAttr = googleAutocompleteKeys[type];

        if (['city', 'province', 'country'].includes(venueAttr)) {
          queryParams.current[`venue_location_${venueAttr}_cont`] = value;
        }
      });
    }
  };

  const handlePlaceInputClear = () => {
    queryParams.current.venue_location_city_cont = '';
    queryParams.current.venue_location_province_cont = '';
    queryParams.current.venue_location_country_cont = '';
  };

  const placeSelectDefaultValue = (): SelectCollection | undefined => {
    const value = `${
      queryParams?.current?.venue_location_city_cont ? `${queryParams?.current?.venue_location_city_cont}, ` : ''
    }${
      queryParams?.current?.venue_location_province_cont
        ? `${queryParams?.current?.venue_location_province_cont}, `
        : ''
    }${queryParams.current.venue_location_country_cont ? `${queryParams.current.venue_location_country_cont}` : ''}`;

    if (!value) return undefined;

    return {
      label: value,
      value: value
    };
  };

  return (
    <>
      <MMModal isModalOpen={isModalOpen} closeModal={closeModal} title="Crear Evento" maxWidth="lg">
        <EventsForm
          closeFormModal={closeModal}
          useAdminController={false}
          successCallback={(event: Event) => setEvents([event, ...(events ?? [])])}
        />
      </MMModal>

      <MMContainer maxWidth="xxl">
        <MMBox className="events-box-container">
          <div className="events-title-container">
            <MMTitle content="Buscar Eventos" />
            <MMButtonResponsive
              onClick={() => {
                if (user) {
                  if (eventPolicies?.create) {
                    handleCreateButton();
                  } else {
                    warningSnackbar(
                      'No tienes permisos para crear eventos. Debes alcanzar un nivel de confianza más alto para desbloquear esta función.'
                    );
                  }
                } else {
                  warningSnackbar('Debes iniciar sesión para crear un evento');
                }
              }}
              Icon={FaPlus}
            >
              Crear Evento
            </MMButtonResponsive>
          </div>

          <StyledSearchbarForm onSubmit={handleSearch} id="events-search-filters" ref={formRef}>
            <Grid container spacing={2}>
              <Grid container item spacing={2}>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <SearchInputText paramKey="name_cont" placeholder="Buscar por Nombre" queryParams={queryParams} />
                </Grid>

                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <SearchInputAsyncSelect
                    placeholder="Artista"
                    paramKey="artist_id_eq"
                    name="artist"
                    typeaheadUrl="/admin/artists/search_typeahead?q[name_cont]="
                    queryParams={queryParams}
                    ref={artistInputRef}
                  />
                </Grid>

                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <SearchInputAsyncSelect
                    placeholder="Espacio de Evento"
                    paramKey="venue_id_eq"
                    name="venue"
                    typeaheadUrl="/admin/venues/search_typeahead?q[name_cont]="
                    queryParams={queryParams}
                    ref={venueInputRef}
                  />
                </Grid>

                <Grid item xs={12} sm={6} md={6} lg={3}>
                  <SearchInputAsyncSelect
                    placeholder="Productora"
                    paramKey="producer_id_eq"
                    name="producer"
                    typeaheadUrl="/admin/producers/search_typeahead?q[name_cont]="
                    queryParams={queryParams}
                    ref={producerInputRef}
                  />
                </Grid>

                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <GoogleAutocomplete
                    innerRef={placesInputRef}
                    placeholder="Ciudad / Provincia / País"
                    defaultValue={placeSelectDefaultValue()}
                    onPlaceSelected={handlePlaceSelected}
                    onInputClear={handlePlaceInputClear}
                    types={['administrative_area_level_2', 'administrative_area_level_1', 'country']}
                  />
                </Grid>

                <Grid item xs={12} sm={6} md={6} lg={3}>
                  <SearchInputDate
                    paramKey="datetime_gteq"
                    placeholder="Fecha Desde"
                    queryParams={queryParams}
                    type="datetime-local"
                  />
                </Grid>

                <Grid item xs={12} sm={6} md={6} lg={3}>
                  <SearchInputDate
                    paramKey="datetime_lteq"
                    placeholder="Fecha Hasta"
                    queryParams={queryParams}
                    type="datetime-local"
                  />
                </Grid>
              </Grid>
              <Grid
                container
                item
                spacing={2}
                justifyContent={'flex-end'}
                alignItems={'flex-end'}
                style={{ margin: '0', padding: '0' }}
              >
                <Grid item>
                  <MMButton type="button" onClick={cleanFilters}>
                    <FaFilterCircleXmark />
                    Limpiar Filtros
                  </MMButton>
                </Grid>
                <Grid item>
                  <MMButton type="submit">
                    <FaSearchPlus />
                    Buscar
                  </MMButton>
                </Grid>
              </Grid>
            </Grid>
          </StyledSearchbarForm>
          {pagination.page === 1 && pagination.isLoading ? (
            <Grid container spacing={4}>
              <SearcherSkeleton />
            </Grid>
          ) : (
            <Grid container spacing={4}>
              {!events || events.length === 0 ? (
                <Grid item xs={12}>
                  <NoData message="No hay eventos para mostrar, proba cambiando los criterios de búsqueda." />
                </Grid>
              ) : (
                events.map((e: Event, index: number) => (
                  <Grid
                    key={e.id}
                    ref={events.length === index + 1 ? lastElementRef : undefined}
                    item
                    container
                    xs={12}
                    sm={6}
                    md={4}
                    lg={3}
                    justifyContent="center"
                    alignItems="center"
                  >
                    <EventCard event={e} />
                  </Grid>
                ))
              )}
              {pagination.isLoading && <SearcherSkeleton />}
            </Grid>
          )}
        </MMBox>
      </MMContainer>
    </>
  );
};

export default SearchEvents;
