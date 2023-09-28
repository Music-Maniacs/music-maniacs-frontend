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

const Multimedia = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isModalOpen, openModal, closeModal } = useModal();
  const { showEvent, setShowEvent, getShowEvent } = useEvents();
  const [videos, setVideos] = useState<Video[]>([]);
  const [videoToPreview, setVideoToPreview] = useState<Video | null>(null);
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const { user } = useAuth();

  useEffect(() => {
    if (!id) return navigate('/events');

    if (!showEvent || showEvent.id !== id) getShowEvent(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!showEvent || !id) return;

    fetchVideos(id);
  }, [showEvent]);

  useEffect(() => {
    if (videoToPreview && videoRef.current) {
      videoRef.current.load();
    }
  }, [videoToPreview]);

  const fetchVideos = async (id: string) => {
    try {
      const videos = await getVideos(id);

      if (videos.length > 0) {
        setVideoToPreview(videos[0]);
      }

      setVideos(videos);
    } catch (error) {
      errorSnackbar('Error al obtener los videos. Contacte a Soporte.');
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

                  {/* todo: ver de mostrar el mensaje "NO hay videos" */}
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
                    <div>
                      <Loader />
                    </div>
                  )}
                </MMBox>
              </Grid>

              <Grid item xs={12} lg={4}>
                <MMBox className="events-multimedia-box">
                  <MMSubTitle content="Lista de Videos" />

                  {/* todo: ver el layout cuando es pantalla chica */}
                  {videos.map((video) => (
                    <StyledFlexColumn key={video.id} onClick={() => setVideoToPreview(video)}>
                      <span>{video.name}</span>

                      <span>{video?.user?.username}</span>

                      {video.recorded_at && <span>{formatDate({ date: video.recorded_at })}</span>}

                      {video.user?.id === user?.id && (
                        <MMButton
                          onClick={(e: SyntheticEvent) => {
                            e.stopPropagation();

                            handleVideoDelete(video.id);
                          }}
                        >
                          Eliminar
                        </MMButton>
                      )}
                    </StyledFlexColumn>
                  ))}
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
