import React from 'react';
import { Dictionary, SelectCollection } from '../../../models/Generic';
import { ReportCategory, ReportableType, reportCollectionByType, reportValidations } from '../../../models/Report';
import '../Forms.scss';
import { SubmitHandler, useForm } from 'react-hook-form';
import { errorSnackbar, infoSnackbar } from '../../Snackbar/Snackbar';
import { handleFormErrors } from '../../../utils/handleFormErrors';
import { InputArea } from '../../form/InputArea/InputArea';
import { InputSelect } from '../../form/InputSelect/InputSelect';
import { StyledButtonGroup } from '../../../pages/admin/styles';
import { MMButton } from '../../MMButton/MMButton';
import './ReportForm.scss';
import { StyledFlex, StyledFlexColumn } from '../../../styles/styledComponents';
import { InputAsyncSelect } from '../../form/InputAsyncSelect/InputAsyncSelect';
import { FaSearch } from 'react-icons/fa';
import MMAnchor from '../../MMLink/MMAnchor';

type ReportFormProps = {
  reportableId: string;
  reportTitleText: string;
  reportableType: ReportableType;
  closeModal: () => void;
  service: (id: string, userComment: string, category: ReportCategory, originalReportableId?: string) => Promise<any>;
};

type FormData = {
  reportCategory: SelectCollection;
  userComment: string;
  originalReportable?: SelectCollection;
};

const reportableHrefByType: Dictionary = {
  Event: '/events/',
  Artist: '/profiles/artists/',
  Venue: '/profiles/venues/',
  Producer: '/profiles/producers/'
};

const reportableTypeaheadUrlByType: Dictionary = {
  Event: '/events/search_typeahead?q[name_cont]=',
  Artist: '/admin/artists/search_typeahead?q[name_cont]=',
  Venue: '/admin/venues/search_typeahead?q[name_cont]=',
  Producer: '/admin/producers/search_typeahead?q[name_cont]='
};

const reportableTypeTranslated: Dictionary = {
  Event: 'Evento',
  Artist: 'Artista',
  Venue: 'Espacio de Evento',
  Producer: 'Productora'
};

export const ReportForm = ({ reportableId, closeModal, service, reportTitleText, reportableType }: ReportFormProps) => {
  const {
    register,
    control,
    handleSubmit,
    setError,
    watch,
    getFieldState,
    formState: { errors }
  } = useForm<FormData>();

  const reportCategoryValue = watch('reportCategory');
  const originalReportableValue = watch('originalReportable');

  const reportCollection = reportCollectionByType[reportableType].map((item) => ({ label: item, value: item }));

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      await service(
        reportableId,
        data.userComment,
        data.reportCategory.value as ReportCategory,
        reportCategoryValue.value === 'duplicated' ? originalReportableValue?.value : undefined
      );

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

        <h2 style={{ textAlign: 'center' }}>{`¿Seguro que quieres reportar ${reportTitleText}?`}</h2>
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

      {reportCategoryValue?.value === 'duplicated' && (
        <StyledFlexColumn $width="100%" $overflowY="hidden">
          <InputAsyncSelect
            label="Buscar original"
            name="originalReportable"
            control={control}
            errors={errors}
            getFieldState={getFieldState}
            typeaheadUrl={reportableTypeaheadUrlByType[reportableType]}
            options={{
              required: {
                value: true,
                message: 'El original es requerido'
              }
            }}
          />
          {originalReportableValue?.value && (
            <MMAnchor
              content={
                <StyledFlex $cursor="pointer" $gap="3px">
                  <FaSearch /> Ver {reportableTypeTranslated[reportableType]}
                </StyledFlex>
              }
              href={`${reportableHrefByType[reportableType]}${originalReportableValue?.value}`}
            />
          )}
        </StyledFlexColumn>
      )}

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
