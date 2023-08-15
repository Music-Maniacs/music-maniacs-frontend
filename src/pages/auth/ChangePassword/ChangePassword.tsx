import React, { useEffect } from 'react';
import { MMContainer } from '../../../components/MMContainer/MMContainer';
import { MMBox } from '../../../components/MMBox/MMBox';
import { MMTitle } from '../../../components/MMTitle/MMTitle';
import { InputText } from '../../../components/form/InputText/InputText';
import { MMButton } from '../../../components/MMButton/MMButton';
import MMLink from '../../../components/MMLink/MMLink';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { errorSnackbar, infoSnackbar } from '../../../components/Snackbar/Snackbar';
import '../Auth.scss';
import { userValidations } from '../../../models/User';
import { recoverPassword } from '../../../services/userService';

type FormData = {
  password: string;
  password_confirmation: string;
};

const ChangePassword = () => {
  const navigate = useNavigate();
  const [resetPasswordToken, setResetPasswordToken] = React.useState<string>('');

  useEffect(() => {
    const params = window.location.search;
    const urlParams = new URLSearchParams(params);

    if (!urlParams.get('reset_password_token')) {
      errorSnackbar('Para cambiar la contraseña debe ingresar con el link enviado a su correo');
      navigate('/login');
    }

    setResetPasswordToken(urlParams.get('reset_password_token') as string);
  }, []);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      await recoverPassword(data.password, data.password_confirmation, resetPasswordToken);

      infoSnackbar('Contraseña modificada correctamente');
      navigate('/login');
    } catch (error) {
      errorSnackbar('Error al cambiar la contraseña');
    }
  };

  return (
    <MMContainer maxWidth="xs">
      <MMBox className="auth-box-container">
        <MMTitle content="Cambiar Contraseña" />

        <form className="form-container" onSubmit={handleSubmit(onSubmit)} autoComplete="off">
          <InputText
            label="Contraseña"
            type="password"
            name="password"
            register={register}
            errors={errors}
            options={userValidations.password}
          />

          <InputText
            label="Repetir Contraseña"
            type="password"
            name="password_confirmation"
            register={register}
            errors={errors}
            options={{
              required: { value: true, message: 'Debe repetir su contraseña' },
              validate: (value) => value === watch('password', '') || 'Las contraseñas no coinciden'
            }}
          />

          <input type="submit" hidden />

          <MMButton type="submit">Cambiar Contraseña</MMButton>
        </form>

        <MMLink to={'/'} content="Cancelar" />
      </MMBox>
    </MMContainer>
  );
};

export default ChangePassword;
