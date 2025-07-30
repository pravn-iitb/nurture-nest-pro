import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { ArrowLeft, Timer } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface OTPVerificationProps {
  phone: string;
  onVerify: (otp: string) => void;
  onBack: () => void;
}

export function OTPVerification({ phone, onVerify, onBack }: OTPVerificationProps) {
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const { toast } = useToast();

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const handleVerify = async () => {
    if (otp.length !== 4) {
      toast({
        title: "Invalid OTP",
        description: "Please enter the complete 4-digit OTP",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      await onVerify(otp);
    } catch (error) {
      toast({
        title: "Verification failed",
        description: "Invalid OTP. Please try again.",
        variant: "destructive"
      });
      setOtp('');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = () => {
    setTimeLeft(60);
    setOtp('');
    toast({
      title: "OTP Sent",
      description: "A new OTP has been sent to your phone"
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <Button 
          variant="ghost" 
          onClick={onBack}
          className="mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        <Card className="p-6 space-y-6 text-center">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold">Verify Your Phone</h2>
            <p className="text-muted-foreground">
              We've sent a 4-digit code to
            </p>
            <p className="font-semibold">{phone}</p>
          </div>

          <div className="space-y-4">
            <InputOTP value={otp} onChange={setOtp} maxLength={4}>
              <InputOTPGroup className="gap-3">
                <InputOTPSlot index={0} className="w-12 h-12 text-lg" />
                <InputOTPSlot index={1} className="w-12 h-12 text-lg" />
                <InputOTPSlot index={2} className="w-12 h-12 text-lg" />
                <InputOTPSlot index={3} className="w-12 h-12 text-lg" />
              </InputOTPGroup>
            </InputOTP>

            <div className="text-sm text-muted-foreground">
              {timeLeft > 0 ? (
                <div className="flex items-center justify-center gap-1">
                  <Timer className="h-3 w-3" />
                  Resend OTP in {timeLeft}s
                </div>
              ) : (
                <Button variant="link" onClick={handleResend} className="p-0 h-auto">
                  Resend OTP
                </Button>
              )}
            </div>
          </div>

          <Button 
            onClick={handleVerify}
            className="w-full" 
            disabled={isLoading || otp.length !== 4}
          >
            {isLoading ? "Verifying..." : "Verify & Continue"}
          </Button>

          <div className="text-xs text-muted-foreground">
            💡 Tip: Use OTP "1234" for demo purposes
          </div>
        </Card>
      </div>
    </div>
  );
}