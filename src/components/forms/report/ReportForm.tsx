import React from 'react';
import { SelectCollection } from '../../../models/Generic';
import { ReportCategory, reportCategories, reportValidations } from '../../../models/Report';
import '../Forms.scss';
import { SubmitHandler, useForm } from 'react-hook-form';
import { errorSnackbar, infoSnackbar } from '../../Snackbar/Snackbar';
import { handleFormErrors } from '../../../utils/handleFormErrors';
import { InputArea } from '../../form/InputArea/InputArea';
import { InputSelect } from '../../form/InputSelect/InputSelect';
import { StyledButtonGroup } from '../../../pages/admin/styles';
import { MMButton } from '../../MMButton/MMButton';
import './ReportForm.scss';
import { StyledFlexColumn } from '../../../styles/styledComponents';

type ReportFormProps = {
  reportableId: string;
  reportTitleText: string;
  closeModal: () => void;
  service: (id: string, userComment: string, category: ReportCategory) => Promise<any>;
};

type FormData = {
  reportCategory: SelectCollection;
  userComment: string;
};

export const ReportForm = ({ reportableId, closeModal, service, reportTitleText }: ReportFormProps) => {
  const {
    register,
    control,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<FormData>();

  const reportCollection = reportCategories.map((cat) => ({ label: cat.toString(), value: cat.toString() }));

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      await service(reportableId, data.userComment, data.reportCategory.value as ReportCategory);

      infoSnackbar(`Reporte creado con éxito.`);

      closeModal();
    } catch (error) {
      let hasFormError = handleFormErrors(error, setError);

      !hasFormError && errorSnackbar(`Error inesperado al crear el reporte. Contacte a soporte.`);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} autoComplete="off" className="generic-form-container">
      <StyledFlexColumn $gap="0px">
        <div className="form-warning-icon-container">
          <div className="form-warning-icon">!</div>
        </div>

        <h2>{`¿Seguro que quieres reportar ${reportTitleText}?`}</h2>
      </StyledFlexColumn>

      <InputSelect
        label="Categoría del reporte"
        name="reportCategory"
        collection={reportCollection}
        control={control}
        errors={errors}
        options={reportValidations.category}
      />

      <InputArea
        label="Comentario"
        name="userComment"
        register={register}
        errors={errors}
        options={reportValidations.user_comment}
        rows={8}
      />

      <StyledButtonGroup>
        <MMButton type="submit" color="primary">
          Reportar
        </MMButton>
        <MMButton type="button" color="tertiary" onClick={closeModal}>
          Cerrar
        </MMButton>
      </StyledButtonGroup>
    </form>
  );
};
