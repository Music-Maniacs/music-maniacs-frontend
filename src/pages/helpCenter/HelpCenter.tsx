import { FaUser, FaUserShield, FaUserTie } from 'react-icons/fa';
import { MMBox } from '../../components/MMBox/MMBox';
import { MMContainer } from '../../components/MMContainer/MMContainer';
import { MMTitle } from '../../components/MMTitle/MMTitle';
import { MMVerticalNav } from '../../components/MMVerticalNav/MMVerticalNav';
import { FAQ } from './frequentQuestions/FAQ';
import './HelpCenter.scss';
import { ModeratorManual } from './ModeratorManual';

const HelpCenter = () => {
  return (
    <MMContainer maxWidth="xxl">
      <MMBox className="help-center-container">
        <MMTitle content="Centro de Ayuda" />
        <MMVerticalNav
          Tabs={[
            {
              href: '#faq',
              Icon: FaUser,
              label: 'Preguntas Frequentes'
            },
            {
              href: '#mod',
              Icon: FaUserShield,
              label: 'Manual Moderador'
            },
            {
              href: '#adm',
              Icon: FaUserTie,
              label: 'Manual Administrador'
            }
          ]}
          Content={[<FAQ />, <ModeratorManual />]}
        />
      </MMBox>
    </MMContainer>
  );
};
export default HelpCenter;
