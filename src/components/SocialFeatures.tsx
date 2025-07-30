import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Users, MessageCircle, Heart, Share2, Trophy, Star, Lock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SocialPost {
  id: string;
  author: {
    name: string;
    avatar?: string;
    isVerified?: boolean;
  };
  content: string;
  type: 'milestone' | 'question' | 'tip' | 'celebration';
  likes: number;
  comments: number;
  isLiked: boolean;
  ageGroup: string;
  timeAgo: string;
  isAnonymous: boolean;
}

interface SocialFeaturesProps {
  onCreatePost: () => void;
}

export function SocialFeatures({ onCreatePost }: SocialFeaturesProps) {
  const [activeTab, setActiveTab] = useState<'feed' | 'groups' | 'milestones'>('feed');
  const { toast } = useToast();

  const posts: SocialPost[] = [
    {
      id: '1',
      author: { name: 'Anonymous Parent', isVerified: false },
      content: 'My 2-year-old just said their first complete sentence! "I want more crackers please." So proud! 🥺❤️',
      type: 'milestone',
      likes: 24,
      comments: 8,
      isLiked: false,
      ageGroup: '2-3 years',
      timeAgo: '2 hours ago',
      isAnonymous: true
    },
    {
      id: '2',
      author: { name: 'Parent Helper', isVerified: true },
      content: 'Tip: Reading the same book multiple times helps with language development. Repetition is key at this age!',
      type: 'tip',
      likes: 56,
      comments: 12,
      isLiked: true,
      ageGroup: '1-3 years',
      timeAgo: '5 hours ago',
      isAnonymous: false
    },
    {
      id: '3',
      author: { name: 'Anonymous Parent', isVerified: false },
      content: 'Any tips for dealing with bedtime tantrums? My 18-month-old has been resisting sleep lately.',
      type: 'question',
      likes: 8,
      comments: 15,
      isLiked: false,
      ageGroup: '1-2 years',
      timeAgo: '1 day ago',
      isAnonymous: true
    }
  ];

  const groups = [
    { name: 'First Time Parents', members: '2.3k', category: 'Support' },
    { name: 'Toddler Milestones', members: '1.8k', category: 'Development' },
    { name: 'Working Parents', members: '3.1k', category: 'Lifestyle' },
    { name: 'Nutrition & Feeding', members: '1.5k', category: 'Health' }
  ];

  const milestoneStats = [
    { label: 'Walking', achieved: 89, total: 100 },
    { label: 'First Words', achieved: 95, total: 100 },
    { label: 'Potty Training', achieved: 34, total: 100 },
    { label: 'Social Skills', achieved: 78, total: 100 }
  ];

  const handleLike = (postId: string) => {
    toast({
      title: "Liked! ❤️",
      description: "Your support means a lot to other parents"
    });
  };

  const handleComment = (postId: string) => {
    toast({
      title: "Comment feature coming soon!",
      description: "We're working on making parent discussions even better"
    });
  };

  const renderFeed = () => (
    <div className="space-y-4">
      {/* Create Post */}
      <Card className="p-4">
        <div className="flex items-center gap-3">
          <Avatar className="w-10 h-10">
            <AvatarFallback>👤</AvatarFallback>
          </Avatar>
          <Button 
            variant="outline" 
            className="flex-1 justify-start text-muted-foreground"
            onClick={onCreatePost}
          >
            Share your parenting moment...
          </Button>
        </div>
      </Card>

      {/* Posts */}
      {posts.map((post) => (
        <Card key={post.id} className="p-4">
          <div className="space-y-3">
            {/* Header */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <Avatar className="w-8 h-8">
                  <AvatarFallback>
                    {post.isAnonymous ? '🕶️' : post.author.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-medium">{post.author.name}</span>
                    {post.author.isVerified && (
                      <Star className="h-3 w-3 fill-current text-blue-500" />
                    )}
                    {post.isAnonymous && (
                      <Lock className="h-3 w-3 text-muted-foreground" />
                    )}
                  </div>
                  <span className="text-xs text-muted-foreground">{post.timeAgo}</span>
                </div>
              </div>
              <Badge variant="secondary" className="text-xs">
                {post.ageGroup}
              </Badge>
            </div>

            {/* Content */}
            <p className="text-sm">{post.content}</p>

            {/* Actions */}
            <div className="flex items-center justify-between pt-2 border-t">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleLike(post.id)}
                  className={post.isLiked ? 'text-red-500' : ''}
                >
                  <Heart className={`h-4 w-4 mr-1 ${post.isLiked ? 'fill-current' : ''}`} />
                  {post.likes}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleComment(post.id)}
                >
                  <MessageCircle className="h-4 w-4 mr-1" />
                  {post.comments}
                </Button>
              </div>
              <Button variant="ghost" size="sm">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );

  const renderGroups = () => (
    <div className="space-y-4">
      <div className="text-center py-4">
        <h3 className="text-lg font-semibold mb-2">Parent Communities</h3>
        <p className="text-sm text-muted-foreground">
          Connect with parents in similar situations
        </p>
      </div>

      {groups.map((group, index) => (
        <Card key={index} className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center">
                <Users className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <h4 className="font-semibold">{group.name}</h4>
                <p className="text-sm text-muted-foreground">
                  {group.members} members • {group.category}
                </p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              Join
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );

  const renderMilestones = () => (
    <div className="space-y-4">
      <div className="text-center py-4">
        <h3 className="text-lg font-semibold mb-2">Community Milestones</h3>
        <p className="text-sm text-muted-foreground">
          See how your child compares to peers (anonymously)
        </p>
      </div>

      {milestoneStats.map((stat, index) => (
        <Card key={index} className="p-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold">{stat.label}</h4>
              <span className="text-sm text-muted-foreground">
                {stat.achieved}% achieved
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-gradient-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${stat.achieved}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Based on {stat.total} children in your age group
            </p>
          </div>
        </Card>
      ))}

      <Card className="p-4 bg-gradient-subtle text-center">
        <Trophy className="h-8 w-8 mx-auto mb-2 text-primary" />
        <h4 className="font-semibold mb-1">Your child is doing great!</h4>
        <p className="text-sm text-muted-foreground">
          Every child develops at their own pace
        </p>
      </Card>
    </div>
  );

  const tabs = [
    { id: 'feed', label: 'Feed', icon: MessageCircle },
    { id: 'groups', label: 'Groups', icon: Users },
    { id: 'milestones', label: 'Stats', icon: Trophy }
  ];

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="flex gap-1 p-1 bg-muted rounded-xl">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveTab(tab.id as any)}
              className="flex-1"
            >
              <Icon className="h-4 w-4 mr-2" />
              {tab.label}
            </Button>
          );
        })}
      </div>

      {/* Content */}
      {activeTab === 'feed' && renderFeed()}
      {activeTab === 'groups' && renderGroups()}
      {activeTab === 'milestones' && renderMilestones()}

      {/* Privacy Notice */}
      <Card className="p-3 bg-blue-50 border-blue-200">
        <div className="flex items-start gap-2">
          <Lock className="h-4 w-4 text-blue-600 mt-0.5" />
          <div>
            <p className="text-xs font-medium text-blue-800">Privacy Protected</p>
            <p className="text-xs text-blue-600">
              All posts are anonymous by default. Your child's data is never shared.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}