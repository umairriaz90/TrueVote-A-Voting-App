import { LucideIcon } from 'lucide-react';

export interface TutorialCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  duration: string;
  link: string;
}

export interface ElectionCardProps {
  title: string;
  date: string;
  status: string;
  description: string;
}

export interface StatCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
}

export interface CandidateProps {
  id: string;
  name: string;
  party: string;
  imageUrl: string;
}

export interface VoteConfirmationProps {
  candidate?: CandidateProps;
  selection?: {
    name: string;
    party?: string;
  };
  onConfirm: () => void;
  onCancel?: () => void;
  onBack?: () => void;
  isSubmitting: boolean;
}

export interface BallotOptionProps {
  id: string;
  name: string;
  party?: string;
  imageUrl?: string;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

export interface WriteInOptionProps {
  onSubmit: (name: string) => void;
  onCancel?: () => void;
  value?: string;
  isSelected?: boolean;
  onChange?: (value: string) => void;
}

export interface VoteHistoryItemProps {
  title: string;
  date: string;
  status: string;
  result: string;
}

export interface VideoGuideProps {
  title: string;
  thumbnail: string;
  duration: string;
  link: string;
}
