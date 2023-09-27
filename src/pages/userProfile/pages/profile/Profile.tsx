import { Grid } from '@mui/material';
import './profile.scss';
import { useUser } from '../../context/userContext';

export const Profile = () => {
  const { userProfile } = useUser();

  return (
    <Grid container direction={'column'} className="user-profile-page-container">
      {/* User cover image */}
      <Grid item className="user-profile-cover">
        <img src="https://picsum.photos/600/400" />
      </Grid>
      {/* <Grid container>
        <Grid item xs={12} sm={3}>
          <MMSubTitle content="Enlaces" />

          {user?.links && (
            <ul style={{ marginTop: '3px' }}>
              {user?.links.map((link) => (
                <li key={link.id}>{`${link.title}: ${link.url}`}</li>
              ))}
            </ul>
          )}
        </Grid>
      </Grid> */}
    </Grid>
  );
};
