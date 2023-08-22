import React, { useEffect } from 'react';
import { Tooltip } from 'react-tooltip';
import { useNavigate, useParams } from 'react-router-dom';
import { Stack } from '@mui/material';
import { GenreInfo } from './GenreInfo';
import { Form } from './Form';
import { Genre, stateColors, stateNames } from '../../../../models/Genre';
import { useModal } from '../../../../components/hooks/useModal';
import { errorSnackbar, warningSnackbar } from '../../../../components/Snackbar/Snackbar';
import { adminGetUser } from '../../../../services/userService';
import { sweetAlert } from '../../../../components/SweetAlert/sweetAlert';
import { MMContainer } from '../../../../components/MMContainer/MMContainer';
import { MMBox } from '../../../../components/MMBox/MMBox';
import { MMTitle } from '../../../../components/MMTitle/MMTitle';
import { MMButton } from '../../../../components/MMButton/MMButton';
import { MMModal } from '../../../../components/Modal/MMModal';
import { Loader } from '../../../../components/Loader/Loader';
import '../../Admin.scss';
import { useGenreRequests } from '../hooks/useGenreRequests';
import colors from '../../../../styles/_colors.scss';
import { MMColors } from '../../../../models/Generic';
import { MMChip } from '../../../../components/MMChip/MMChip';


export default function Show() {
  const { id, name } = useParams();
  const navigate = useNavigate();
  const [genre, setGenre] = React.useState<Genre>();
  const { isModalOpen, openModal, closeModal } = useModal();
  const { handleDeleteGenre } = useGenreRequests();

  useEffect(() => {
    setGenre({
      id: id ? id:'',
      name: name ? name:'',
      created_at: '',
      updated_at: ''
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDeleteButton = () => {
    if (!id) return;
    handleDeleteGenre(id, () => {
      navigate(-1);
    });
  };

  return (
    <MMContainer maxWidth="xxl">
      <MMBox className="admin-box-container">
        <div className="admin-title-container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <MMTitle content="Género" />
          </div>

          <Stack direction={'row'} spacing={1}>
            <MMButton onClick={() => openModal()}>Editar</MMButton>
            <MMButton color="error" onClick={() => handleDeleteButton()}>
              Eliminar
            </MMButton>
            <MMButton onClick={() => navigate(-1)}>Volver</MMButton>
          </Stack>
        </div>

        {genre ? (
          <>
            <MMModal title="Editar Usuario" isModalOpen={isModalOpen} closeModal={closeModal}>
              <Form genre={genre} closeFormModal={closeModal} setGenre={setGenre} />
            </MMModal>
            <GenreInfo genre={genre} />
          </>
        ) : (
          <Loader />
        )}
      </MMBox>
      <Tooltip id="tooltip" place="top" />
    </MMContainer>
  );
}
