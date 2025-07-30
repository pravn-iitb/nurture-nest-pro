import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Ruler, Weight, Users } from "lucide-react";

interface ChildProfileProps {
  child: {
    name: string;
    age: string;
    birthday: string;
    height: string;
    weight: string;
  };
  onEditProfile: () => void;
  onAddFamily: () => void;
}

export function ChildProfile({ child, onEditProfile, onAddFamily }: ChildProfileProps) {
  return (
    <Card className="p-6 bg-gradient-subtle shadow-soft">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center text-2xl font-bold text-primary-foreground">
            {child.name.charAt(0)}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground">{child.name}</h2>
            <p className="text-muted-foreground">{child.age} old</p>
          </div>
        </div>
        <Button variant="outline" size="icon" onClick={onEditProfile}>
          <Calendar className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center">
          <div className="w-12 h-12 bg-gradient-secondary rounded-xl flex items-center justify-center mx-auto mb-2">
            <Calendar className="h-6 w-6 text-secondary-foreground" />
          </div>
          <p className="text-sm text-muted-foreground">Birthday</p>
          <p className="font-semibold">{child.birthday}</p>
        </div>
        
        <div className="text-center">
          <div className="w-12 h-12 bg-gradient-accent rounded-xl flex items-center justify-center mx-auto mb-2">
            <Ruler className="h-6 w-6 text-accent-foreground" />
          </div>
          <p className="text-sm text-muted-foreground">Height</p>
          <p className="font-semibold">{child.height}</p>
        </div>
        
        <div className="text-center">
          <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto mb-2">
            <Weight className="h-6 w-6 text-primary-foreground" />
          </div>
          <p className="text-sm text-muted-foreground">Weight</p>
          <p className="font-semibold">{child.weight}</p>
        </div>
      </div>
      
      <Button variant="secondary" onClick={onAddFamily} className="w-full">
        <Users className="h-4 w-4 mr-2" />
        Add Family Member
      </Button>
    </Card>
  );
}