import { MMBox } from '../../../components/MMBox/MMBox';
import { MMContainer } from '../../../components/MMContainer/MMContainer';
import { MMTitle } from '../../../components/MMTitle/MMTitle';
import { RolesProvider } from './context/roleContext';
import Form from './form/Form';

export const CreateRole = () => {
  return (
    <RolesProvider>
      <MMContainer maxWidth="xxl">
        <MMBox className="admin-box-container">
          <div className="admin-title-container">
            <MMTitle content="Crear Rol" />
          </div>
          <div>
            <Form type="create" />
          </div>
        </MMBox>
      </MMContainer>
    </RolesProvider>
  );
};

export default CreateRole;
