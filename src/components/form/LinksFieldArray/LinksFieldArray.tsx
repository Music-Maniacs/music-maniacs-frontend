import React from 'react';
import {
  FieldArrayWithId,
  FieldErrors,
  FieldValues,
  UseFieldArrayAppend,
  UseFieldArrayRemove,
  UseFieldArrayUpdate,
  UseFormGetValues,
  UseFormRegister
} from 'react-hook-form';
import { StyledError, StyledLabel } from '../formStyles';
import { InputText } from '../InputText/InputText';
import { FaPlus, FaTrashAlt } from 'react-icons/fa';
import { styled } from 'styled-components';
import colors from '../../../styles/_colors.scss';

/*
 * Cuando usemos para editar, hay que enviar update y getValues
 */
interface Props<T extends FieldValues> {
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  // @ts-ignore
  fields: FieldArrayWithId<T, 'links_attributes', 'id'>[];
  // @ts-ignore
  append: UseFieldArrayAppend<T, 'links_attributes'>;
  remove: UseFieldArrayRemove;
  // @ts-ignore
  update?: UseFieldArrayUpdate<T, 'links_attributes'>;
  getValues?: UseFormGetValues<T>;
}

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 9px;
  align-items: flex-start;
  width: 100%;
`;

const StyledInputsContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 9px;
`;

const StyledIconContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: ${colors.primary};
  border-radius: 50%;
  padding: 5px;
  cursor: pointer;
`;

const StyledAddLinkContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 7px;
  cursor: pointer;
`;

export function LinksFieldArray<T extends FieldValues>({
  register,
  errors,
  fields,
  append,
  remove,
  update,
  getValues
}: Props<T>) {
  return (
    <StyledContainer>
      <StyledLabel>Links</StyledLabel>

      {fields.map((field, index) => {
        // @ts-ignore
        const fieldValue = getValues && getValues(`links_attributes.${index}` as const);
        if (fieldValue && fieldValue._destroy) return null;

        return (
          <div key={field.id} style={{ width: '100%' }}>
            <StyledInputsContainer>
              <InputText
                placeholder="Titulo"
                name={`links_attributes.${index}.title` as const}
                options={{
                  required: { value: true, message: 'Debe ingresar el titulo' }
                }}
                containerWidth="40%"
                register={register}
                errors={errors}
              />

              <InputText
                placeholder="Enlace"
                name={`links_attributes.${index}.url` as const}
                options={{
                  required: { value: true, message: 'Debe ingresar el enlace' }
                }}
                containerWidth="60%"
                register={register}
                errors={errors}
              />

              <StyledIconContainer
                onClick={() => {
                  // Verifico en el caso de la edicion, que no tengo que remover el elemento, solo marcarlo con _destroy true
                  if (fieldValue && fieldValue.id) {
                    // @ts-ignore
                    update && update(index, { ...fieldValue, _destroy: true });
                  } else {
                    remove(index);
                  }
                }}
              >
                <FaTrashAlt size={'0.7rem'} />
              </StyledIconContainer>
            </StyledInputsContainer>

            <StyledError>
              {
                // @ts-ignore
                errors?.links_attributes?.[index]?.title?.message || errors?.links_attributes?.[index]?.url?.message
              }
            </StyledError>
          </div>
        );
      })}

      <StyledAddLinkContainer
        onClick={() => {
          append({
            // @ts-ignore
            title: '',
            url: ''
          });
        }}
      >
        <StyledIconContainer>
          <FaPlus size={'0.7rem'} />
        </StyledIconContainer>

        <span>Agregar Link</span>
      </StyledAddLinkContainer>
    </StyledContainer>
  );
}
