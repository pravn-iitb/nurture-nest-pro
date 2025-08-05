import { useState } from "react";
import { Welcome } from "./onboarding/Welcome";
import { ParentType } from "./onboarding/ParentType";
import { ChildStage } from "./onboarding/ChildStage";
import { ChildName } from "./onboarding/ChildName";
import { WelcomeComplete } from "./onboarding/WelcomeComplete";
import { useAuth } from "@/contexts/AuthContext";

type OnboardingStep = 'welcome' | 'parent-type' | 'child-stage' | 'child-name' | 'complete';

export function OnboardingFlow() {
  const [step, setStep] = useState<OnboardingStep>('welcome');
  const [parentType, setParentType] = useState<'mom' | 'dad' | 'other'>();
  const [childStage, setChildStage] = useState<'expecting' | 'newborn' | 'infant' | 'toddler'>();
  const [childName, setChildName] = useState<string>('');
  const [canSkip, setCanSkip] = useState(false);
  const { updateUser, completeOnboarding } = useAuth();

  const handleComplete = () => {
    console.log('handleComplete called', { parentType, childStage, childName });
    
    // Calculate initial birth date based on stage
    const birthDate = childStage === 'expecting' 
      ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // Due in 30 days
      : childStage === 'newborn'
      ? new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) // 1 week old
      : childStage === 'infant'
      ? new Date(Date.now() - 180 * 24 * 60 * 60 * 1000) // 6 months old
      : new Date(Date.now() - 730 * 24 * 60 * 60 * 1000); // 2 years old

    const childData = {
      name: childName || 'Little One',
      stage: childStage,
      parentType,
      birthDate: birthDate.toISOString(),
      weight: childStage === 'newborn' ? 3.2 : childStage === 'infant' ? 7.5 : 12.5,
      height: childStage === 'newborn' ? 50 : childStage === 'infant' ? 68 : 85
    };

    console.log('Updating user with child data:', childData);
    
    updateUser({
      child: childData,
      onboardingCompleted: true
    });
    
    console.log('Onboarding should be complete now');
  };

  const handleSkip = () => {
    // Skip with minimal data
    updateUser({
      child: {
        name: 'Little One',
        stage: 'newborn',
        parentType: 'other',
        birthDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        weight: 3.2,
        height: 50
      }
    });
    completeOnboarding();
  };

  switch (step) {
    case 'welcome':
      return <Welcome onNext={() => setStep('parent-type')} onSkip={handleSkip} />;
    case 'parent-type':
      return <ParentType 
        onSelect={(type) => { setParentType(type); setStep('child-stage'); setCanSkip(true); }} 
        onSkip={canSkip ? handleSkip : undefined}
        onBack={() => setStep('welcome')} 
      />;
    case 'child-stage':
      return <ChildStage 
        onSelect={(stage) => { setChildStage(stage); setStep('child-name'); }} 
        onSkip={canSkip ? handleSkip : undefined}
        onBack={() => setStep('parent-type')} 
      />;
    case 'child-name':
      return <ChildName 
        parentType={parentType!} 
        stage={childStage!} 
        onComplete={(name) => { setChildName(name); setStep('complete'); }} 
        onSkip={handleSkip}
        onBack={() => setStep('child-stage')} 
      />;
    case 'complete':
      return <WelcomeComplete parentType={parentType!} childName={childName} onComplete={handleComplete} />;
    default:
      return <Welcome onNext={() => setStep('parent-type')} onSkip={handleSkip} />;
  }
}