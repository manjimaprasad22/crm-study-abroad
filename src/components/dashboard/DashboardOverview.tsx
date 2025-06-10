
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Phone, CheckCircle, TrendingUp, Calendar, Target } from "lucide-react";

export const DashboardOverview = () => {
  const stats = [
    {
      title: "Total Leads",
      value: "1,247",
      change: "+12%",
      icon: Users,
      color: "text-blue-600"
    },
    {
      title: "Calls Today",
      value: "47",
      change: "+8%",
      icon: Phone,
      color: "text-green-600"
    },
    {
      title: "Converted",
      value: "23",
      change: "+15%",
      icon: CheckCircle,
      color: "text-purple-600"
    },
    {
      title: "Success Rate",
      value: "68%",
      change: "+3%",
      icon: TrendingUp,
      color: "text-orange-600"
    }
  ];

  const recentLeads = [
    { name: "Sarah Johnson", source: "Facebook", status: "New", score: 85 },
    { name: "Michael Chen", source: "Website", status: "Contacted", score: 92 },
    { name: "Emma Wilson", source: "Instagram", status: "Qualified", score: 78 },
    { name: "David Kumar", source: "Referral", status: "New", score: 95 },
  ];

  const upcomingTasks = [
    { task: "Follow up with Sarah Johnson", time: "10:00 AM", priority: "High" },
    { task: "Send documents to Michael Chen", time: "2:30 PM", priority: "Medium" },
    { task: "Schedule call with Emma Wilson", time: "4:00 PM", priority: "High" },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-green-600 flex items-center mt-1">
                {stat.change} from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Leads */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="h-5 w-5 mr-2 text-blue-600" />
              Recent Leads
            </CardTitle>
            <CardDescription>Latest leads captured across all channels</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentLeads.map((lead, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">{lead.name}</p>
                    <p className="text-sm text-gray-600">Source: {lead.source}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline">{lead.status}</Badge>
                    <span className="text-sm font-medium text-green-600">{lead.score}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Tasks */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-orange-600" />
              Today's Tasks
            </CardTitle>
            <CardDescription>Your upcoming activities and follow-ups</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingTasks.map((task, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">{task.task}</p>
                    <p className="text-sm text-gray-600">{task.time}</p>
                  </div>
                  <Badge 
                    variant={task.priority === "High" ? "destructive" : "secondary"}
                  >
                    {task.priority}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Activity Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Target className="h-5 w-5 mr-2 text-purple-600" />
            Performance Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">247</div>
              <div className="text-gray-600">Leads This Month</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">68</div>
              <div className="text-gray-600">Conversions</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">₹12.4L</div>
              <div className="text-gray-600">Revenue Generated</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
