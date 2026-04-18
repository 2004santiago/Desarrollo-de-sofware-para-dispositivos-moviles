import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { useState } from 'react';

export const useCamera = () => {
  const [photo, setPhoto] = useState(null);
  const takePhoto = async () => {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera,
    });
    setPhoto(image.dataUrl);
    return image.dataUrl;
  };
  return { photo, takePhoto };
};