import { useEffect, useState } from 'react';
import { Policy } from '../../models/Policy';
import { checkPolicy } from '../../services/policyService';
import { errorSnackbar } from '../Snackbar/Snackbar';
import { ControllerClassNames } from '../../models/Role';

type Props = {
  controllerClassName: ControllerClassNames;
};

export const usePolicy = ({ controllerClassName }: Props) => {
  const [policies, setPolicies] = useState<Policy>();

  useEffect(() => {
    getPolicy();
  }, []);

  const getPolicy = async () => {
    try {
      const response = await checkPolicy(controllerClassName);

      setPolicies(response);
    } catch (error) {
      errorSnackbar('Error al obtener los permisos. Contacte a soporte');
    }
  };

  return { policies };
};
