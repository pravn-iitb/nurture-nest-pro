import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Info, TrendingUp } from "lucide-react";
import { getAgeMeasurements, calculatePercentile, formatMeasurement } from "@/utils/measurements";

interface ChildDetailsFormProps {
  child: any;
  onSave: (details: any) => void;
  onCancel: () => void;
}

export function ChildDetailsForm({ child, onSave, onCancel }: ChildDetailsFormProps) {
  const [name, setName] = useState(child.name || "");
  const [birthDate, setBirthDate] = useState(child.birthDate || "");
  const [measurements, setMeasurements] = useState({
    weight: child.weight || "",
    height: child.height || "",
    headCircumference: child.headCircumference || "",
    temperature: child.temperature || ""
  });

  // Calculate age for context
  const ageInMonths = birthDate 
    ? Math.floor((new Date().getTime() - new Date(birthDate).getTime()) / (1000 * 60 * 60 * 24 * 30.44))
    : 0;
  
  const ageMeasurements = getAgeMeasurements(ageInMonths);

  const handleMeasurementChange = (key: string, value: string) => {
    setMeasurements(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    const processedMeasurements: any = {};
    Object.entries(measurements).forEach(([key, value]) => {
      if (value && typeof value === 'string') {
        processedMeasurements[key] = parseFloat(value) || 0;
      }
    });

    onSave({
      name,
      birthDate,
      ...processedMeasurements,
      lastMeasured: new Date().toISOString()
    });
  };

  const renderMeasurementField = (key: string, config: any) => {
    if (!config) return null;
    
    const value = measurements[key as keyof typeof measurements];
    const numericValue = parseFloat(value as string) || 0;
    const percentile = numericValue > 0 ? calculatePercentile(numericValue, ageInMonths, key as any) : null;

    return (
      <div key={key} className="space-y-2">
        <div className="flex items-center gap-2">
          <Label htmlFor={key} className="text-sm font-medium">
            {config.label}
          </Label>
          {config.required && (
            <Badge variant="outline" className="text-xs bg-primary/10 text-primary">
              Required
            </Badge>
          )}
        </div>
        
        <div className="relative">
          <Input
            id={key}
            type="number"
            step="0.1"
            value={value}
            onChange={(e) => handleMeasurementChange(key, e.target.value)}
            placeholder={config.placeholder}
            className="pr-12"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
            {config.unit}
          </span>
        </div>
        
        {percentile && (
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <TrendingUp className="h-3 w-3" />
            <span>~{Math.round(percentile)}th percentile</span>
          </div>
        )}
      </div>
    );
  };

  return (
    <Dialog open={true} onOpenChange={onCancel}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Update Child Details</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Basic Info */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter child's name"
              />
            </div>
            
            <div>
              <Label htmlFor="birthDate">Birth Date</Label>
              <Input
                id="birthDate"
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
              />
              {ageInMonths > 0 && (
                <p className="text-xs text-muted-foreground mt-1">
                  Age: {Math.floor(ageInMonths / 12)} years {ageInMonths % 12} months
                </p>
              )}
            </div>
          </div>

          {/* Age-Appropriate Measurements */}
          {ageInMonths > 0 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <h3 className="font-medium">Measurements</h3>
                <Info className="h-4 w-4 text-muted-foreground" />
              </div>
              
              <Card className="p-3 bg-muted/50">
                <p className="text-xs text-muted-foreground">
                  Tracking {Object.values(ageMeasurements).filter(m => m.required).length} key measurements for this age group
                </p>
              </Card>

              <div className="grid gap-4">
                {Object.entries(ageMeasurements).map(([key, config]) => 
                  renderMeasurementField(key, config)
                )}
              </div>
            </div>
          )}
          
          <div className="flex gap-2 pt-4 border-t">
            <Button variant="outline" onClick={onCancel} className="flex-1">
              Cancel
            </Button>
            <Button onClick={handleSave} className="flex-1">
              Save Changes
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}