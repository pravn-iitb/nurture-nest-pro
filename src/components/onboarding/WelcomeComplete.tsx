import { Button } from "@/components/ui/button";
import { Heart, Sparkles } from "lucide-react";

interface WelcomeCompleteProps {
  parentType: 'mom' | 'dad' | 'other';
  childName?: string;
  onComplete: () => void;
}

export function WelcomeComplete({ parentType, childName, onComplete }: WelcomeCompleteProps) {
  const getGreeting = () => {
    const time = new Date().getHours();
    if (time < 12) return "Good morning";
    if (time < 17) return "Good afternoon";
    return "Good evening";
  };

  const getName = () => {
    if (parentType === 'mom') return "Mom";
    if (parentType === 'dad') return "Dad";
    return "Parent";
  };

  return (
    <div className="min-h-screen bg-gradient-cool flex flex-col items-center justify-center p-6 text-center">
      <div className="animate-fade-in-up space-y-8 max-w-sm">
        <div className="space-y-6">
          <div className="relative">
            <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto animate-float">
              <Heart className="w-12 h-12 text-white" fill="currentColor" />
            </div>
            <Sparkles className="w-6 h-6 text-white/80 absolute -top-2 -right-2 animate-pulse" />
          </div>
          
          <div className="space-y-3">
            <h1 className="text-3xl font-bold text-white font-nunito">
              {getGreeting()}!
            </h1>
            <div className="text-white/90 text-lg space-y-1">
              <p>Welcome to NurtureNest,</p>
              <p className="font-semibold">
                {childName ? `${childName}'s ${getName()}` : getName()}! 🌟
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 space-y-3">
            <p className="text-white/90 leading-relaxed">
              Your personalized parenting journey starts now. We're here to help you track milestones, capture memories, and provide guidance every step of the way.
            </p>
          </div>

          <Button 
            onClick={onComplete}
            size="lg"
            className="w-full bg-white text-primary hover:bg-white/90 font-semibold py-4 rounded-xl"
          >
            Start Your Journey
          </Button>
        </div>
      </div>
    </div>
  );
}