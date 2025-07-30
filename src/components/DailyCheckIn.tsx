import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Circle, Smile, Meh, Frown, Star } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface DailyCheckInProps {
  onComplete: (data: any) => void;
}

export function DailyCheckIn({ onComplete }: DailyCheckInProps) {
  const [mood, setMood] = useState<string>('');
  const [activities, setActivities] = useState<string[]>([]);
  const [sleep, setSleep] = useState<string>('');
  const { toast } = useToast();

  const dailyActivities = [
    { id: 'outdoor', label: 'Outdoor Play', icon: '🌳' },
    { id: 'reading', label: 'Reading Time', icon: '📚' },
    { id: 'creative', label: 'Creative Play', icon: '🎨' },
    { id: 'social', label: 'Social Interaction', icon: '👥' },
    { id: 'physical', label: 'Physical Activity', icon: '🏃‍♀️' },
    { id: 'music', label: 'Music/Songs', icon: '🎵' }
  ];

  const moodOptions = [
    { value: 'happy', icon: Smile, label: 'Happy', color: 'text-green-500' },
    { value: 'neutral', icon: Meh, label: 'Okay', color: 'text-yellow-500' },
    { value: 'fussy', icon: Frown, label: 'Fussy', color: 'text-red-500' }
  ];

  const sleepOptions = [
    { value: 'excellent', label: 'Slept great (10+ hours)' },
    { value: 'good', label: 'Good sleep (8-10 hours)' },
    { value: 'fair', label: 'Some disruptions (6-8 hours)' },
    { value: 'poor', label: 'Poor sleep (<6 hours)' }
  ];

  const toggleActivity = (activityId: string) => {
    setActivities(prev => 
      prev.includes(activityId) 
        ? prev.filter(id => id !== activityId)
        : [...prev, activityId]
    );
  };

  const handleSubmit = () => {
    if (!mood || !sleep) {
      toast({
        title: "Missing information",
        description: "Please select mood and sleep quality",
        variant: "destructive"
      });
      return;
    }

    const checkInData = {
      date: new Date().toISOString().split('T')[0],
      mood,
      activities,
      sleep,
      timestamp: new Date()
    };

    onComplete(checkInData);
    toast({
      title: "Daily check-in complete! ⭐",
      description: "Great job keeping track of your child's day"
    });
  };

  return (
    <Card className="p-6 space-y-6">
      <div className="text-center space-y-2">
        <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mx-auto">
          <Star className="h-6 w-6 text-primary-foreground" />
        </div>
        <h3 className="text-lg font-semibold">Daily Check-In</h3>
        <p className="text-sm text-muted-foreground">
          How was your little one's day today?
        </p>
      </div>

      {/* Mood Selection */}
      <div className="space-y-3">
        <h4 className="font-medium">Overall Mood</h4>
        <div className="grid grid-cols-3 gap-3">
          {moodOptions.map((option) => {
            const Icon = option.icon;
            return (
              <button
                key={option.value}
                onClick={() => setMood(option.value)}
                className={`p-3 rounded-xl border-2 transition-all ${
                  mood === option.value 
                    ? 'border-primary bg-primary/10' 
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <Icon className={`h-8 w-8 mx-auto mb-1 ${option.color}`} />
                <p className="text-xs font-medium">{option.label}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Activities */}
      <div className="space-y-3">
        <h4 className="font-medium">Today's Activities</h4>
        <div className="grid grid-cols-2 gap-3">
          {dailyActivities.map((activity) => {
            const isSelected = activities.includes(activity.id);
            return (
              <button
                key={activity.id}
                onClick={() => toggleActivity(activity.id)}
                className={`p-3 rounded-xl border-2 transition-all text-left ${
                  isSelected 
                    ? 'border-primary bg-primary/10' 
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <div className="flex items-center gap-2">
                  {isSelected ? (
                    <CheckCircle className="h-4 w-4 text-primary" />
                  ) : (
                    <Circle className="h-4 w-4 text-muted-foreground" />
                  )}
                  <span className="text-lg">{activity.icon}</span>
                </div>
                <p className="text-sm font-medium mt-1">{activity.label}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Sleep Quality */}
      <div className="space-y-3">
        <h4 className="font-medium">Sleep Quality</h4>
        <div className="space-y-2">
          {sleepOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setSleep(option.value)}
              className={`w-full p-3 rounded-xl border-2 transition-all text-left ${
                sleep === option.value 
                  ? 'border-primary bg-primary/10' 
                  : 'border-border hover:border-primary/50'
              }`}
            >
              <div className="flex items-center gap-2">
                {sleep === option.value ? (
                  <CheckCircle className="h-4 w-4 text-primary" />
                ) : (
                  <Circle className="h-4 w-4 text-muted-foreground" />
                )}
                <span className="text-sm font-medium">{option.label}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      <Button onClick={handleSubmit} className="w-full">
        Complete Check-In
      </Button>
    </Card>
  );
}