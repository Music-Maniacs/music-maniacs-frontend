import { styled } from 'styled-components';

export const Title = styled.h1`
  margin: 10px;
  width: 100%;
  text-align: center;
`;
export const SubTitle = styled.h2`
  margin: 10px;
  width: 100%;
`;
export const Paragraph = styled.p`
  margin-left: 20px;
  font-size: large;
  letter-spacing: 1px;
  text-indent: 0;
  text-align: justify;
  text-justify: inter-word;

  ol li {
    padding: 5px 0 0 15px;
    margin: 0 0 0 30px;
  }
  ol {
    list-style-type: decimal;
    list-style-position: outside;
  }
`;