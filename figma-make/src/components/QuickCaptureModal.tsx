import React, { useState, useRef, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { ScrollArea } from './ui/scroll-area';
import { 
  Mic, 
  Camera, 
  Paperclip, 
  Link, 
  Send,
  Sparkles,
  FileText,
  CheckSquare,
  Lightbulb,
  Brain,
  Bot,
  User,
  Loader2,
  WifiOff
} from 'lucide-react';

interface QuickCaptureModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface ChatMessage {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export function QuickCaptureModal({ open, onOpenChange }: QuickCaptureModalProps) {
  const [activeTab, setActiveTab] = useState('capture');
  const [captureType, setCaptureType] = useState<'idea' | 'task' | 'note' | 'quick'>('quick');
  const [content, setContent] = useState('');
  const [chatInput, setChatInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'assistant',
      content: "Hi! I'm your AI assistant with full context of your mind maps, tasks, and notes. How can I help you today?",
      timestamp: new Date()
    }
  ]);

  const chatScrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

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

  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [chatMessages]);

  const handleCapture = async () => {
    if (!content.trim()) return;
    
    setIsProcessing(true);
    
    // Simulate AI processing
    setTimeout(() => {
      console.log('Captured:', { type: captureType, content });
      setContent('');
      setIsProcessing(false);
      onOpenChange(false);
      
      // In a real app, this would save to the recent items
    }, 1500);
  };

  const handleSendMessage = async () => {
    if (!chatInput.trim()) return;
    
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: chatInput,
      timestamp: new Date()
    };
    
    setChatMessages(prev => [...prev, userMessage]);
    setChatInput('');
    
    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "Based on your recent mind map about AI strategy, I can help you break that down into actionable tasks. Would you like me to create some task items?",
        "I see you've been working on project planning. Let me suggest some connections between your existing ideas and this new thought.",
        "That's interesting! I notice this relates to your knowledge base article about 'Future of AI'. Would you like me to create a new node linking these concepts?",
        "I can help you organize this idea. Based on your current workspace, this might fit well under your 'Research Topics' branch. Shall I add it there?"
      ];
      
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date()
      };
      
      setChatMessages(prev => [...prev, aiMessage]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent, action: () => void) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      action();
    }
  };

  const getCaptureIcon = () => {
    const icons = {
      idea: Lightbulb,
      task: CheckSquare,
      note: FileText,
      quick: Sparkles
    };
    const Icon = icons[captureType];
    return <Icon className="h-4 w-4" />;
  };

  const resetModal = () => {
    setContent('');
    setChatInput('');
    setActiveTab('capture');
    setCaptureType('quick');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl h-[600px] flex flex-col p-0">
        <DialogHeader className="px-6 py-4 border-b">
          <DialogTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-blue-600" />
            {activeTab === 'capture' ? 'Quick Capture' : 'AI Assistant'}
          </DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
          <TabsList className="mx-6 mt-4 mb-0 grid w-full grid-cols-2">
            <TabsTrigger value="capture" className="gap-2">
              <Sparkles className="h-4 w-4" />
              Quick Capture
            </TabsTrigger>
            <TabsTrigger value="chat" className="gap-2">
              <Bot className="h-4 w-4" />
              AI Chat
            </TabsTrigger>
          </TabsList>

          {/* Quick Capture Tab */}
          <TabsContent value="capture" className="flex-1 flex flex-col mx-6 mt-4">
            <div className="space-y-4 flex-1">
              {/* Type Selector */}
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium">Type:</span>
                <Select value={captureType} onValueChange={(value: any) => setCaptureType(value)}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="quick">
                      <div className="flex items-center gap-2">
                        <Sparkles className="h-4 w-4" />
                        Quick
                      </div>
                    </SelectItem>
                    <SelectItem value="idea">
                      <div className="flex items-center gap-2">
                        <Lightbulb className="h-4 w-4" />
                        Idea
                      </div>
                    </SelectItem>
                    <SelectItem value="task">
                      <div className="flex items-center gap-2">
                        <CheckSquare className="h-4 w-4" />
                        Task
                      </div>
                    </SelectItem>
                    <SelectItem value="note">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        Note
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
                
                {!isOnline && (
                  <Badge variant="outline" className="text-orange-600 border-orange-600 gap-1">
                    <WifiOff className="h-3 w-3" />
                    Offline
                  </Badge>
                )}
              </div>

              {/* Content Input */}
              <div className="flex-1">
                <Textarea
                  ref={textareaRef}
                  placeholder={`Enter your ${captureType}... (Ctrl+Enter to save)`}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  onKeyPress={(e) => handleKeyPress(e, handleCapture)}
                  className="min-h-[200px] resize-none"
                  autoFocus
                />
              </div>

              {/* Input Options */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="gap-2" disabled={!isOnline}>
                    <Mic className="h-4 w-4" />
                    Voice
                  </Button>
                  <Button variant="outline" size="sm" className="gap-2" disabled={!isOnline}>
                    <Camera className="h-4 w-4" />
                    Camera
                  </Button>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Paperclip className="h-4 w-4" />
                    File
                  </Button>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Link className="h-4 w-4" />
                    Link
                  </Button>
                </div>

                <div className="flex items-center gap-2">
                  <Button variant="outline" onClick={() => onOpenChange(false)}>
                    Cancel
                  </Button>
                  <Button 
                    onClick={handleCapture}
                    disabled={!content.trim() || isProcessing}
                    className="gap-2"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        {getCaptureIcon()}
                        Save & Process
                      </>
                    )}
                  </Button>
                </div>
              </div>

              {!isOnline && (
                <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-3">
                  <p className="text-sm text-orange-800 dark:text-orange-200">
                    📱 Offline mode: Your capture will be saved locally and processed when you're back online.
                  </p>
                </div>
              )}
            </div>
          </TabsContent>

          {/* AI Chat Tab */}
          <TabsContent value="chat" className="flex-1 flex flex-col mx-6 mt-4 space-y-4">
            {/* Chat Messages */}
            <ScrollArea className="flex-1 border rounded-lg p-4" ref={chatScrollRef}>
              <div className="space-y-4">
                {chatMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex gap-3 max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        message.type === 'user' 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-green-100 dark:bg-green-900/20 text-green-600'
                      }`}>
                        {message.type === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                      </div>
                      <div className={`rounded-lg px-4 py-2 ${
                        message.type === 'user'
                          ? 'bg-blue-600 text-white'
                          : 'bg-muted text-foreground'
                      }`}>
                        <p className="text-sm">{message.content}</p>
                        <span className={`text-xs mt-1 block ${
                          message.type === 'user' ? 'text-blue-100' : 'text-muted-foreground'
                        }`}>
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* AI Context Badge */}
            <div className="flex items-center gap-2 px-3 py-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <Brain className="h-4 w-4 text-blue-600" />
              <span className="text-sm text-blue-700 dark:text-blue-400">
                AI has full context of your mind maps, tasks, and knowledge base
              </span>
            </div>

            {/* Chat Input */}
            <div className="flex items-center gap-2">
              <div className="flex-1 relative">
                <Input
                  placeholder="Ask me anything about your workspace... (Ctrl+Enter to send)"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyPress={(e) => handleKeyPress(e, handleSendMessage)}
                  disabled={!isOnline}
                />
                {!isOnline && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <WifiOff className="h-4 w-4 text-muted-foreground" />
                  </div>
                )}
              </div>
              <Button 
                onClick={handleSendMessage}
                disabled={!chatInput.trim() || !isOnline}
                size="sm"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>

            {!isOnline && (
              <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-3">
                <p className="text-sm text-orange-800 dark:text-orange-200">
                  🌐 AI chat requires an internet connection. Please check your connection and try again.
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}