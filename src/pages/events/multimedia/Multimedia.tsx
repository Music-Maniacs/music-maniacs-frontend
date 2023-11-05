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
import { getVideos } from '../../../services/eventService';
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
import { FaFlag, FaThumbsUp, FaTrash, FaVideo } from 'react-icons/fa';
import colors from '../../../styles/_colors.scss';
import { sweetAlert } from '../../../components/SweetAlert/sweetAlert';
import { deleteVideo, likeVideo, removeLikeVideo, reportVideo } from '../../../services/videoService';
import { NoData } from '../../../components/NoData/NoData';
import { ReportForm } from '../../../components/forms/report/ReportForm';
import { VideoPreview } from './VideoPreview';

const Multimedia = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isModalOpen, openModal, closeModal } = useModal();
  const { showEvent, getShowEvent } = useEvents();
  const [isRequestLoading, setIsRequestLoading] = useState(true);
  const [videos, setVideos] = useState<Video[]>([]);
  const [videoToPreview, setVideoToPreview] = useState<Video | null>(null);
  const videoRef = React.useRef<HTMLVideoElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [sort, setSort] = useState<'recorded_at desc' | 'created_at desc'>('recorded_at desc');
  const { user } = useAuth();
  const [videoToReport, setVideoToReport] = useState<Video>();
  const { isModalOpen: isReportModalOpen, openModal: openReportModal, closeModal: closeReportModal } = useModal();

  useEffect(() => {
    if (!id) return navigate('/events');

    if (!showEvent || showEvent.id !== id) getShowEvent(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!showEvent || !id) return;

    fetchVideos(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    try {
      await deleteVideo(videoId);

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

  const handleLikeVideo = async (videoId: string, likedByCurrentUser: boolean) => {
    const likeService = likedByCurrentUser ? removeLikeVideo : likeVideo;

    try {
      await likeService(videoId);

      const videosTmp = videos.map((video) => {
        if (video.id === videoId) {
          return {
            ...video,
            liked_by_current_user: !likedByCurrentUser,
            likes_count: likedByCurrentUser ? video.likes_count - 1 : video.likes_count + 1
          };
        }

        return video;
      });

      setVideos(videosTmp);
    } catch (error) {
      errorSnackbar('Error al dar like al video. Contacte a Soporte.');
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
    } else if (value === 'likes_count desc') {
      const videosSorted = videosCopy.sort((a, b) => {
        return b.likes_count - a.likes_count;
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

  const handleReportVideo = (video: Video) => {
    setVideoToReport(video);
    openReportModal();
  };

  return (
    <>
      {showEvent && (
        <MMModal isModalOpen={isModalOpen} closeModal={closeModal} maxWidth="sm" title="Subir Video">
          <Form successCallback={handleFormSuccess} closeFormModal={closeModal} eventId={showEvent.id} />
        </MMModal>
      )}

      <MMModal closeModal={closeReportModal} isModalOpen={isReportModalOpen} maxWidth="sm">
        <ReportForm
          reportableId={videoToReport?.id || ''}
          service={reportVideo}
          closeModal={closeReportModal}
          reportTitleText="el video"
          reportableType="Video"
        />
      </MMModal>

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
                          <VideoPreview innerRef={videoRef} video={videoToPreview} />

                          <div>
                            <h4>{videoToPreview.name}</h4>
                            <StyledFlexColumn>
                              <span>
                                Subido Por:{' '}
                                {videoToPreview.anonymous ? (
                                  <span>Usuario Eliminado</span>
                                ) : (
                                  <MMLink
                                    to={`/user/${videoToPreview.user.id}`}
                                    content={videoToPreview.user.username}
                                  />
                                )}
                              </span>
                              {videoToPreview.recorded_at && (
                                <span>
                                  Fecha de Grabacion:{' '}
                                  {formatDate({ date: videoToPreview.recorded_at, format: 'slashWithTime' })}
                                </span>
                              )}
                              <span>
                                Fecha de Subida:{' '}
                                {formatDate({ date: videoToPreview.created_at, format: 'slashWithTime' })}
                              </span>
                            </StyledFlexColumn>
                          </div>
                        </StyledFlexColumn>
                      ) : (
                        <NoData message="No hay videos para mostrar" />
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
                        { label: 'Cantidad de Likes', value: 'likes_count desc' },
                        { label: 'Fecha de Subida', value: 'created_at desc' }
                      ]}
                      styles={reactSelectCustomStyles()}
                      onChange={handleSelectChange}
                    />
                  </StyledInputContainer>

                  <br />
                  {/* todo: ver el maxHeigh */}
                  <Grid container spacing={2} maxHeight={'566px'} overflow={'auto scroll'}>
                    {videos.length === 0 ? (
                      <Grid item xs={12}>
                        <NoData message="No hay videos" />
                      </Grid>
                    ) : (
                      videos.map((video) => (
                        <Grid item xs={12} sm={6} md={4} lg={12} key={video.id}>
                          <VideoCard
                            video={video}
                            handleCardClick={(video) => setVideoToPreview(video)}
                            canDelete={user?.id === video.user?.id}
                            handleDelete={handleVideoDelete}
                            handleLikeVideo={handleLikeVideo}
                            handleReportVideo={handleReportVideo}
                          />
                        </Grid>
                      ))
                    )}
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
  handleLikeVideo: (videoId: string, likedByCurrentUser: boolean) => void;
  handleReportVideo: (video: Video) => void;
};

const VideoCard = ({
  video,
  canDelete = false,
  handleDelete,
  handleCardClick,
  handleLikeVideo,
  handleReportVideo
}: VideoCardProps) => {
  const { user } = useAuth();

  return (
    <Grid container spacing={1} onClick={() => handleCardClick(video)} className="multimedia-video-card">
      <Grid
        item
        xs={2}
        display={'flex'}
        alignItems={'center'}
        justifyContent={'center'}
        style={{ backgroundColor: colors.input_background }}
      >
        <FaVideo size={'1.5rem'} color={'var(--text_color)'} />
      </Grid>
      <Grid item xs={10}>
        <StyledFlexColumn>
          <span>
            <b>{video.name}</b>
          </span>

          {video.anonymous ? (
            <span>Usuario Eliminado</span>
          ) : (
            <MMLink content={video?.user?.username} to={`/user/${video?.user?.id}`} />
          )}

          {video.recorded_at && (
            <span>Grabado el: {formatDate({ date: video.recorded_at, format: 'slashWithTime' })}</span>
          )}

          <StyledFlex $gap="5px">
            {/* Like */}
            <StyledFlex
              $cursor="pointer"
              onClick={(e) => {
                e.stopPropagation();

                if (!user) {
                  warningSnackbar('Debe iniciar sesión para dar like');
                } else {
                  handleLikeVideo(video.id, video.liked_by_current_user);
                }
              }}
              style={{ color: video.liked_by_current_user ? 'var(--accent)' : 'var(--text_color)' }}
            >
              <FaThumbsUp />
              {video.likes_count}
            </StyledFlex>

            {/* Report */}
            {(!user || video.anonymous || user.id !== video.user?.id) && (
              <StyledFlex
                $cursor="pointer"
                onClick={(e) => {
                  e.stopPropagation();

                  if (!user) {
                    warningSnackbar('Debe iniciar sesión para reportar el video');
                  } else {
                    handleReportVideo(video);
                  }
                }}
              >
                <FaFlag />
                Reportar
              </StyledFlex>
            )}

            {/* Delete */}
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
