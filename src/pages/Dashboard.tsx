import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { QuickActions } from "@/components/QuickActions";
import { ChildInfoCard } from "@/components/ChildInfoCard";
import { MomentsCarousel } from "@/components/MomentsCarousel";
import { SmartGuidance } from "@/components/SmartGuidance";
import { ChildDetailsForm } from "@/components/ChildDetailsForm";
import { EnhancedMilestoneTracker } from "@/components/EnhancedMilestoneTracker";
import { DailyActivities } from "@/components/DailyActivities";
import { MedicalReminders } from "@/components/MedicalReminders";
import { SmartActivities } from "@/components/SmartActivities";
import { AgeAppropriateFacts } from "@/components/AgeAppropriateFacts";
import { TeachingMoments } from "@/components/TeachingMoments";
import { MedicalSlider } from "@/components/BottomSlider";
import { ActivityCard } from "@/components/ActivityCard";
import { SocialFeatures } from "@/components/SocialFeatures";
import { ExpertContent } from "@/components/ExpertContent";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Sparkles, TrendingUp, Plus, Calendar } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { officialMilestones } from "@/data/milestones";
import { developmentalActivities } from "@/data/activities";
import { toast } from "sonner";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showChildForm, setShowChildForm] = useState(false);
  const [completedMilestones, setCompletedMilestones] = useState<string[]>([]);
  const [completedMedicalEvents, setCompletedMedicalEvents] = useState<string[]>([]);
  const [showMedicalSlider, setShowMedicalSlider] = useState(false);
  const { user, updateUser } = useAuth();
  
  const child = user?.child || {};

  // Calculate age more accurately in days
  const childAgeInDays = user?.child?.birthDate 
    ? Math.floor((new Date().getTime() - new Date(user.child.birthDate).getTime()) / (1000 * 60 * 60 * 24))
    : 30; // Default to 30 days for demo

  const childAgeInMonths = Math.floor(childAgeInDays / 30.44);
  
  const ageAppropriateM = officialMilestones.filter(m => 
    childAgeInMonths >= m.ageRangeMonths[0] && childAgeInMonths <= m.ageRangeMonths[1] + 6
  ).map(m => ({
    id: m.id,
    title: m.title,
    description: m.description,
    ageRange: `${Math.floor(m.ageRangeMonths[0]/12)}-${Math.floor(m.ageRangeMonths[1]/12)} years`,
    completed: false,
    overdue: childAgeInMonths > m.ageRangeMonths[1] + 3
  }));
  
  const ageAppropriateA = developmentalActivities.filter(a => 
    childAgeInMonths >= a.ageRangeMonths[0] && childAgeInMonths <= a.ageRangeMonths[1]
  ).map(a => ({
    id: a.id,
    title: a.title,
    description: a.description,
    duration: a.duration,
    ageGroup: `${Math.floor(a.ageRangeMonths[0]/12)}-${Math.floor(a.ageRangeMonths[1]/12)} years`,
    participants: a.participants,
    category: a.category,
    difficulty: a.difficulty
  }));

  const tips = [
    {
      id: "1",
      title: "Encouraging Independence",
      content: "Let your toddler try tasks independently, even if it takes longer. This builds confidence and self-reliance. Offer help only when needed and celebrate their efforts.",
      category: "Development",
      ageGroup: "18-36 months",
      readTime: "2 min read",
      liked: false,
      bookmarked: true
    },
    {
      id: "2",
      title: "Managing Tantrums",
      content: "Stay calm during tantrums. Acknowledge their feelings and offer comfort once they've calmed down. This teaches emotional regulation over time.",
      category: "Behavior",
      ageGroup: "2-4 years",
      readTime: "3 min read",
      liked: true,
      bookmarked: false
    }
  ];

  const handleQuickAction = (action: string) => {
    switch (action) {
      case "capture":
        toast.success("Opening camera to capture moment");
        break;
      case "milestone":
        setActiveTab("milestones");
        break;
      case "growth":
        setShowChildForm(true);
        break;
      case "schedule":
        toast.info("Scheduling feature coming soon");
        break;
    }
  };

  const handleSaveChildDetails = (details: any) => {
    updateUser({ 
      child: { 
        ...user?.child, 
        ...details 
      } 
    });
    setShowChildForm(false);
    toast.success("Child details updated!");
  };

  const handleGuidanceAction = (id: string, action: string) => {
    if (action === 'start') {
      toast.success("Starting activity guidance");
    } else {
      toast.info("Opening detailed guidance");
    }
  };

  const handleMilestoneToggle = (id: string) => {
    setCompletedMilestones(prev => 
      prev.includes(id) 
        ? prev.filter(m => m !== id)
        : [...prev, id]
    );
    toast.success("Milestone updated!");
  };

  const handleGetAdvice = (id: string) => {
    toast.info("Getting expert advice for this milestone");
  };

  const handleStartActivity = (id: string) => {
    toast.success("Activity started! Timer and guidance activated.");
  };

  const handleStartTeaching = (id: string) => {
    toast.success("Teaching moment started! Step-by-step guidance available.");
  };

  const handleMedicalComplete = (id: string) => {
    setCompletedMedicalEvents(prev => [...prev, id]);
    toast.success("Medical appointment marked complete!");
  };

  const handleScheduleMedical = (id: string) => {
    toast.info("Opening calendar to schedule appointment...");
  };

  const handleActivityDetails = (id: string) => {
    if (id === 'all') {
      setActiveTab('activities');
    } else {
      toast.info("Opening detailed activity instructions...");
    }
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Greeting */}
      <div className="text-center py-2">
        <h1 className="text-2xl font-bold mb-1">
          Good {new Date().getHours() < 12 ? 'morning' : new Date().getHours() < 17 ? 'afternoon' : 'evening'}! 
          <Sparkles className="inline h-5 w-5 ml-2 text-primary" />
        </h1>
        <p className="text-muted-foreground text-sm">
          {child.name ? `Let's nurture ${child.name}'s growth today` : "Ready to start your parenting journey?"}
        </p>
      </div>

      {/* Child Info */}
      <ChildInfoCard
        child={child}
        ageInDays={childAgeInDays}
        onEdit={() => setShowChildForm(true)}
      />

      {/* Quick Actions */}
      <QuickActions onAction={handleQuickAction} />

      {/* Moments Carousel */}
      <MomentsCarousel
        moments={[]}
        onCapture={() => handleQuickAction("capture")}
        onLove={(id) => toast.success("Moment loved!")}
        onShare={(id) => toast.success("Moment shared!")}
      />

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-3">
        <Card className="text-center bg-gradient-primary text-primary-foreground border-0">
          <CardContent className="p-3">
            <TrendingUp className="h-5 w-5 mx-auto mb-1" />
            <div className="text-lg font-bold">{ageAppropriateM.filter(m => m.completed).length}</div>
            <div className="text-xs opacity-90">Milestones</div>
          </CardContent>
        </Card>
        <Card className="text-center bg-gradient-accent text-accent-foreground border-0">
          <CardContent className="p-3">
            <Heart className="h-5 w-5 mx-auto mb-1" />
            <div className="text-lg font-bold">0</div>
            <div className="text-xs opacity-90">Moments</div>
          </CardContent>
        </Card>
        <Card className="text-center bg-gradient-warm text-warm-foreground border-0">
          <CardContent className="p-3">
            <div className="text-lg font-bold">{Math.floor(childAgeInDays / 7)}</div>
            <div className="text-xs opacity-90">Weeks</div>
          </CardContent>
        </Card>
      </div>

      {/* Daily Activities */}
      <DailyActivities
        ageInMonths={childAgeInMonths}
        onStartActivity={handleStartActivity}
        onViewDetails={handleActivityDetails}
      />

      {/* Smart Activities based on milestones */}
      <SmartActivities
        ageInMonths={childAgeInMonths}
        completedMilestones={completedMilestones}
        onStartActivity={handleStartActivity}
      />

      {/* Teaching Moments */}
      <TeachingMoments
        ageInMonths={childAgeInMonths}
        onStartTeaching={handleStartTeaching}
      />

      {/* Age-appropriate Facts */}
      <AgeAppropriateFacts
        ageInMonths={childAgeInMonths}
        childStage={child.stage || 'newborn'}
      />

      {/* Compact Medical Summary */}
      <Card className="p-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium text-sm mb-1">Medical Schedule</h3>
            <p className="text-xs text-muted-foreground">Next: 2-month checkup</p>
          </div>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setShowMedicalSlider(true)}
          >
            <Calendar className="h-3 w-3 mr-1" />
            View
          </Button>
        </div>
      </Card>
    </div>
  );

  const renderMilestones = () => (
    <div className="space-y-6">
      <div className="text-center py-4">
        <h1 className="text-2xl font-bold mb-2">Growth Milestones</h1>
        <p className="text-muted-foreground">Track {child.name || "your child"}'s development journey</p>
      </div>
      
      <EnhancedMilestoneTracker
        ageInMonths={childAgeInMonths}
        completedMilestones={completedMilestones}
        onToggleMilestone={handleMilestoneToggle}
        onGetHelp={handleGetAdvice}
      />
      
      <Button variant="outline" className="w-full">
        <Plus className="h-4 w-4 mr-2" />
        Add Custom Milestone
      </Button>
    </div>
  );

  const renderTips = () => (
    <div className="space-y-6">
      <div className="text-center py-4">
        <h1 className="text-2xl font-bold mb-2">Expert Guidance</h1>
        <p className="text-muted-foreground">Professional advice for {child.name}'s age group</p>
      </div>
      
      <ExpertContent 
        onViewExpert={(expertId) => console.log("View expert:", expertId)}
      />
    </div>
  );

  const renderActivities = () => (
    <div className="space-y-6">
      <div className="text-center py-4">
        <h1 className="text-2xl font-bold mb-2">Play Activities</h1>
        <p className="text-muted-foreground">Fun activities for {child.name || "your child"}'s development</p>
      </div>
      
      <DailyActivities
        ageInMonths={childAgeInMonths}
        onStartActivity={handleStartActivity}
        onViewDetails={handleActivityDetails}
      />
    </div>
  );

  const renderFamily = () => (
    <div className="space-y-6">
      <div className="text-center py-4">
        <h1 className="text-2xl font-bold mb-2">Family Circle</h1>
        <p className="text-muted-foreground">Share {child.name}'s journey with loved ones</p>
      </div>
      
      <SocialFeatures 
        onCreatePost={() => console.log("Create post")}
      />
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case "milestones": return renderMilestones();
      case "tips": return renderTips();
      case "activities": return renderActivities();
      case "family": return renderFamily();
      default: return renderDashboard();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-md mx-auto px-4 py-6 pb-20">
        {renderContent()}
      </div>
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      
      {/* Add Medical tab to navigation if needed */}
      
      {showChildForm && (
        <ChildDetailsForm
          child={child}
          onSave={handleSaveChildDetails}
          onCancel={() => setShowChildForm(false)}
        />
      )}

      {/* Medical Bottom Slider */}
      <MedicalSlider
        isOpen={showMedicalSlider}
        onClose={() => setShowMedicalSlider(false)}
        ageInMonths={childAgeInMonths}
        completedEvents={completedMedicalEvents}
        onMarkComplete={handleMedicalComplete}
        onSchedule={handleScheduleMedical}
      />
    </div>
  );
}