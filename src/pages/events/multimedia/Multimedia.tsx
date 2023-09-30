import React, { SyntheticEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useModal } from '../../../components/hooks/useModal';
import { useEvents } from '../context/eventsContext';
import { MMContainer } from '../../../components/MMContainer/MMContainer';
import { Breadcrumb } from '../../../components/breadrumb/Breadcrumb';
import { Loader } from '../../../components/Loader/Loader';
import { Grid } from '@mui/material';
import { MMBox } from '../../../components/MMBox/MMBox';
import { MMSubTitle } from '../../../components/MMTitle/MMTitle';
import { StyledFlex, StyledFlexColumn } from '../../../styles/styledComponents';
import { MMButton } from '../../../components/MMButton/MMButton';
import { getVideos, removeVideo } from '../../../services/eventService';
import { errorSnackbar, warningSnackbar } from '../../../components/Snackbar/Snackbar';
import { Video } from '../../../models/Video';
import './Multimedia.scss';
import { MMModal } from '../../../components/Modal/MMModal';
import { Form } from './form/Form';
import { formatDate } from '../../../utils/formatDate';
import { useAuth } from '../../../context/authContext';
import MMLink from '../../../components/MMLink/MMLink';
import { StyledInputContainer, StyledLabel, reactSelectCustomStyles } from '../../../components/form/formStyles';
import Select from 'react-select';
import { FaTrash, FaVideo } from 'react-icons/fa';
import colors from '../../../styles/_colors.scss';
import { sweetAlert } from '../../../components/SweetAlert/sweetAlert';

const Multimedia = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isModalOpen, openModal, closeModal } = useModal();
  const { showEvent, setShowEvent, getShowEvent } = useEvents();
  const [isRequestLoading, setIsRequestLoading] = useState(true);
  const [videos, setVideos] = useState<Video[]>([]);
  const [videoToPreview, setVideoToPreview] = useState<Video | null>(null);
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [sort, setSort] = useState<'recorded_at desc' | 'created_at desc'>('recorded_at desc');
  const { user } = useAuth();

  useEffect(() => {
    if (!id) return navigate('/events');

    if (!showEvent || showEvent.id !== id) getShowEvent(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!showEvent || !id) return;

    fetchVideos(id);
  }, [showEvent, sort]);

  useEffect(() => {
    if (videoToPreview && videoRef.current) {
      videoRef.current.load();
    }
  }, [videoToPreview]);

  const fetchVideos = async (id: string) => {
    try {
      const videos = await getVideos(id, sort);

      if (videos.length > 0) {
        setVideoToPreview(videos[0]);
      }

      setVideos(videos);
    } catch (error) {
      errorSnackbar('Error al obtener los videos. Contacte a Soporte.');
    } finally {
      setIsRequestLoading(false);
    }
  };

  const handleVideoUpload = () => {
    openModal();
  };

  const handleFormSuccess = (video: Video) => {
    setVideoToPreview(video);

    setVideos([video, ...videos]);

    closeModal();
  };

  const handleVideoDelete = async (videoId: string) => {
    if (!showEvent) return;

    try {
      await removeVideo(showEvent.id, videoId);

      const videosTmp = videos.filter((video) => video.id !== videoId);

      // Si es el video que estoy viendo lo cambio por otro
      if (videoToPreview?.id === videoId) {
        setVideoToPreview(videosTmp[0] || null);
      }

      setVideos(videosTmp);
    } catch (error) {
      errorSnackbar('Error al eliminar el video. Contacte a Soporte.');
    }
  };

  const handleSelectChange = (option: any) => {
    const value = option.value;

    // los ordeno en el front porque recibo todos los videos.
    // si los buscamos paginados, ahi lo ordeno con el setSort y mando la request
    let videosCopy = [...videos];

    if (value === 'recorded_at desc') {
      const videosSorted = videosCopy.sort((a, b) => {
        const dateA = new Date(a.recorded_at);
        const dateB = new Date(b.recorded_at);

        return +dateB - +dateA;
      });

      setVideos(videosSorted);
    } else {
      const videosSorted = videosCopy.sort((a, b) => {
        const dateA = new Date(a.created_at);
        const dateB = new Date(b.created_at);

        return +dateB - +dateA;
      });

      setVideos(videosSorted);
    }
  };

  return (
    <>
      {showEvent && (
        <MMModal isModalOpen={isModalOpen} closeModal={closeModal} maxWidth="sm" title="Subir Video">
          <Form successCallback={handleFormSuccess} closeFormModal={closeModal} eventId={showEvent.id} />
        </MMModal>
      )}

      <MMContainer maxWidth="xxl" className="events-show-boxes-container ">
        {showEvent ? (
          <>
            <Breadcrumb
              items={[
                { label: 'Eventos', to: '/events' },
                { label: showEvent.name, to: `/events/${showEvent.id}` },
                { label: 'Multimedia' }
              ]}
            />

            <Grid container spacing={2}>
              <Grid item xs={12} lg={8}>
                <MMBox className="events-multimedia-box">
                  <StyledFlex $justifyContent="space-between">
                    <MMSubTitle content={showEvent.name} />

                    <MMButton
                      onClick={() => {
                        if (user) {
                          handleVideoUpload();
                        } else {
                          warningSnackbar('Debe iniciar sesión para subir un video');
                        }
                      }}
                    >
                      Subir Video
                    </MMButton>
                  </StyledFlex>

                  {isRequestLoading ? (
                    <div>
                      <Loader />
                    </div>
                  ) : (
                    <>
                      {videoToPreview ? (
                        <StyledFlexColumn>
                          <StyledFlex $justifyContent="center" $alignItems="center">
                            <div className="video-container">
                              <video ref={videoRef} className="video" controls>
                                <source src={videoToPreview.full_url} />
                              </video>
                            </div>
                          </StyledFlex>
                          <div>
                            <h4>{videoToPreview.name}</h4>
                            <StyledFlexColumn>
                              {videoToPreview.user && (
                                <span>
                                  Subido Por: <MMLink to={`/user/${user?.id}`} content={videoToPreview.user.username} />
                                </span>
                              )}
                              {videoToPreview.recorded_at && (
                                <span>
                                  Fecha de Grabacion:{' '}
                                  {formatDate({ date: videoToPreview.recorded_at, format: 'slashWithTime' })}
                                </span>
                              )}
                            </StyledFlexColumn>
                          </div>
                        </StyledFlexColumn>
                      ) : (
                        <StyledFlex $justifyContent="center" $alignItems="center">
                          <h3>No hay video para mostrar</h3>
                        </StyledFlex>
                      )}
                    </>
                  )}
                </MMBox>
              </Grid>

              <Grid item xs={12} lg={4}>
                <MMBox className="events-multimedia-box">
                  <MMSubTitle content="Lista de Videos" />

                  <StyledInputContainer>
                    <StyledLabel>Ordenar Por</StyledLabel>

                    <Select
                      isClearable={false}
                      defaultValue={{ label: 'Fecha de Grabación', value: 'recorded_at desc' }}
                      options={[
                        { label: 'Fecha de Grabación', value: 'recorded_at desc' },
                        { label: 'Fecha de Subida', value: 'created_at desc' }
                      ]}
                      styles={reactSelectCustomStyles()}
                      onChange={handleSelectChange}
                    />
                  </StyledInputContainer>

                  <br />
                  <Grid container spacing={2}>
                    {videos.map((video) => (
                      <Grid item xs={12} sm={6} md={4} lg={12} key={video.id}>
                        <VideoCard
                          video={video}
                          handleCardClick={(video) => setVideoToPreview(video)}
                          canDelete={user?.id === video.user?.id}
                          handleDelete={handleVideoDelete}
                        />
                      </Grid>
                    ))}
                  </Grid>
                </MMBox>
              </Grid>
            </Grid>
          </>
        ) : (
          <Loader />
        )}
      </MMContainer>
    </>
  );
};

export default Multimedia;

type VideoCardProps = {
  video: Video;
  handleCardClick: (video: Video) => void;
  canDelete: boolean;
  handleDelete: (videoId: string) => void;
};

const VideoCard = ({ video, canDelete, handleDelete, handleCardClick }: VideoCardProps) => {
  return (
    <Grid container spacing={1} onClick={() => handleCardClick(video)} className="multimedia-video-card">
      <Grid
        item
        xs={2}
        display={'flex'}
        alignItems={'center'}
        justifyContent={'center'}
        style={{ backgroundColor: colors.box_background }}
      >
        <FaVideo size={'1.5rem'} color={colors.sweet_alert_background} />
      </Grid>
      <Grid item xs={10}>
        <StyledFlexColumn>
          <span>
            <b>{video.name}</b>
          </span>

          <span>{video?.user?.username}</span>

          {video.recorded_at && (
            <span>Grabado el: {formatDate({ date: video.recorded_at, format: 'slashWithTime' })}</span>
          )}

          <StyledFlex>
            {canDelete && (
              <StyledFlex
                $cursor="pointer"
                onClick={(e: SyntheticEvent) => {
                  e.stopPropagation();

                  sweetAlert({
                    title: '¿Seguro que quieres eliminar al video?',
                    confirmCallback: () => {
                      handleDelete(video.id);
                    }
                  });
                }}
              >
                <FaTrash />
                <span>Eliminar</span>
              </StyledFlex>
            )}
          </StyledFlex>
        </StyledFlexColumn>
      </Grid>
    </Grid>
  );
};
