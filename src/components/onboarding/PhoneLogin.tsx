import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Phone, Shield, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import motherChildImage from '@/assets/mother-child.jpg';

interface PhoneLoginProps {
  onPhoneSubmit: (phone: string) => void;
}

export function PhoneLogin({ onPhoneSubmit }: PhoneLoginProps) {
  const [phone, setPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length < 10) {
      toast({
        title: "Invalid phone number",
        description: "Please enter a valid 10-digit phone number",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      onPhoneSubmit(phone);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Logo/Header */}
        <div className="text-center space-y-4">
          <div className="w-24 h-24 bg-gradient-primary rounded-full flex items-center justify-center mx-auto">
            <Users className="h-12 w-12 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">NurtureNest</h1>
            <p className="text-muted-foreground">Your child's development companion</p>
          </div>
        </div>

        {/* Hero Image */}
        <div className="rounded-2xl overflow-hidden shadow-soft">
          <img 
            src={motherChildImage} 
            alt="Mother and child" 
            className="w-full h-48 object-cover"
          />
        </div>

        {/* Login Form */}
        <Card className="p-6 space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-xl font-semibold">Welcome to NurtureNest</h2>
            <p className="text-sm text-muted-foreground">
              Track your child's milestones, get expert advice, and connect with family
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="tel"
                  placeholder="Enter your phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="pl-10"
                  maxLength={10}
                />
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading || phone.length < 10}
            >
              {isLoading ? "Sending OTP..." : "Continue with Phone"}
            </Button>
          </form>

          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Shield className="h-3 w-3" />
            <span>Your privacy is protected. We never share your data.</span>
          </div>
        </Card>

        {/* Features Preview */}
        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="space-y-1">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center mx-auto">
              <span className="text-xs text-primary-foreground">📊</span>
            </div>
            <p className="text-xs text-muted-foreground">Track Growth</p>
          </div>
          <div className="space-y-1">
            <div className="w-8 h-8 bg-gradient-secondary rounded-lg flex items-center justify-center mx-auto">
              <span className="text-xs text-secondary-foreground">🎯</span>
            </div>
            <p className="text-xs text-muted-foreground">Expert Tips</p>
          </div>
          <div className="space-y-1">
            <div className="w-8 h-8 bg-gradient-accent rounded-lg flex items-center justify-center mx-auto">
              <span className="text-xs text-accent-foreground">👨‍👩‍👧</span>
            </div>
            <p className="text-xs text-muted-foreground">Family Share</p>
          </div>
        </div>
      </div>
    </div>
  );
}