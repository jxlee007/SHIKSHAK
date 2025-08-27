import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { TopNavigation } from './components/TopNavigation';
import { MainContent } from './components/MainContent';
import { QuickCaptureModal } from './components/QuickCaptureModal';
import { SearchModal } from './components/SearchModal';
import { RitualModal } from './components/RitualModal';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './components/ui/dialog';
import { Button } from './components/ui/button';
import { Download, Camera, FileText } from 'lucide-react';

export default function App() {
  // Initialize theme on app load
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'system';
    const root = window.document.documentElement;
    
    if (savedTheme === 'dark') {
      root.classList.add('dark');
    } else if (savedTheme === 'light') {
      root.classList.remove('dark');
    } else {
      // System theme
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      if (systemTheme === 'dark') {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    }
  }, []);

  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
    const saved = localStorage.getItem('sidebarCollapsed');
    // Default to collapsed on mobile, expanded on desktop
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    return saved ? JSON.parse(saved) : isMobile;
  });

  const [activeView, setActiveView] = useState(() => {
    const saved = localStorage.getItem('activeView');
    return saved || 'mind-map';
  });

  const [showQuickCapture, setShowQuickCapture] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showRitualModal, setShowRitualModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [ritualType, setRitualType] = useState<'morning' | 'evening'>('morning');

  useEffect(() => {
    localStorage.setItem('sidebarCollapsed', JSON.stringify(sidebarCollapsed));
  }, [sidebarCollapsed]);

  useEffect(() => {
    localStorage.setItem('activeView', activeView);
  }, [activeView]);

  const handleRitualClick = (type: 'morning' | 'evening') => {
    setRitualType(type);
    setShowRitualModal(true);
  };

  const handleExport = (format: 'png' | 'json' | 'markdown') => {
    // This would integrate with the specific view's export functionality
    switch (format) {
      case 'json':
        console.log('Exporting as JSON...');
        // Export current view data as JSON
        break;
      case 'markdown':
        console.log('Exporting as Markdown...');
        // Export current view as structured markdown
        break;
      case 'png':
        console.log('Exporting as PNG...');
        // Use html2canvas to export current view as image
        break;
    }
    setShowExportModal(false);
  };

  const handleToggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="h-screen bg-background flex overflow-hidden relative">
      {/* Mobile Sidebar Overlay */}
      {!sidebarCollapsed && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarCollapsed(true)}
        />
      )}
      
      {/* Sidebar Container */}
      <div className={`
        ${sidebarCollapsed ? 'md:block hidden' : 'block'}
        ${sidebarCollapsed ? 'w-20' : 'w-full md:w-80'}
        fixed md:relative inset-y-0 left-0 z-50 md:z-10
        flex-shrink-0
      `}>
        <Sidebar 
          collapsed={sidebarCollapsed}
          onToggle={handleToggleSidebar}
          onNewChild={() => setShowQuickCapture(true)}
        />
      </div>
      
      <div className="flex-1 flex flex-col min-w-0">
        <TopNavigation
          activeView={activeView}
          onViewChange={setActiveView}
          onNewChild={() => setShowQuickCapture(true)}
          onSearch={() => setShowSearch(true)}
          onRitualClick={handleRitualClick}
          onExport={() => setShowExportModal(true)}
          onToggleSidebar={handleToggleSidebar}
        />
        
        <MainContent activeView={activeView} />
      </div>

      <QuickCaptureModal 
        open={showQuickCapture}
        onOpenChange={setShowQuickCapture}
      />
      
      <SearchModal 
        open={showSearch}
        onOpenChange={setShowSearch}
      />
      
      <RitualModal
        open={showRitualModal}
        onOpenChange={setShowRitualModal}
        type={ritualType}
      />

      {/* Export Modal */}
      <Dialog open={showExportModal} onOpenChange={setShowExportModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Export Current View</DialogTitle>
            <DialogDescription>
              Choose your export format. All formats work offline and will export your current {activeView === 'mind-map' ? 'mind map' : 'task view'}.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-3">
            <Button 
              variant="outline" 
              onClick={() => handleExport('png')}
              className="justify-start gap-3 h-auto py-4"
            >
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                <Camera className="h-5 w-5 text-blue-600" />
              </div>
              <div className="text-left">
                <div className="font-medium">PNG Image</div>
                <div className="text-sm text-muted-foreground">High-quality visual export</div>
              </div>
            </Button>
            
            <Button 
              variant="outline" 
              onClick={() => handleExport('markdown')}
              className="justify-start gap-3 h-auto py-4"
            >
              <div className="w-10 h-10 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                <FileText className="h-5 w-5 text-green-600" />
              </div>
              <div className="text-left">
                <div className="font-medium">Markdown</div>
                <div className="text-sm text-muted-foreground">Structured text format</div>
              </div>
            </Button>
            
            <Button 
              variant="outline" 
              onClick={() => handleExport('json')}
              className="justify-start gap-3 h-auto py-4"
            >
              <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
                <Download className="h-5 w-5 text-purple-600" />
              </div>
              <div className="text-left">
                <div className="font-medium">JSON Data</div>
                <div className="text-sm text-muted-foreground">Raw data for import</div>
              </div>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}