import React from 'react';
import Section from './common/Section';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const AboutText = styled(motion.div)`
  max-width: 600px;
  text-align: center;
  font-size: 1.2rem;
  color: #e0e0e0;
  line-height: 1.7;
`;
const Accent = styled.span`
  color: #4da6ff;
  font-weight: 600;
`;

const About: React.FC = () => (
  <Section id="about" aria-label="About Steakz">
    <AboutText
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      Welcome to <Accent>Steakz</Accent>, where culinary artistry meets modern elegance. Our chefs craft the finest steaks and seasonal dishes in a warm, sophisticated setting. Whether it's a special occasion or a casual night out, <Accent>Steakz</Accent> promises an unforgettable dining experience.
    </AboutText>
  </Section>
);

export default About;
