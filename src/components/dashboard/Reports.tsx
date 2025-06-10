
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BarChart3, TrendingUp, Download, Calendar } from "lucide-react";

export const Reports = () => {
  const monthlyStats = [
    { month: "Jan 2024", leads: 247, conversions: 68, revenue: "₹12.4L" },
    { month: "Dec 2023", leads: 189, conversions: 52, revenue: "₹9.8L" },
    { month: "Nov 2023", leads: 156, conversions: 41, revenue: "₹7.2L" },
    { month: "Oct 2023", leads: 203, conversions: 59, revenue: "₹11.1L" },
  ];

  const sourcePerformance = [
    { source: "Facebook", leads: 89, conversion: "28%", cost: "₹180" },
    { source: "Website", leads: 76, conversion: "31%", cost: "₹150" },
    { source: "Instagram", leads: 45, conversion: "22%", cost: "₹200" },
    { source: "Referrals", leads: 37, conversion: "43%", cost: "₹50" },
  ];

  const topPerformers = [
    { name: "Emma Davis", leads: 45, conversions: 19, revenue: "₹4.2L" },
    { name: "John Smith", leads: 38, conversions: 16, revenue: "₹3.8L" },
    { name: "Sarah Wilson", leads: 29, conversions: 12, revenue: "₹2.9L" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Reports & Analytics</h2>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Calendar className="h-4 w-4 mr-2" />
            Date Range
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-green-600">₹28.5L</p>
                <p className="text-xs text-green-600">+15% from last month</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Conversion Rate</p>
                <p className="text-2xl font-bold text-blue-600">27.5%</p>
                <p className="text-xs text-blue-600">+3% from last month</p>
              </div>
              <BarChart3 className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg. Deal Size</p>
                <p className="text-2xl font-bold text-purple-600">₹1.8L</p>
                <p className="text-xs text-purple-600">+8% from last month</p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Leads</p>
                <p className="text-2xl font-bold text-orange-600">342</p>
                <p className="text-xs text-orange-600">+12% from last month</p>
              </div>
              <BarChart3 className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Performance</CardTitle>
            <CardDescription>Lead generation and conversion trends</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {monthlyStats.map((stat, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">{stat.month}</p>
                    <p className="text-sm text-gray-600">{stat.leads} leads • {stat.conversions} conversions</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-600">{stat.revenue}</p>
                    <p className="text-sm text-gray-600">
                      {Math.round((stat.conversions / stat.leads) * 100)}% conversion
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Source Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Lead Source Performance</CardTitle>
            <CardDescription>Performance analysis by acquisition channel</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {sourcePerformance.map((source, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">{source.source}</p>
                    <p className="text-sm text-gray-600">{source.leads} leads generated</p>
                  </div>
                  <div className="text-right">
                    <Badge variant="outline" className="mb-1">
                      {source.conversion} conversion
                    </Badge>
                    <p className="text-sm text-gray-600">Cost per lead: {source.cost}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Performers */}
      <Card>
        <CardHeader>
          <CardTitle>Top Performing Counsellors</CardTitle>
          <CardDescription>Individual performance metrics for this month</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Counsellor</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Leads Handled</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Conversions</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Conversion Rate</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Revenue Generated</th>
                </tr>
              </thead>
              <tbody>
                {topPerformers.map((performer, index) => (
                  <tr key={index} className="border-b border-gray-100">
                    <td className="py-4 px-4">
                      <div className="flex items-center">
                        <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                          <span className="text-sm font-medium text-blue-600">
                            {performer.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <span className="font-medium">{performer.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">{performer.leads}</td>
                    <td className="py-4 px-4">{performer.conversions}</td>
                    <td className="py-4 px-4">
                      <Badge variant="outline">
                        {Math.round((performer.conversions / performer.leads) * 100)}%
                      </Badge>
                    </td>
                    <td className="py-4 px-4">
                      <span className="font-medium text-green-600">{performer.revenue}</span>
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
