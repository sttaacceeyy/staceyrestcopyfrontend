import React from 'react';

const SteakzLogo: React.FC<{ size?: number }> = ({ size = 44 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 80 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-label="Steakz logo"
    style={{ display: 'block' }}
  >
    <ellipse cx="40" cy="32" rx="36" ry="24" fill="#fff" stroke="#0066cc" strokeWidth="4" />
    <ellipse cx="40" cy="32" rx="26" ry="16" fill="#4da6ff" stroke="#0066cc" strokeWidth="2" />
    <ellipse cx="40" cy="32" rx="18" ry="10" fill="#0066cc" stroke="#fff" strokeWidth="2" />
    <path d="M24 32c0-7 8-13 16-13s16 6 16 13-8 13-16 13-16-6-16-13z" fill="#fff" fillOpacity="0.12" />
    <path d="M40 19v26" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M32 27c2.5 2.5 11.5 2.5 11.5 0" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
    <text x="40" y="60" textAnchor="middle" fontFamily="'Playfair Display', serif" fontSize="18" fill="#0066cc" fontWeight="bold">Steakz</text>
    <text x="40" y="15" textAnchor="middle" fontFamily="'Playfair Display', serif" fontSize="10" fill="#0066cc" fontWeight="bold">EST. 2024</text>
  </svg>
);

export default SteakzLogo;
