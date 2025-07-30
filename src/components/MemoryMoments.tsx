import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Camera, Heart, Share2, Calendar, Star, Award, Baby } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Moment {
  id: string;
  type: 'milestone' | 'photo' | 'achievement' | 'first';
  title: string;
  description: string;
  date: Date;
  image?: string;
  tags: string[];
  loved: boolean;
}

interface MemoryMomentsProps {
  moments: Moment[];
  onCaptureMoment: () => void;
  onLoveMoment: (id: string) => void;
  onShareMoment: (id: string) => void;
}

export function MemoryMoments({ 
  moments, 
  onCaptureMoment, 
  onLoveMoment, 
  onShareMoment 
}: MemoryMomentsProps) {
  const [filter, setFilter] = useState<string>('all');
  const { toast } = useToast();

  const getMomentIcon = (type: string) => {
    switch (type) {
      case 'milestone': return Star;
      case 'achievement': return Award;
      case 'first': return Baby;
      default: return Camera;
    }
  };

  const getMomentColor = (type: string) => {
    switch (type) {
      case 'milestone': return 'bg-gradient-primary';
      case 'achievement': return 'bg-gradient-secondary';
      case 'first': return 'bg-gradient-accent';
      default: return 'bg-muted';
    }
  };

  const filteredMoments = filter === 'all' 
    ? moments 
    : moments.filter(moment => moment.type === filter);

  const filters = [
    { value: 'all', label: 'All' },
    { value: 'milestone', label: 'Milestones' },
    { value: 'first', label: 'Firsts' },
    { value: 'achievement', label: 'Achievements' },
    { value: 'photo', label: 'Photos' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold">Memory Moments</h2>
          <p className="text-sm text-muted-foreground">
            Precious memories of your child's journey
          </p>
        </div>
        <Button onClick={onCaptureMoment} size="sm">
          <Camera className="h-4 w-4 mr-2" />
          Capture
        </Button>
      </div>

      {/* Filters */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {filters.map((filterOption) => (
          <Button
            key={filterOption.value}
            variant={filter === filterOption.value ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter(filterOption.value)}
            className="whitespace-nowrap"
          >
            {filterOption.label}
          </Button>
        ))}
      </div>

      {/* Moments Timeline */}
      <div className="space-y-4">
        {filteredMoments.length === 0 ? (
          <Card className="p-8 text-center">
            <Camera className="h-12 w-12 mx-auto mb-3 text-muted-foreground" />
            <h3 className="font-semibold mb-2">No moments yet</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Start capturing your child's special moments
            </p>
            <Button onClick={onCaptureMoment}>
              Capture First Moment
            </Button>
          </Card>
        ) : (
          filteredMoments.map((moment) => {
            const Icon = getMomentIcon(moment.type);
            return (
              <Card key={moment.id} className="p-4">
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 ${getMomentColor(moment.type)} rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-semibold">{moment.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          {moment.description}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        {moment.date.toLocaleDateString()}
                      </div>
                    </div>
                    
                    {moment.image && (
                      <div className="w-full h-32 bg-muted rounded-lg mb-3 overflow-hidden">
                        <img 
                          src={moment.image} 
                          alt={moment.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between">
                      <div className="flex gap-1 flex-wrap">
                        {moment.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onLoveMoment(moment.id)}
                          className={moment.loved ? 'text-red-500' : ''}
                        >
                          <Heart className={`h-4 w-4 ${moment.loved ? 'fill-current' : ''}`} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onShareMoment(moment.id)}
                        >
                          <Share2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })
        )}
      </div>

      {/* Memory Stats */}
      <Card className="p-4 bg-gradient-subtle">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-primary">
              {moments.filter(m => m.type === 'milestone').length}
            </div>
            <div className="text-xs text-muted-foreground">Milestones</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-secondary">
              {moments.filter(m => m.type === 'first').length}
            </div>
            <div className="text-xs text-muted-foreground">First Times</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-accent">
              {moments.filter(m => m.loved).length}
            </div>
            <div className="text-xs text-muted-foreground">Loved</div>
          </div>
        </div>
      </Card>
    </div>
  );
}