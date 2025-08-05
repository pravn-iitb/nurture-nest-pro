import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, ChevronUp, ChevronDown } from "lucide-react";

interface BottomSliderProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  height?: 'small' | 'medium' | 'large';
}

export function BottomSlider({ isOpen, onClose, title, children, height = 'medium' }: BottomSliderProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const getHeightClass = () => {
    if (isExpanded) return 'h-[85vh]';
    
    switch (height) {
      case 'small': return 'h-[30vh]';
      case 'medium': return 'h-[50vh]';
      case 'large': return 'h-[70vh]';
      default: return 'h-[50vh]';
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/20 z-40 transition-opacity duration-300"
        onClick={onClose}
      />
      
      {/* Slider */}
      <div className={`fixed bottom-0 left-0 right-0 z-50 transition-all duration-300 ${
        isOpen ? 'translate-y-0' : 'translate-y-full'
      }`}>
        <Card className={`rounded-t-2xl rounded-b-none border-0 shadow-2xl ${getHeightClass()} transition-all duration-300`}>
          {/* Handle bar */}
          <div className="w-12 h-1 bg-muted rounded-full mx-auto mt-3 mb-2" />
          
          {/* Header */}
          <div className="flex items-center justify-between px-4 pb-3 border-b border-border/50">
            <h3 className="font-semibold text-lg">{title}</h3>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsExpanded(!isExpanded)}
                className="h-8 w-8 p-0"
              >
                {isExpanded ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronUp className="h-4 w-4" />
                )}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {/* Content */}
          <div className="flex-1 overflow-y-auto px-4 py-4">
            {children}
          </div>
        </Card>
      </div>
    </>
  );
}

// Specific slider for medical reminders
interface MedicalSliderProps {
  isOpen: boolean;
  onClose: () => void;
  ageInMonths: number;
  completedEvents: string[];
  onMarkComplete: (id: string) => void;
  onSchedule: (id: string) => void;
}

export function MedicalSlider({ 
  isOpen, 
  onClose, 
  ageInMonths, 
  completedEvents, 
  onMarkComplete, 
  onSchedule 
}: MedicalSliderProps) {
  return (
    <BottomSlider
      isOpen={isOpen}
      onClose={onClose}
      title="Medical Schedule"
      height="medium"
    >
      <div className="space-y-3">
        {/* Simplified medical content */}
        <div className="text-center py-4">
          <p className="text-sm text-muted-foreground">
            Quick overview of upcoming medical appointments
          </p>
        </div>
        
        {/* Condensed medical items */}
        <div className="space-y-2">
          <Card className="p-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-sm">Next Checkup</h4>
                <p className="text-xs text-muted-foreground">Due in 2 weeks</p>
              </div>
              <Badge variant="outline" className="text-xs">
                Checkup
              </Badge>
            </div>
          </Card>
          
          <Card className="p-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-sm">Vaccinations</h4>
                <p className="text-xs text-muted-foreground">Up to date</p>
              </div>
              <Badge variant="outline" className="text-xs bg-green-100 text-green-800">
                Complete
              </Badge>
            </div>
          </Card>
        </div>
        
        <Button variant="outline" className="w-full mt-4">
          View Full Schedule
        </Button>
      </div>
    </BottomSlider>
  );
}