import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar, Clock, Users, CheckCircle, AlertCircle, Link } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { TaskDetail } from "./TaskDetail";
import { TaskCreate } from "./TaskCreate";
import { EmailNotification } from "./EmailNotification";

export const TaskManager = () => {
  const { toast } = useToast();
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Follow up with Sarah Johnson",
      description: "Initial consultation call scheduled",
      assignee: "John Smith",
      dueDate: "2024-01-16",
      priority: "High",
      status: "Pending",
      leadName: "Sarah Johnson",
      completed: false
    },
    {
      id: 2,
      title: "Send university brochures to Michael Chen",
      description: "Send detailed information about Canadian universities",
      assignee: "Emma Davis",
      dueDate: "2024-01-16",
      priority: "Medium",
      status: "In Progress",
      leadName: "Michael Chen",
      completed: false
    },
    {
      id: 3,
      title: "Schedule IELTS guidance session",
      description: "Help with IELTS preparation strategy",
      assignee: "John Smith",
      dueDate: "2024-01-17",
      priority: "Low",
      status: "Pending",
      leadName: "Emma Wilson",
      completed: false
    },
    {
      id: 4,
      title: "Application review for David Kumar",
      description: "Review and validate application documents",
      assignee: "Emma Davis",
      dueDate: "2024-01-15",
      priority: "High",
      status: "Completed",
      leadName: "David Kumar",
      completed: true
    }
  ]);

  const handleTaskCreated = (newTask: any) => {
    setTasks([newTask, ...tasks]);
  };

  const toggleTask = (taskId: number) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId 
        ? { ...task, completed: !task.completed, status: !task.completed ? "Completed" : "Pending" }
        : task
    ));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High": return "bg-red-100 text-red-800";
      case "Medium": return "bg-yellow-100 text-yellow-800";
      case "Low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed": return "bg-green-100 text-green-800";
      case "In Progress": return "bg-blue-100 text-blue-800";
      case "Pending": return "bg-orange-100 text-orange-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const handleEmailNotificationSent = (taskId: number) => {
    toast({
      title: "Email notification sent",
      description: "Task notification email has been sent successfully.",
    });
  };

  const handleTaskLinkCopy = (taskId: number) => {
    const taskLink = `${window.location.origin}/dashboard/task/${taskId}`;
    navigator.clipboard.writeText(taskLink);
    
    toast({
      title: "Link copied",
      description: "Task link copied to clipboard",
    });
  };

  const pendingTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Task Management</h2>
        <TaskCreate onTaskCreated={handleTaskCreated}>
          <Button className="bg-blue-600 hover:bg-blue-700">
            Create New Task
          </Button>
        </TaskCreate>
      </div>

      {/* Task Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Tasks</p>
                <p className="text-2xl font-bold">{tasks.length}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold">{pendingTasks.length}</p>
              </div>
              <Clock className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-2xl font-bold">{completedTasks.length}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Overdue</p>
                <p className="text-2xl font-bold">2</p>
              </div>
              <AlertCircle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pending Tasks */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="h-5 w-5 mr-2 text-orange-600" />
              Pending Tasks ({pendingTasks.length})
            </CardTitle>
            <CardDescription>Tasks that need your attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingTasks.map((task) => (
                <div key={task.id} className="p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-start space-x-3">
                    <Checkbox 
                      checked={task.completed}
                      onCheckedChange={() => toggleTask(task.id)}
                      className="mt-1"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <TaskDetail taskId={task.id}>
                          <h4 className="font-medium text-gray-900 cursor-pointer hover:text-blue-600">
                            {task.title}
                          </h4>
                        </TaskDetail>
                        <Badge className={getPriorityColor(task.priority)}>
                          {task.priority}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{task.description}</p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>Assigned to: {task.assignee}</span>
                        <div className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {task.dueDate}
                        </div>
                      </div>
                      <div className="mt-2 flex items-center justify-between">
                        <Badge variant="outline" className="text-xs">
                          {task.leadName}
                        </Badge>
                        <div className="flex space-x-2">
                          <EmailNotification 
                            recipient="test@example.com" 
                            recipientName={task.assignee}
                            subject={`Reminder: ${task.title}`}
                          >
                            <Button 
                              size="sm" 
                              variant="ghost"
                              className="h-6 w-6 p-0"
                              onClick={() => handleEmailNotificationSent(task.id)}
                            >
                              <Clock className="h-3 w-3" />
                            </Button>
                          </EmailNotification>

                          <Button 
                            size="sm" 
                            variant="ghost"
                            className="h-6 w-6 p-0"
                            onClick={() => handleTaskLinkCopy(task.id)}
                          >
                            <Link className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Completed Tasks */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <CheckCircle className="h-5 w-5 mr-2 text-green-600" />
              Completed Tasks ({completedTasks.length})
            </CardTitle>
            <CardDescription>Recently completed activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {completedTasks.map((task) => (
                <div key={task.id} className="p-4 border rounded-lg bg-green-50">
                  <div className="flex items-start space-x-3">
                    <Checkbox 
                      checked={task.completed}
                      onCheckedChange={() => toggleTask(task.id)}
                      className="mt-1"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <TaskDetail taskId={task.id}>
                          <h4 className="font-medium text-gray-900 line-through cursor-pointer hover:text-blue-600">
                            {task.title}
                          </h4>
                        </TaskDetail>
                        <Badge className={getStatusColor(task.status)}>
                          {task.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{task.description}</p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>Completed by: {task.assignee}</span>
                        <div className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {task.dueDate}
                        </div>
                      </div>
                      <div className="mt-2 flex items-center justify-between">
                        <Badge variant="outline" className="text-xs">
                          {task.leadName}
                        </Badge>
                        <Button 
                          size="sm" 
                          variant="ghost"
                          className="h-6 w-6 p-0"
                          onClick={() => handleTaskLinkCopy(task.id)}
                        >
                          <Link className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
