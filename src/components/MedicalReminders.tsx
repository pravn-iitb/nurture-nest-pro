import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Stethoscope, Shield, Plus, Check } from "lucide-react";

interface MedicalEvent {
  id: string;
  type: 'vaccine' | 'checkup' | 'screening';
  title: string;
  description: string;
  dueDate: string;
  ageMonths: number;
  completed: boolean;
  urgent: boolean;
}

interface MedicalRemindersProps {
  ageInMonths: number;
  completedEvents: string[];
  onMarkComplete: (id: string) => void;
  onSchedule: (id: string) => void;
  onAddCustom: () => void;
}

// Official vaccination and checkup schedule
const getMedicalSchedule = (ageInMonths: number): MedicalEvent[] => {
  const schedule: MedicalEvent[] = [
    // Birth to 2 months
    { id: 'birth_checkup', type: 'checkup', title: 'Birth Checkup', description: 'Initial newborn examination', dueDate: 'At birth', ageMonths: 0, completed: false, urgent: false },
    { id: 'hep_b_1', type: 'vaccine', title: 'Hepatitis B (1st dose)', description: 'First hepatitis B vaccination', dueDate: 'At birth', ageMonths: 0, completed: false, urgent: false },
    
    // 2 months
    { id: '2m_checkup', type: 'checkup', title: '2-Month Checkup', description: 'Weight, length, head circumference check', dueDate: '2 months', ageMonths: 2, completed: false, urgent: ageInMonths >= 2 },
    { id: 'dtap_1', type: 'vaccine', title: 'DTaP (1st dose)', description: 'Diphtheria, tetanus, pertussis vaccine', dueDate: '2 months', ageMonths: 2, completed: false, urgent: ageInMonths >= 2 },
    { id: 'polio_1', type: 'vaccine', title: 'Polio (1st dose)', description: 'Inactivated poliovirus vaccine', dueDate: '2 months', ageMonths: 2, completed: false, urgent: ageInMonths >= 2 },
    { id: 'hib_1', type: 'vaccine', title: 'Hib (1st dose)', description: 'Haemophilus influenzae type b vaccine', dueDate: '2 months', ageMonths: 2, completed: false, urgent: ageInMonths >= 2 },
    
    // 4 months
    { id: '4m_checkup', type: 'checkup', title: '4-Month Checkup', description: 'Development and growth assessment', dueDate: '4 months', ageMonths: 4, completed: false, urgent: ageInMonths >= 4 },
    { id: 'dtap_2', type: 'vaccine', title: 'DTaP (2nd dose)', description: 'Second diphtheria, tetanus, pertussis vaccine', dueDate: '4 months', ageMonths: 4, completed: false, urgent: ageInMonths >= 4 },
    { id: 'polio_2', type: 'vaccine', title: 'Polio (2nd dose)', description: 'Second inactivated poliovirus vaccine', dueDate: '4 months', ageMonths: 4, completed: false, urgent: ageInMonths >= 4 },
    
    // 6 months
    { id: '6m_checkup', type: 'checkup', title: '6-Month Checkup', description: 'Solid foods introduction discussion', dueDate: '6 months', ageMonths: 6, completed: false, urgent: ageInMonths >= 6 },
    { id: 'dtap_3', type: 'vaccine', title: 'DTaP (3rd dose)', description: 'Third diphtheria, tetanus, pertussis vaccine', dueDate: '6 months', ageMonths: 6, completed: false, urgent: ageInMonths >= 6 },
    { id: 'hep_b_2', type: 'vaccine', title: 'Hepatitis B (2nd dose)', description: 'Second hepatitis B vaccination', dueDate: '6 months', ageMonths: 6, completed: false, urgent: ageInMonths >= 6 },
    
    // 9 months
    { id: '9m_checkup', type: 'checkup', title: '9-Month Checkup', description: 'Motor skills and development check', dueDate: '9 months', ageMonths: 9, completed: false, urgent: ageInMonths >= 9 },
    
    // 12 months
    { id: '12m_checkup', type: 'checkup', title: '12-Month Checkup', description: 'First birthday milestone check', dueDate: '12 months', ageMonths: 12, completed: false, urgent: ageInMonths >= 12 },
    { id: 'mmr_1', type: 'vaccine', title: 'MMR (1st dose)', description: 'Measles, mumps, rubella vaccine', dueDate: '12-15 months', ageMonths: 12, completed: false, urgent: ageInMonths >= 15 },
    { id: 'varicella_1', type: 'vaccine', title: 'Varicella (1st dose)', description: 'Chickenpox vaccine', dueDate: '12-15 months', ageMonths: 12, completed: false, urgent: ageInMonths >= 15 },
    
    // 15 months
    { id: '15m_checkup', type: 'checkup', title: '15-Month Checkup', description: 'Walking and language development', dueDate: '15 months', ageMonths: 15, completed: false, urgent: ageInMonths >= 15 },
    
    // 18 months
    { id: '18m_checkup', type: 'checkup', title: '18-Month Checkup', description: 'Toddler development assessment', dueDate: '18 months', ageMonths: 18, completed: false, urgent: ageInMonths >= 18 },
    { id: 'dtap_4', type: 'vaccine', title: 'DTaP (4th dose)', description: 'Fourth diphtheria, tetanus, pertussis vaccine', dueDate: '15-18 months', ageMonths: 18, completed: false, urgent: ageInMonths >= 18 },
    
    // 24 months (2 years)
    { id: '24m_checkup', type: 'checkup', title: '2-Year Checkup', description: 'Speech and behavior evaluation', dueDate: '24 months', ageMonths: 24, completed: false, urgent: ageInMonths >= 24 },
    
    // 30 months
    { id: '30m_checkup', type: 'checkup', title: '30-Month Checkup', description: 'Pre-preschool readiness check', dueDate: '30 months', ageMonths: 30, completed: false, urgent: ageInMonths >= 30 },
    
    // 3 years
    { id: '36m_checkup', type: 'checkup', title: '3-Year Checkup', description: 'Preschool readiness and development', dueDate: '3 years', ageMonths: 36, completed: false, urgent: ageInMonths >= 36 },
    
    // 4 years
    { id: '48m_checkup', type: 'checkup', title: '4-Year Checkup', description: 'School readiness evaluation', dueDate: '4 years', ageMonths: 48, completed: false, urgent: ageInMonths >= 48 },
    { id: 'dtap_5', type: 'vaccine', title: 'DTaP (5th dose)', description: 'Fifth diphtheria, tetanus, pertussis vaccine', dueDate: '4-6 years', ageMonths: 48, completed: false, urgent: ageInMonths >= 48 },
    { id: 'mmr_2', type: 'vaccine', title: 'MMR (2nd dose)', description: 'Second measles, mumps, rubella vaccine', dueDate: '4-6 years', ageMonths: 48, completed: false, urgent: ageInMonths >= 48 },
    
    // 5 years
    { id: '60m_checkup', type: 'checkup', title: '5-Year Checkup', description: 'School entry physical and vaccinations', dueDate: '5 years', ageMonths: 60, completed: false, urgent: ageInMonths >= 60 }
  ];

  return schedule.filter(event => 
    event.ageMonths <= ageInMonths + 3 && event.ageMonths >= 0
  );
};

export function MedicalReminders({ 
  ageInMonths, 
  completedEvents, 
  onMarkComplete, 
  onSchedule, 
  onAddCustom 
}: MedicalRemindersProps) {
  const schedule = getMedicalSchedule(ageInMonths);
  const upcomingEvents = schedule.filter(event => !completedEvents.includes(event.id));
  const urgentEvents = upcomingEvents.filter(event => event.urgent);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'vaccine': return Shield;
      case 'checkup': return Stethoscope;
      case 'screening': return Calendar;
      default: return Calendar;
    }
  };

  const getTypeColor = (type: string, urgent: boolean) => {
    if (urgent) return 'bg-red-100 text-red-800 border-red-200';
    
    switch (type) {
      case 'vaccine': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'checkup': return 'bg-green-100 text-green-800 border-green-200';
      case 'screening': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (upcomingEvents.length === 0) {
    return (
      <Card className="p-6 text-center">
        <Check className="h-12 w-12 mx-auto mb-3 text-success" />
        <h3 className="font-semibold mb-1">All Caught Up!</h3>
        <p className="text-sm text-muted-foreground mb-4">
          No upcoming medical appointments at this time.
        </p>
        <Button variant="outline" onClick={onAddCustom}>
          <Plus className="h-4 w-4 mr-2" />
          Add Custom Reminder
        </Button>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {urgentEvents.length > 0 && (
        <Card className="border-red-200 bg-red-50 p-4">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="h-4 w-4 text-red-600" />
            <span className="text-sm font-medium text-red-800">
              {urgentEvents.length} Overdue Appointment{urgentEvents.length > 1 ? 's' : ''}
            </span>
          </div>
          <p className="text-xs text-red-700">
            Schedule these appointments as soon as possible.
          </p>
        </Card>
      )}

      <div className="space-y-3">
        {upcomingEvents.slice(0, 5).map((event) => {
          const Icon = getTypeIcon(event.type);
          
          return (
            <Card 
              key={event.id} 
              className={`p-4 transition-all duration-300 hover-scale ${
                event.urgent ? 'border-red-200 bg-red-50' : 'border-border'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg ${
                  event.urgent ? 'bg-red-100' : 'bg-accent/10'
                }`}>
                  <Icon className={`h-4 w-4 ${
                    event.urgent ? 'text-red-600' : 'text-accent'
                  }`} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium text-sm">{event.title}</h4>
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${getTypeColor(event.type, event.urgent)}`}
                    >
                      {event.type}
                    </Badge>
                    {event.urgent && (
                      <Badge variant="destructive" className="text-xs">
                        Due Now
                      </Badge>
                    )}
                  </div>
                  
                  <p className="text-xs text-muted-foreground mb-2 leading-relaxed">
                    {event.description}
                  </p>
                  
                  <div className="flex items-center gap-1 mb-3 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    Expected: {event.dueDate}
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="default" 
                      size="sm"
                      onClick={() => onSchedule(event.id)}
                      className="flex-1 h-8"
                    >
                      <Calendar className="h-3 w-3 mr-1" />
                      Schedule
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => onMarkComplete(event.id)}
                      className="h-8 px-2"
                    >
                      <Check className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="flex gap-2">
        <Button variant="outline" className="flex-1" onClick={onAddCustom}>
          <Plus className="h-4 w-4 mr-2" />
          Add Custom
        </Button>
        {upcomingEvents.length > 5 && (
          <Button variant="outline" className="flex-1">
            View All ({upcomingEvents.length})
          </Button>
        )}
      </div>
    </div>
  );
}