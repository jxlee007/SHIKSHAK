import React from 'react';
import { MindMapView } from './MindMapView';
import { TasksView } from './TasksView';
import { Card, CardContent } from './ui/card';

interface MainContentProps {
  activeView: string;
}

export function MainContent({ activeView }: MainContentProps) {
  const renderContent = () => {
    switch (activeView) {
      case 'mind-map':
        return <MindMapView />;
      case 'tasks':
        return <TasksView />;
      default:
        return (
          <div className="flex-1 flex items-center justify-center p-8">
            <Card className="w-full max-w-2xl">
              <CardContent className="p-8 text-center">
                <div className="space-y-4">
                  <div className="w-16 h-16 bg-muted rounded-full mx-auto flex items-center justify-center">
                    <span className="text-2xl">👋</span>
                  </div>
                  <h1 className="text-2xl font-semibold">Welcome back</h1>
                  <p className="text-muted-foreground">
                    Select or create a chat from the sidebar to get started. Use{' '}
                    <kbd className="px-2 py-1 bg-muted rounded text-sm">Ctrl</kbd> +{' '}
                    <kbd className="px-2 py-1 bg-muted rounded text-sm">K</kbd> anytime to quickly search your chats.
                  </p>
                  
                  <div className="mt-8">
                    <h3 className="font-medium mb-4">Activity</h3>
                    <p className="text-sm text-muted-foreground">No recent activity.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );
    }
  };

  return (
    <div className="flex-1 overflow-hidden bg-background">
      {renderContent()}
    </div>
  );
}