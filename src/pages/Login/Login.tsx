import React, { FormEvent, createRef } from 'react';
import { useAuth } from '../../context/authContext';
import { login } from '../../services/userService';
import { useNavigate } from 'react-router-dom';
import { MMBox } from '../../components/MMBox/MMBox';
import './Login.scss';
import MMLink from '../../components/MMLink/MMLink';
import { MMButton } from '../../components/MMButton/MMButton';
import { MMTitle } from '../../components/MMTitle/MMTitle';
import { MMContainer } from '../../components/MMContainer/MMContainer';
import { errorSnackbar } from '../../components/Snackbar/Snackbar';

const Login = () => {
  const { userLogin } = useAuth();
  const navigate = useNavigate();
  const usernameRef = createRef<HTMLInputElement>();
  const passwordRef = createRef<HTMLInputElement>();

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();

    if (!usernameRef.current?.value || !passwordRef.current?.value) {
      return errorSnackbar('Debe ingresar un usuario y contraseña');
    }

    login(usernameRef.current.value, passwordRef.current.value)
      .then((user) => {
        userLogin(user);
        navigate('/');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <MMContainer maxWidth="xs">
      <MMBox className="login-container">
        <MMTitle content="Iniciar Sesión" />

        <form onSubmit={(e: FormEvent) => handleLogin(e)} className="form-container">
          <input ref={usernameRef} type="text" />
          <input ref={passwordRef} type="text" />
          <input type="submit" hidden />
          <MMButton type="submit">Iniciar Sesión</MMButton>
        </form>

        <MMLink to={'/recover-password'} content="¿Olvidaste Tu Contraseña?" />

        <div className="register-container">
          <span>¿No tienes una cuenta?</span>
          <MMLink to={'/register'} content="Registrarse" />
        </div>
      </MMBox>
    </MMContainer>
  );
};

export default Login;
