import React from 'react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Button } from './ui/button';
import { Pin, Edit3, Archive, Trash2, MoreHorizontal } from 'lucide-react';

interface RecentItem {
  id: string;
  title: string;
  type: 'chat' | 'task' | 'note' | 'idea' | 'capture';
  timestamp: string;
  icon: any;
  isPinned?: boolean;
}

interface ChatContextMenuProps {
  item: RecentItem;
  onPin?: (itemId: string) => void;
  onRename?: (itemId: string) => void;
  onArchive?: (itemId: string) => void;
  onDelete?: (itemId: string) => void;
}

export function ChatContextMenu({ 
  item, 
  onPin, 
  onRename, 
  onArchive, 
  onDelete 
}: ChatContextMenuProps) {
  const handlePin = () => {
    onPin?.(item.id);
    console.log('Pin item:', item.id);
  };

  const handleRename = () => {
    onRename?.(item.id);
    console.log('Rename item:', item.id);
  };

  const handleArchive = () => {
    onArchive?.(item.id);
    console.log('Archive item:', item.id);
  };

  const handleDelete = () => {
    onDelete?.(item.id);
    console.log('Delete item:', item.id);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
          <MoreHorizontal className="h-3 w-3" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48" align="end">
        <DropdownMenuItem 
          onClick={handlePin}
          className="flex items-center gap-2"
        >
          <Pin className="h-4 w-4" />
          {item.isPinned ? 'Unpin' : 'Pin'}
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={handleRename}
          className="flex items-center gap-2"
        >
          <Edit3 className="h-4 w-4" />
          Rename
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={handleArchive}
          className="flex items-center gap-2"
        >
          <Archive className="h-4 w-4" />
          Archive
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={handleDelete}
          className="flex items-center gap-2 text-destructive focus:text-destructive"
        >
          <Trash2 className="h-4 w-4" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}