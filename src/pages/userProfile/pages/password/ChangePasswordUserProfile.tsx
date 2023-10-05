import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { InputText } from '../../../../components/form/InputText/InputText';
import { MMButton } from '../../../../components/MMButton/MMButton';
import { errorSnackbar, infoSnackbar } from '../../../../components/Snackbar/Snackbar';
import { userValidations } from '../../../../models/User';
import { changePasswordUserProfile } from '../../../../services/userProfileService';
import breakpoints from '../../../../styles/_breakpoints.scss';

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  align-items: flex-end;
  align-self: stretch;
  justify-content: flex-end;
`;

const UserProfileChangePasswordContainer = styled.div`
  display: flex;
  max-width: 700px;
  padding: 10px;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
`;

const UserProfileChangePasswordForm = styled.form`
  display: flex;
  padding: 20px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 10px;
  align-self: stretch;
`;
const HiddenButtonMd = styled(MMButton)`
  @media screen and (max-width: ${breakpoints.md}) {
    display: none;
  }
`;

type FormData = {
  password: string;
  password_confirmation: string;
};
export const ChangePasswordUserProfile = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors }
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      await changePasswordUserProfile(data.password, data.password_confirmation);
      infoSnackbar('Contraseña modificada correctamente');
      reset();
    } catch (error) {
      errorSnackbar('Error al cambiar la contraseña');
    }
  };
  return (
    <UserProfileChangePasswordContainer>
      <UserProfileChangePasswordForm className="form-container" onSubmit={handleSubmit(onSubmit)} autoComplete="off">
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

        <ButtonsContainer>
          <HiddenButtonMd type="button" onClick={() => reset()}>
            Cancelar
          </HiddenButtonMd>
          <MMButton type="submit">Cambiar Contraseña</MMButton>
        </ButtonsContainer>
      </UserProfileChangePasswordForm>
    </UserProfileChangePasswordContainer>
  );
};
