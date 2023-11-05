import React, { useState } from 'react';
import { Video } from '../../../models/Video';
import './Multimedia.scss';
import { StyledFlex } from '../../../styles/styledComponents';
import { NoData } from '../../../components/NoData/NoData';

type VideoPreviewProps = {
  video: Video;
  innerRef?: React.Ref<HTMLVideoElement>;
};

export const VideoPreview = ({ video, innerRef }: VideoPreviewProps) => {
  const [hasError, setHasError] = useState(false);

  return (
    <StyledFlex $justifyContent="center" $alignItems="center">
      {hasError ? (
        <NoData
          message="Error al reproducir el video."
          style={{ width: '100%', maxWidth: '500px', textAlign: 'center', margin: '60px 0' }}
        />
      ) : (
        <div className="video-container">
          <video ref={innerRef} className="video" controls>
            <source src={video.full_url} onError={() => setHasError(true)} />
          </video>
        </div>
      )}
    </StyledFlex>
  );
};
