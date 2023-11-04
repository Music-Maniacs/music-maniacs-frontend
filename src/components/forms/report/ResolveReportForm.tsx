import React, { useState } from 'react';
import { SelectCollection } from '../../../models/Generic';
import { Report, reportValidations } from '../../../models/Report';
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
import { resolveReport } from '../../../services/reportService';
import { StyledInputContainer, StyledLabel } from '../../form/formStyles';
import { Grid, GridProps } from '@mui/material';

type ReportFormProps = {
  reportId: string;
  closeModal: () => void;
  successCallback: (report: Report) => void;
};

type FormData = {
  penalizationScore: SelectCollection;
  moderatorComment: string;
};

export const ResolveReportForm = ({ reportId, closeModal, successCallback }: ReportFormProps) => {
  const [reportAction, setReportAction] = useState<'accept' | 'reject'>('accept');
  const {
    register,
    control,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<FormData>();

  const penalizationScoreCollection = [
    { label: 'Baja', value: '5' },
    { label: 'Media', value: '10' },
    { label: 'Alta', value: '15' }
  ];

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const report = await resolveReport(
        reportId,
        data.moderatorComment,
        data.penalizationScore?.value ? +data.penalizationScore.value : 0,
        reportAction
      );

      infoSnackbar(`Reporte resuelto con éxito.`);

      successCallback(report);

      closeModal();
    } catch (error) {
      let hasFormError = handleFormErrors(error, setError);

      !hasFormError && errorSnackbar(`Error inesperado al resolver el reporte. Contacte a soporte.`);
    }
  };

  const gridCommonProps: GridProps = {
    item: true,
    xs: 12,
    sm: 6,
    md: 6
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} autoComplete="off" className="generic-form-container">
      <StyledFlexColumn $gap="0px">
        <div className="form-warning-icon-container">
          <div className="form-warning-icon">!</div>
        </div>

        <h2>Resolver Reporte</h2>
      </StyledFlexColumn>

      <StyledInputContainer>
        <StyledLabel>Resultado</StyledLabel>

        <Grid container spacing={2}>
          <Grid {...gridCommonProps}>
            <div
              onClick={(e) => {
                setReportAction('accept');
              }}
              style={{ width: 'fit-content', cursor: 'pointer' }}
            >
              <input
                type="radio"
                name="reviewTo"
                value="artist"
                checked={reportAction === 'accept'}
                onChange={() => {}}
              />
              <label style={{ cursor: 'inherit' }}>Estoy de Acuerdo</label>
            </div>
          </Grid>
          <Grid {...gridCommonProps}>
            <div
              onClick={(e) => {
                setReportAction('reject');
              }}
              style={{ width: 'fit-content', cursor: 'pointer' }}
            >
              <input
                type="radio"
                name="reviewTo"
                value="venue"
                checked={reportAction === 'reject'}
                onChange={() => {}}
              />
              <label style={{ cursor: 'inherit' }}>No Estoy de acuerdo</label>
            </div>
          </Grid>
        </Grid>
      </StyledInputContainer>

      <InputArea
        label="Comentario"
        name="moderatorComment"
        register={register}
        errors={errors}
        options={reportValidations.moderator_comment}
        rows={8}
      />

      <InputSelect
        label="Penalización"
        name="penalizationScore"
        collection={penalizationScoreCollection}
        control={control}
        errors={errors}
        options={reportValidations.penalization_score}
      />

      <StyledButtonGroup>
        <MMButton type="submit" color="primary">
          Resolver
        </MMButton>
        <MMButton type="button" color="tertiary" onClick={closeModal}>
          Cerrar
        </MMButton>
      </StyledButtonGroup>
    </form>
  );
};
