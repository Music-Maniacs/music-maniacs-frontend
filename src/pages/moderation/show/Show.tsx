import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useReports } from '../context/moderationContext';
import { MMContainer } from '../../../components/MMContainer/MMContainer';
import { Loader } from '../../../components/Loader/Loader';
import { MMBox } from '../../../components/MMBox/MMBox';
import { MMTitle } from '../../../components/MMTitle/MMTitle';
import { StyledFlex } from '../../../styles/styledComponents';
import { MMButton } from '../../../components/MMButton/MMButton';
import '../Moderation.scss';

const Show = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showReport, getShowReport, setShowReport } = useReports();

  useEffect(() => {
    if (!id) return navigate(-1);

    if (!showReport || showReport.id !== id) getShowReport(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <MMContainer maxWidth="xxl">
      <MMBox className="moderation-box-container">
        {showReport ? (
          <>
            <StyledFlex $justifyContent="space-between">
              <MMTitle content="Reporte" />

              <StyledFlex>
                {showReport.status === 'pending' && <MMButton color="tertiary">Resolver</MMButton>}

                <MMButton onClick={() => navigate(-1)}> Volver</MMButton>
              </StyledFlex>
            </StyledFlex>

            <p>{JSON.stringify(showReport)} </p>
          </>
        ) : (
          <Loader />
        )}
      </MMBox>
    </MMContainer>
  );
};

export default Show;
