import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Bookmark, Share2 } from "lucide-react";

interface Tip {
  id: string;
  title: string;
  content: string;
  category: string;
  ageGroup: string;
  readTime: string;
  liked: boolean;
  bookmarked: boolean;
}

interface ParentingTipProps {
  tip: Tip;
  onLike: (id: string) => void;
  onBookmark: (id: string) => void;
  onShare: (id: string) => void;
}

export function ParentingTip({ tip, onLike, onBookmark, onShare }: ParentingTipProps) {
  return (
    <Card className="p-5 space-y-4 hover:shadow-soft transition-all duration-300">
      <div className="flex items-start justify-between">
        <div className="space-y-2 flex-1">
          <div className="flex items-center gap-2">
            <span className="text-xs bg-gradient-primary text-primary-foreground px-2 py-1 rounded-lg">
              {tip.category}
            </span>
            <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-lg">
              {tip.ageGroup}
            </span>
          </div>
          <h3 className="font-semibold text-lg text-foreground">
            {tip.title}
          </h3>
        </div>
        <span className="text-xs text-muted-foreground">
          {tip.readTime}
        </span>
      </div>
      
      <p className="text-muted-foreground leading-relaxed">
        {tip.content}
      </p>
      
      <div className="flex items-center justify-between pt-2 border-t">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onLike(tip.id)}
            className={`${tip.liked ? 'text-secondary hover:text-secondary' : 'text-muted-foreground'}`}
          >
            <Heart className={`h-4 w-4 mr-1 ${tip.liked ? 'fill-current' : ''}`} />
            Like
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onBookmark(tip.id)}
            className={`${tip.bookmarked ? 'text-accent hover:text-accent' : 'text-muted-foreground'}`}
          >
            <Bookmark className={`h-4 w-4 mr-1 ${tip.bookmarked ? 'fill-current' : ''}`} />
            Save
          </Button>
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onShare(tip.id)}
          className="text-muted-foreground"
        >
          <Share2 className="h-4 w-4 mr-1" />
          Share
        </Button>
      </div>
    </Card>
  );
}