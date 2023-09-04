import { TrustLevelsProvider } from './context/trustLevelContext';
import { Index } from './Index';

export const TrustLevelsContainer = () => {
  return (
    <TrustLevelsProvider>
      <Index />
    </TrustLevelsProvider>
  );
};

export default TrustLevelsContainer;
