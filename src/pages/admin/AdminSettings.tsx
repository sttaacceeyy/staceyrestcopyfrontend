import React, { useState } from 'react';
import styled from 'styled-components';

const AdminContainer = styled.div`
  max-width: 1100px;
  margin: 40px auto;
  background: #f8fbff;
  border-radius: 16px;
  box-shadow: 0 2px 16px rgba(0,102,204,0.10);
  padding: 32px 40px 40px 40px;
  min-height: 60vh;
  color: #003d82;

  @media (max-width: 700px) {
    padding: 16px 4px 24px 4px;
    margin: 12px 0;
    border-radius: 8px;
    min-width: 0;
  }
`;

const Title = styled.h1`
  color: #0066cc;
  font-size: 2.2rem;
  margin-bottom: 24px;
`;

const Desc = styled.p`
  font-size: 1.1rem;
  margin-bottom: 32px;
`;

const Button = styled.button`
  background: #0066cc;
  color: #fff;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  transition: background 0.3s;

  &:hover {
    background: #0052a3;
  }

  @media (max-width: 700px) {
    padding: 8px 12px;
    font-size: 0.95rem;
  }
`;

const AdminSettings: React.FC = () => {
  const [language, setLanguage] = useState(() => localStorage.getItem('setting_language') || 'en');
  const [currency, setCurrency] = useState(() => localStorage.getItem('setting_currency') || 'GBP');
  const [timeFormat, setTimeFormat] = useState(() => localStorage.getItem('setting_timeFormat') || '24hr');
  const [passwordPolicy, setPasswordPolicy] = useState(() => localStorage.getItem('setting_passwordPolicy') || 'Minimum 8 chars, 1 number');
  const [twoFA, setTwoFA] = useState(() => localStorage.getItem('setting_twoFA') === 'true');
  const [jwtExpiry, setJwtExpiry] = useState(() => Number(localStorage.getItem('setting_jwtExpiry')) || 60);
  const [ipWhitelist, setIpWhitelist] = useState(() => localStorage.getItem('setting_ipWhitelist') || '');
  const [ipBlacklist, setIpBlacklist] = useState(() => localStorage.getItem('setting_ipBlacklist') || '');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    localStorage.setItem('setting_language', language);
    localStorage.setItem('setting_currency', currency);
    localStorage.setItem('setting_timeFormat', timeFormat);
    localStorage.setItem('setting_passwordPolicy', passwordPolicy);
    localStorage.setItem('setting_twoFA', twoFA ? 'true' : 'false');
    localStorage.setItem('setting_jwtExpiry', jwtExpiry.toString());
    localStorage.setItem('setting_ipWhitelist', ipWhitelist);
    localStorage.setItem('setting_ipBlacklist', ipBlacklist);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <AdminContainer>
      <Title>System Settings</Title>
      <Desc>Configure system-wide settings here.</Desc>
      <form style={{display:'flex',flexDirection:'column',gap:24,maxWidth:500}}>
        <div>
          <label style={{fontWeight:600}}>Language/Localization:</label><br/>
          <select value={language} onChange={e => setLanguage(e.target.value)} style={{padding:8,borderRadius:6,width:'100%'}}>
            <option value="en">English</option>
            <option value="fr">French</option>
            <option value="es">Spanish</option>
            <option value="ar">Arabic</option>
          </select>
        </div>
        <div>
          <label style={{fontWeight:600}}>Default Currency:</label><br/>
          <select value={currency} onChange={e => setCurrency(e.target.value)} style={{padding:8,borderRadius:6,width:'100%'}}>
            <option value="GBP">GBP (£)</option>
            <option value="USD">USD ($)</option>
            <option value="EUR">EUR (€)</option>
            <option value="AED">AED (د.إ)</option>
          </select>
        </div>
        <div>
          <label style={{fontWeight:600}}>Date/Time Format:</label><br/>
          <select value={timeFormat} onChange={e => setTimeFormat(e.target.value)} style={{padding:8,borderRadius:6,width:'100%'}}>
            <option value="24hr">24-hour clock</option>
            <option value="12hr">12-hour clock (AM/PM)</option>
          </select>
        </div>
        <div>
          <label style={{fontWeight:600}}>Password Policy:</label><br/>
          <input type="text" value={passwordPolicy} onChange={e => setPasswordPolicy(e.target.value)} style={{padding:8,borderRadius:6,width:'100%'}} />
        </div>
        <div>
          <label style={{fontWeight:600}}>Enable Two-Factor Authentication (2FA):</label><br/>
          <input type="checkbox" checked={twoFA} onChange={e => setTwoFA(e.target.checked)} /> Enable 2FA
        </div>
        <div>
          <label style={{fontWeight:600}}>JWT Expiration Time (minutes):</label><br/>
          <input type="number" min={5} max={1440} value={jwtExpiry} onChange={e => setJwtExpiry(Number(e.target.value))} style={{padding:8,borderRadius:6,width:'100%'}} />
        </div>
        <div>
          <label style={{fontWeight:600}}>IP Whitelist (comma separated):</label><br/>
          <input type="text" value={ipWhitelist} onChange={e => setIpWhitelist(e.target.value)} style={{padding:8,borderRadius:6,width:'100%'}} />
        </div>
        <div>
          <label style={{fontWeight:600}}>IP Blacklist (comma separated):</label><br/>
          <input type="text" value={ipBlacklist} onChange={e => setIpBlacklist(e.target.value)} style={{padding:8,borderRadius:6,width:'100%'}} />
        </div>
        <Button type="button" style={{marginTop:16}} onClick={handleSave}>Save Settings</Button>
        {saved && <div style={{color:'#2e7d32',marginTop:8,fontWeight:600}}>Settings saved!</div>}
      </form>
    </AdminContainer>
  );
};

export default AdminSettings;
