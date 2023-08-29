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
  function reducer(reducer: Array<Threshold>, action: Action) {
    switch (action.type) {
      case 'add_threshold': {
        console.log("Creando umbral"+action.payload);
        if (action.payload && !Array.isArray(action.payload)){
          createThreshold(action.payload).then( threshold => {
            dispatch({ type: 'set_threshold', payload: [...reducer, threshold] });
          });
        }
        return reducer;
      }
      case 'remove_threshold': {
        return reducer;
      }
      case 'index_threshold': {
        /*
        // Otra forma de hacerlo
        (async () => {
          let data = await indexThreshold();
          //console.log(data);
          dispatch( {type:'set_threshold', payload:data} );
        })();
        */
        indexThreshold().then((thresholds) => {
          dispatch({ type: 'set_threshold', payload: thresholds });
        });
        return reducer;
      }
      case 'set_threshold': {
        if (action.payload && Array.isArray(action.payload)) {
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
    dispatch({ type: 'index_threshold', payload: undefined });
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
