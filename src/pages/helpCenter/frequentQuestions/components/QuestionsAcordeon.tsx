import { useState } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { styled } from 'styled-components';
import { questionList } from './questionList';

const QuestionContainer = styled.div`
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
const QuestionTitle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
`;

const Question = styled.span`
  flex-grow: 1;
  font-weight: bold;
  margin-left: 20px;
  font-size: larger;
  letter-spacing: 1px;
  text-indent: 0;
  text-align: justify;
  text-justify: inter-word;
`;

const AnswerContainer = styled.div`
  padding-right: 35px;
`;

export type QuestionDropdownProps = {
  question: string;
  Answer: JSX.Element;
};
const QuestionDropdown = ({ question, Answer }: QuestionDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => {
    if (!isOpen) {
      setIsOpen(true);
    }
  };
  return (
    <QuestionContainer onClick={handleOpen}>
      <QuestionTitle onClick={() => setIsOpen(!isOpen)}>
        <Question>{question}</Question>
        {isOpen ? <IoIosArrowUp size={30} /> : <IoIosArrowDown size={30} />}
      </QuestionTitle>
      {isOpen ? <AnswerContainer>{Answer}</AnswerContainer> : <></>}
    </QuestionContainer>
  );
};

const QuestionsAcordeonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;
export const QuestionsAcordeon = () => {
  return (
    <QuestionsAcordeonContainer>
      {questionList.map((q, index) => {
        return <QuestionDropdown {...q} key={index} />;
      })}
    </QuestionsAcordeonContainer>
  );
};
