import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription } from './ui/dialog';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { Search, MessageSquare, FileText, Calendar, Hash } from 'lucide-react';

interface SearchModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const mockSearchResults = [
  { id: '1', type: 'chat', title: 'Generate PWA prompt', preview: 'Discussion about creating a progressive web app...', date: '2 days ago' },
  { id: '2', type: 'note', title: 'Tool comparison analysis', preview: 'Comparing different development tools and frameworks...', date: '1 week ago' },
  { id: '3', type: 'chat', title: 'Product name suggestion', preview: 'Brainstorming session for new product naming...', date: '3 days ago' },
  { id: '4', type: 'document', title: 'Project documentation', preview: 'Technical specifications and requirements...', date: '1 day ago' },
];

export function SearchModal({ open, onOpenChange }: SearchModalProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState(mockSearchResults);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      const filtered = mockSearchResults.filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.preview.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered);
    } else {
      setResults(mockSearchResults);
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'chat': return MessageSquare;
      case 'note': return FileText;
      case 'document': return FileText;
      default: return FileText;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'chat': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'note': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'document': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] h-[600px] p-0" aria-describedby="search-description">
        <DialogDescription id="search-description" className="sr-only">
          Search through your chats, notes, and documents using keywords or tags.
        </DialogDescription>
        <div className="flex flex-col h-full">
          {/* Search Header */}
          <div className="p-6 border-b">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search chats, notes, and documents..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10"
                autoFocus
              />
            </div>
            
            {searchQuery && (
              <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
                <span>Found {results.length} results for "{searchQuery}"</span>
              </div>
            )}
          </div>

          {/* Search Results */}
          <ScrollArea className="flex-1">
            <div className="p-6">
              {results.length === 0 ? (
                <div className="text-center py-12">
                  <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-medium mb-2">No results found</h3>
                  <p className="text-sm text-muted-foreground">
                    Try searching with different keywords
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {results.map((result) => {
                    const Icon = getIcon(result.type);
                    return (
                      <div
                        key={result.id}
                        className="p-4 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors group"
                      >
                        <div className="flex items-start gap-3">
                          <div className="mt-1">
                            <Icon className="h-5 w-5 text-muted-foreground" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-medium group-hover:text-primary">
                                {result.title}
                              </h3>
                              <Badge 
                                variant="secondary" 
                                className={getTypeColor(result.type)}
                              >
                                {result.type}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground line-clamp-2">
                              {result.preview}
                            </p>
                            <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                              <Calendar className="h-3 w-3" />
                              {result.date}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Search Footer */}
          <div className="p-4 border-t bg-muted/30">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center gap-4">
                <span>↑↓ Navigate</span>
                <span>⏎ Select</span>
                <span>Esc Close</span>
              </div>
              <div className="flex items-center gap-1">
                <Hash className="h-3 w-3" />
                <span>Use # for tags</span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}