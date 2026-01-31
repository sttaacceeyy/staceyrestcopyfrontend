import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #fff;
  color: #003d82;
  padding: 60px 20px 40px 20px;
`;
const Title = styled.h1`
  color: #0066cc;
  font-size: 2.2rem;
  margin-bottom: 18px;
`;
const Text = styled.p`
  font-size: 1.2rem;
  text-align: center;
`;

const ReservationConfirmation: React.FC = () => (
  <Wrapper>
    <Title>Reservation Confirmed!</Title>
    <Text>
      Thank you for reserving a table at Steakz.<br />
      We look forward to serving you!<br />
      A confirmation email has been sent to you.
    </Text>
  </Wrapper>
);

export default ReservationConfirmation;
