
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import {
  Calendar,
  Clock,
  User,
  Link,
  CheckCircle,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface TaskDetailProps {
  taskId: number;
  children: React.ReactNode;
}

export const TaskDetail = ({ taskId, children }: TaskDetailProps) => {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [task, setTask] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Mock task data for demo purposes
  const TASKS_DATA = [
    {
      id: 101,
      leadId: 1,
      leadName: "Sarah Johnson",
      title: "Send scholarship information",
      description: "Email details about available scholarships for CS programs",
      dueDate: "2024-01-17",
      status: "Pending",
      assignee: "John Smith",
      priority: "High",
      createdBy: "Emma Davis",
      createdAt: "2024-01-15T10:30:00Z",
    },
    {
      id: 102,
      leadId: 1,
      leadName: "Sarah Johnson",
      title: "Schedule visa consultation",
      description: "Arrange meeting with visa expert",
      dueDate: "2024-01-20",
      status: "Pending",
      assignee: "Emma Davis",
      priority: "Medium",
      createdBy: "John Smith",
      createdAt: "2024-01-15T14:45:00Z",
    },
    {
      id: 103,
      leadId: 1,
      leadName: "Sarah Johnson",
      title: "Follow up on housing questions",
      description: "Call to discuss accommodation options",
      dueDate: "2024-01-18",
      status: "Completed",
      assignee: "John Smith",
      priority: "Low",
      createdBy: "John Smith",
      createdAt: "2024-01-14T09:15:00Z",
      completedAt: "2024-01-16T11:20:00Z",
      completedBy: "John Smith",
    }
  ];

  useEffect(() => {
    // In a real application, this would be an API call to get task details
    const fetchTask = async () => {
      setIsLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 500));
        const foundTask = TASKS_DATA.find(t => t.id === taskId);
        
        if (foundTask) {
          setTask(foundTask);
        } else {
          toast({
            title: "Task not found",
            description: `No task found with ID ${taskId}`,
            variant: "destructive",
          });
          setIsOpen(false);
        }
      } catch (error) {
        toast({
          title: "Error loading task",
          description: "Failed to load task details. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    if (isOpen) {
      fetchTask();
    }
  }, [isOpen, taskId, toast]);

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

  const toggleTaskStatus = async () => {
    // In a real application, this would be an API call to update task status
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const newStatus = task.status === "Completed" ? "Pending" : "Completed";
      setTask({
        ...task,
        status: newStatus,
        completedAt: newStatus === "Completed" ? new Date().toISOString() : null,
        completedBy: newStatus === "Completed" ? "John Smith" : null,
      });
      
      toast({
        title: "Task updated",
        description: `Task marked as ${newStatus}`,
      });
    } catch (error) {
      toast({
        title: "Error updating task",
        description: "Failed to update task status. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  const copyTaskLink = () => {
    // Generate a shareable link to this task
    const taskLink = `${window.location.origin}/dashboard/task/${taskId}`;
    navigator.clipboard.writeText(taskLink);
    
    toast({
      title: "Link copied",
      description: "Task link copied to clipboard",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[550px]">
        {isLoading ? (
          <div className="py-8 text-center">Loading task details...</div>
        ) : task ? (
          <>
            <DialogHeader>
              <div className="flex items-center justify-between">
                <DialogTitle>{task.title}</DialogTitle>
                <Badge className={getStatusColor(task.status)}>
                  {task.status}
                </Badge>
              </div>
              <DialogDescription>
                Task #{task.id} for lead: {task.leadName}
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  checked={task.status === "Completed"}
                  onCheckedChange={toggleTaskStatus}
                  id="task-status"
                />
                <label
                  htmlFor="task-status"
                  className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${
                    task.status === "Completed" ? "line-through text-gray-500" : ""
                  }`}
                >
                  Mark as {task.status === "Completed" ? "incomplete" : "complete"}
                </label>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Description</h3>
                <p>{task.description}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Due Date</h3>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1 text-gray-400" />
                    <span>{task.dueDate}</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Priority</h3>
                  <Badge className={getPriorityColor(task.priority)}>
                    {task.priority}
                  </Badge>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Assigned To</h3>
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-1 text-gray-400" />
                    <span>{task.assignee}</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Created By</h3>
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-1 text-gray-400" />
                    <span>{task.createdBy}</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Created At</h3>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1 text-gray-400" />
                    <span>{new Date(task.createdAt).toLocaleString()}</span>
                  </div>
                </div>
                {task.status === "Completed" && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Completed</h3>
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 mr-1 text-green-500" />
                      <span>{new Date(task.completedAt).toLocaleString()}</span>
                    </div>
                  </div>
                )}
              </div>
              
              <Separator />
              
              <div className="flex justify-between">
                <Button
                  variant="outline"
                  className="text-sm"
                  onClick={copyTaskLink}
                >
                  <Link className="h-4 w-4 mr-1" />
                  Copy Task Link
                </Button>
                
                <div className="space-x-2">
                  <Button
                    variant="outline"
                    className="text-sm"
                    onClick={() => setIsOpen(false)}
                  >
                    Close
                  </Button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="py-8 text-center">Task not found</div>
        )}
      </DialogContent>
    </Dialog>
  );
};
