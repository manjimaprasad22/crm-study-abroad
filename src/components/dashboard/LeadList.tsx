import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, Phone, Mail, Eye } from "lucide-react";
import { CallIntegration } from "./CallIntegration";
import { EmailNotification } from "./EmailNotification";
import { useToast } from "@/hooks/use-toast";

export const LeadList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const navigate = useNavigate();
  const { toast } = useToast();

  const leads = [
    {
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
      lastContact: "2024-01-15"
    },
    {
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
      lastContact: "2024-01-14"
    },
    {
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
      lastContact: "2024-01-13"
    },
    {
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
      lastContact: "2024-01-12"
    }
  ];

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

  const handleViewLead = (leadId: number) => {
    navigate(`/dashboard/lead/${leadId}`);
  };

  const handleCallComplete = (notes: string, outcome: string, duration: string) => {
    toast({
      title: "Call logged",
      description: "Call details have been recorded successfully.",
    });
  };

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || lead.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Lead Management</h2>
        <Button className="bg-blue-600 hover:bg-blue-700">
          Export Leads
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search leads by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="New">New</SelectItem>
                <SelectItem value="Contacted">Contacted</SelectItem>
                <SelectItem value="Qualified">Qualified</SelectItem>
                <SelectItem value="Proposal Sent">Proposal Sent</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              More Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Leads Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Leads ({filteredLeads.length})</CardTitle>
          <CardDescription>Manage and track your leads across all channels</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Lead</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Source</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Score</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Program</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Assigned To</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredLeads.map((lead) => (
                  <tr key={lead.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div>
                        <p className="font-medium text-gray-900">{lead.name}</p>
                        <p className="text-sm text-gray-600">{lead.email}</p>
                        <p className="text-sm text-gray-600">{lead.phone}</p>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <Badge variant="outline">{lead.source}</Badge>
                    </td>
                    <td className="py-4 px-4">
                      <Badge className={getStatusColor(lead.status)}>
                        {lead.status}
                      </Badge>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`font-medium ${getScoreColor(lead.score)}`}>
                        {lead.score}%
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div>
                        <p className="font-medium">{lead.program}</p>
                        <p className="text-sm text-gray-600">{lead.country}</p>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <p className="text-sm">{lead.assignedTo}</p>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <CallIntegration
                          leadName={lead.name}
                          phoneNumber={lead.phone}
                          onCallComplete={handleCallComplete}
                        >
                          <Button size="sm" variant="outline">
                            <Phone className="h-3 w-3" />
                          </Button>
                        </CallIntegration>
                        
                        <EmailNotification
                          recipient={lead.email}
                          recipientName={lead.name}
                        >
                          <Button size="sm" variant="outline">
                            <Mail className="h-3 w-3" />
                          </Button>
                        </EmailNotification>
                        
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleViewLead(lead.id)}
                        >
                          <Eye className="h-3 w-3" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
