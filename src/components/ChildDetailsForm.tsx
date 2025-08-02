import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Baby, Calendar, Ruler, Weight, X } from "lucide-react";

interface ChildDetails {
  name: string;
  birthDate: string;
  stage: string;
  weight?: string;
  height?: string;
  headCircumference?: string;
}

interface ChildDetailsFormProps {
  child?: ChildDetails;
  onSave: (details: ChildDetails) => void;
  onCancel: () => void;
}

export function ChildDetailsForm({ child, onSave, onCancel }: ChildDetailsFormProps) {
  const [details, setDetails] = useState<ChildDetails>({
    name: child?.name || "",
    birthDate: child?.birthDate || "",
    stage: child?.stage || "newborn",
    weight: child?.weight || "",
    height: child?.height || "",
    headCircumference: child?.headCircumference || ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(details);
  };

  const getAgeInDays = () => {
    if (!details.birthDate) return 0;
    const birth = new Date(details.birthDate);
    const now = new Date();
    return Math.floor((now.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24));
  };

  const ageInDays = getAgeInDays();

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-lg">Child Details</CardTitle>
          <Button variant="ghost" size="sm" onClick={onCancel}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Basic Info */}
            <div className="space-y-2">
              <Label htmlFor="name">Child's Name</Label>
              <Input
                id="name"
                value={details.name}
                onChange={(e) => setDetails({ ...details, name: e.target.value })}
                placeholder="Enter name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="birthDate">Birth Date</Label>
              <Input
                id="birthDate"
                type="date"
                value={details.birthDate}
                onChange={(e) => setDetails({ ...details, birthDate: e.target.value })}
                required
              />
              {details.birthDate && (
                <p className="text-xs text-muted-foreground">
                  {ageInDays} days old
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="stage">Development Stage</Label>
              <Select value={details.stage} onValueChange={(value) => setDetails({ ...details, stage: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="expecting">Expecting</SelectItem>
                  <SelectItem value="newborn">Newborn (0-2 months)</SelectItem>
                  <SelectItem value="infant">Infant (2-12 months)</SelectItem>
                  <SelectItem value="toddler">Toddler (1-3 years)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Age-specific measurements */}
            {details.birthDate && (
              <>
                <div className="pt-4 border-t">
                  <h4 className="font-medium mb-3 flex items-center gap-2">
                    <Ruler className="h-4 w-4" />
                    Measurements
                  </h4>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label htmlFor="weight">Weight</Label>
                      <Input
                        id="weight"
                        value={details.weight}
                        onChange={(e) => setDetails({ ...details, weight: e.target.value })}
                        placeholder={ageInDays < 365 ? "2.5 kg" : "12 kg"}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="height">Height</Label>
                      <Input
                        id="height"
                        value={details.height}
                        onChange={(e) => setDetails({ ...details, height: e.target.value })}
                        placeholder={ageInDays < 365 ? "50 cm" : "75 cm"}
                      />
                    </div>
                  </div>

                  {ageInDays < 365 && (
                    <div className="space-y-2 mt-3">
                      <Label htmlFor="headCircumference">Head Circumference</Label>
                      <Input
                        id="headCircumference"
                        value={details.headCircumference}
                        onChange={(e) => setDetails({ ...details, headCircumference: e.target.value })}
                        placeholder="35 cm"
                      />
                      <p className="text-xs text-muted-foreground">
                        Important for babies under 1 year
                      </p>
                    </div>
                  )}
                </div>
              </>
            )}

            <div className="flex gap-3 pt-4">
              <Button type="button" variant="outline" onClick={onCancel} className="flex-1">
                Cancel
              </Button>
              <Button type="submit" className="flex-1">
                Save Details
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}