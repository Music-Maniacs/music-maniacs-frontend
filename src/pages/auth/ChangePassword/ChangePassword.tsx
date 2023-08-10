import React from 'react';
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

type FormData = {
  password: string;
  repeat_password: string;
};

const ChangePassword = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      // const response = await changePassword(data.password);

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
            options={{
              required: { value: true, message: 'Debe ingresar su contraseña' },
              minLength: { value: 8, message: 'La contraseña debe ser de más de 8 caracteres' }
            }}
          />

          <InputText
            label="Repetir Contraseña"
            type="password"
            name="repeat_password"
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
