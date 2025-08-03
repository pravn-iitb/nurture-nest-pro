import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Baby, Heart, Smile, Zap } from "lucide-react";

interface ChildStageProps {
  onSelect: (stage: 'expecting' | 'newborn' | 'infant' | 'toddler') => void;
  onBack: () => void;
  onSkip?: () => void;
}

const stages = [
  { 
    id: 'expecting' as const, 
    label: 'Expecting', 
    description: 'Preparing for arrival',
    icon: Heart, 
    gradient: 'bg-gradient-accent',
    ageRange: 'Due soon'
  },
  { 
    id: 'newborn' as const, 
    label: 'Newborn', 
    description: 'First precious weeks',
    icon: Baby, 
    gradient: 'bg-gradient-secondary',
    ageRange: '0-3 months'
  },
  { 
    id: 'infant' as const, 
    label: 'Infant', 
    description: 'Growing and exploring',
    icon: Smile, 
    gradient: 'bg-gradient-primary',
    ageRange: '3-12 months'
  },
  { 
    id: 'toddler' as const, 
    label: 'Toddler', 
    description: 'Walking and talking',
    icon: Zap, 
    gradient: 'bg-gradient-warm',
    ageRange: '1-5 years'
  },
];

export function ChildStage({ onSelect, onBack, onSkip }: ChildStageProps) {
  return (
    <div className="min-h-screen bg-background flex flex-col p-6">
      <div className="flex-1 flex flex-col justify-center max-w-sm mx-auto w-full">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-2xl font-bold text-foreground mb-2 font-nunito">
            What stage are you in?
          </h1>
          <p className="text-muted-foreground">
            We'll customize content for your child's age
          </p>
        </div>

        <div className="space-y-4 animate-fade-in-up">
          {stages.map((stage) => {
            const Icon = stage.icon;
            return (
              <Card
                key={stage.id}
                className="p-6 cursor-pointer hover:shadow-colored transition-all duration-200 hover:scale-105 border-2 hover:border-primary/20"
                onClick={() => onSelect(stage.id)}
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 ${stage.gradient} rounded-xl flex items-center justify-center`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-semibold text-foreground font-nunito">
                        {stage.label}
                      </span>
                      <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-lg">
                        {stage.ageRange}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {stage.description}
                    </p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        <div className="flex flex-col space-y-3 mt-8">
          <Button 
            variant="ghost" 
            onClick={onBack}
            className="mx-auto text-muted-foreground"
          >
            Go Back
          </Button>
          
          {onSkip && (
            <Button 
              variant="ghost" 
              onClick={onSkip}
              className="mx-auto text-muted-foreground"
            >
              Skip Setup
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}