import React from 'react';
import Lottie from 'react-lottie';
import animationData from './../../assets/lottie/loader.json';
import { styled } from 'styled-components';

type Props = {
  height?: string | number;
  width?: string | number;
};

const LoaderContainer = styled.div`
  display: 'flex';
  justify-content: 'center';
  align-items: 'center';
`;

export const Loader = ({ height = 200, width = 200 }: Props) => {
  const options = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  return (
    <LoaderContainer>
      <Lottie options={options} height={height} width={width} />
    </LoaderContainer>
  );
};
