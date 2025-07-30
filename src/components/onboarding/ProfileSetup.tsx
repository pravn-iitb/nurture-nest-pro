import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { CalendarIcon, User, Baby } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import childPlayingImage from '@/assets/child-playing.jpg';

interface Child {
  name: string;
  birthDate: Date | undefined;
  gender: string;
}

interface ProfileSetupProps {
  onComplete: (parentName: string, child: Child) => void;
}

export function ProfileSetup({ onComplete }: ProfileSetupProps) {
  const [parentName, setParentName] = useState('');
  const [child, setChild] = useState<Child>({
    name: '',
    birthDate: undefined,
    gender: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!parentName.trim() || !child.name.trim() || !child.birthDate || !child.gender) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      onComplete(parentName, child);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-4">
          <div className="w-20 h-20 rounded-full overflow-hidden mx-auto shadow-soft">
            <img 
              src={childPlayingImage} 
              alt="Child playing" 
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Create Your Profile</h1>
            <p className="text-muted-foreground">Let's get to know you and your little one</p>
          </div>
        </div>

        <Card className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Parent Information */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm font-medium">
                <User className="h-4 w-4" />
                Your Information
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Your Name</label>
                <Input
                  placeholder="Enter your name"
                  value={parentName}
                  onChange={(e) => setParentName(e.target.value)}
                />
              </div>
            </div>

            {/* Child Information */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm font-medium">
                <Baby className="h-4 w-4" />
                Your Child's Information
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Child's Name</label>
                <Input
                  placeholder="Enter child's name"
                  value={child.name}
                  onChange={(e) => setChild(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Birth Date</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {child.birthDate ? format(child.birthDate, "PPP") : "Select birth date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={child.birthDate}
                      onSelect={(date) => setChild(prev => ({ ...prev, birthDate: date }))}
                      disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Gender</label>
                <Select value={child.gender} onValueChange={(value) => setChild(prev => ({ ...prev, gender: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="girl">Girl</SelectItem>
                    <SelectItem value="boy">Boy</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading}
            >
              {isLoading ? "Creating Profile..." : "Complete Setup"}
            </Button>
          </form>
        </Card>

        <div className="text-center text-xs text-muted-foreground px-4">
          🔒 Your data is encrypted and secure. We follow strict privacy guidelines for child safety.
        </div>
      </div>
    </div>
  );
}