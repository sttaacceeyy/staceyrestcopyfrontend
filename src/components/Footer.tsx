import React from 'react';
import styled from 'styled-components';

const FooterBar = styled.footer`
  background: #003d82;
  color: #fff;
  padding: 32px 0 16px 0;
  text-align: center;
  font-size: 1rem;
  border-top: 1px solid #0066cc;
`;
const Socials = styled.div`
  margin-bottom: 12px;
`;
const Icon = styled.a`
  display: inline-block;
  margin: 0 10px;
  color: #4da6ff;
  font-size: 1.5rem;
  transition: color 0.2s;
  &:hover, &:focus {
    color: #ff6b6b;
    outline: none;
  }
`;

const Footer: React.FC = () => (
  <FooterBar aria-label="Footer">
    <Socials>
      <Icon href="https://instagram.com" target="_blank" aria-label="Instagram" rel="noopener noreferrer">
        <i className="fab fa-instagram" />
      </Icon>
      <Icon href="https://facebook.com" target="_blank" aria-label="Facebook" rel="noopener noreferrer">
        <i className="fab fa-facebook" />
      </Icon>
      <Icon href="https://twitter.com" target="_blank" aria-label="Twitter" rel="noopener noreferrer">
        <i className="fab fa-twitter" />
      </Icon>
    </Socials>
    <div>© {new Date().getFullYear()} Steakz &mdash; 123 Main St, City &bull; (555) 123-4567</div>
  </FooterBar>
);

export default Footer;
