import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { AuthContext } from '../context/AuthContext';

const Wrapper = styled.div`
  min-height: 80vh;
  background: #f8fbff;
  color: #003d82;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px 40px 20px;
`;
const Title = styled.h1`
  color: #0066cc;
  font-family: 'Playfair Display', serif;
  font-size: 2.8rem;
  margin-bottom: 24px;
`;
const Text = styled.p`
  max-width: 700px;
  font-size: 1.25rem;
  line-height: 1.7;
  text-align: center;
  margin-bottom: 32px;
`;

const AboutUs: React.FC = () => {
  const { user } = useContext(AuthContext);
  const [companyInfo, setCompanyInfo] = useState({
    description: 'Steakz is dedicated to serving the finest steaks and providing an exceptional dining experience.',
    mission: 'To delight every guest with the best steakhouse experience.',
    vision: 'To be the leading steakhouse brand known for quality, hospitality, and innovation.'
  });
  const [editingInfo, setEditingInfo] = useState(false);
  const [infoDraft, setInfoDraft] = useState(companyInfo);

  const handleEditInfo = () => {
    setInfoDraft(companyInfo);
    setEditingInfo(true);
  };
  const handleSaveInfo = () => {
    setCompanyInfo(infoDraft);
    setEditingInfo(false);
  };
  const handleCancelInfo = () => {
    setEditingInfo(false);
  };

  return (
    <Wrapper>
      <Title>About Steakz</Title>
      {user?.role === 'admin' ? (
        <div style={{width:'100%',maxWidth:700,marginBottom:32}}>
          <h3 style={{color:'#0066cc',marginBottom:8}}>Company Info</h3>
          {editingInfo ? (
            <div style={{background:'#f0f4f8',padding:16,borderRadius:8}}>
              <label style={{display:'block',marginBottom:8}}>
                <b>Description:</b><br/>
                <textarea value={infoDraft.description} onChange={e=>setInfoDraft(f=>({...f,description:e.target.value}))} style={{width:'100%',minHeight:48,marginBottom:8}} />
              </label>
              <label style={{display:'block',marginBottom:8}}>
                <b>Mission:</b><br/>
                <textarea value={infoDraft.mission} onChange={e=>setInfoDraft(f=>({...f,mission:e.target.value}))} style={{width:'100%',minHeight:48,marginBottom:8}} />
              </label>
              <label style={{display:'block',marginBottom:8}}>
                <b>Vision:</b><br/>
                <textarea value={infoDraft.vision} onChange={e=>setInfoDraft(f=>({...f,vision:e.target.value}))} style={{width:'100%',minHeight:48,marginBottom:8}} />
              </label>
              <button onClick={handleSaveInfo} style={{marginRight:8}}>Save</button>
              <button onClick={handleCancelInfo}>Cancel</button>
            </div>
          ) : (
            <div style={{background:'#f0f4f8',padding:16,borderRadius:8}}>
              <div style={{marginBottom:8}}><b>Description:</b> {companyInfo.description}</div>
              <div style={{marginBottom:8}}><b>Mission:</b> {companyInfo.mission}</div>
              <div style={{marginBottom:8}}><b>Vision:</b> {companyInfo.vision}</div>
              <button onClick={handleEditInfo}>Edit</button>
            </div>
          )}
        </div>
      ) : (
        <Text>
          <b>Steakz</b> is a modern steakhouse where culinary artistry meets warm hospitality. Our chefs hand-select the finest cuts and craft each dish with passion, blending classic steakhouse tradition with contemporary flavors. Whether you’re celebrating a special occasion or enjoying a casual night out, Steakz offers an unforgettable dining experience in a stylish, welcoming atmosphere.<br /><br />
          We pride ourselves on exceptional service, a curated wine list, and a menu that highlights the best of seasonal ingredients. From our signature steaks to creative sides and decadent desserts, every meal at Steakz is a celebration of taste and quality.<br /><br />
          Join us and discover why Steakz is the destination for steak lovers and food enthusiasts alike.
        </Text>
      )}
    </Wrapper>
  );
};

export default AboutUs;
