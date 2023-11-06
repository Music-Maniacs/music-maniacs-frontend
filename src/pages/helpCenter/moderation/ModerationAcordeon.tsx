import { useState } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { styled } from 'styled-components';
import { moderationList } from './moderationList';

const ModerationContainer = styled.div`
  display: flex;
  padding: 5px;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  border-radius: 5px;
  border: 2px solid var(--highlight);
  box-sizing: border-box;
  width: 100%;
`;
const ModerationTitle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
`;

const Title = styled.span`
  flex-grow: 1;
  font-weight: bold;
  margin-left: 20px;
  font-size: larger;
  letter-spacing: 1px;
  text-indent: 0;
  text-align: justify;
  text-justify: inter-word;
`;

const Body = styled.div`
  padding-right: 35px;
`;

export type PropsModeration = {
  title: string;
  body: JSX.Element;
};

const ModerationDropdown = ({ title, body }: PropsModeration) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const handleOpen = () => {
    if (!isOpen) {
      setIsOpen(true);
    }
  };
  return (
    <ModerationContainer onClick={handleOpen}>
      <ModerationTitle onClick={() => setIsOpen(!isOpen)}>
        <Title>{title}</Title>
        {isOpen ? <IoIosArrowUp size={30} /> : <IoIosArrowDown size={30} />}
      </ModerationTitle>
      {isOpen ? <Body>{body}</Body> : <></>}
    </ModerationContainer>
  );
};

const ModerationAcordeonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const ModerationAcordeon = () => {
  return (
    <ModerationAcordeonContainer>
      {moderationList.map((q) => {
        return <ModerationDropdown {...q} />;
      })}
    </ModerationAcordeonContainer>
  );
};
