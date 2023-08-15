import React from 'react';
import { MMBox } from '../../../components/MMBox/MMBox';
import { MMTitle } from '../../../components/MMTitle/MMTitle';
import { InputText } from '../../../components/form/InputText/InputText';
import { MMButton } from '../../../components/MMButton/MMButton';
import { SubmitHandler, useForm } from 'react-hook-form';
import { register as serviceRegister } from '../../../services/userService';
import MMLink from '../../../components/MMLink/MMLink';
import { MMContainer } from '../../../components/MMContainer/MMContainer';
import '../Auth.scss';
import { userValidations } from '../../../models/User';
import { errorSnackbar, infoSnackbar } from '../../../components/Snackbar/Snackbar';
import { useNavigate } from 'react-router-dom';

type FormData = {
  full_name: string;
  username: string;
  email: string;
  password: string;
  password_confirmation: string;
};

const Register = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      await serviceRegister(data.full_name, data.username, data.email, data.password, data.password_confirmation);

      infoSnackbar('Usuario creado con exito');
      navigate('/login');
    } catch (error) {
      errorSnackbar('Error al crear el usuario');
    }
  };

  return (
    <MMContainer maxWidth="xs">
      <MMBox className="auth-box-container">
        <MMTitle content="Registrarse" />

        <form className="form-container" onSubmit={handleSubmit(onSubmit)} autoComplete="off">
          <InputText
            label="Nombre Completo"
            type="text"
            name="full_name"
            register={register}
            errors={errors}
            options={userValidations.full_name}
          />

          <InputText
            label="Usuario"
            type="text"
            name="username"
            register={register}
            errors={errors}
            options={userValidations.username}
          />

          <InputText
            label="Email"
            type="text"
            name="email"
            register={register}
            errors={errors}
            options={userValidations.email}
          />

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

          <MMButton type="submit">Crear Cuenta</MMButton>
        </form>

        <div className="footer-container">
          <span>¿Ya tienes cuenta?</span>
          <MMLink to={'/login'} content="Iniciar Sesión" />
        </div>
      </MMBox>
    </MMContainer>
  );
};

export default Register;
