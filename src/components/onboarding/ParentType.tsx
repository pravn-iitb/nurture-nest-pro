import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { User, Users, Heart } from "lucide-react";

interface ParentTypeProps {
  onSelect: (type: 'mom' | 'dad' | 'other') => void;
}

const parentTypes = [
  { id: 'mom' as const, label: 'Mom', icon: Heart, gradient: 'bg-gradient-accent' },
  { id: 'dad' as const, label: 'Dad', icon: User, gradient: 'bg-gradient-primary' },
  { id: 'other' as const, label: 'Other', icon: Users, gradient: 'bg-gradient-secondary' },
];

export function ParentType({ onSelect }: ParentTypeProps) {
  return (
    <div className="min-h-screen bg-background flex flex-col p-6">
      <div className="flex-1 flex flex-col justify-center max-w-sm mx-auto w-full">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-2xl font-bold text-foreground mb-2 font-nunito">
            Who are you?
          </h1>
          <p className="text-muted-foreground">
            Help us personalize your experience
          </p>
        </div>

        <div className="space-y-4 animate-fade-in-up">
          {parentTypes.map((type) => {
            const Icon = type.icon;
            return (
              <Card
                key={type.id}
                className="p-6 cursor-pointer hover:shadow-colored transition-all duration-200 hover:scale-105 border-2 hover:border-primary/20"
                onClick={() => onSelect(type.id)}
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 ${type.gradient} rounded-xl flex items-center justify-center`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-lg font-semibold text-foreground font-nunito">
                    {type.label}
                  </span>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}