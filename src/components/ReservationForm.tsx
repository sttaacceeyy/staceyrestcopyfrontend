import React from 'react';
import Section from './common/Section';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Form = styled(motion.form)`
  background: #f8fbff;
  border-radius: 16px;
  box-shadow: 0 2px 12px rgba(0,102,204,0.10);
  padding: 32px 24px;
  max-width: 400px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 18px;
`;
const Input = styled.input`
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #b3d9ff;
  background: #fff;
  color: #003d82;
  font-size: 1rem;
`;
const Button = styled(motion.button)`
  background: #0066cc;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  margin-top: 8px;
  transition: background 0.2s;
  &:hover, &:focus {
    background: #4da6ff;
    color: #fff;
    outline: none;
  }
`;

const ReservationForm: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/reservation-confirmation');
  };

  return (
    <Section id="reservations" aria-label="Reservations">
      <h2 style={{ color: '#fff', fontFamily: 'Playfair Display', fontSize: '2.2rem', marginBottom: 32 }}>Reservations</h2>
      <Form
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        onSubmit={handleSubmit}
        aria-label="Reservation Form"
      >
        <Input type="text" placeholder="Name" required aria-label="Name" />
        <Input type="email" placeholder="Email" required aria-label="Email" />
        <Input type="date" required aria-label="Date" />
        <Input type="time" required aria-label="Time" />
        <Input type="number" min={1} max={20} placeholder="Guests" required aria-label="Guests" />
        <Button type="submit" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>Reserve Table</Button>
      </Form>
    </Section>
  );
};

export default ReservationForm;
