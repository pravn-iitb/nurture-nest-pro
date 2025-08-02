import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Baby, Calendar, Ruler, Weight, Edit3 } from "lucide-react";
import { useState } from "react";

interface Child {
  name?: string;
  stage?: string;
  birthDate?: string;
  weight?: string;
  height?: string;
  headCircumference?: string;
}

interface ChildInfoCardProps {
  child: Child;
  ageInDays: number;
  onEdit: () => void;
}

export function ChildInfoCard({ child, ageInDays, onEdit }: ChildInfoCardProps) {
  const getAgeDisplay = () => {
    if (ageInDays < 30) {
      return `${ageInDays} days old`;
    } else if (ageInDays < 365) {
      const months = Math.floor(ageInDays / 30);
      return `${months} month${months !== 1 ? 's' : ''} old`;
    } else {
      const years = Math.floor(ageInDays / 365);
      const remainingMonths = Math.floor((ageInDays % 365) / 30);
      return `${years} year${years !== 1 ? 's' : ''} ${remainingMonths > 0 ? `${remainingMonths}m` : ''} old`;
    }
  };

  const getStageEmoji = () => {
    switch (child.stage) {
      case 'expecting': return '🤱';
      case 'newborn': return '👶';
      case 'infant': return '🍼';
      case 'toddler': return '🧒';
      default: return '👶';
    }
  };

  const relevantInfo = () => {
    // Show different info based on age
    if (ageInDays < 30) {
      // Newborn: weight, feeding
      return [
        { icon: Weight, label: "Weight", value: child.weight || "Not set" },
        { icon: Baby, label: "Feeds/day", value: "8-12" }
      ];
    } else if (ageInDays < 365) {
      // Infant: weight, height
      return [
        { icon: Weight, label: "Weight", value: child.weight || "Not set" },
        { icon: Ruler, label: "Height", value: child.height || "Not set" }
      ];
    } else {
      // Toddler: height, weight
      return [
        { icon: Ruler, label: "Height", value: child.height || "Not set" },
        { icon: Weight, label: "Weight", value: child.weight || "Not set" }
      ];
    }
  };

  return (
    <Card className="relative overflow-hidden bg-gradient-primary text-primary-foreground border-0">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="text-3xl">{getStageEmoji()}</div>
            <div>
              <h2 className="text-xl font-bold">{child.name || "Your Little One"}</h2>
              <p className="text-primary-foreground/80 text-sm">{getAgeDisplay()}</p>
            </div>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onEdit}
            className="text-primary-foreground hover:bg-primary-foreground/10"
          >
            <Edit3 className="h-4 w-4" />
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {relevantInfo().map((info, index) => (
            <div key={index} className="flex items-center gap-2">
              <info.icon className="h-4 w-4 text-primary-foreground/60" />
              <div className="text-sm">
                <div className="text-primary-foreground/80">{info.label}</div>
                <div className="font-medium">{info.value}</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}