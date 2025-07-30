import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, Award, BookOpen, Play } from 'lucide-react';
import expertImage from '@/assets/expert-doctor.jpg';

interface Expert {
  id: string;
  name: string;
  title: string;
  specialization: string;
  experience: string;
  rating: number;
  avatar: string;
}

interface ExpertContentProps {
  onViewExpert: (expertId: string) => void;
}

export function ExpertContent({ onViewExpert }: ExpertContentProps) {
  const experts: Expert[] = [
    {
      id: '1',
      name: 'Dr. Sarah Johnson',
      title: 'Pediatric Development Specialist',
      specialization: 'Early Childhood Development',
      experience: '15+ years',
      rating: 4.9,
      avatar: expertImage
    },
    {
      id: '2',
      name: 'Dr. Michael Chen',
      title: 'Child Psychologist',
      specialization: 'Behavioral Development',
      experience: '12+ years',
      rating: 4.8,
      avatar: expertImage
    },
    {
      id: '3',
      name: 'Dr. Emily Rodriguez',
      title: 'Pediatric Nutritionist',
      specialization: 'Child Nutrition & Growth',
      experience: '10+ years',
      rating: 4.9,
      avatar: expertImage
    }
  ];

  const guidelines = [
    {
      title: 'AAP Developmental Milestones',
      description: 'Official guidelines from American Academy of Pediatrics',
      source: 'American Academy of Pediatrics',
      icon: BookOpen,
      color: 'bg-blue-500'
    },
    {
      title: 'WHO Growth Standards',
      description: 'World Health Organization child growth standards',
      source: 'World Health Organization',
      icon: Award,
      color: 'bg-green-500'
    },
    {
      title: 'CDC Developmental Guidelines',
      description: 'Learn the Signs. Act Early program guidelines',
      source: 'Centers for Disease Control',
      icon: Star,
      color: 'bg-purple-500'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Expert Team */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Our Expert Team</h3>
        <div className="space-y-3">
          {experts.map((expert) => (
            <Card key={expert.id} className="p-4">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <img 
                    src={expert.avatar} 
                    alt={expert.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold text-sm">{expert.name}</h4>
                      <p className="text-xs text-muted-foreground">{expert.title}</p>
                      <p className="text-xs text-primary">{expert.specialization}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-current text-yellow-500" />
                        <span className="text-xs font-medium">{expert.rating}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">{expert.experience}</p>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="mt-2 h-7 text-xs"
                    onClick={() => onViewExpert(expert.id)}
                  >
                    View Profile
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Official Guidelines */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Evidence-Based Guidelines</h3>
        <div className="space-y-3">
          {guidelines.map((guideline, index) => {
            const Icon = guideline.icon;
            return (
              <Card key={index} className="p-4">
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 ${guideline.color} rounded-xl flex items-center justify-center`}>
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm mb-1">{guideline.title}</h4>
                    <p className="text-xs text-muted-foreground mb-2">{guideline.description}</p>
                    <Badge variant="secondary" className="text-xs">
                      {guideline.source}
                    </Badge>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Quick Access */}
      <Card className="p-4 bg-gradient-subtle">
        <div className="text-center space-y-3">
          <Play className="h-8 w-8 mx-auto text-primary" />
          <div>
            <h4 className="font-semibold">Need Immediate Guidance?</h4>
            <p className="text-xs text-muted-foreground">
              Get instant answers based on official guidelines
            </p>
          </div>
          <Button size="sm" className="w-full">
            Ask Our AI Assistant
          </Button>
        </div>
      </Card>
    </div>
  );
}