import { createContext, useContext, useReducer, useEffect, useState, SetStateAction, Dispatch } from 'react';
import { useModal } from '../../../../components/hooks/useModal';
import { Threshold } from '../../../../models/Threshold';
import { indexThreshold } from '../../../../services/thresholdService';
import { Policy } from '../../../../models/Policy';
import { checkPolicy } from '../../../../services/policyService';
import { errorSnackbar } from '../../../../components/Snackbar/Snackbar';

export interface Props {
  children: React.ReactNode;
}

type Action =
  | { type: 'add_threshold'; payload: Threshold }
  | { type: 'remove_threshold'; payload: Threshold }
  | { type: 'index_threshold'; payload: Array<Threshold> }
  | { type: 'update_threshold'; payload: Threshold };

interface Store {
  thresholds?: Array<Threshold>;
  dispatch: React.Dispatch<Action>;
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  isLoading: boolean;
  threshold?: Threshold;
  setThreshold: Dispatch<SetStateAction<Threshold | undefined>>;
  policies?: Policy;
}

export const thresholdContext = createContext<Store | null>(null);

export function ThresholdProvider(props: Props) {
  function reducer(reducer: Array<Threshold>, action: Action): Array<Threshold> {
    switch (action.type) {
      case 'add_threshold': {
        return [...reducer, action.payload];
      }
      case 'remove_threshold': {
        return reducer.filter((thresholds) => thresholds.id !== action.payload.id);
      }
      case 'index_threshold': {
        return action.payload;
      }
      case 'update_threshold': {
        return reducer.map((threshold) => {
          if (threshold.id === action.payload.id) {
            return action.payload;
          }
          return threshold;
        });
      }
      default: {
        throw Error('Unknown action: ' + action);
      }
    }
  }

  const [thresholds, dispatch] = useReducer(reducer, []);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [threshold, setThreshold] = useState<Threshold>();
  const [policies, setPolicies] = useState<Policy>();

  useEffect(() => {
    getPolicy();

    setIsLoading(true);
    indexThreshold().then((thresholds) => {
      dispatch({ type: 'index_threshold', payload: thresholds });
    });
    setIsLoading(false);
  }, []);

  const getPolicy = async () => {
    try {
      const response = await checkPolicy('Admin::PenaltyThresholdsController');

      setPolicies(response);
    } catch (error) {
      errorSnackbar('Error al obtener los permisos. Contacte a soporte');
    }
  };

  const { isModalOpen, openModal, closeModal } = useModal();

  const store = {
    thresholds,
    dispatch,
    isModalOpen,
    openModal,
    closeModal,
    isLoading,
    threshold,
    setThreshold,
    policies
  };

  return <thresholdContext.Provider value={store}>{props.children}</thresholdContext.Provider>;
}

/* Custom hook para encapsular el uso de useContext */
export function useThreshold() {
  return useContext(thresholdContext) as Store;
}
