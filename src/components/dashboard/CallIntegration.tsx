
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Phone, PhoneOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CallIntegrationProps {
  leadName: string;
  phoneNumber: string;
  children: React.ReactNode;
  onCallComplete?: (notes: string, outcome: string, duration: string) => void;
}

export const CallIntegration = ({
  leadName,
  phoneNumber,
  children,
  onCallComplete,
}: CallIntegrationProps) => {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [callActive, setCallActive] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [durationTimer, setDurationTimer] = useState<NodeJS.Timeout | null>(null);
  const [callNotes, setCallNotes] = useState("");
  const [callOutcome, setCallOutcome] = useState("follow-up-required");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const startCall = () => {
    setCallActive(true);
    // Start timer
    const timer = setInterval(() => {
      setCallDuration((prev) => prev + 1);
    }, 1000);
    setDurationTimer(timer);

    toast({
      title: "Call started",
      description: `Now calling ${leadName} at ${phoneNumber}`,
    });
  };

  const endCall = () => {
    setCallActive(false);
    if (durationTimer) {
      clearInterval(durationTimer);
      setDurationTimer(null);
    }

    toast({
      title: "Call ended",
      description: `Call with ${leadName} ended. Duration: ${formatDuration(callDuration)}`,
    });
  };

  const handleSubmitCallDetails = async () => {
    if (!callNotes.trim()) {
      toast({
        title: "Missing information",
        description: "Please enter call notes before submitting.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // In a real application, this would be an API call to save the call details
      await new Promise(resolve => setTimeout(resolve, 800));
      
      toast({
        title: "Call logged",
        description: "Call details have been saved successfully.",
      });
      
      if (onCallComplete) {
        onCallComplete(callNotes, callOutcome, formatDuration(callDuration));
      }
      
      // Reset state
      setCallNotes("");
      setCallOutcome("follow-up-required");
      setCallDuration(0);
      setIsOpen(false);
    } catch (error) {
      toast({
        title: "Failed to log call",
        description: "There was an error saving the call details. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Clean up timer when dialog closes
  const handleDialogChange = (open: boolean) => {
    if (!open && durationTimer) {
      clearInterval(durationTimer);
      setDurationTimer(null);
      setCallActive(false);
      setCallDuration(0);
    }
    setIsOpen(open);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleDialogChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Call {leadName}</DialogTitle>
          <DialogDescription>
            {phoneNumber}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          {/* Call controls */}
          <div className="flex flex-col items-center justify-center space-y-4">
            {callActive ? (
              <>
                <div className="text-2xl font-bold text-red-500">{formatDuration(callDuration)}</div>
                <Button
                  size="lg"
                  variant="destructive"
                  className="rounded-full w-16 h-16 flex items-center justify-center"
                  onClick={endCall}
                >
                  <PhoneOff className="h-6 w-6" />
                </Button>
                <div className="text-sm">Call in progress</div>
              </>
            ) : (
              <>
                <Button
                  size="lg"
                  className="bg-green-600 hover:bg-green-700 rounded-full w-16 h-16 flex items-center justify-center"
                  onClick={startCall}
                >
                  <Phone className="h-6 w-6" />
                </Button>
                <div className="text-sm">Click to start call</div>
              </>
            )}
          </div>
          
          {/* Call notes & outcome */}
          {!callActive && callDuration > 0 && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="outcome">Call Outcome</Label>
                <Select
                  value={callOutcome}
                  onValueChange={setCallOutcome}
                >
                  <SelectTrigger id="outcome">
                    <SelectValue placeholder="Select outcome" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="follow-up-required">Follow-up Required</SelectItem>
                    <SelectItem value="interested">Interested</SelectItem>
                    <SelectItem value="not-interested">Not Interested</SelectItem>
                    <SelectItem value="application-started">Application Started</SelectItem>
                    <SelectItem value="called-back-later">Will Call Back Later</SelectItem>
                    <SelectItem value="no-answer">No Answer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="notes">Call Notes</Label>
                <Textarea
                  id="notes"
                  value={callNotes}
                  onChange={(e) => setCallNotes(e.target.value)}
                  placeholder="Enter notes about this call..."
                  rows={5}
                />
              </div>
            </div>
          )}
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          {!callActive && callDuration > 0 && (
            <Button 
              onClick={handleSubmitCallDetails} 
              className="bg-blue-600 hover:bg-blue-700"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving..." : "Save Call Details"}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
