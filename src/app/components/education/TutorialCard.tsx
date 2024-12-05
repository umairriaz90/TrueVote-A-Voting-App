'use client';

import React from 'react';
import { TutorialCardProps } from '@/app/types/interfaces';

const TutorialCard: React.FC<TutorialCardProps> = ({
  title,
  description,
  icon: Icon,
  duration,
  link
}) => {
  return (
    <div className="tutorial-card">
      <Icon />
      <h3>{title}</h3>
      <p>{description}</p>
      <span>{duration}</span>
      <a href={link}>Learn More</a>
    </div>
  );
};

export default TutorialCard;
