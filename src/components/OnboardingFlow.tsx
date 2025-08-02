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
  const [childName, setChildName] = useState<string>();
  const { updateUser, completeOnboarding } = useAuth();

  const handleComplete = () => {
    updateUser({
      child: {
        name: childName,
        stage: childStage,
        parentType
      }
    });
    completeOnboarding();
  };

  switch (step) {
    case 'welcome':
      return <Welcome onNext={() => setStep('parent-type')} />;
    case 'parent-type':
      return <ParentType onSelect={(type) => { setParentType(type); setStep('child-stage'); }} />;
    case 'child-stage':
      return <ChildStage onSelect={(stage) => { setChildStage(stage); setStep('child-name'); }} onBack={() => setStep('parent-type')} />;
    case 'child-name':
      return <ChildName parentType={parentType!} stage={childStage!} onComplete={(name) => { setChildName(name); setStep('complete'); }} onBack={() => setStep('child-stage')} />;
    case 'complete':
      return <WelcomeComplete parentType={parentType!} childName={childName} onComplete={handleComplete} />;
    default:
      return <Welcome onNext={() => setStep('parent-type')} />;
  }
}