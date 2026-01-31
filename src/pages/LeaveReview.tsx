import React, { useState } from 'react';
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
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 18px;
  width: 100%;
  max-width: 400px;
  background: #f7f7f7;
  border-radius: 12px;
  padding: 32px 24px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.07);
`;
const Label = styled.label`
  font-weight: 600;
  color: #0066cc;
`;
const Input = styled.input`
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
`;
const Textarea = styled.textarea`
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
  min-height: 80px;
`;
const Button = styled.button`
  background: #0066cc;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 12px 0;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  margin-top: 10px;
  transition: background 0.2s;
  &:hover {
    background: #0052a3;
    color: #fff;
  }
`;
const Success = styled.div`
  color: #2e7d32;
  font-weight: 600;
  margin-top: 18px;
`;

const LeaveReview: React.FC = () => {
  const [name, setName] = useState('');
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <Wrapper>
      <Title>Leave a Review</Title>
      <Form onSubmit={handleSubmit}>
        <Label htmlFor="name">Your Name</Label>
        <Input id="name" value={name} onChange={e => setName(e.target.value)} required />
        <Label htmlFor="rating">Rating</Label>
        <Input id="rating" type="number" min={1} max={5} value={rating} onChange={e => setRating(Number(e.target.value))} required />
        <Label htmlFor="review">Your Review</Label>
        <Textarea id="review" value={review} onChange={e => setReview(e.target.value)} required />
        <Button type="submit">Submit Review</Button>
        {submitted && <Success>Thank you for your feedback!</Success>}
      </Form>
    </Wrapper>
  );
};

export {};
export default LeaveReview;
