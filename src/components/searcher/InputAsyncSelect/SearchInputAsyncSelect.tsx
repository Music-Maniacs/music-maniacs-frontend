import React, { forwardRef, MutableRefObject } from 'react';
import AsyncSelect from 'react-select/async';
import { errorSnackbar } from '../../Snackbar/Snackbar';
import axios from 'axios';
import { StyledInputContainer, StyledLabel, reactSelectCustomStyles } from '../../form/formStyles';
import Select from 'react-select/dist/declarations/src/Select';
import { GroupBase } from 'react-select';

interface Props {
  name: string;
  label?: string;
  isClearable?: boolean;
  containerWidth?: string;
  typeaheadUrl: string;
  placeholder?: string;
  queryParams: MutableRefObject<Record<string, string>>;
  paramKey: string;
}

export const SearchInputAsyncSelect = forwardRef<Select<any, boolean, GroupBase<any>>, Props>(
  (
    { name, label, containerWidth = '100%', isClearable = true, typeaheadUrl, queryParams, paramKey, placeholder },
    ref
  ) => {
    const loadOptions = async (inputValue: string) => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}${typeaheadUrl}${inputValue}`);

        return response.data;
      } catch (error) {
        errorSnackbar('Error al obtener los datos');
        return [];
      }
    };

    const onSelectChange = (newValue: any) => {
      queryParams.current[paramKey] = newValue?.value ?? '';
    };

    return (
      <StyledInputContainer $containerWidth={containerWidth}>
        {label && <StyledLabel>{label}</StyledLabel>}

        <AsyncSelect
          cacheOptions
          loadOptions={loadOptions}
          isClearable={isClearable}
          styles={reactSelectCustomStyles(false, false)}
          placeholder={placeholder}
          menuPosition="fixed"
          onChange={onSelectChange}
          noOptionsMessage={({ inputValue }) =>
            inputValue && inputValue.length > 0 ? 'No hay resultados' : 'Empieza a escribir para buscar'
          }
          loadingMessage={() => 'Cargando...'}
          ref={ref}
        />
      </StyledInputContainer>
    );
  }
);
