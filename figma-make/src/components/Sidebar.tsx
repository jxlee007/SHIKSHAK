import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from './ui/dropdown-menu';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';
import { 
  ChevronLeft, 
  ChevronRight,
  Menu,
  X,
  MessageSquare,
  Bot,
  CheckSquare,
  FileText,
  Lightbulb,
  Brain,
  Settings,
  Sun,
  Moon,
  Monitor,
  CreditCard,
  LogOut,
  User,
  MoreHorizontal,
  Calendar,
  Camera,
  Mic,
  Globe,
  Plus,
  Search,
  Pin,
  Edit3,
  Archive,
  Trash2
} from 'lucide-react';

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  onNewChild: () => void;
}

interface RecentItem {
  id: string;
  title: string;
  type: 'mind-map' | 'task' | 'note' | 'voice-memo';
  timestamp: string;
  isPinned: boolean;
}

export function Sidebar({ collapsed, onToggle, onNewChild }: SidebarProps) {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'system');
  const [isMobile, setIsMobile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const recentItems: RecentItem[] = [
    {
      id: '1',
      title: 'Project Strategy Mind Map',
      type: 'mind-map',
      timestamp: '2 hours ago',
      isPinned: true
    },
    {
      id: '2',
      title: 'Weekly Sprint Tasks',
      type: 'task',
      timestamp: '5 hours ago',
      isPinned: false
    },
    {
      id: '3',
      title: 'Meeting Notes - Q4 Planning',
      type: 'note',
      timestamp: '1 day ago',
      isPinned: true
    },
    {
      id: '4',
      title: 'Voice Memo: Product Ideas',
      type: 'voice-memo',
      timestamp: '2 days ago',
      isPinned: false
    },
    {
      id: '5',
      title: 'Research Mind Map',
      type: 'mind-map',
      timestamp: '3 days ago',
      isPinned: false
    },
    {
      id: '6',
      title: 'Development Roadmap',
      type: 'task',
      timestamp: '1 week ago',
      isPinned: false
    }
  ];

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleThemeChange = (newTheme: 'light' | 'dark' | 'system') => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    
    const root = window.document.documentElement;
    if (newTheme === 'dark') {
      root.classList.add('dark');
    } else if (newTheme === 'light') {
      root.classList.remove('dark');
    } else {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      if (systemTheme === 'dark') {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    }
  };

  const getItemIcon = (item: RecentItem) => {
    const iconProps = { className: "h-4 w-4 text-sidebar-foreground flex-shrink-0" };
    
    switch (item.type) {
      case 'mind-map':
        return <Brain {...iconProps} />;
      case 'task':
        return <CheckSquare {...iconProps} />;
      case 'note':
        return <FileText {...iconProps} />;
      case 'voice-memo':
        return <Mic {...iconProps} />;
      default:
        return <FileText {...iconProps} />;
    }
  };

  const getItemBadge = (type: RecentItem['type']) => {
    const badgeProps = { className: "text-xs", variant: "secondary" as const };
    
    switch (type) {
      case 'mind-map':
        return <Badge {...badgeProps}>Map</Badge>;
      case 'task':
        return <Badge {...badgeProps}>Task</Badge>;
      case 'note':
        return <Badge {...badgeProps}>Note</Badge>;
      case 'voice-memo':
        return <Badge {...badgeProps}>Voice</Badge>;
      default:
        return null;
    }
  };

  const handlePinItem = (itemId: string) => {
    console.log('Pin/Unpin item:', itemId);
  };

  const handleRenameItem = (itemId: string) => {
    console.log('Rename item:', itemId);
  };

  const handleArchiveItem = (itemId: string) => {
    console.log('Archive item:', itemId);
  };

  const handleDeleteItem = (itemId: string) => {
    console.log('Delete item:', itemId);
  };

  return (
    <div className={`
      h-full bg-sidebar border-r border-sidebar-border flex flex-col
      ${collapsed ? 'w-20' : 'w-full md:w-80'}
    `}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-sidebar-border flex-shrink-0">
        {!collapsed && (
          <div className="flex items-center gap-2 min-w-0">
            <Brain className="h-6 w-6 text-sidebar-foreground flex-shrink-0" />
            <span className="font-semibold text-sidebar-foreground truncate">MindFlow</span>
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={isMobile ? () => onToggle() : onToggle}
          className="text-sidebar-foreground hover:bg-sidebar-accent flex-shrink-0"
        >
          {isMobile ? <X className="h-4 w-4" /> : (collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />)}
        </Button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="p-4 space-y-6">
            {/* New Child Button */}
            <div className="w-full">
              <Button
                onClick={onNewChild}
                className={`w-full gap-2 bg-sidebar-primary hover:bg-sidebar-primary/90 text-sidebar-primary-foreground border-sidebar-border ${
                  collapsed ? 'p-2' : ''
                }`}
                variant="default"
              >
                <Plus className="h-4 w-4 flex-shrink-0" />
                {!collapsed && <span className="truncate">New Child</span>}
              </Button>
            </div>

            {/* Quick Access */}
            {!collapsed && (
              <div className="w-full">
                <div className="mb-3">
                  <span className="text-xs font-medium text-sidebar-foreground/70 uppercase tracking-wider">
                    Quick Access
                  </span>
                </div>
                <div className="space-y-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start gap-3 text-sidebar-foreground hover:bg-sidebar-accent"
                  >
                    <Calendar className="h-4 w-4 flex-shrink-0" />
                    <span className="truncate">Today's Focus</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start gap-3 text-sidebar-foreground hover:bg-sidebar-accent"
                  >
                    <Brain className="h-4 w-4 flex-shrink-0" />
                    <span className="truncate">Knowledge Base</span>
                  </Button>
                </div>
              </div>
            )}

            {/* Recent Items */}
            <div className="w-full">
              {!collapsed && (
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-xs font-medium text-sidebar-foreground/70 uppercase tracking-wider">
                    Recent Items
                  </span>
                  <Button variant="ghost" size="sm" className="h-auto p-1 text-sidebar-foreground/60 hover:text-sidebar-foreground">
                    <MoreHorizontal className="h-3 w-3" />
                  </Button>
                </div>
              )}
              
              <div className="space-y-2">
                {recentItems.slice(0, collapsed ? 4 : 8).map((item) => (
                  <div key={item.id} className="relative group w-full">
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`w-full text-sidebar-foreground hover:bg-sidebar-accent ${
                        collapsed ? 'justify-center p-3 h-auto' : 'justify-start gap-3 px-3 py-4 h-auto'
                      } min-w-0`}
                    >
                      <div className={`flex items-start gap-3 ${collapsed ? '' : 'flex-1 min-w-0'}`}>
                        {getItemIcon(item)}
                        {!collapsed && (
                          <div className="flex-1 min-w-0 text-left">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-sm font-medium truncate">{item.title}</span>
                              {item.isPinned && <Pin className="h-3 w-3 text-amber-400 flex-shrink-0" />}
                            </div>
                            <div className="flex items-center gap-2">
                              {getItemBadge(item.type)}
                              <span className="text-xs text-sidebar-foreground/60 truncate">{item.timestamp}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </Button>
                    
                    {!collapsed && (
                      <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-sidebar-foreground hover:bg-sidebar-accent">
                              <MoreHorizontal className="h-3 w-3" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="w-48" align="end">
                            <DropdownMenuItem 
                              onClick={() => handlePinItem(item.id)}
                              className="flex items-center gap-2"
                            >
                              <Pin className="h-4 w-4" />
                              {item.isPinned ? 'Unpin' : 'Pin'}
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => handleRenameItem(item.id)}
                              className="flex items-center gap-2"
                            >
                              <Edit3 className="h-4 w-4" />
                              Rename
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => handleArchiveItem(item.id)}
                              className="flex items-center gap-2"
                            >
                              <Archive className="h-4 w-4" />
                              Archive
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => handleDeleteItem(item.id)}
                              className="flex items-center gap-2 text-destructive focus:text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollArea>
      </div>

      {/* Profile Section */}
      <div className="border-t border-sidebar-border p-4 flex-shrink-0">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className={`w-full text-sidebar-foreground hover:bg-sidebar-accent ${
                collapsed ? 'justify-center p-2' : 'justify-start gap-3'
              } min-w-0`}
            >
              <Avatar className="h-8 w-8 flex-shrink-0">
                <AvatarFallback className="bg-sidebar-accent text-sidebar-accent-foreground">
                  J
                </AvatarFallback>
              </Avatar>
              {!collapsed && (
                <div className="flex-1 text-left min-w-0">
                  <div className="font-medium truncate">John Doe</div>
                  <div className="text-xs text-sidebar-foreground/60 truncate">john@example.com</div>
                </div>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem className="font-medium" disabled>
              <User className="h-4 w-4 mr-2" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            
            <DropdownMenuItem className="font-medium" disabled>
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </DropdownMenuItem>
            
            <DropdownMenuItem 
              onClick={() => handleThemeChange('light')}
              className="pl-6"
            >
              <Sun className="h-4 w-4 mr-2" />
              Light Mode
              {theme === 'light' && <span className="ml-auto">✓</span>}
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => handleThemeChange('dark')}
              className="pl-6"
            >
              <Moon className="h-4 w-4 mr-2" />
              Dark Mode
              {theme === 'dark' && <span className="ml-auto">✓</span>}
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => handleThemeChange('system')}
              className="pl-6"
            >
              <Monitor className="h-4 w-4 mr-2" />
              System
              {theme === 'system' && <span className="ml-auto">✓</span>}
            </DropdownMenuItem>
            
            <DropdownMenuSeparator />
            
            <DropdownMenuItem>
              <CreditCard className="h-4 w-4 mr-2" />
              Billing & Plans
            </DropdownMenuItem>
            
            <DropdownMenuSeparator />
            
            <DropdownMenuItem className="text-red-600">
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}