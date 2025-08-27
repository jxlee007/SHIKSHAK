import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { RitualButton } from './RitualButton';
import { 
  Plus,
  Search,
  Map,
  CheckSquare,
  Download,
  Wifi,
  WifiOff,
  RotateCcw,
  Menu
} from 'lucide-react';

interface TopNavigationProps {
  activeView: 'mind-map' | 'tasks';
  onViewChange: (view: 'mind-map' | 'tasks') => void;
  onNewChild: () => void;
  onSearch: () => void;
  onRitualClick: (type: 'morning' | 'evening') => void;
  onExport: () => void;
  onToggleSidebar?: () => void;
}

export function TopNavigation({
  activeView,
  onViewChange,
  onNewChild,
  onSearch,
  onRitualClick,
  onExport,
  onToggleSidebar
}: TopNavigationProps) {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Simulate syncing when coming back online
  useEffect(() => {
    if (isOnline) {
      setIsSyncing(true);
      const timer = setTimeout(() => setIsSyncing(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [isOnline]);

  return (
    <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* First Layer: Hamburger, Mindspace, Rituals */}
      <div className="h-14 flex items-center justify-between px-4">
        {/* Left: Hamburger Menu */}
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleSidebar}
          className="p-2 md:hidden"
          aria-label="Toggle sidebar"
        >
          <Menu className="h-5 w-5" />
        </Button>

        {/* Center: Mindspace Title */}
        <div className="flex-1 flex justify-center">
          <h1 className="text-lg font-semibold text-foreground">
            Mindspace
          </h1>
        </div>

        {/* Right: Rituals Button */}
        <RitualButton onRitualClick={onRitualClick} />
      </div>

      {/* Second Layer: View Pills, Status, Export */}
      <div className="h-12 border-t border-border/50 flex items-center justify-between px-4 bg-muted/30">
        {/* Left: View Toggle Pills */}
        <div className="flex items-center bg-background rounded-lg p-1 border shadow-sm">
          <Button
            variant={activeView === 'mind-map' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => onViewChange('mind-map')}
            className="gap-1.5 rounded-md h-8 px-3"
          >
            <Map className="h-3.5 w-3.5" />
            <span className="hidden xs:inline">Mind Map</span>
            <span className="xs:hidden">Map</span>
          </Button>
          <Button
            variant={activeView === 'tasks' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => onViewChange('tasks')}
            className="gap-1.5 rounded-md h-8 px-3"
          >
            <CheckSquare className="h-3.5 w-3.5" />
            <span className="hidden xs:inline">Tasks</span>
            <span className="xs:hidden">Tasks</span>
          </Button>
        </div>

        {/* Center: Online/Offline Status and expory button */}
        <div className="flex items-center justify-center gap-2">
          {isSyncing ? (
            <div className="flex items-center gap-1.5 text-blue-600">
              <RotateCcw className="h-4 w-4 animate-spin" />
              <span className="text-xs font-medium hidden sm:inline">Syncing...</span>
            </div>
          ) : isOnline ? (
            <div className="flex items-center gap-1.5">
              <Wifi className="h-4 w-4 text-green-600" />
              <Badge 
                variant="outline" 
                className="text-green-600 border-green-600/30 bg-green-50 dark:bg-green-950/20 text-xs h-6 hidden sm:inline-flex"
              >
                Online
              </Badge>
            </div>
          ) : (
            <div className="flex items-end gap-1.5">
              <WifiOff className="h-4 w-4 text-orange-600" />
              <Badge 
                variant="outline" 
                className="text-orange-600 border-orange-600/30 bg-orange-50 dark:bg-orange-950/20 text-xs h-6 hidden sm:inline-flex"
              >
                Offline
              </Badge>
            </div>
          )}
          
        {/* Right: Export Button */}
        <Button
          variant="outline"
          size="sm"
          onClick={onExport}
          className="gap-1.5 h-8 px-3"
        >
          <Download className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Export</span>
        </Button>
          
        </div>
      </div>
    </div>
  );
}