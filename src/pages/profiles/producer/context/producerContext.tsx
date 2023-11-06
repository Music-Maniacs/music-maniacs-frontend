import React, { Dispatch, SetStateAction, createContext, useContext, useEffect, useState } from 'react';
import { Producer } from '../../../../models/Producer';
import { errorSnackbar } from '../../../../components/Snackbar/Snackbar';
import { getProducer } from '../../../../services/producerService';
import { useNavigate, useParams } from 'react-router-dom';
import { usePolicy } from '../../../../components/hooks/usePolicy';
import { Policy } from '../../../../models/Policy';

type Props = {
  children: React.ReactNode;
};

type StoreProps = {
  producer?: Producer;
  setProducer: Dispatch<SetStateAction<Producer | undefined>>;
  producerPolicies?: Policy;
  versionPolicies?: Policy;
};

const ProducerContext = createContext<StoreProps | null>(null);

export const ProducerProvider = ({ children }: Props) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [producer, setProducer] = useState<Producer>();
  const { policies: producerPolicies } = usePolicy({ controllerClassName: 'ProducersController' });
  const { policies: versionPolicies } = usePolicy({ controllerClassName: 'VersionsController' });

  useEffect(() => {
    if (!id) return navigate('/profiles');

    getShowProducer(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    setProducer,
    producerPolicies,
    versionPolicies
  };

  return <ProducerContext.Provider value={store}>{children}</ProducerContext.Provider>;
};

export const useProducer = (): StoreProps => {
  return useContext(ProducerContext) as StoreProps;
};
