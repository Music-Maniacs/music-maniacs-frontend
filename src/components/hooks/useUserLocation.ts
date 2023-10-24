import { useEffect, useState } from 'react';
import axios from 'axios';
import { errorSnackbar } from '../Snackbar/Snackbar';

export type UserLocation = {
  city: string;
  province: string;
  country: string;
};

export const useUserLocation = () => {
  const countryName = new Intl.DisplayNames(['es'], { type: 'region' });

  const [userLocation, setUserLocation] = useState<UserLocation>();

  useEffect(() => {
    // Si el navegador soporta pedir permiso para la ubicacion. Lo pido
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        // Si el usuario acepta. Obtengo la ubicacion por latitud y longitud.
        (position) => getLocationWithLatLong(position.coords.latitude.toString(), position.coords.longitude.toString()),
        // Si el usuario rechaza. Obtengo la ubicacion por la IP.
        () => getLocationWithIp()
      );
    } else {
      // SI el navegador no soporta pedir permiso. Obtengo la ubicacion por la IP.
      getLocationWithIp();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getLocationWithLatLong = (lat: string, long: string) => {
    axios
      .get(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${long}&format=json&zoom=10`)
      .then((response) => {
        setUserLocation({
          city: response.data?.address?.city ?? '',
          province: response.data?.address?.state ?? '',
          country: response.data?.address?.country ?? ''
        });
      })
      // Si no puedo obtener la ubicacion por latitud y longitud. Obtengo la ubicacion por IP (Menos Preciso).
      .catch(() => getLocationWithIp());
  };

  const getLocationWithIp = () => {
    axios
      .get('https://ipinfo.io/json?token=8396254d881cf0')
      .then((response) => {
        setUserLocation({
          city: response.data?.city ?? '',
          province: response.data?.region ?? '',
          country: countryName.of(response.data?.country) ?? ''
        });
      })
      .catch(() => errorSnackbar('Error al obtener la ubicación. Contacte a soporte.'));
  };

  return { userLocation };
};
