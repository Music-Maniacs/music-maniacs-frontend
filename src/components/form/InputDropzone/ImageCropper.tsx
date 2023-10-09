import { useRef, useState } from 'react';
import Cropper, { Area, Point } from 'react-easy-crop';
import { MMButton } from '../../MMButton/MMButton';
import { getCroppedImg } from './imageCrophelpers';

type ImageCropperProps = {
  image: File;
  setImage: React.Dispatch<React.SetStateAction<string | undefined>>;
  closeModal: () => void;
  type: 'profile' | 'cover';
  onChange: (acceptedFiles: File[]) => void;
};
export const ImageCropper = ({ image, setImage, closeModal, type, onChange }: ImageCropperProps) => {
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const imageUrl = useRef<string>(URL.createObjectURL(image)); //avoid infinite loop
  const lastCroppedAreaPixels = useRef<Area>({ width: 376, height: 376, x: 0, y: 0 });
  const onCropComplete = (croppedArea: Area, croppedAreaPixels: Area) => {
    lastCroppedAreaPixels.current = croppedAreaPixels;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ position: 'relative', width: '100%', height: '400px' }}>
        <Cropper
          image={imageUrl.current}
          crop={crop}
          zoom={zoom}
          aspect={type === 'cover' ? 7 / 1 : 4 / 4}
          cropShape={type === 'profile' ? 'round' : 'rect'}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
        />
      </div>
      <div>
        <MMButton
          style={{ marginTop: '1rem' }}
          onClick={async () => {
            try {
              const croppedImage = await getCroppedImg(image, lastCroppedAreaPixels.current);
              if (croppedImage) {
                setImage(URL.createObjectURL(croppedImage));
                onChange([croppedImage]);
              }
              closeModal();
            } catch (error) {
              // TODO: handle error (alert?)
            }
          }}
        >
          Recortar
        </MMButton>
      </div>
    </div>
  );
};
