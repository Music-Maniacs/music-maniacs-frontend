import React, { useEffect } from 'react';
import { MMContainer } from '../../../components/MMContainer/MMContainer';
import { MMBox } from '../../../components/MMBox/MMBox';
import { MMTitle } from '../../../components/MMTitle/MMTitle';
import { StyledFlexColumn } from '../../../styles/styledComponents';
import axios from 'axios';

const Home = () => {
  useEffect(() => {
    if (navigator.geolocation.getCurrentPosition) {
      navigator.geolocation.getCurrentPosition(
        (position) => getLocationWithLatLong(position.coords.latitude.toString(), position.coords.longitude.toString()),
        (error) => getLocationWithIp()
      );
    } else {
      console.log('desactivado');
    }
    getLocationWithIp();
    // https://www.geolocation-db.com/documentation

    // https://nominatim.openstreetmap.org/reverse?lat=-34.6318138&lon=-68.3390861&format=json
  }, []);

  const getLocationWithIp = () => {
    axios
      .get('https://ipinfo.io/json')
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };

  const getLocationWithLatLong = (lat: string, long: string) => {
    axios
      .get(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${long}&format=json`)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };

  return (
    <MMContainer maxWidth="xxl">
      <StyledFlexColumn $gap="10px">
        {/* <MMBox>
          <MMTitle content="Eventos En <Ciudad>" />
        </MMBox>

        <MMBox>
          <MMTitle content="Eventos Artistas Seguidos" />
        </MMBox>

        <MMBox>
          <MMTitle content="Eventos Espacio de Eventos Seguidos" />
        </MMBox>

        <MMBox>
          <MMTitle content="Eventos Productoras" />
        </MMBox>

        <MMBox>
          <MMTitle content="Eventos Populares" />
        </MMBox> */}
      </StyledFlexColumn>
    </MMContainer>
  );
};

export default Home;
