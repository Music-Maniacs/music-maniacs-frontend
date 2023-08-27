import { RolesProvider } from './context/roleContext';
import Show from './show/Show';

export const ShowRole = () => {
  return (
    <RolesProvider>
      <Show />
    </RolesProvider>
  );
};

export default ShowRole;
