import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Heart } from "lucide-react";

interface ChildNameProps {
  parentType: 'mom' | 'dad' | 'other';
  stage: 'expecting' | 'newborn' | 'infant' | 'toddler';
  onComplete: (childName?: string) => void;
  onBack: () => void;
  onSkip?: () => void;
}

export function ChildName({ parentType, stage, onComplete, onBack, onSkip }: ChildNameProps) {
  const [childName, setChildName] = useState("");

  const isExpecting = stage === 'expecting';
  const getPlaceholder = () => {
    if (isExpecting) return "Baby's name (optional)";
    return "Your child's name";
  };

  const getTitle = () => {
    if (isExpecting) return "What will you call your little one?";
    return "What's your child's name?";
  };

  const getSubtitle = () => {
    if (isExpecting) return "You can always update this later";
    return "We'll use this to personalize your experience";
  };

  return (
    <div className="min-h-screen bg-background flex flex-col p-6">
      <div className="flex-1 flex flex-col justify-center max-w-sm mx-auto w-full">
        <div className="text-center mb-12 animate-fade-in">
          <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6">
            <Heart className="w-8 h-8 text-white" fill="currentColor" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2 font-nunito">
            {getTitle()}
          </h1>
          <p className="text-muted-foreground">
            {getSubtitle()}
          </p>
        </div>

        <Card className="p-6 animate-fade-in-up">
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="childName" className="text-base font-medium">
                {isExpecting ? "Baby's Name" : "Child's Name"}
              </Label>
              <Input
                id="childName"
                type="text"
                placeholder={getPlaceholder()}
                value={childName}
                onChange={(e) => setChildName(e.target.value)}
                className="text-lg py-3 px-4 rounded-xl border-2 focus:border-primary"
                autoFocus
              />
            </div>

            <div className="space-y-3">
              <Button 
                onClick={() => onComplete(childName || undefined)}
                disabled={!isExpecting && !childName.trim()}
                size="lg"
                className="w-full font-semibold py-4 rounded-xl"
              >
                {childName.trim() ? "Continue" : "Skip for now"}
              </Button>

              {!isExpecting && (
                <Button 
                  variant="ghost" 
                  onClick={() => onComplete()}
                  className="w-full text-muted-foreground"
                >
                  Skip for now
                </Button>
              )}
            </div>
          </div>
        </Card>

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