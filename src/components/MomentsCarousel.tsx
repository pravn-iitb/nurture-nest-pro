import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Camera, Heart, Share } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

interface Moment {
  id: string;
  type: string;
  title: string;
  image?: string;
  date: string;
}

interface MomentsCarouselProps {
  moments: Moment[];
  onCapture: () => void;
  onLove: (id: string) => void;
  onShare: (id: string) => void;
}

const exampleMoments = [
  {
    id: "example-1",
    title: "First Smile",
    type: "milestone",
    image: "https://images.unsplash.com/photo-1544880503-fae5212e6ba5?w=300&h=300&fit=crop&crop=face",
    isExample: true
  },
  {
    id: "example-2", 
    title: "Tummy Time",
    type: "activity",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop",
    isExample: true
  },
  {
    id: "example-3",
    title: "First Foods",
    type: "feeding",
    image: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=300&h=300&fit=crop",
    isExample: true
  }
];

export function MomentsCarousel({ moments, onCapture, onLove, onShare }: MomentsCarouselProps) {
  const allMoments = moments.length > 0 ? moments : exampleMoments;
  const hasUserMoments = moments.length > 0;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold">Today's Moments</h2>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onCapture}
          className="text-primary hover:bg-primary/10"
        >
          <Camera className="h-4 w-4 mr-1" />
          Capture
        </Button>
      </div>

      {!hasUserMoments && (
        <div className="text-center py-4 px-4 bg-muted/30 rounded-xl">
          <p className="text-sm text-muted-foreground mb-2">
            ✨ Capture your first precious moment
          </p>
          <p className="text-xs text-muted-foreground">
            Here are some ideas to get you started
          </p>
        </div>
      )}

      <Carousel className="w-full">
        <CarouselContent className="-ml-2 md:-ml-4">
          {allMoments.map((moment, index) => (
            <CarouselItem key={moment.id} className="pl-2 md:pl-4 basis-3/4 md:basis-1/2">
              <Card className={`overflow-hidden ${!hasUserMoments ? 'opacity-70 border-dashed' : ''}`}>
                <div className="aspect-square relative">
                  <img 
                    src={moment.image} 
                    alt={moment.title}
                    className="w-full h-full object-cover"
                  />
                  {!hasUserMoments && (
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                      <div className="text-white text-center">
                        <Camera className="h-6 w-6 mx-auto mb-1" />
                        <p className="text-xs">Example</p>
                      </div>
                    </div>
                  )}
                </div>
                <CardContent className="p-3">
                  <h3 className="font-medium text-sm mb-2">{moment.title}</h3>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">
                      {hasUserMoments ? moment.date : "Tap capture to add"}
                    </span>
                    {hasUserMoments && (
                      <div className="flex gap-1">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-6 w-6 p-0"
                          onClick={() => onLove(moment.id)}
                        >
                          <Heart className="h-3 w-3" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-6 w-6 p-0"
                          onClick={() => onShare(moment.id)}
                        >
                          <Share className="h-3 w-3" />
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex" />
        <CarouselNext className="hidden md:flex" />
      </Carousel>
    </div>
  );
}