import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { ChildProfile } from "@/components/ChildProfile";
import { MilestoneCard } from "@/components/MilestoneCard";
import { ActivityCard } from "@/components/ActivityCard";
import { ParentingTip } from "@/components/ParentingTip";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus, Star, TrendingUp, Heart, Users } from "lucide-react";
import heroImage from "@/assets/hero-family.jpg";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  
  // Mock data
  const child = {
    name: "Emma",
    age: "2 years 4 months",
    birthday: "Jan 15, 2022",
    height: "85 cm",
    weight: "12 kg"
  };

  const milestones = [
    {
      id: "1",
      title: "Walks steadily",
      description: "Can walk without assistance for several steps",
      ageRange: "12-18 months",
      completed: true,
      overdue: false
    },
    {
      id: "2", 
      title: "Says 2-word phrases",
      description: "Combines two words to make simple sentences",
      ageRange: "18-24 months",
      completed: true,
      overdue: false
    },
    {
      id: "3",
      title: "Potty training readiness",
      description: "Shows interest in potty or stays dry for longer periods",
      ageRange: "20-30 months",
      completed: false,
      overdue: true
    },
    {
      id: "4",
      title: "Climbs stairs",
      description: "Can climb stairs while holding onto railing",
      ageRange: "24-30 months",
      completed: false,
      overdue: false
    }
  ];

  const activities = [
    {
      id: "1",
      title: "Color Sorting Game",
      description: "Help your child sort objects by color to develop cognitive skills",
      duration: "15 min",
      ageGroup: "2-3 years",
      participants: 2,
      category: "cognitive" as const,
      difficulty: "easy" as const
    },
    {
      id: "2",
      title: "Dance Party",
      description: "Put on music and dance together to improve coordination",
      duration: "10 min",
      ageGroup: "2-4 years", 
      participants: 2,
      category: "physical" as const,
      difficulty: "easy" as const
    },
    {
      id: "3",
      title: "Story Building",
      description: "Take turns adding sentences to create a story together",
      duration: "20 min",
      ageGroup: "2-5 years",
      participants: 2,
      category: "creative" as const,
      difficulty: "medium" as const
    }
  ];

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
            <p className="text-white/90">Let's track Emma's wonderful journey today</p>
          </div>
        </div>
      </div>

      <ChildProfile 
        child={child}
        onEditProfile={() => console.log("Edit profile")}
        onAddFamily={() => console.log("Add family")}
      />

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="p-4 text-center bg-gradient-primary text-primary-foreground">
          <TrendingUp className="h-8 w-8 mx-auto mb-2" />
          <div className="text-2xl font-bold">12/16</div>
          <div className="text-sm opacity-90">Milestones</div>
        </Card>
        <Card className="p-4 text-center bg-gradient-secondary text-secondary-foreground">
          <Star className="h-8 w-8 mx-auto mb-2" />
          <div className="text-2xl font-bold">25</div>
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
          {milestones.slice(0, 2).map((milestone) => (
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
        <ActivityCard
          activity={activities[0]}
          onStartActivity={handleStartActivity}
        />
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
        {milestones.map((milestone) => (
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
        <h1 className="text-2xl font-bold mb-2">Parenting Tips</h1>
        <p className="text-muted-foreground">Expert advice for Emma's age group</p>
      </div>
      
      <div className="space-y-4">
        {tips.map((tip) => (
          <ParentingTip
            key={tip.id}
            tip={tip}
            onLike={(id) => handleTipAction("like", id)}
            onBookmark={(id) => handleTipAction("bookmark", id)}
            onShare={(id) => handleTipAction("share", id)}
          />
        ))}
      </div>
    </div>
  );

  const renderActivities = () => (
    <div className="space-y-6">
      <div className="text-center py-4">
        <h1 className="text-2xl font-bold mb-2">Play Activities</h1>
        <p className="text-muted-foreground">Fun activities for Emma's development</p>
      </div>
      
      <div className="space-y-4">
        {activities.map((activity) => (
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
        <p className="text-muted-foreground">Share Emma's journey with loved ones</p>
      </div>
      
      <Card className="p-6 text-center space-y-4">
        <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto">
          <Users className="h-8 w-8 text-primary-foreground" />
        </div>
        <div>
          <h3 className="font-semibold mb-2">Invite Family Members</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Share a unique code with partners, grandparents, or caregivers to let them track Emma's progress too.
          </p>
        </div>
        <div className="space-y-3">
          <Button variant="default" className="w-full">
            Generate Family Code
          </Button>
          <Button variant="outline" className="w-full">
            Join with Code
          </Button>
        </div>
      </Card>

      <Card className="p-4 bg-gradient-subtle">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 bg-gradient-secondary rounded-full flex items-center justify-center">
            <Heart className="h-5 w-5 text-secondary-foreground" />
          </div>
          <div>
            <p className="font-semibold">Connected Family</p>
            <p className="text-sm text-muted-foreground">2 members</p>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between p-2 bg-card rounded-lg">
            <span className="text-sm">Mom (You)</span>
            <span className="text-xs text-muted-foreground">Admin</span>
          </div>
          <div className="flex items-center justify-between p-2 bg-card rounded-lg">
            <span className="text-sm">Dad</span>
            <span className="text-xs text-muted-foreground">Member</span>
          </div>
        </div>
      </Card>
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