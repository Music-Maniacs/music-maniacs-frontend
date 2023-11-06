import { FaUser, FaUserShield, FaUserTie } from 'react-icons/fa';
import { styled } from 'styled-components';
import { MMBox } from '../../components/MMBox/MMBox';
import { MMContainer } from '../../components/MMContainer/MMContainer';
import { MMTitle } from '../../components/MMTitle/MMTitle';
import { MMVerticalNav } from '../../components/MMVerticalNav/MMVerticalNav';
import { FAQ } from './frequentQuestions/FAQ';
import './HelpCenter.scss';
import { ModeratorManual } from './ModeratorManual';
import breakpoints from '../../styles/_breakpoints.scss';

const DownloadAdminManual = styled.a`
  all: unset;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  align-self: stretch;
  border-radius: 10px;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--text_color);

  &:hover {
  }

  @media screen and (max-width: ${breakpoints.md}) {
    align-self: center;
    span {
      display: none;
    }
  }
`;

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
              customTemplate: (
                <DownloadAdminManual
                  href={require('../../assets/pdfs/ManualAdmin.pdf')}
                  download="ManualAdministrador"
                  target="_blank"
                  rel="noreferrer"
                  key="download-tab"
                >
                  <FaUserTie />
                  <span>Manual Administrador</span>
                </DownloadAdminManual>
              )
            }
          ]}
          Content={[<FAQ />, <ModeratorManual />]}
        />
      </MMBox>
    </MMContainer>
  );
};
export default HelpCenter;
