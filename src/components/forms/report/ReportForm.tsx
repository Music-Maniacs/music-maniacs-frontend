import React, { useEffect, useState } from 'react';
import { Dictionary, SelectCollection } from '../../../models/Generic';
import {
  ReportCategory,
  ReportableType,
  reportCategoriesTranslated,
  reportCollectionByType,
  reportValidations,
  reportableTypeTranslated
} from '../../../models/Report';
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
import { isAxiosError } from 'axios';

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

export const ReportForm = ({ reportableId, closeModal, service, reportTitleText, reportableType }: ReportFormProps) => {
  const {
    register,
    control,
    handleSubmit,
    setError,
    watch,
    getFieldState,
    reset,
    formState: { errors }
  } = useForm<FormData>({
    defaultValues: {
      userComment: '',
      originalReportable: undefined,
      reportCategory: undefined
    }
  });

  const reportCategoryValue = watch('reportCategory');
  const [reportCategoryVal, setReportCategoryVal] = useState<string>(reportCategoryValue?.value);
  const originalReportableValue = watch('originalReportable');
  const isVersionReport = reportableType === 'Version';
  const hasOriginalReportableId = ['incorrect_artist', 'incorrect_producer', 'incorrect_venue', 'duplicated'].includes(
    reportCategoryValue?.value
  );

  useEffect(() => {
    // No me funciona bien la dependencia del useEffect escuchando al watch de reportCategoryValue
    setReportCategoryVal(reportCategoryValue?.value);
  }, [reportCategoryValue]);

  // Esto no esta muy bueno, pero si escucho al watch de reportCategoryValue, no funciona
  useEffect(() => {
    // Si cambia la categoria y hay un valor en el input original, hay que ponerlo en blanco
    if (reportCategoryValue?.value && originalReportableValue?.value) {
      reset({ originalReportable: undefined });
    }
  }, [reportCategoryVal]);

  const reportCollection = reportCollectionByType[reportableType].map((item) => ({
    label: reportCategoriesTranslated[item],
    value: item
  }));

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      await service(
        reportableId,
        data.userComment,
        (data.reportCategory?.value as ReportCategory) ?? 'other',
        hasOriginalReportableId ? originalReportableValue?.value : undefined
      );

      infoSnackbar(`Reporte creado con éxito.`);

      closeModal();
    } catch (error) {
      if (isAxiosError(error) && error.response?.status === 403) {
        errorSnackbar(`No tienes permisos para realizar reportes.`);

        return closeModal();
      }

      let hasFormError = handleFormErrors(error, setError);

      !hasFormError && errorSnackbar(`Error inesperado al crear el reporte. Contacte a soporte.`);
    }
  };

  const getOriginalReportableLabel = () => {
    if (!hasOriginalReportableId) return '';

    if (reportCategoryValue.value === 'duplicated') {
      return 'Buscar original';
    }

    switch (reportCategoryValue.value) {
      case 'incorrect_artist':
        return 'Buscar el artista correcto';
      case 'incorrect_venue':
        return 'Buscar el espacio de evento correcto';
      case 'incorrect_producer':
        return 'Buscar la productora correcta';
      default:
        return '';
    }
  };

  const getOriginalReportableTypeaheadUrl = () => {
    if (!hasOriginalReportableId) return '';

    if (reportCategoryValue.value === 'duplicated') {
      return reportableTypeaheadUrlByType[reportableType];
    }

    switch (reportCategoryValue.value) {
      case 'incorrect_artist':
        return reportableTypeaheadUrlByType['Artist'];
      case 'incorrect_venue':
        return reportableTypeaheadUrlByType['Venue'];
      case 'incorrect_producer':
        return reportableTypeaheadUrlByType['Producer'];
      default:
        return '';
    }
  };

  const getOriginalReportableHrefLabel = () => {
    if (!hasOriginalReportableId) return '';

    if (reportCategoryValue.value === 'duplicated') {
      return reportableTypeTranslated[reportableType];
    }

    switch (reportCategoryValue.value) {
      case 'incorrect_artist':
        return reportableTypeTranslated['Artist'];
      case 'incorrect_venue':
        return reportableTypeTranslated['Venue'];
      case 'incorrect_producer':
        return reportableTypeTranslated['Producer'];
      default:
        return '';
    }
  };

  const getOriginalReportableHref = () => {
    if (!hasOriginalReportableId) return '';

    if (reportCategoryValue.value === 'duplicated') {
      return `${reportableHrefByType[reportableType]}${originalReportableValue?.value}`;
    }

    switch (reportCategoryValue.value) {
      case 'incorrect_artist':
        return `${reportableHrefByType['Artist']}${originalReportableValue?.value}`;
      case 'incorrect_venue':
        return `${reportableHrefByType['Venue']}${originalReportableValue?.value}`;
      case 'incorrect_producer':
        return `${reportableHrefByType['Producer']}${originalReportableValue?.value}`;
      default:
        return '';
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

      {isVersionReport && (
        <span style={{ textAlign: 'center' }}>
          Por favor, en caso de no poder corregir el error usted mismo, especifique en el comentario los campos
          incorrectos y su sugerencia de edición
        </span>
      )}

      <InputArea
        label="Comentario"
        name="userComment"
        register={register}
        errors={errors}
        options={reportValidations.user_comment}
        rows={8}
      />
      {hasOriginalReportableId && (
        <StyledFlexColumn $width="100%" $overflowY="hidden">
          <InputAsyncSelect
            label={getOriginalReportableLabel()}
            name="originalReportable"
            control={control}
            errors={errors}
            getFieldState={getFieldState}
            typeaheadUrl={getOriginalReportableTypeaheadUrl()}
            options={{
              required: {
                value: true,
                message: 'El campo es requerido'
              }
            }}
          />
          {originalReportableValue?.value && (
            <MMAnchor
              content={
                <StyledFlex $cursor="pointer" $gap="3px">
                  <FaSearch /> Ver {getOriginalReportableHrefLabel()}
                </StyledFlex>
              }
              href={getOriginalReportableHref()}
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
