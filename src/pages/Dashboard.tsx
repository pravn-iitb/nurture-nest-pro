import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { ChildProfile } from "@/components/ChildProfile";
import { MilestoneCard } from "@/components/MilestoneCard";
import { ActivityCard } from "@/components/ActivityCard";
import { ParentingTip } from "@/components/ParentingTip";
import { DailyCheckIn } from "@/components/DailyCheckIn";
import { ExpertContent } from "@/components/ExpertContent";
import { MemoryMoments } from "@/components/MemoryMoments";
import { SocialFeatures } from "@/components/SocialFeatures";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus, Star, TrendingUp, Heart, Users } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { officialMilestones } from "@/data/milestones";
import { developmentalActivities } from "@/data/activities";
import heroImage from "@/assets/hero-family.jpg";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const { user, logout } = useAuth();
  
  const child = user?.child || {
    name: "Your Child",
    age: "0 months",
    birthday: "Unknown",
    height: "Unknown",
    weight: "Unknown"
  };

  // Get age-appropriate milestones and activities
  const childAgeInMonths = user?.child?.birthDate 
    ? Math.floor((new Date().getTime() - new Date(user.child.birthDate).getTime()) / (1000 * 60 * 60 * 24 * 30.44))
    : 24;
  
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

  const handleMilestoneToggle = (id: string) => {
    console.log("Toggle milestone:", id);
  };

  const handleGetAdvice = (id: string) => {
    console.log("Get advice for milestone:", id);
  };

  const handleStartActivity = (id: string) => {
    console.log("Start activity:", id);
  };

  const handleTipAction = (action: string, id: string) => {
    console.log(`${action} tip:`, id);
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Daily Check-in */}
      <DailyCheckIn 
        onComplete={(data) => console.log("Check-in data:", data)}
      />

      {/* Hero Section */}
      <div className="relative h-48 rounded-2xl overflow-hidden">
        <img 
          src={heroImage} 
          alt="Family" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-transparent flex items-center p-6">
          <div className="text-white">
            <h1 className="text-2xl font-bold mb-2">Good morning! ☀️</h1>
            <p className="text-white/90">Let's track {child.name}'s wonderful journey today</p>
          </div>
        </div>
      </div>

      <ChildProfile 
        child={child}
        onEditProfile={() => console.log("Edit profile")}
        onAddFamily={() => setActiveTab("family")}
      />

      {/* Memory Moments */}
      <MemoryMoments 
        moments={[]}
        onCaptureMoment={() => console.log("Capture moment")}
        onLoveMoment={(id) => console.log("Love moment:", id)}
        onShareMoment={(id) => console.log("Share moment:", id)}
      />

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="p-4 text-center bg-gradient-primary text-primary-foreground">
          <TrendingUp className="h-8 w-8 mx-auto mb-2" />
          <div className="text-2xl font-bold">{ageAppropriateM.filter(m => m.completed).length}/{ageAppropriateM.length}</div>
          <div className="text-sm opacity-90">Milestones</div>
        </Card>
        <Card className="p-4 text-center bg-gradient-secondary text-secondary-foreground">
          <Star className="h-8 w-8 mx-auto mb-2" />
          <div className="text-2xl font-bold">0</div>
          <div className="text-sm opacity-90">Activities Done</div>
        </Card>
      </div>

      {/* Recent Milestones */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Recent Milestones</h2>
          <Button variant="ghost" size="sm" onClick={() => setActiveTab("milestones")}>
            View All
          </Button>
        </div>
        <div className="space-y-3">
          {ageAppropriateM.slice(0, 2).map((milestone) => (
            <MilestoneCard
              key={milestone.id}
              milestone={milestone}
              onToggle={handleMilestoneToggle}
              onGetAdvice={handleGetAdvice}
            />
          ))}
        </div>
      </div>

      {/* Today's Activity */}
      <div>
        <h2 className="text-xl font-bold mb-4">Suggested Activity</h2>
        {ageAppropriateA[0] && (
          <ActivityCard
            activity={ageAppropriateA[0]}
            onStartActivity={handleStartActivity}
          />
        )}
      </div>
    </div>
  );

  const renderMilestones = () => (
    <div className="space-y-6">
      <div className="text-center py-4">
        <h1 className="text-2xl font-bold mb-2">Growth Milestones</h1>
        <p className="text-muted-foreground">Track Emma's development journey</p>
      </div>
      
      <div className="space-y-4">
        {ageAppropriateM.map((milestone) => (
          <MilestoneCard
            key={milestone.id}
            milestone={milestone}
            onToggle={handleMilestoneToggle}
            onGetAdvice={handleGetAdvice}
          />
        ))}
      </div>
      
      <Button variant="floating" className="w-full">
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
        <p className="text-muted-foreground">Fun activities for Emma's development</p>
      </div>
      
      <div className="space-y-4">
        {ageAppropriateA.map((activity) => (
          <ActivityCard
            key={activity.id}
            activity={activity}
            onStartActivity={handleStartActivity}
          />
        ))}
      </div>
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
    </div>
  );
}