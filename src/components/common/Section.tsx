import styled from 'styled-components';

const Section = styled.section<{ dark?: boolean }>`
  min-height: 60vh;
  padding: 80px 0 60px 0;
  background: ${({ dark }) => (dark ? '#f0f4f8' : '#fff')};
  color: #003d82;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  scroll-margin-top: 70px;
`;
export default Section;
