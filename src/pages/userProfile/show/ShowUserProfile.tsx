import { Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { styled } from 'styled-components';
import { Loader } from '../../../components/Loader/Loader';
import { MMBox } from '../../../components/MMBox/MMBox';
import { MMContainer } from '../../../components/MMContainer/MMContainer';
import { MMSubTitle } from '../../../components/MMTitle/MMTitle';
import { ReviewContent } from '../../../components/Reviews/ReviewContent';
import { errorSnackbar } from '../../../components/Snackbar/Snackbar';
import { useAuth } from '../../../context/authContext';
import { Review } from '../../../models/Review';
import { User } from '../../../models/User';
import { getUserProfile } from '../../../services/userProfileService';
import { CoverImage } from '../components/CoverImage';
import { UserInfo } from '../components/UserInfo';
import breakpoints from '../../../styles/_breakpoints.scss';
import { MMLinksGroup } from '../../../components/MMLinkGroup/MMLinksGroup';
const MMBoxPaddding = styled(MMBox)`
  padding: 30px !important;
`;

const ProfileUserData = styled.div`
  padding: 35px 0;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;

  @media screen and (max-width: ${breakpoints.md}) {
    flex-direction: column;
    gap: 2rem;
    padding: 10px 0;
  }
`;

export const ShowUserProfile = () => {
  const [userProfile, setUserProfile] = useState<User>();
  const [reviews, setReviews] = useState<Review[]>();
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (id) {
      if (id === user?.id) navigate('/user/profile');
      fetchUserProfile(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  const fetchUserProfile = async (userId: string) => {
    try {
      const response = await getUserProfile(userId);
      setUserProfile(response.user);
      setReviews(response.reviews);
    } catch (error) {
      errorSnackbar('Error al obtener los datos del perfil');
    }
  };

  return (
    <MMContainer maxWidth="xl">
      {userProfile ? (
        <div style={{ marginTop: '40px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {/* User cover image */}
          {userProfile?.cover_image && (
            <MMBoxPaddding>
              <CoverImage coverImage={userProfile?.cover_image} />
            </MMBoxPaddding>
          )}

          <MMBoxPaddding>
            <Grid item>
              <ProfileUserData>
                <UserInfo
                  fullName={userProfile?.full_name}
                  profileImage={userProfile?.profile_image}
                  username={userProfile?.username}
                  role={userProfile?.role}
                />
                {userProfile?.links && userProfile.links.length > 0 && <MMLinksGroup links={userProfile?.links} />}
              </ProfileUserData>
            </Grid>
          </MMBoxPaddding>
          <MMBoxPaddding>
            <Grid item>
              <div>
                <MMSubTitle content="Biografía" />
                <p>{userProfile?.biography}</p>
              </div>
            </Grid>
            <Grid item>
              <div>
                <MMSubTitle content="Reseñas" />
                <h3>Ultimas Reseñas:</h3>
                <div style={{ paddingLeft: '2rem' }}>
                  {reviews &&
                    reviews.map((review: Review) => (
                      <ReviewContent
                        key={review.id}
                        reviewableName={review.reviewable_name}
                        review={review}
                        canEdit={false}
                      />
                    ))}
                </div>
              </div>
            </Grid>
          </MMBoxPaddding>
        </div>
      ) : (
        <Loader />
      )}
    </MMContainer>
  );
};

export default ShowUserProfile;
