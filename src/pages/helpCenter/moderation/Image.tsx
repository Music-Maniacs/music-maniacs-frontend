import { useTheme } from '../../../context/themeContext';
import './ImageContainer.css';

export type Props = {
  name: string;
};

export const Image = ({ name }: Props) => {
  const { theme } = useTheme();
  return (
    <div className="container">
      <img alt="music-maniacs-logo" src={require(`../../../assets/moderator/${theme}/${name}`)} />
    </div>
  );
};
