import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './HeroBanner.module.css';
import type { CSSProperties } from 'react';

const bgStyle: CSSProperties = {
  background: "linear-gradient(120deg, #f0f4f8 0%, #e8f0ff 100%), url('/steakhouse-bg.jpg') center center/cover no-repeat",
  width: "100vw",
  minHeight: "70vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#fff",
  position: "relative" as CSSProperties['position'],
  overflow: "hidden"
};

const HeroBanner: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section
      id="hero"
      style={bgStyle}
    >
      <div className={styles.overlay}>
        <h1 className={styles.title}>Steakz</h1>
        <p className={styles.tagline}>A Cut Above the Rest</p>
        <button
          type="button"
          className={styles.reserveBtn}
          onClick={() => navigate('/reservations')}
          aria-label="Reserve Now"
        >
          Reserve Now
        </button>
      </div>
    </section>
  );
};

export default HeroBanner;
