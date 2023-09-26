import React, { Dispatch, SetStateAction, createContext, useContext, useEffect, useState } from 'react';
import { Producer } from '../../../../models/Producer';
import { errorSnackbar } from '../../../../components/Snackbar/Snackbar';
import { getProducer } from '../../../../services/producerService';
import { useNavigate, useParams } from 'react-router-dom';

type Props = {
  children: React.ReactNode;
};

type StoreProps = {
  producer?: Producer;
  setProducer: Dispatch<SetStateAction<Producer | undefined>>;
};

const ProducerContext = createContext<StoreProps | null>(null);

export const ProducerProvider = ({ children }: Props) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [producer, setProducer] = useState<Producer>();

  useEffect(() => {
    if (!id) return navigate('/profiles');

    getShowProducer(id);
  }, []);

  const getShowProducer = async (id: string) => {
    try {
      const producer = await getProducer(id);

      setProducer(producer);
    } catch (error) {
      errorSnackbar('Error al obtener la productora. Contacte a soporte.');
      navigate('/profiles');
    }
  };

  const store: StoreProps = {
    producer,
    setProducer
  };

  return <ProducerContext.Provider value={store}>{children}</ProducerContext.Provider>;
};

export const useProducer = (): StoreProps => {
  return useContext(ProducerContext) as StoreProps;
};
