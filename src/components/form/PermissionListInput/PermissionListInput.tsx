import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { Permission } from '../../../models/Role';
import { adminGetPermissions } from '../../../services/roleService';
import { errorSnackbar } from '../../Snackbar/Snackbar';
import colors from '../../../styles/_colors.scss';
import { Loader } from '../../Loader/Loader';

type Props = {
  setSelectedPermissions: Dispatch<SetStateAction<string[]>>;
  selectedPermissions: string[];
  readonly: boolean;
};
export const PermissionListInput = ({ setSelectedPermissions, selectedPermissions, readonly = false }: Props) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [permissions, setPermissions] = useState<Permission[][]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    getPermissions();
  }, []);

  const getPermissions = async () => {
    try {
      const permissions = await adminGetPermissions();
      permissions.sort((a, b) => a.subject_class.localeCompare(b.subject_class));
      const sortedPermissions = permissions.reduce(
        (function (hash) {
          return function (r: Permission[][], o) {
            if (!hash[o.subject_class]) {
              hash[o.subject_class] = [];
              r.push(hash[o.subject_class]);
            }
            hash[o.subject_class].push(o);
            return r;
          };
        })(Object.create(null)),
        []
      );
      setPermissions(sortedPermissions);
      setLoading(false);
    } catch (error) {
      errorSnackbar('Error al obtener los permisos. Contacte a soporte.');
      navigate(-1);
    }
  };

  const handleCeckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!readonly) {
      let i = e.target.value.split('.');
      let perm = permissions[i[0] as unknown as number][i[1] as unknown as number];

      if (e.target.checked) {
        setSelectedPermissions([perm.id, ...selectedPermissions]);
      } else {
        setSelectedPermissions(selectedPermissions.filter((item) => item !== perm.id));
      }
    }
  };

  type PermProps = {
    prm: Permission[];
    index: number;
  };
  const PermissionsCheckboxList = ({ prm, index }: PermProps) => {
    return (
      <div className="permissions-subject-class">
        <h4 className="title">{prm[0].subject_class}</h4>
        <div className="permissions">
          {prm.map((perm, innerIndex) => {
            return (
              <label
                className="permission"
                htmlFor={'check' + index + '.' + innerIndex}
                key={'check' + index + '.' + innerIndex}
              >
                <input
                  type={'checkbox'}
                  id={'check' + index + '.' + innerIndex}
                  defaultChecked={selectedPermissions.includes(permissions[index][innerIndex].id)}
                  value={index + '.' + innerIndex}
                  onChange={handleCeckboxChange}
                  disabled={readonly}
                />
                <span>{perm.action}</span>
              </label>
            );
          })}
        </div>
      </div>
    );
  };

  if (loading) {
    return <Loader />;
  } else {
    return (
      <StyledCheckboxList>
        <h2>Permisos</h2>
        <div className="permissions-container">
          {permissions.map((perms, index) => {
            return <div key={index}>{<PermissionsCheckboxList index={index} prm={perms} />}</div>;
          })}
        </div>
      </StyledCheckboxList>
    );
  }
};

const StyledCheckboxList = styled.div`
  .permissions-container {
    display: flex;
    flex-direction: row;
    gap: 1rem;
    padding-left: 1rem;
    overflow-x: scroll;

    .permissions-subject-class {
      display: flex;
      flex-direction: column;
      border-left: 1px solid var(--background, #1e2e2c); //backgroun color
      padding-left: 0.5rem;

      .title {
        margin-bottom: 1rem;
        margin-top: 0;
      }

      .permissions {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        padding-left: 0.5rem;

        .permission {
          display: flex;
          flex-direction: row;
          align-items: center;
          padding: 0.5rem;
          gap: 1rem;
          input {
            appearance: none;
            border-radius: 3px;
            border: 1px solid black;
            width: 1rem;
            height: 1rem;
            background: ${colors.input_background};
            &:checked {
              background-color: ${colors.primary};
            }
          }
        }
      }
    }
  }
`;
