import React from 'react';
import { useAuth } from '../../../context/authContext';
import { login } from '../../../services/userService';
import { useNavigate } from 'react-router-dom';
import { MMBox } from '../../../components/MMBox/MMBox';
import MMLink from '../../../components/MMLink/MMLink';
import { MMButton } from '../../../components/MMButton/MMButton';
import { MMTitle } from '../../../components/MMTitle/MMTitle';
import { MMContainer } from '../../../components/MMContainer/MMContainer';
import { errorSnackbar, infoSnackbar } from '../../../components/Snackbar/Snackbar';
import { InputText } from '../../../components/form/InputText/InputText';
import '../Auth.scss';
import { SubmitHandler, useForm } from 'react-hook-form';
import { userValidations } from '../../../models/User';

type FormData = {
  username: string;
  password: string;
};

const Login = () => {
  const { userLogin } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const response = await login(data.username, data.password);

      infoSnackbar('Inicio de sesión exitoso');
      userLogin(response);
      navigate('/');
    } catch (error) {
      errorSnackbar('Usuario o contraseña incorrectos');
    }
  };

  return (
    <MMContainer maxWidth="xs">
      <MMBox className="auth-box-container">
        <MMTitle content="Iniciar Sesión" />

        <form className="form-container" onSubmit={handleSubmit(onSubmit)} autoComplete="off">
          <InputText
            type="text"
            label="Usuario"
            name="username"
            errors={errors}
            register={register}
            options={userValidations.username}
          />

          <InputText
            type="password"
            label="Contraseña"
            name="password"
            errors={errors}
            register={register}
            options={{ required: { value: true, message: 'Debe ingresar su contraseña' } }}
          />

          <input type="submit" hidden />

          <MMButton type="submit">Iniciar Sesión</MMButton>
        </form>

        <MMLink to={'/recover-password'} content="¿Olvidaste Tu Contraseña?" />

        <div className="footer-container">
          <span>¿No tienes una cuenta?</span>
          <MMLink to={'/register'} content="Registrarse" />
        </div>
      </MMBox>
    </MMContainer>
  );
};

export default Login;
