export interface OnboardingSlideData {
  id: number;
  title: string;
  subtitle?: string;
  description: string;
  image: string;
  buttonText: string;
  isLast?: boolean;
}

export interface OnboardingProps {
  onComplete: () => void;
  onSkip?: () => void;
}

export interface OnboardingSlideProps {
  slide: OnboardingSlideData;
  isActive: boolean;
  onNext: () => void;
  onSkip?: () => void;
  currentIndex: number;
  totalSlides: number;
}
