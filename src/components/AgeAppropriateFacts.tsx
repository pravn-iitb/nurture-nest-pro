import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Heart, Zap, Baby, Sparkles, BookOpen } from "lucide-react";

interface Fact {
  id: string;
  title: string;
  content: string;
  category: 'development' | 'health' | 'behavior' | 'learning' | 'nutrition' | 'safety';
  ageRelevance: string;
  source: string;
}

interface AgeAppropriateFactsProps {
  ageInMonths: number;
  childStage: string;
}

const generateAgeFacts = (ageInMonths: number, stage: string): Fact[] => {
  const facts: Fact[] = [];

  if (ageInMonths <= 3) {
    facts.push(
      {
        id: 'newborn_sleep',
        title: 'Sleep Patterns',
        content: 'Newborns sleep 14-17 hours per day but only 2-4 hours at a time. This is completely normal as their circadian rhythm is still developing.',
        category: 'health',
        ageRelevance: 'Birth - 3 months',
        source: 'American Academy of Pediatrics'
      },
      {
        id: 'newborn_vision',
        title: 'Vision Development',
        content: 'Babies can only see clearly about 8-12 inches away at birth - perfect for seeing your face during feeding and bonding.',
        category: 'development',
        ageRelevance: 'Birth - 3 months',
        source: 'National Eye Institute'
      },
      {
        id: 'newborn_crying',
        title: 'Crying Communication',
        content: 'Crying peaks around 6 weeks and decreases by 3-4 months. Different cries mean different needs - you\'ll learn to distinguish them.',
        category: 'behavior',
        ageRelevance: 'Birth - 3 months',
        source: 'CDC Child Development'
      }
    );
  } else if (ageInMonths <= 6) {
    facts.push(
      {
        id: 'infant_smiling',
        title: 'Social Smiling',
        content: 'Real social smiles typically appear around 6-8 weeks. These are different from reflexive smiles and show emotional development.',
        category: 'development',
        ageRelevance: '2 - 6 months',
        source: 'Zero to Three Organization'
      },
      {
        id: 'infant_hearing',
        title: 'Language Foundation',
        content: 'Babies start recognizing the rhythm and sounds of their native language around 4 months, laying the foundation for speech.',
        category: 'learning',
        ageRelevance: '3 - 6 months',
        source: 'University of Washington Research'
      },
      {
        id: 'infant_feeding',
        title: 'Growth Spurts',
        content: 'Babies typically double their birth weight by 5-6 months. Growth spurts may cause increased hunger and temporary fussiness.',
        category: 'nutrition',
        ageRelevance: '3 - 6 months',
        source: 'WHO Growth Standards'
      }
    );
  } else if (ageInMonths <= 12) {
    facts.push(
      {
        id: 'mobile_safety',
        title: 'Childproofing Time',
        content: 'Once babies become mobile (6-10 months), they explore with their mouths. Remove small objects and secure cabinets and outlets.',
        category: 'safety',
        ageRelevance: '6 - 12 months',
        source: 'Consumer Product Safety Commission'
      },
      {
        id: 'object_permanence',
        title: 'Peek-a-Boo Science',
        content: 'Around 8-12 months, babies develop object permanence - understanding that things exist even when hidden. This makes peek-a-boo fascinating!',
        category: 'development',
        ageRelevance: '8 - 12 months',
        source: 'Jean Piaget Developmental Theory'
      },
      {
        id: 'solid_foods',
        title: 'First Foods',
        content: 'Start with iron-rich foods around 6 months. Babies need iron for brain development as their stored iron from birth starts to deplete.',
        category: 'nutrition',
        ageRelevance: '6 - 12 months',
        source: 'American Academy of Pediatrics'
      }
    );
  } else if (ageInMonths <= 24) {
    facts.push(
      {
        id: 'toddler_tantrums',
        title: 'Tantrum Development',
        content: 'Tantrums peak between 15-18 months because toddlers understand more than they can express. They\'re practicing emotional regulation.',
        category: 'behavior',
        ageRelevance: '12 - 24 months',
        source: 'Harvard Center on the Developing Child'
      },
      {
        id: 'language_explosion',
        title: 'Vocabulary Growth',
        content: 'Between 18-24 months, toddlers may learn 6-10 new words per week during the "vocabulary explosion" phase.',
        category: 'learning',
        ageRelevance: '18 - 24 months',
        source: 'Stanford University Language Research'
      },
      {
        id: 'parallel_play',
        title: 'Social Development',
        content: 'Toddlers engage in "parallel play" - playing alongside others without direct interaction. This is normal and healthy social development.',
        category: 'development',
        ageRelevance: '12 - 24 months',
        source: 'Child Development Institute'
      }
    );
  } else {
    facts.push(
      {
        id: 'preschool_imagination',
        title: 'Imagination Blooms',
        content: 'Around age 2-3, children develop symbolic thinking, leading to imaginative play. Pretend play helps develop creativity and problem-solving.',
        category: 'development',
        ageRelevance: '24+ months',
        source: 'National Association for the Education of Young Children'
      },
      {
        id: 'emotional_regulation',
        title: 'Big Feelings',
        content: 'Preschoolers are learning to name and manage emotions. Validate their feelings while teaching coping strategies.',
        category: 'behavior',
        ageRelevance: '24+ months',
        source: 'Center for Social Emotional Learning'
      },
      {
        id: 'independence_growth',
        title: 'Growing Independence',
        content: 'The "me do it" phase around 2-3 years is crucial for building confidence and life skills. Allow extra time for self-help attempts.',
        category: 'development',
        ageRelevance: '24+ months',
        source: 'Montessori Method Research'
      }
    );
  }

  return facts.slice(0, 3); // Return 3 most relevant facts
};

export function AgeAppropriateFacts({ ageInMonths, childStage }: AgeAppropriateFactsProps) {
  const facts = generateAgeFacts(ageInMonths, childStage);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'development': return Brain;
      case 'health': return Heart;
      case 'behavior': return Zap;
      case 'learning': return BookOpen;
      case 'nutrition': return Baby;
      case 'safety': return Sparkles;
      default: return Brain;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'development': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'health': return 'bg-green-100 text-green-800 border-green-200';
      case 'behavior': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'learning': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'nutrition': return 'bg-pink-100 text-pink-800 border-pink-200';
      case 'safety': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-4">
      <div className="text-center mb-4">
        <h3 className="font-semibold text-lg mb-1 flex items-center justify-center gap-2">
          <Brain className="h-5 w-5 text-primary" />
          Did You Know?
        </h3>
        <p className="text-sm text-muted-foreground">
          Evidence-based insights for your child's current stage
        </p>
      </div>

      <div className="space-y-3">
        {facts.map((fact) => {
          const CategoryIcon = getCategoryIcon(fact.category);
          
          return (
            <Card key={fact.id} className="overflow-hidden border-border/50">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-accent/10">
                    <CategoryIcon className="h-4 w-4 text-accent" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-sm">{fact.title}</h4>
                      <Badge variant="outline" className={`text-xs ${getCategoryColor(fact.category)}`}>
                        {fact.category}
                      </Badge>
                    </div>
                    
                    <p className="text-xs text-muted-foreground mb-2 leading-relaxed">
                      {fact.content}
                    </p>
                    
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>Relevant for: {fact.ageRelevance}</span>
                      <span className="text-xs font-medium">Source: {fact.source}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}