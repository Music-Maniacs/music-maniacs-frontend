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

type FormData = {
  name: string;
  username: string;
  email: string;
  password: string;
  repeat_password: string;
};

const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    window.alert(JSON.stringify(data));
    // serviceRegister(data.name,data.username,data.email, data.password)
  };

  return (
    <MMContainer maxWidth="xs">
      <MMBox className="auth-box-container">
        <MMTitle content="Registrarse" />

        <form className="form-container" onSubmit={handleSubmit(onSubmit)} autoComplete="off">
          <InputText
            label="Nombre Completo"
            type="text"
            name="name"
            register={register}
            errors={errors}
            options={{
              required: { value: true, message: 'Debe ingresar su nombre completo' },
              maxLength: { value: 10, message: 'El nombre debe ser menor a 10 caracteres' }
            }}
          />

          <InputText
            label="Usuario"
            type="text"
            name="username"
            register={register}
            errors={errors}
            options={{
              required: { value: true, message: 'Debe ingresar su nombre de usuario' },
              maxLength: { value: 10, message: 'El usuario debe ser menor a 10 caracteres' }
            }}
          />

          <InputText
            label="Email"
            type="text"
            name="email"
            register={register}
            errors={errors}
            options={{
              required: { value: true, message: 'Debe ingresar su correo electronico' },
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: 'Debe ingresar un correo valido de la forma nombre@mail.com'
              }
            }}
          />

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
