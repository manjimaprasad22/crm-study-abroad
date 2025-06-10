
import { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface EmailNotificationProps {
  recipient: string;
  recipientName: string;
  subject?: string;
  children: React.ReactNode;
}

export const EmailNotification = ({ 
  recipient, 
  recipientName, 
  subject = "", 
  children 
}: EmailNotificationProps) => {
  const { toast } = useToast();
  const [emailSubject, setEmailSubject] = useState(subject || `Follow-up regarding your application`);
  const [emailBody, setEmailBody] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const handleSend = async () => {
    if (!emailSubject.trim() || !emailBody.trim()) {
      toast({
        title: "Missing information",
        description: "Please fill in both subject and message body.",
        variant: "destructive",
      });
      return;
    }

    setIsSending(true);

    try {
      // In a real application, this would be an API call to send the email
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Email sent",
        description: `Email successfully sent to ${recipientName}`,
      });
      
      setIsOpen(false);
      setEmailBody("");
    } catch (error) {
      toast({
        title: "Failed to send email",
        description: "There was an error sending your email. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Send Email Notification</DialogTitle>
          <DialogDescription>
            Send an email notification to {recipientName} ({recipient})
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="subject">Subject</Label>
            <Input
              id="subject"
              value={emailSubject}
              onChange={(e) => setEmailSubject(e.target.value)}
              placeholder="Enter email subject"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              value={emailBody}
              onChange={(e) => setEmailBody(e.target.value)}
              placeholder="Type your message here..."
              rows={8}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button 
            onClick={handleSend} 
            className="bg-blue-600 hover:bg-blue-700"
            disabled={isSending}
          >
            {isSending ? "Sending..." : <>
              <Mail className="h-4 w-4 mr-1" />
              Send Email
            </>}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
