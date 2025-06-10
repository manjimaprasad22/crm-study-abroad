import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  Clock, 
  Phone, 
  Mail, 
  Calendar, 
  MessageSquare,
  CheckCircle,
  ArrowLeft,
  CheckSquare,
  Plus
} from "lucide-react";
import { CallIntegration } from "./CallIntegration";
import { EmailNotification } from "./EmailNotification";
import { FollowUpCreate } from "./FollowUpCreate";
import { useToast } from "@/hooks/use-toast";

// Mock data for the lead
const MOCK_LEADS = {
  "1": {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.j@email.com",
    phone: "+1-555-0123",
    source: "Facebook",
    status: "New",
    score: 85,
    country: "Canada",
    program: "Masters in CS",
    assignedTo: "John Smith",
    lastContact: "2024-01-15",
    notes: "Interested in fall intake. Has questions about scholarships.",
    createdAt: "2024-01-10",
  },
  "2": {
    id: 2,
    name: "Michael Chen",
    email: "m.chen@email.com",
    phone: "+1-555-0124",
    source: "Website",
    status: "Contacted",
    score: 92,
    country: "Australia",
    program: "MBA",
    assignedTo: "Emma Davis",
    lastContact: "2024-01-14",
    notes: "Looking for universities with strong industry connections.",
    createdAt: "2024-01-05",
  },
  "3": {
    id: 3,
    name: "Emma Wilson",
    email: "emma.w@email.com",
    phone: "+1-555-0125",
    source: "Instagram",
    status: "Qualified",
    score: 78,
    country: "UK",
    program: "Masters in Data Science",
    assignedTo: "John Smith",
    lastContact: "2024-01-13",
    notes: "Has a scholarship offer from another university.",
    createdAt: "2024-01-03",
  },
  "4": {
    id: 4,
    name: "David Kumar",
    email: "d.kumar@email.com",
    phone: "+1-555-0126",
    source: "Referral",
    status: "Proposal Sent",
    score: 95,
    country: "Germany",
    program: "PhD in Engineering",
    assignedTo: "Emma Davis",
    lastContact: "2024-01-12",
    notes: "Already has research experience. Looking for funded positions.",
    createdAt: "2023-12-28",
  }
};

// Mock data for follow-up history
const FOLLOW_UP_HISTORY = [
  {
    id: 1,
    leadId: 1,
    type: "Call",
    date: "2024-01-15",
    agent: "John Smith",
    duration: "8:45",
    notes: "Discussed scholarship options and application deadlines",
    outcome: "Interested, scheduled follow-up call"
  },
  {
    id: 2,
    leadId: 1,
    type: "Email",
    date: "2024-01-12",
    agent: "John Smith",
    subject: "University Brochures",
    notes: "Sent program details and scholarship information",
    outcome: "Requested more information about housing"
  },
  {
    id: 3,
    leadId: 1,
    type: "Call",
    date: "2024-01-10",
    agent: "Emma Davis",
    duration: "5:20",
    notes: "Initial contact, introduction to our services",
    outcome: "Requested brochures via email"
  }
];

// Mock data for tasks
const TASKS_DATA = [
  {
    id: 101,
    leadId: 1,
    title: "Send scholarship information",
    description: "Email details about available scholarships for CS programs",
    dueDate: "2024-01-17",
    status: "Pending",
    assignee: "John Smith"
  },
  {
    id: 102,
    leadId: 1,
    title: "Schedule visa consultation",
    description: "Arrange meeting with visa expert",
    dueDate: "2024-01-20",
    status: "Pending",
    assignee: "Emma Davis"
  },
  {
    id: 103,
    leadId: 1,
    title: "Follow up on housing questions",
    description: "Call to discuss accommodation options",
    dueDate: "2024-01-18",
    status: "Completed",
    assignee: "John Smith"
  }
];

export const LeadDetail = () => {
  const { leadId } = useParams();
  const navigate = useNavigate();
  const [lead, setLead] = useState<any>(null);
  const [followUps, setFollowUps] = useState<any[]>([]);
  const [tasks, setTasks] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState("overview");
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // In a real application, these would be API calls
    const fetchData = async () => {
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 300));
        
        if (leadId && MOCK_LEADS[leadId as keyof typeof MOCK_LEADS]) {
          setLead(MOCK_LEADS[leadId as keyof typeof MOCK_LEADS]);
          setFollowUps(FOLLOW_UP_HISTORY.filter(h => h.leadId === Number(leadId)));
          setTasks(TASKS_DATA.filter(t => t.leadId === Number(leadId)));
        } else {
          navigate("/dashboard", { replace: true });
        }
      } catch (error) {
        console.error("Error fetching lead data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [leadId, navigate]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "New": return "bg-blue-100 text-blue-800";
      case "Contacted": return "bg-yellow-100 text-yellow-800";
      case "Qualified": return "bg-green-100 text-green-800";
      case "Proposal Sent": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600";
    if (score >= 70) return "text-yellow-600";
    return "text-red-600";
  };

  const handleCallComplete = (notes: string, outcome: string, duration: string) => {
    // Add the new call to the follow-up history
    const newCall = {
      id: Date.now(), // Use timestamp as temporary ID
      leadId: Number(leadId),
      type: "Call",
      date: new Date().toISOString().split('T')[0], // Today's date in YYYY-MM-DD format
      agent: "John Smith", // Hardcoded for demo
      duration: duration,
      notes: notes,
      outcome: outcome
    };
    
    setFollowUps([newCall, ...followUps]);
    
    toast({
      title: "Call logged",
      description: "Call details have been added to the lead's history.",
    });
  };

  const handleFollowUpCreated = (newFollowUp: any) => {
    setFollowUps([newFollowUp, ...followUps]);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Loading lead information...</div>
      </div>
    );
  }

  if (!lead) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Lead not found</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => navigate("/dashboard", { state: { activeSection: "leads" } })}
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Leads
          </Button>
          <h2 className="text-2xl font-bold text-gray-900">Lead Details</h2>
        </div>
        <div className="flex space-x-2">
          <CallIntegration
            leadName={lead.name}
            phoneNumber={lead.phone}
            onCallComplete={handleCallComplete}
          >
            <Button size="sm" className="bg-green-600 hover:bg-green-700">
              <Phone className="h-4 w-4 mr-1" />
              Call Lead
            </Button>
          </CallIntegration>

          <EmailNotification
            recipient={lead.email}
            recipientName={lead.name}
          >
            <Button size="sm" variant="outline">
              <Mail className="h-4 w-4 mr-1" />
              Send Email
            </Button>
          </EmailNotification>

          <FollowUpCreate
            leadId={Number(leadId)}
            onFollowUpCreated={handleFollowUpCreated}
          >
            <Button size="sm" variant="outline">
              <Plus className="h-4 w-4 mr-1" />
              Add Follow-up
            </Button>
          </FollowUpCreate>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Lead Information Card */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Lead Information</CardTitle>
              <Badge className={getStatusColor(lead.status)}>
                {lead.status}
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium">{lead.name}</h3>
                  <div className="text-sm text-gray-500">
                    Lead Score: <span className={getScoreColor(lead.score)}>{lead.score}%</span>
                  </div>
                </div>

                <Separator />
                
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 mr-2 text-gray-400" />
                    <a href={`mailto:${lead.email}`} className="text-blue-600 hover:underline">
                      {lead.email}
                    </a>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 mr-2 text-gray-400" />
                    <a href={`tel:${lead.phone}`} className="text-blue-600 hover:underline">
                      {lead.phone}
                    </a>
                  </div>
                </div>

                <Separator />
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Source:</span>
                    <span>{lead.source}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Country:</span>
                    <span>{lead.country}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Program:</span>
                    <span>{lead.program}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Assigned To:</span>
                    <span>{lead.assignedTo}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Last Contact:</span>
                    <span>{lead.lastContact}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Created:</span>
                    <span>{lead.createdAt}</span>
                  </div>
                </div>

                <Separator />
                
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Notes</h4>
                  <p className="text-sm">{lead.notes}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs Content */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="pb-2">
              <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid grid-cols-3 w-full">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="history">Follow-up History</TabsTrigger>
                  <TabsTrigger value="tasks">Tasks</TabsTrigger>
                </TabsList>
              
                <CardContent>
                  <TabsContent value="overview" className="space-y-4 mt-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium">Follow-up Activity</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">{followUps.length}</div>
                          <p className="text-xs text-gray-500">Total interactions</p>
                          <div className="mt-2 space-y-1">
                            {followUps.slice(0, 2).map((followUp) => (
                              <div key={followUp.id} className="flex items-center text-xs">
                                <Clock className="h-3 w-3 mr-1 text-gray-400" />
                                <span>
                                  {followUp.date} - {followUp.type}
                                </span>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium">Tasks</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">{tasks.filter(t => t.status === "Pending").length}</div>
                          <p className="text-xs text-gray-500">Pending tasks</p>
                          <div className="mt-2 space-y-1">
                            {tasks.slice(0, 2).map((task) => (
                              <div key={task.id} className="flex items-center text-xs">
                                <Calendar className="h-3 w-3 mr-1 text-gray-400" />
                                <span>
                                  {task.dueDate} - {task.title}
                                </span>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Recent Activity</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {followUps.map((activity) => (
                            <div key={activity.id} className="border-l-2 border-gray-200 pl-4 relative">
                              <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-blue-500"></div>
                              <div className="flex justify-between">
                                <h4 className="font-medium">{activity.type}</h4>
                                <span className="text-sm text-gray-500">{activity.date}</span>
                              </div>
                              <p className="text-sm">{activity.notes}</p>
                              <div className="text-xs text-gray-500 mt-1">
                                By {activity.agent} • Outcome: {activity.outcome}
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="history">
                    <div className="space-y-4">
                      {followUps.length > 0 ? (
                        followUps.map((history) => (
                          <Card key={history.id}>
                            <CardContent className="pt-6">
                              <div className="flex justify-between items-start">
                                <div>
                                  <div className="flex items-center">
                                    {history.type === "Call" ? (
                                      <Phone className="h-4 w-4 mr-2 text-blue-600" />
                                    ) : (
                                      <Mail className="h-4 w-4 mr-2 text-green-600" />
                                    )}
                                    <h4 className="font-medium">{history.type}</h4>
                                  </div>
                                  {history.type === "Call" && (
                                    <div className="text-sm text-gray-500 mt-1">
                                      Duration: {history.duration}
                                    </div>
                                  )}
                                  {history.type === "Email" && (
                                    <div className="text-sm text-gray-500 mt-1">
                                      Subject: {history.subject}
                                    </div>
                                  )}
                                </div>
                                <div className="text-right">
                                  <div className="text-sm">{history.date}</div>
                                  <div className="text-xs text-gray-500">By {history.agent}</div>
                                </div>
                              </div>
                              <div className="mt-3">
                                <p className="text-sm">{history.notes}</p>
                                <div className="mt-2">
                                  <Badge variant="outline">
                                    Outcome: {history.outcome}
                                  </Badge>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))
                      ) : (
                        <div className="text-center py-6 text-gray-500">
                          No follow-up history available for this lead.
                        </div>
                      )}
                    </div>
                  </TabsContent>

                  <TabsContent value="tasks">
                    <div className="space-y-4">
                      {tasks.length > 0 ? (
                        tasks.map((task) => (
                          <Card key={task.id}>
                            <CardContent className="pt-6">
                              <div className="flex items-start space-x-3">
                                <div className="mt-1">
                                  {task.status === "Completed" ? (
                                    <CheckSquare className="h-5 w-5 text-green-500" />
                                  ) : (
                                    <CheckCircle className="h-5 w-5 text-gray-300" />
                                  )}
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center justify-between">
                                    <h4 className={`font-medium ${task.status === "Completed" ? "line-through text-gray-400" : "text-gray-900"}`}>
                                      {task.title}
                                    </h4>
                                    <Badge
                                      className={task.status === "Completed" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}
                                    >
                                      {task.status}
                                    </Badge>
                                  </div>
                                  <p className={`text-sm mt-1 ${task.status === "Completed" ? "text-gray-400" : "text-gray-600"}`}>
                                    {task.description}
                                  </p>
                                  <div className="flex items-center justify-between text-xs text-gray-500 mt-2">
                                    <span>Assigned to: {task.assignee}</span>
                                    <div className="flex items-center">
                                      <Calendar className="h-3 w-3 mr-1" />
                                      {task.dueDate}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))
                      ) : (
                        <div className="text-center py-6 text-gray-500">
                          No tasks available for this lead.
                        </div>
                      )}

                      <div className="flex justify-center">
                        <Button className="bg-blue-600 hover:bg-blue-700">
                          <CheckSquare className="h-4 w-4 mr-1" />
                          Create New Task
                        </Button>
                      </div>
                    </div>
                  </TabsContent>
                </CardContent>
              </Tabs>
            </CardHeader>
          </Card>
        </div>
      </div>
    </div>
  );
};
