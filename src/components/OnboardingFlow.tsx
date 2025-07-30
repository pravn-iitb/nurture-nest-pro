import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { PhoneLogin } from './onboarding/PhoneLogin';
import { OTPVerification } from './onboarding/OTPVerification';
import { ProfileSetup } from './onboarding/ProfileSetup';

type OnboardingStep = 'phone' | 'otp' | 'profile';

export function OnboardingFlow() {
  const [currentStep, setCurrentStep] = useState<OnboardingStep>('phone');
  const [phoneNumber, setPhoneNumber] = useState('');
  const { login, updateUser, completeOnboarding } = useAuth();

  const handlePhoneSubmit = (phone: string) => {
    setPhoneNumber(phone);
    setCurrentStep('otp');
  };

  const handleOTPVerify = async (otp: string) => {
    await login(phoneNumber, otp);
    setCurrentStep('profile');
  };

  const handleProfileComplete = (parentName: string, child: any) => {
    updateUser({ 
      name: parentName,
      child: child
    });
    completeOnboarding();
  };

  const handleBack = () => {
    if (currentStep === 'otp') {
      setCurrentStep('phone');
    }
  };

  switch (currentStep) {
    case 'phone':
      return <PhoneLogin onPhoneSubmit={handlePhoneSubmit} />;
    case 'otp':
      return (
        <OTPVerification 
          phone={phoneNumber} 
          onVerify={handleOTPVerify}
          onBack={handleBack}
        />
      );
    case 'profile':
      return <ProfileSetup onComplete={handleProfileComplete} />;
    default:
      return <PhoneLogin onPhoneSubmit={handlePhoneSubmit} />;
  }
}