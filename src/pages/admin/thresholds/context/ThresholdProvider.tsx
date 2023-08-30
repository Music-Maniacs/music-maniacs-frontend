import { createContext, useContext, useReducer, useEffect } from 'react';
import { useModal } from '../../../../components/hooks/useModal';
import { Threshold } from '../../../../models/Threshold';
import {
  indexThreshold,
  createThreshold,
  destroyThreshold,
  updateThreshold
} from '../../../../services/thresholdService';

export interface Props {
  children: React.ReactNode;
}

interface Action {
  type: string;
  payload: Threshold | undefined | Array<Threshold>;
}

interface Store {
  thresholds?: Array<Threshold>;
  dispatch: React.Dispatch<Action>;
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

export const thresholdContext = createContext<Store | null>(null);

export function ThresholdProvider(props: Props) {
  function reducer(reducer: Array<Threshold>, action: Action):Array<Threshold>{
    switch (action.type) {
      case 'add_threshold': {
        if (!Array.isArray(action.payload) && action.payload ){
          return [...reducer,action.payload];
        }
        return reducer;
      }
      case 'remove_threshold': {
        if (!Array.isArray(action.payload) && action.payload ){
          return reducer.filter(thresholds => thresholds.id !== (action.payload as Threshold).id );
        }
        return reducer;
      }
      case 'index_threshold': {
        if (Array.isArray(action.payload) && action.payload ){
          return action.payload;
        }
        return reducer;
      }
      default: {
        return reducer;
      }
    }
  }

  const [thresholds, dispatch] = useReducer(reducer, []);

  useEffect(() => {

    indexThreshold().then((thresholds) => {
      dispatch({ type: 'index_threshold', payload: thresholds });
    });

  }, []);

  const { isModalOpen, openModal, closeModal } = useModal();

  const store = {
    thresholds,
    dispatch,
    isModalOpen,
    openModal,
    closeModal
  };

  return <thresholdContext.Provider value={store}>{props.children}</thresholdContext.Provider>;
}

/* Custom hook para encapsular el uso de useContext */
export function useThreshold() {
  return useContext(thresholdContext) as Store;
}
