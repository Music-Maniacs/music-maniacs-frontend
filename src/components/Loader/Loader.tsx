import React from 'react';
import Lottie from 'react-lottie';
import animationData from './../../assets/lottie/loader.json';

export const Loader = () => {
  const options = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  return <Lottie options={options} height={200} width={200} />;
};
