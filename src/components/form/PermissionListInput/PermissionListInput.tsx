import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Permission } from '../../../models/Role';
import { Loader } from '../../Loader/Loader';
import './PermissionListInput.scss';
import { useCollection } from '../../../context/collectionContext';
import { permissionsDiccionary } from './permissionsHelpers';

type Props = {
  setSelectedPermissions?: Dispatch<SetStateAction<string[]>>;
  selectedPermissions: string[];
  disabled: boolean;
};
export const PermissionListInput = ({ setSelectedPermissions, selectedPermissions, disabled = false }: Props) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [permissions, setPermissions] = useState<Permission[][]>([]);
  const [localSelectedPermissions, setLocalSelectedPermissions] = useState(selectedPermissions);
  const { getPermissionsCollection } = useCollection();

  useEffect(() => {
    getPermissionsCollection().then((permissions) => setPermissions(permissions));
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setLocalSelectedPermissions(selectedPermissions);
  }, [selectedPermissions]);

  const handleCeckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!disabled && setSelectedPermissions) {
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
              <h4 className="title">
                {permissionsDiccionary[perms[0].subject_class]
                  ? permissionsDiccionary[perms[0].subject_class]
                  : perms[0].subject_class}
              </h4>
              <div className="permissions">
                {perms.map((perm, innerIndex) => {
                  return (
                    <label
                      className="permission"
                      htmlFor={'check' + index + '.' + innerIndex}
                      key={disabled ? 'rcheck' + index + '.' + innerIndex : 'check' + index + '.' + innerIndex}
                    >
                      <input
                        type={'checkbox'}
                        id={disabled ? 'rcheck' + index + '.' + innerIndex : 'check' + index + '.' + innerIndex}
                        checked={localSelectedPermissions.includes(permissions[index][innerIndex].id)}
                        value={index + '.' + innerIndex}
                        onChange={handleCeckboxChange}
                        disabled={disabled}
                      />
                      <span>{perm.name}</span>
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
