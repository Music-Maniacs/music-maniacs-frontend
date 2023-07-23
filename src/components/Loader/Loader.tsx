import React from 'react';
import Lottie from 'react-lottie';
import animationData from './../../assets/lottie/loader.json';

type Props = {
  height?: string | number;
  width?: string | number;
};

export const Loader = ({ height = 200, width = 200 }: Props) => {
  const options = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  return <Lottie options={options} height={height} width={width} />;
};
