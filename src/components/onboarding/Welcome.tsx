import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

interface WelcomeProps {
  onNext: () => void;
  onSkip?: () => void;
}

export function Welcome({ onNext, onSkip }: WelcomeProps) {
  return (
    <div className="min-h-screen bg-gradient-warm flex flex-col items-center justify-center p-6 text-center">
      <div className="animate-fade-in-up space-y-8 max-w-sm">
        <div className="space-y-4">
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto animate-float">
            <Heart className="w-10 h-10 text-white" fill="currentColor" />
          </div>
          
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-white font-nunito">
              NurtureNest
            </h1>
            <p className="text-white/90 text-lg font-medium">
              Because every tiny moment matters
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <p className="text-white/80 leading-relaxed">
            Track your child's growth, capture precious memories, and get personalized guidance for every stage of your parenting journey.
          </p>

          <div className="space-y-3">
            <Button 
              onClick={onNext}
              size="lg"
              className="w-full bg-white text-primary hover:bg-white/90 font-semibold py-4 rounded-xl"
            >
              Get Started
            </Button>
            
            {onSkip && (
              <Button 
                onClick={onSkip}
                variant="ghost"
                className="w-full text-white/70 hover:text-white hover:bg-white/10"
              >
                Skip Setup
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}