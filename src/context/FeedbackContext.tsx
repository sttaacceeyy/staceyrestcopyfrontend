import React, { createContext, useState, ReactNode } from 'react';

export interface Feedback {
  customer: string;
  rating: number;
  comment: string;
  responded: boolean;
  reply?: string;
}

interface FeedbackContextType {
  feedbacks: Feedback[];
  respondToFeedback: (index: number, reply: string) => void;
}

const initialFeedbacks: Feedback[] = [
  { customer: 'John Doe', rating: 5, comment: 'Great food!', responded: false },
  { customer: 'Jane Smith', rating: 4, comment: 'Quick service.', responded: true, reply: 'Thank you!' },
  { customer: 'Carlos Lee', rating: 3, comment: 'A bit slow.', responded: false },
];

export const FeedbackContext = createContext<FeedbackContextType>({
  feedbacks: [],
  respondToFeedback: () => {},
});

export const FeedbackProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>(() => {
    const stored = localStorage.getItem('feedbacks');
    return stored ? JSON.parse(stored) : initialFeedbacks;
  });

  const respondToFeedback = (index: number, reply: string) => {
    setFeedbacks(prev => {
      const updated = prev.map((f, i) => i === index ? { ...f, responded: true, reply } : f);
      localStorage.setItem('feedbacks', JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <FeedbackContext.Provider value={{ feedbacks, respondToFeedback }}>
      {children}
    </FeedbackContext.Provider>
  );
};
