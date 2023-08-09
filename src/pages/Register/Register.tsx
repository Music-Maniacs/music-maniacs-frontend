import "./Register.scss";
import { Container, FormLabel, TextField } from '@mui/material';
import React, { useRef } from 'react';
import { MMBox } from '../../components/MMBox/MMBox';
import { MMTitle } from "../../components/MMTitle/MMTitle";
import { MMFormTextInput } from "../../components/MMFormTextInput/MMFormTextInput";
import { MMButton } from "../../components/MMButton/MMButton";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import {register as serviceRegister} from "../../services/userService"
import MMLink from "../../components/MMLink/MMLink";

type FormData = {
  name: string,
  username: string,
  email: string,
  password: string,
  repeat_password: string;
}

const Register = () => {
  const methods = useForm<FormData>();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = methods
  const password = useRef({});
  password.current = watch("password", "");



  const onSubmit: SubmitHandler<FormData> = (data => {
    window.alert(JSON.stringify(data));
    // serviceRegister(data.name,data.username,data.email, data.password)

  })

  return (

    <Container maxWidth="xs">
      <MMBox className='reg-container'>
        <MMTitle content="Registrarse" />
        <FormProvider {...methods}>
          <form className="form-container" id="register-form"  >
            <MMFormTextInput label="Nombre Completo" type="" name="name"
              options={{
                required: { value: true, message: "Debe ingresar su nombre completo" },
                maxLength: { value: 10, message: "El nombre debe ser menor a 10 caracteres" }
              }} />
            {errors.name && <span className="error-span">{errors.name.message}</span>}

            <MMFormTextInput label="Usuario" type="" name="username"
              options={{
                required: { value: true, message: "Debe ingresar su nombre de usuario" },
                maxLength: 10
              }} />
            {errors.username && <span className="error-span">{errors.username.message}</span>}

            <MMFormTextInput label="Email" type="email" name="email"
              options={{
                required: { value: true, message: "Debe ingresar su correo electronico" },
                pattern: { value: /\S+@\S+\.\S+/, message: "Debe ingresar un correo valido de la forma nombre@mail.com" }
              }} />
            {errors.email && <span className="error-span">{errors.email.message}</span>}

            <MMFormTextInput label="Contraseña" type="password" name="password"
              options={{
                required: { value: true, message: "Debe ingresar su contraseña" },
                minLength: { value: 8, message: "La contraseña debe ser de más de 8 caracteres" }
              }} />
            {errors.password && <span className="error-span">{errors.password.message}</span>}

            <MMFormTextInput label="Repetir Contraseña" type="password" name="repeat_password"
              options={{
                required: { value: true, message: "Debe repetir su contraseña" },
                validate: value => value === password.current || "Las contraseñas no coinciden"
              }} />
            {errors.repeat_password && <span className="error-span">{errors.repeat_password.message}</span>}
          </form>
        </FormProvider>
        <MMButton type='submit' id="register-form" content='Crear Cuenta' onClick={handleSubmit(onSubmit)} />

        <div className="log-container">
          <span>¿Ya tienes cuenta?</span>
          <MMLink to={'/login'} content='Iniciar Sesión' />
        </div>
      </MMBox>
    </Container>

  );
};

export default Register;
