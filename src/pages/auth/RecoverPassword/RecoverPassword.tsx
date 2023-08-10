import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { errorSnackbar, infoSnackbar } from '../../../components/Snackbar/Snackbar';
import { MMContainer } from '../../../components/MMContainer/MMContainer';
import { MMBox } from '../../../components/MMBox/MMBox';
import { MMTitle } from '../../../components/MMTitle/MMTitle';
import { InputText } from '../../../components/form/InputText/InputText';
import { MMButton } from '../../../components/MMButton/MMButton';
import MMLink from '../../../components/MMLink/MMLink';

type FormData = {
  email: string;
};

const RecoverPassword = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      // const response = await recoverPassword(data.email);

      infoSnackbar('Se enviará un correo con las instrucciones para recuperar su contraseña');
      navigate('/');
    } catch (error) {
      errorSnackbar('Error al recuperar la contraseña');
    }
  };
  return (
    <MMContainer maxWidth="xs">
      <MMBox className="auth-box-container">
        <MMTitle content="Recuperar Contraseña" />

        <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
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

          <input type="submit" hidden />

          <MMButton type="submit">Recuperar Contraseña</MMButton>
        </form>

        <MMLink to={'/'} content="Cancelar" />
      </MMBox>
    </MMContainer>
  );
};
export default RecoverPassword;
