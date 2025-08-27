import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { ScrollArea } from './ui/scroll-area';
import { 
  Plus, 
  MoreVertical, 
  Clock, 
  Star,
  CheckCircle2,
  Circle,
  Calendar,
  User,
  Tag,
  Link2,
  Edit3,
  Trash2,
  Archive
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface Task {
  id: string;
  title: string;
  description?: string;
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'in-progress' | 'completed';
  dueDate?: string;
  assignee?: string;
  tags: string[];
  hasImage?: boolean;
  imageUrl?: string;
  isStarred?: boolean;
  createdAt: string;
}

export function TasksView() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Would you let a robot lawyer defend you?',
      description: 'Research and analyze the implications of AI in legal representation',
      priority: 'high',
      status: 'pending',
      dueDate: 'Today',
      assignee: 'JD',
      tags: ['legal', 'ai', 'research'],
      hasImage: true,
      imageUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&h=200&fit=crop',
      isStarred: false,
      createdAt: '2 hours ago'
    },
    {
      id: '2',
      title: 'Create a tabular list with yt video link, tool purpose in Google doc',
      description: 'Organize video resources and tools documentation',
      priority: 'medium',
      status: 'in-progress',
      dueDate: 'Today, 8:00 AM',
      assignee: 'JD',
      tags: ['documentation', 'youtube', 'tools'],
      hasImage: false,
      isStarred: true,
      createdAt: '4 hours ago'
    },
    {
      id: '3',
      title: 'Folder payslip',
      priority: 'low',
      status: 'pending',
      assignee: 'JD',
      tags: ['admin', 'finance'],
      hasImage: false,
      isStarred: true,
      createdAt: '1 day ago'
    },
    {
      id: '4',
      title: 'Fb content program',
      description: 'Plan and execute Facebook content strategy',
      priority: 'medium',
      status: 'pending',
      assignee: 'JD',
      tags: ['social-media', 'content'],
      hasImage: false,
      isStarred: false,
      createdAt: '1 day ago'
    },
    {
      id: '5',
      title: 'Review yt watchlist videos',
      priority: 'low',
      status: 'pending',
      dueDate: 'Today',
      assignee: 'JD',
      tags: ['review', 'youtube'],
      hasImage: false,
      isStarred: false,
      createdAt: '2 days ago'
    },
    {
      id: '6',
      title: 'Gemini ideas to review',
      description: 'From Greg Isenberg video',
      priority: 'medium',
      status: 'pending',
      assignee: 'JD',
      tags: ['ideas', 'review'],
      hasImage: false,
      isStarred: false,
      createdAt: '2 days ago'
    }
  ]);

  const [draggedTask, setDraggedTask] = useState<string | null>(null);

  const getPriorityTasks = (priority: 'high' | 'medium' | 'low') => {
    return tasks.filter(task => task.priority === priority && task.status !== 'completed');
  };

  const getTodaysFocus = () => {
    return tasks
      .filter(task => task.dueDate === 'Today' || task.isStarred)
      .slice(0, 3);
  };

  const handleTaskComplete = (taskId: string) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId 
        ? { ...task, status: task.status === 'completed' ? 'pending' : 'completed' }
        : task
    ));
  };

  const handlePriorityChange = (taskId: string, newPriority: 'high' | 'medium' | 'low') => {
    setTasks(prev => prev.map(task => 
      task.id === taskId 
        ? { ...task, priority: newPriority }
        : task
    ));
  };

  const handleTaskStar = (taskId: string) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId 
        ? { ...task, isStarred: !task.isStarred }
        : task
    ));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getPriorityBadge = (priority: string) => {
    const colors = {
      high: 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400',
      medium: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400',
      low: 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400'
    };
    
    return (
      <Badge variant="secondary" className={colors[priority as keyof typeof colors]}>
        {priority}
      </Badge>
    );
  };

  const TaskCard = ({ task }: { task: Task }) => (
    <Card 
      className="mb-3 hover:shadow-md transition-shadow cursor-pointer group"
      draggable
      onDragStart={() => setDraggedTask(task.id)}
      onDragEnd={() => setDraggedTask(null)}
    >
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          {/* Complete Checkbox */}
          <Button
            variant="ghost"
            size="sm"
            className="p-0 h-auto text-muted-foreground hover:text-foreground"
            onClick={() => handleTaskComplete(task.id)}
          >
            {task.status === 'completed' ? (
              <CheckCircle2 className="h-5 w-5 text-green-600" />
            ) : (
              <Circle className="h-5 w-5" />
            )}
          </Button>

          {/* Task Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-2">
              <h4 className={`font-medium leading-tight ${task.status === 'completed' ? 'line-through text-muted-foreground' : ''}`}>
                {task.title}
              </h4>
              
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0"
                  onClick={() => handleTaskStar(task.id)}
                >
                  <Star className={`h-4 w-4 ${task.isStarred ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'}`} />
                </Button>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Edit3 className="h-4 w-4 mr-2" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Archive className="h-4 w-4 mr-2" />
                      Archive
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {task.description && (
              <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                {task.description}
              </p>
            )}

            {/* Task Image */}
            {task.hasImage && task.imageUrl && (
              <div className="mb-3">
                <ImageWithFallback
                  src={task.imageUrl}
                  alt={task.title}
                  className="w-full h-24 object-cover rounded-md"
                />
              </div>
            )}

            {/* Task Meta */}
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                {task.dueDate && (
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>{task.dueDate}</span>
                  </div>
                )}
                
                {task.assignee && (
                  <Avatar className="h-4 w-4">
                    <AvatarFallback className="text-xs">{task.assignee}</AvatarFallback>
                  </Avatar>
                )}
              </div>
              
              <div className="flex items-center gap-1">
                {getPriorityBadge(task.priority)}
              </div>
            </div>

            {/* Tags */}
            {task.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {task.tags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden">
      {/* Today's Focus Bar - Mobile Docked */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border-b px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Star className="h-4 w-4 text-blue-600" />
            <span className="font-medium text-blue-800 dark:text-blue-200">Today's Focus</span>
          </div>
          <div className="flex items-center gap-2 overflow-x-auto">
            {getTodaysFocus().map((task) => (
              <Badge key={task.id} variant="secondary" className="whitespace-nowrap">
                {task.title.substring(0, 20)}...
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* Task Swimlanes */}
      <div className="flex-1 overflow-hidden">
        {/* Desktop: Horizontal Swimlanes */}
        <div className="hidden md:flex h-full">
          {/* High Priority */}
          <div className="flex-1 border-r">
            <div className="h-full flex flex-col">
              <div className="p-4 border-b bg-red-50 dark:bg-red-900/10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <h3 className="font-medium">High Priority</h3>
                    <Badge variant="secondary">{getPriorityTasks('high').length}</Badge>
                  </div>
                </div>
              </div>
              <ScrollArea className="flex-1 p-4">
                {getPriorityTasks('high').map((task) => (
                  <TaskCard key={task.id} task={task} />
                ))}
              </ScrollArea>
            </div>
          </div>

          {/* Medium Priority */}
          <div className="flex-1 border-r">
            <div className="h-full flex flex-col">
              <div className="p-4 border-b bg-yellow-50 dark:bg-yellow-900/10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <h3 className="font-medium">Medium Priority</h3>
                    <Badge variant="secondary">{getPriorityTasks('medium').length}</Badge>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <ScrollArea className="flex-1 p-4">
                {getPriorityTasks('medium').map((task) => (
                  <TaskCard key={task.id} task={task} />
                ))}
              </ScrollArea>
            </div>
          </div>

          {/* Low Priority */}
          <div className="flex-1">
            <div className="h-full flex flex-col">
              <div className="p-4 border-b bg-green-50 dark:bg-green-900/10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <h3 className="font-medium">Low Priority</h3>
                    <Badge variant="secondary">{getPriorityTasks('low').length}</Badge>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <ScrollArea className="flex-1 p-4">
                {getPriorityTasks('low').map((task) => (
                  <TaskCard key={task.id} task={task} />
                ))}
              </ScrollArea>
            </div>
          </div>
        </div>

        {/* Mobile: Vertical Stacked */}
        <div className="md:hidden">
          <ScrollArea className="h-full">
            <div className="p-4 space-y-6">
              {/* High Priority Section */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <h3 className="font-medium">High Priority</h3>
                    <Badge variant="secondary">{getPriorityTasks('high').length}</Badge>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="space-y-3">
                  {getPriorityTasks('high').map((task) => (
                    <TaskCard key={task.id} task={task} />
                  ))}
                </div>
              </div>

              {/* Medium Priority Section */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <h3 className="font-medium">Medium Priority</h3>
                    <Badge variant="secondary">{getPriorityTasks('medium').length}</Badge>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="space-y-3">
                  {getPriorityTasks('medium').map((task) => (
                    <TaskCard key={task.id} task={task} />
                  ))}
                </div>
              </div>

              {/* Low Priority Section */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <h3 className="font-medium">Low Priority</h3>
                    <Badge variant="secondary">{getPriorityTasks('low').length}</Badge>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="space-y-3">
                  {getPriorityTasks('low').map((task) => (
                    <TaskCard key={task.id} task={task} />
                  ))}
                </div>
              </div>
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}