import React from 'react';
import './WineQuestion.css';
import { IQuestion } from '../../types';

interface Props {
  question: IQuestion
}
export const WineQuestion: React.FC<Props> = ({ question }) => {

  return (
    <div>
      <h1 className="wine-question">{question.question}</h1>
    </div>
  );
}

