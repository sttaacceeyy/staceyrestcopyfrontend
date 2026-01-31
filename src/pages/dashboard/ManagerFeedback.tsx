import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { FeedbackContext } from '../../context/FeedbackContext';

interface ManagerFeedbackProps {
  allBranches?: boolean;
}

const Card = styled.div`
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
  padding: 32px;
  max-width: 900px;
  margin: 32px auto;
  @media (max-width: 700px) {
    padding: 14px 2px 14px 2px;
    max-width: 98vw;
    margin: 10px 0;
    border-radius: 8px;
  }
`;
const Review = styled.div`
  background: #f8fbff;
  border-radius: 8px;
  margin-bottom: 18px;
  padding: 18px 24px;
  color: #003d82;
  @media (max-width: 700px) {
    padding: 10px 6px;
    font-size: 0.97em;
  }
`;
const Button = styled.button`
  background: #0066cc;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 8px 18px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  margin-top: 8px;
  margin-right: 12px;
  transition: background 0.2s;
  &:hover {
    background: #4da6ff;
    color: #fff;
  }
  @media (max-width: 700px) {
    padding: 7px 10px;
    font-size: 0.97em;
    margin-right: 6px;
  }
`;

const mockFeedbacksByBranch = [
  {
    branch: 'Downtown',
    feedbacks: [
      { customer: 'John Doe', rating: 5, comment: 'Great food!', responded: false },
      { customer: 'Jane Smith', rating: 4, comment: 'Quick service.', responded: true, reply: 'Thank you!' },
    ],
  },
  {
    branch: 'Uptown',
    feedbacks: [
      { customer: 'Carlos Lee', rating: 3, comment: 'A bit slow.', responded: false },
    ],
  },
];

const ManagerFeedback: React.FC<ManagerFeedbackProps> = ({ allBranches }) => {
  const { feedbacks, respondToFeedback } = useContext(FeedbackContext);
  const [replyMsg, setReplyMsg] = useState<string[]>(Array(feedbacks.length).fill(''));
  const [confirmation, setConfirmation] = useState<string | null>(null);

  const handleRespond = (idx: number) => {
    if (!replyMsg[idx].trim()) {
      setConfirmation('Please enter a reply message.');
      return;
    }
    respondToFeedback(idx, replyMsg[idx]);
    setConfirmation('Response sent to customer!');
    setReplyMsg(msgs => msgs.map((m, i) => i === idx ? '' : m));
    setTimeout(() => setConfirmation(null), 2000);
  };

  if (allBranches) {
    return (
      <Card>
        <h2 style={{ color: '#003d82', marginBottom: 24 }}>Customer Feedback (All Branches)</h2>
        {mockFeedbacksByBranch.map((branchData, idx) => (
          <div key={idx} style={{marginBottom:32}}>
            <h3 style={{color:'#0066cc',marginBottom:8}}>{branchData.branch} Branch</h3>
            {branchData.feedbacks.map((r, i) => (
              <Review key={i}>
                <b>{r.customer}</b> ({r.rating}/5): {r.comment}
                <div>
                  {r.responded ? (
                    <span style={{ color: '#2e7d32', fontWeight: 600 }}>Responded{r.reply ? `: ${r.reply}` : ''}</span>
                  ) : (
                    <span style={{ color: '#0066cc', fontWeight: 600 }}>No response yet</span>
                  )}
                </div>
              </Review>
            ))}
          </div>
        ))}
      </Card>
    );
  }

  return (
    <Card>
      <h2 style={{ color: '#003d82', marginBottom: 24 }}>Customer Feedback</h2>
      {confirmation && <div style={{color:'#2e7d32',fontWeight:600,marginBottom:16}}>{confirmation}</div>}
      {feedbacks.map((r, i) => (
        <Review key={i}>
          <b>{r.customer}</b> ({r.rating}/5): {r.comment}
          <div>
            {r.responded ? (
              <span style={{ color: '#2e7d32', fontWeight: 600 }}>Responded{r.reply ? `: ${r.reply}` : ''}</span>
            ) : (
              <div style={{display:'flex',alignItems:'center',gap:8,marginTop:8}}>
                <input
                  type="text"
                  placeholder="Write a reply..."
                  value={replyMsg[i]}
                  onChange={e => setReplyMsg(msgs => msgs.map((m, idx) => idx === i ? e.target.value : m))}
                  style={{flex:1,padding:'8px',borderRadius:6,border:'1px solid #ccc'}}
                />
                <Button onClick={() => handleRespond(i)}>Send</Button>
              </div>
            )}
          </div>
        </Review>
      ))}
    </Card>
  );
};

export default ManagerFeedback;
