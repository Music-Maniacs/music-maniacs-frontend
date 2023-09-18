import { Grid, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import { FaArrowLeft, FaEdit, FaTrash } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import { InputText } from '../../../../components/form/InputText/InputText';
import { PermissionListInput } from '../../../../components/form/PermissionListInput/PermissionListInput';
import { useModal } from '../../../../components/hooks/useModal';
import { MMBox } from '../../../../components/MMBox/MMBox';
import { MMButtonResponsive } from '../../../../components/MMButton/MMButtonResponsive';
import { MMContainer } from '../../../../components/MMContainer/MMContainer';
import { MMTitle } from '../../../../components/MMTitle/MMTitle';
import { MMModal } from '../../../../components/Modal/MMModal';
import { errorSnackbar } from '../../../../components/Snackbar/Snackbar';
import { useCollection } from '../../../../context/collectionContext';
import { TrustLevel } from '../../../../models/TrustLevel';
import { adminGetTrustLevel } from '../../../../services/trustLevelService';
import Form from '../form/Form';
import { useTrustLevelRequests } from '../hooks/useTrustLevelRequest';
import { Loader } from '../../../../components/Loader/Loader';
import './Show.scss';
import '../../Admin.scss';
<<<<<<< Updated upstream

=======
>>>>>>> Stashed changes
export const Show = () => {
  const { id } = useParams();
  const [trustLevel, setTrustLevel] = useState<TrustLevel>();
  const navigate = useNavigate();
  const { handleDeleteTrustLevel } = useTrustLevelRequests();
  const { openModal, isModalOpen, closeModal } = useModal();
  const [isLoading, setIsLoading] = useState(true);
  const { removeRoleInCollection } = useCollection();

  useEffect(() => {
    getTrustLevel();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getTrustLevel = async () => {
    if (!id) return;

    try {
      const trustLevel = await adminGetTrustLevel(id);
      setTrustLevel(trustLevel);
      setIsLoading(false);
    } catch (error) {
      errorSnackbar('Error al obtener el nivel de confianza. Contacte a soporte.');
      navigate(-1);
    }
  };

  const handleDeleteButton = (trustLevelId?: string) => {
    if (!trustLevelId) return;
    handleDeleteTrustLevel(trustLevelId, () => {
      removeRoleInCollection(trustLevelId);
      navigate(-1);
    });
  };

  return (
    <MMContainer maxWidth="xxl">
      <MMBox className="admin-box-container">
        <div className="admin-title-container">
          <MMTitle content="Nivel de Confianza" />
          <Stack direction={'row'} spacing={1} justifyContent={'flex-end'}>
            <MMButtonResponsive Icon={FaEdit} onClick={() => openModal()}>
              Editar
            </MMButtonResponsive>
            <MMButtonResponsive Icon={FaTrash} color="error" onClick={() => handleDeleteButton(trustLevel?.id)}>
              Eliminar
            </MMButtonResponsive>
            <MMButtonResponsive Icon={FaArrowLeft} onClick={() => navigate(-1)}>
              Volver
            </MMButtonResponsive>
          </Stack>
        </div>

        {isLoading ? (
          <Loader />
        ) : (
          <>
            {' '}
            {trustLevel && (
              <div className="trust-level-show-container">
                <Grid container spacing={{ lg: 3, sm: 1 }} rowSpacing={1}>
                  <Grid item lg={4} sm={6} xs={12}>
                    <InputText label="Nombre" name="name" readOnly={true} type="text" value={trustLevel.name} />
                  </Grid>
                  <Grid item lg={4} sm={6} xs={12}>
                    <InputText label="Orden" name="order" readOnly={true} type="number" value={trustLevel.order} />
                  </Grid>
                  <Grid item container spacing={1} lg={4} sm={12} xs={12} rowSpacing={1}>
                    <Grid item lg={6} sm={6} xs={12}>
                      <InputText
                        label="Creado El"
                        name="created_at"
                        value={trustLevel.created_at}
                        type="text"
                        readOnly={true}
                      />
                    </Grid>
                    <Grid item lg={6} sm={6} xs={12}>
                      <InputText
                        label="Actualizado El"
                        name="updated_at"
                        value={trustLevel.updated_at}
                        type="text"
                        readOnly={true}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <h2>Requisitos</h2>
                <Grid container spacing={{ lg: 2, sm: 1 }} rowSpacing={1}>
                  <Grid item xl={4} sm={6} xs={12}>
                    <InputText
                      label="Dias Visitados"
                      name="days_visited"
                      value={trustLevel.days_visited}
                      type="number"
                      readOnly={true}
                    />
                  </Grid>
                  <Grid item xl={4} sm={6} xs={12}>
                    <InputText
                      label="Eventos Consultados"
                      name="viewed_events"
                      value={trustLevel.viewed_events}
                      type="number"
                      readOnly={true}
                    />
                  </Grid>
                  <Grid item xl={4} sm={6} xs={12}>
                    <InputText
                      label="Respuestas Creadas"
                      name="comments_count"
                      value={trustLevel.comments_count}
                      type="number"
                      readOnly={true}
                    />
                  </Grid>
                  <Grid item xl={4} sm={6} xs={12}>
                    <InputText
                      label="Me Gusta Recibidos"
                      name="likes_received"
                      value={trustLevel.likes_received}
                      type="number"
                      readOnly={true}
                    />
                  </Grid>
                  <Grid item xl={4} sm={6} xs={12}>
                    <InputText
                      label="Me Gusta Dados"
                      name="likes_given"
                      value={trustLevel.likes_given}
                      type="number"
                      readOnly={true}
                    />
                  </Grid>
                </Grid>
                <PermissionListInput disabled={true} selectedPermissions={trustLevel.permission_ids} />
              </div>
            )}
            <MMModal isModalOpen={isModalOpen} closeModal={closeModal} maxWidth="md" title="Editar Rol">
              <Form type="update" closeFormModal={closeModal} trustLevel={trustLevel} setTrustLevel={setTrustLevel} />
            </MMModal>
          </>
        )}
      </MMBox>
    </MMContainer>
  );
};

export default Show;
