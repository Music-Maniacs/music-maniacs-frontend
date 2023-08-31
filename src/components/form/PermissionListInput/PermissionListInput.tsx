import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Permission } from '../../../models/Role';
import { adminGetPermissions } from '../../../services/roleService';
import { errorSnackbar } from '../../Snackbar/Snackbar';
import { Loader } from '../../Loader/Loader';
import './PermissionListInput.scss';

type Props = {
  setSelectedPermissions?: Dispatch<SetStateAction<string[]>>;
  selectedPermissions: string[];
  readonly: boolean;
};
export const PermissionListInput = ({ setSelectedPermissions, selectedPermissions, readonly = false }: Props) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [permissions, setPermissions] = useState<Permission[][]>([]);
  const [localSelectedPermissions, setLocalSelectedPermissions] = useState(selectedPermissions);
  const navigate = useNavigate();
  useEffect(() => {
    getPermissions();
  }, []);

  useEffect(() => {
    setLocalSelectedPermissions(selectedPermissions);
  }, [selectedPermissions]);

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
    if (!readonly && setSelectedPermissions) {
      let i = e.target.value.split('.');
      let perm = permissions[i[0] as unknown as number][i[1] as unknown as number];

      if (e.target.checked) {
        setSelectedPermissions([perm.id, ...localSelectedPermissions]);
      } else {
        setSelectedPermissions(localSelectedPermissions.filter((item) => item !== perm.id));
      }
    }
  };

  return loading ? (
    <Loader />
  ) : (
    <div>
      <h2>Permisos</h2>
      <div className="permissions-container">
        {permissions.map((perms, index) => {
          return (
            <div className="permissions-subject-class" key={'permissions' + index}>
              <h4 className="title">{perms[0].subject_class}</h4>
              <div className="permissions">
                {perms.map((perm, innerIndex) => {
                  return (
                    <label
                      className="permission"
                      htmlFor={'check' + index + '.' + innerIndex}
                      key={readonly ? 'rcheck' + index + '.' + innerIndex : 'check' + index + '.' + innerIndex}
                    >
                      <input
                        type={'checkbox'}
                        id={readonly ? 'rcheck' + index + '.' + innerIndex : 'check' + index + '.' + innerIndex}
                        checked={localSelectedPermissions.includes(permissions[index][innerIndex].id)}
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
        })}
      </div>
    </div>
  );
};
