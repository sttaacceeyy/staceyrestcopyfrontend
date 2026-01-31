import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #fff;
  color: #222;
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

const ContactConfirmation: React.FC = () => (
  <Wrapper>
    <Title>Message Sent!</Title>
    <Text>
      Thank you for contacting Steakz.<br />
      We have received your message and will get back to you soon.
    </Text>
  </Wrapper>
);

export default ContactConfirmation;
