import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from './ui/dropdown-menu';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Plus, 
  Mic, 
  Camera, 
  FileText, 
  Download, 
  Wifi, 
  WifiOff, 
  MoreVertical,
  Edit3,
  Trash2,
  Move,
  ChevronDown,
  ChevronRight,
  RotateCcw,
  Sparkles,
  Users,
  Lightbulb,
  Target,
  Brain,
  Globe,
  Image as ImageIcon,
  Link,
  MessageSquare,
  ZoomIn,
  ZoomOut,
  Maximize,
  Minimize,
  GitBranch,
  Merge,
  Split,
  Zap,
  Filter,
  Layers,
  Navigation,
  MousePointer
} from 'lucide-react';

interface ContentItem {
  type: 'text' | 'image' | 'article-thumbnail';
  content?: string;
  src?: string;
  alt?: string;
  style?: Record<string, any>;
}

interface NodeCluster {
  id: string;
  name: string;
  color: string;
  nodeIds: string[];
  position: { x: number; y: number };
  visible: boolean;
}

interface Connection {
  from: string;
  to: string;
  type: 'hierarchy' | 'association' | 'dependency' | 'similarity';
  strength: number;
  animated?: boolean;
}

interface MindMapNode {
  id: string;
  title: string;
  x: number;
  y: number;
  level: number;
  parentId?: string;
  children: string[];
  isExpanded: boolean;
  isEditing: boolean;
  isAISuggested: boolean;
  isOfflineCreated: boolean;
  nodeType: 'simple' | 'rich';
  contentItems: ContentItem[];
  clusterId?: string;
  tags: string[];
  lastModified: number;
  aiScore: number;
  style?: {
    borderRadius?: string;
    background?: string;
    padding?: string;
    minWidth?: string;
    maxWidth?: string;
  };
  icon?: any;
  color: string;
}

interface ViewportState {
  zoom: number;
  panX: number;
  panY: number;
  isDragging: boolean;
  dragStart: { x: number; y: number };
}

interface ConnectionPath {
  id: string;
  path: string;
  type: Connection['type'];
  strength: number;
  animated?: boolean;
  fromNode: string;
  toNode: string;
}

export function MindMapView() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isSyncing, setIsSyncing] = useState(false);
  const [viewport, setViewport] = useState<ViewportState>({
    zoom: 1,
    panX: 0,
    panY: 0,
    isDragging: false,
    dragStart: { x: 0, y: 0 }
  });

  const [clusters, setClusters] = useState<NodeCluster[]>([
    {
      id: 'strategy',
      name: 'Strategic Planning',
      color: 'rgba(59, 130, 246, 0.1)',
      nodeIds: ['root', 'strategy', 'market-research', 'goals'],
      position: { x: 15, y: 10 },
      visible: true
    },
    {
      id: 'development',
      name: 'Development',
      color: 'rgba(16, 185, 129, 0.1)',
      nodeIds: ['development', 'mobile-app'],
      position: { x: 70, y: 35 },
      visible: true
    },
    {
      id: 'documentation',
      name: 'Knowledge Base',
      color: 'rgba(245, 158, 11, 0.1)',
      nodeIds: ['documentation'],
      position: { x: 40, y: 35 },
      visible: true
    }
  ]);

  const [nodes, setNodes] = useState<MindMapNode[]>([
    {
      id: 'root',
      title: 'AI-Enhanced Mind Map',
      x: 50,
      y: 15,
      level: 0,
      children: ['strategy', 'documentation', 'development'],
      isExpanded: true,
      isEditing: false,
      isAISuggested: false,
      isOfflineCreated: false,
      nodeType: 'rich',
      clusterId: 'strategy',
      tags: ['core', 'planning'],
      lastModified: Date.now(),
      aiScore: 0.9,
      contentItems: [
        {
          type: 'text',
          content: 'AI-Enhanced Mind Map',
          style: {
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#1e293b',
            textAlign: 'center'
          }
        },
        {
          type: 'text',
          content: 'Comprehensive workspace for ideas, planning, and collaboration with AI-augmented features.',
          style: {
            fontSize: '14px',
            lineHeight: '1.5',
            color: '#64748b',
            textAlign: 'center',
            marginTop: '8px'
          }
        }
      ],
      style: {
        borderRadius: '16px',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '24px',
        minWidth: '320px',
        maxWidth: '400px'
      },
      icon: Brain,
      color: 'bg-blue-500'
    },
    {
      id: 'strategy',
      title: 'Strategy Planning',
      x: 20,
      y: 45,
      level: 1,
      parentId: 'root',
      children: ['market-research', 'goals'],
      isExpanded: true,
      isEditing: false,
      isAISuggested: false,
      isOfflineCreated: false,
      nodeType: 'rich',
      clusterId: 'strategy',
      tags: ['strategy', 'planning'],
      lastModified: Date.now() - 3600000,
      aiScore: 0.8,
      contentItems: [
        {
          type: 'text',
          content: 'Strategic Planning & Analysis',
          style: {
            fontSize: '18px',
            fontWeight: 'bold',
            color: '#1e293b'
          }
        },
        {
          type: 'text',
          content: 'Collaborative approach to strategic planning with team input, market analysis, and goal setting for sustainable growth.',
          style: {
            fontSize: '14px',
            lineHeight: '1.5',
            color: '#475569',
            marginTop: '12px'
          }
        }
      ],
      style: {
        borderRadius: '12px',
        background: '#f8fafc',
        padding: '20px',
        minWidth: '280px',
        maxWidth: '320px'
      },
      icon: Target,
      color: 'bg-green-500'
    },
    {
      id: 'documentation',
      title: 'Project Documentation',
      x: 50,
      y: 45,
      level: 1,
      parentId: 'root',
      children: [],
      isExpanded: true,
      isEditing: false,
      isAISuggested: true,
      isOfflineCreated: false,
      nodeType: 'rich',
      clusterId: 'documentation',
      tags: ['documentation', 'knowledge'],
      lastModified: Date.now() - 7200000,
      aiScore: 0.7,
      contentItems: [
        {
          type: 'text',
          content: 'Documentation Hub',
          style: {
            fontSize: '18px',
            fontWeight: 'bold',
            color: '#1e293b'
          }
        },
        {
          type: 'text',
          content: 'Centralized knowledge base with project specifications, user guides, and technical documentation.',
          style: {
            fontSize: '14px',
            lineHeight: '1.5',
            color: '#475569',
            marginTop: '12px'
          }
        }
      ],
      style: {
        borderRadius: '12px',
        background: '#fefce8',
        padding: '20px',
        minWidth: '280px',
        maxWidth: '320px'
      },
      icon: FileText,
      color: 'bg-yellow-500'
    },
    {
      id: 'development',
      title: 'Development Workflow',
      x: 80,
      y: 45,
      level: 1,
      parentId: 'root',
      children: ['mobile-app'],
      isExpanded: true,
      isEditing: false,
      isAISuggested: false,
      isOfflineCreated: false,
      nodeType: 'rich',
      clusterId: 'development',
      tags: ['development', 'workflow'],
      lastModified: Date.now() - 1800000,
      aiScore: 0.85,
      contentItems: [
        {
          type: 'text',
          content: 'Development Process',
          style: {
            fontSize: '18px',
            fontWeight: 'bold',
            color: '#1e293b'
          }
        },
        {
          type: 'text',
          content: 'Agile development methodology with continuous integration and user-centered design principles.',
          style: {
            fontSize: '14px',
            lineHeight: '1.5',
            color: '#475569',
            marginTop: '12px'
          }
        }
      ],
      style: {
        borderRadius: '12px',
        background: '#f0f9ff',
        padding: '20px',
        minWidth: '280px',
        maxWidth: '320px'
      },
      icon: Globe,
      color: 'bg-blue-500'
    },
    {
      id: 'market-research',
      title: 'Market Research',
      x: 10,
      y: 70,
      level: 2,
      parentId: 'strategy',
      children: [],
      isExpanded: true,
      isEditing: false,
      isAISuggested: false,
      isOfflineCreated: false,
      nodeType: 'simple',
      clusterId: 'strategy',
      tags: ['research', 'market'],
      lastModified: Date.now() - 5400000,
      aiScore: 0.6,
      contentItems: [
        {
          type: 'text',
          content: 'Market Research',
          style: {
            fontSize: '16px',
            fontWeight: 'bold',
            color: '#1e293b'
          }
        },
        {
          type: 'text',
          content: 'Comprehensive market analysis and competitor research.',
          style: {
            fontSize: '14px',
            lineHeight: '1.5',
            color: '#475569',
            marginTop: '8px'
          }
        }
      ],
      style: {
        borderRadius: '10px',
        background: '#fff7ed',
        padding: '16px',
        minWidth: '220px',
        maxWidth: '260px'
      },
      icon: Lightbulb,
      color: 'bg-orange-500'
    },
    {
      id: 'goals',
      title: 'Project Goals',
      x: 30,
      y: 70,
      level: 2,
      parentId: 'strategy',
      children: [],
      isExpanded: true,
      isEditing: false,
      isAISuggested: false,
      isOfflineCreated: false,
      nodeType: 'simple',
      clusterId: 'strategy',
      tags: ['goals', 'objectives'],
      lastModified: Date.now() - 10800000,
      aiScore: 0.75,
      contentItems: [
        {
          type: 'text',
          content: 'Project Goals',
          style: {
            fontSize: '16px',
            fontWeight: 'bold',
            color: '#1e293b'
          }
        },
        {
          type: 'text',
          content: 'Define clear objectives and success metrics for the project.',
          style: {
            fontSize: '14px',
            lineHeight: '1.5',
            color: '#475569',
            marginTop: '8px'
          }
        }
      ],
      style: {
        borderRadius: '10px',
        background: '#f0fdf4',
        padding: '16px',
        minWidth: '220px',
        maxWidth: '260px'
      },
      icon: Target,
      color: 'bg-green-600'
    },
    {
      id: 'mobile-app',
      title: 'Mobile Application',
      x: 80,
      y: 75,
      level: 2,
      parentId: 'development',
      children: [],
      isExpanded: true,
      isEditing: false,
      isAISuggested: true,
      isOfflineCreated: false,
      nodeType: 'rich',
      clusterId: 'development',
      tags: ['mobile', 'app', 'development'],
      lastModified: Date.now() - 900000,
      aiScore: 0.9,
      contentItems: [
        {
          type: 'text',
          content: 'Mobile App Design',
          style: {
            fontSize: '16px',
            fontWeight: 'bold',
            color: '#1e293b'
          }
        },
        {
          type: 'text',
          content: 'Cross-platform mobile solution with intuitive UX.',
          style: {
            fontSize: '13px',
            lineHeight: '1.4',
            color: '#475569',
            marginTop: '8px'
          }
        }
      ],
      style: {
        borderRadius: '10px',
        background: '#fdf2f8',
        padding: '16px',
        minWidth: '220px',
        maxWidth: '260px'
      },
      icon: Users,
      color: 'bg-purple-500'
    }
  ]);

  const [connections, setConnections] = useState<Connection[]>([
    { from: 'root', to: 'strategy', type: 'hierarchy', strength: 1.0 },
    { from: 'root', to: 'documentation', type: 'hierarchy', strength: 1.0 },
    { from: 'root', to: 'development', type: 'hierarchy', strength: 1.0 },
    { from: 'strategy', to: 'market-research', type: 'hierarchy', strength: 0.8 },
    { from: 'strategy', to: 'goals', type: 'hierarchy', strength: 0.9 },
    { from: 'development', to: 'mobile-app', type: 'hierarchy', strength: 0.9 },
    { from: 'market-research', to: 'mobile-app', type: 'association', strength: 0.6, animated: true },
    { from: 'goals', to: 'development', type: 'dependency', strength: 0.7 }
  ]);

  const [showInputModal, setShowInputModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [showEnrichmentModal, setShowEnrichmentModal] = useState(false);
  const [selectedNodeForAdd, setSelectedNodeForAdd] = useState<string | null>(null);
  const [selectedNodeForEnrichment, setSelectedNodeForEnrichment] = useState<string | null>(null);
  const [draggedNode, setDraggedNode] = useState<string | null>(null);
  const [dropTarget, setDropTarget] = useState<string | null>(null);
  const [newNodeTitle, setNewNodeTitle] = useState('');
  const [inputMode, setInputMode] = useState<'text' | 'voice' | 'file' | 'camera'>('text');
  const [enrichmentMode, setEnrichmentMode] = useState<'split' | 'merge' | 'connect'>('split');
  const [showClusters, setShowClusters] = useState(true);
  const [selectedNodes, setSelectedNodes] = useState<string[]>([]);

  const canvasRef = useRef<HTMLDivElement>(null);
  const isDraggingViewport = useRef(false);

  // Monitor online status
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

  // Viewport controls
  const handleZoomIn = useCallback(() => {
    setViewport(prev => ({ ...prev, zoom: Math.min(prev.zoom * 1.2, 3) }));
  }, []);

  const handleZoomOut = useCallback(() => {
    setViewport(prev => ({ ...prev, zoom: Math.max(prev.zoom / 1.2, 0.3) }));
  }, []);

  const handleResetView = useCallback(() => {
    setViewport({ zoom: 1, panX: 0, panY: 0, isDragging: false, dragStart: { x: 0, y: 0 } });
  }, []);

  const handleViewportMouseDown = useCallback((e: React.MouseEvent) => {
    if (e.target === canvasRef.current) {
      isDraggingViewport.current = true;
      setViewport(prev => ({
        ...prev,
        isDragging: true,
        dragStart: { x: e.clientX - prev.panX, y: e.clientY - prev.panY }
      }));
    }
  }, []);

  const handleViewportMouseMove = useCallback((e: React.MouseEvent) => {
    if (isDraggingViewport.current && viewport.isDragging) {
      setViewport(prev => ({
        ...prev,
        panX: e.clientX - prev.dragStart.x,
        panY: e.clientY - prev.dragStart.y
      }));
    }
  }, [viewport.isDragging]);

  const handleViewportMouseUp = useCallback(() => {
    isDraggingViewport.current = false;
    setViewport(prev => ({ ...prev, isDragging: false }));
  }, []);

  // Node position update handler
  const handleNodeDrag = useCallback((nodeId: string, newPosition: { x: number; y: number }) => {
    const canvasRect = canvasRef.current?.getBoundingClientRect();
    if (!canvasRect) return;

    const percentX = ((newPosition.x) / canvasRect.width) * 100;
    const percentY = ((newPosition.y) / canvasRect.height) * 100;

    setNodes(prev => prev.map(node => 
      node.id === nodeId 
        ? { ...node, x: Math.max(5, Math.min(95, percentX)), y: Math.max(5, Math.min(95, percentY)), lastModified: Date.now() }
        : node
    ));
  }, []);

  // Tree-style connection path calculation
  const calculateTreeConnections = useCallback((visibleNodes: MindMapNode[], hierarchyConnections: Connection[]) => {
    const connectionPaths: ConnectionPath[] = [];
    
    // Group nodes by level and parent
    const nodesByLevel: { [level: number]: MindMapNode[] } = {};
    const nodesByParent: { [parentId: string]: MindMapNode[] } = {};
    
    visibleNodes.forEach(node => {
      if (!nodesByLevel[node.level]) nodesByLevel[node.level] = [];
      nodesByLevel[node.level].push(node);
      
      if (node.parentId) {
        if (!nodesByParent[node.parentId]) nodesByParent[node.parentId] = [];
        nodesByParent[node.parentId].push(node);
      }
    });

    // Create hierarchy connections (tree structure)
    hierarchyConnections.forEach(connection => {
      const parentNode = visibleNodes.find(n => n.id === connection.from);
      const childNode = visibleNodes.find(n => n.id === connection.to);
      
      if (!parentNode || !childNode) return;

      const siblings = nodesByParent[parentNode.id] || [];
      
      if (siblings.length === 1) {
        // Single child - direct vertical connection
        const pathString = `M ${parentNode.x}% ${parentNode.y + 5}% L ${parentNode.x}% ${childNode.y - 5}% L ${childNode.x}% ${childNode.y - 5}% L ${childNode.x}% ${childNode.y - 3}%`;
        
        connectionPaths.push({
          id: `${connection.from}-${connection.to}`,
          path: pathString,
          type: connection.type,
          strength: connection.strength,
          animated: connection.animated,
          fromNode: connection.from,
          toNode: connection.to
        });
      } else {
        // Multiple children - create tree structure
        const sortedSiblings = siblings.sort((a, b) => a.x - b.x);
        const leftmostX = sortedSiblings[0].x;
        const rightmostX = sortedSiblings[sortedSiblings.length - 1].x;
        const connectorY = parentNode.y + 12; // Horizontal connector line Y position
        
        // Create main vertical line from parent to horizontal connector
        if (connection.to === sortedSiblings[0].id) {
          const mainVerticalPath = `M ${parentNode.x}% ${parentNode.y + 5}% L ${parentNode.x}% ${connectorY}%`;
          connectionPaths.push({
            id: `${parentNode.id}-main-vertical`,
            path: mainVerticalPath,
            type: connection.type,
            strength: connection.strength,
            animated: false,
            fromNode: connection.from,
            toNode: connection.to
          });
          
          // Create horizontal connector line
          const horizontalPath = `M ${leftmostX}% ${connectorY}% L ${rightmostX}% ${connectorY}%`;
          connectionPaths.push({
            id: `${parentNode.id}-horizontal-connector`,
            path: horizontalPath,
            type: connection.type,
            strength: connection.strength,
            animated: false,
            fromNode: connection.from,
            toNode: connection.to
          });
        }
        
        // Create vertical drop to each child
        const dropPath = `M ${childNode.x}% ${connectorY}% L ${childNode.x}% ${childNode.y - 3}%`;
        connectionPaths.push({
          id: `${connection.from}-${connection.to}-drop`,
          path: dropPath,
          type: connection.type,
          strength: connection.strength,
          animated: connection.animated,
          fromNode: connection.from,
          toNode: connection.to
        });
      }
    });

    // Handle non-hierarchy connections (association, dependency, similarity) with curved paths
    const nonHierarchyConnections = connections.filter(c => c.type !== 'hierarchy');
    nonHierarchyConnections.forEach(connection => {
      const fromNode = visibleNodes.find(n => n.id === connection.from);
      const toNode = visibleNodes.find(n => n.id === connection.to);
      
      if (!fromNode || !toNode) return;

      // Create curved path for non-hierarchy connections
      const fromX = fromNode.x;
      const fromY = fromNode.y;
      const toX = toNode.x;
      const toY = toNode.y;
      
      const midX = (fromX + toX) / 2;
      const midY = (fromY + toY) / 2;
      const offsetY = Math.abs(fromX - toX) * 0.2; // Curve intensity based on horizontal distance
      
      const curvePath = `M ${fromX}% ${fromY}% Q ${midX}% ${midY - offsetY}% ${toX}% ${toY}%`;
      
      connectionPaths.push({
        id: `${connection.from}-${connection.to}-curve`,
        path: curvePath,
        type: connection.type,
        strength: connection.strength,
        animated: connection.animated,
        fromNode: connection.from,
        toNode: connection.to
      });
    });

    return connectionPaths;
  }, [connections]);

  // AI-powered node suggestions
  const generateAISuggestions = useCallback((nodeId: string) => {
    const node = nodes.find(n => n.id === nodeId);
    if (!node) return [];

    const suggestions = [];
    
    const relatedNodes = nodes.filter(n => 
      n.id !== nodeId && 
      n.tags.some(tag => node.tags.includes(tag))
    );
    
    relatedNodes.forEach(relatedNode => {
      if (!connections.some(c => 
        (c.from === nodeId && c.to === relatedNode.id) || 
        (c.from === relatedNode.id && c.to === nodeId)
      )) {
        suggestions.push({
          type: 'connect',
          nodeId: relatedNode.id,
          reason: `Similar tags: ${node.tags.filter(t => relatedNode.tags.includes(t)).join(', ')}`
        });
      }
    });

    if (node.contentItems.length > 2 || node.title.split(' ').length > 4) {
      suggestions.push({
        type: 'split',
        reason: 'This node contains multiple concepts that could be separated'
      });
    }

    return suggestions.slice(0, 3);
  }, [nodes, connections]);

  // Node enrichment functions
  const splitNode = useCallback((nodeId: string) => {
    const node = nodes.find(n => n.id === nodeId);
    if (!node) return;

    const titleWords = node.title.split(' ');
    if (titleWords.length < 2) return;

    const midPoint = Math.ceil(titleWords.length / 2);
    const firstHalf = titleWords.slice(0, midPoint).join(' ');
    const secondHalf = titleWords.slice(midPoint).join(' ');

    const newNode1: MindMapNode = {
      ...node,
      id: `${nodeId}_split_1`,
      title: firstHalf,
      x: node.x - 10,
      y: node.y + 15,
      children: [],
      isAISuggested: true,
      lastModified: Date.now(),
      aiScore: 0.8,
      contentItems: [
        {
          type: 'text',
          content: firstHalf,
          style: { fontSize: '16px', fontWeight: 'bold', color: '#1e293b' }
        }
      ]
    };

    const newNode2: MindMapNode = {
      ...node,
      id: `${nodeId}_split_2`,
      title: secondHalf,
      x: node.x + 10,
      y: node.y + 15,
      children: [],
      isAISuggested: true,
      lastModified: Date.now(),
      aiScore: 0.8,
      contentItems: [
        {
          type: 'text',
          content: secondHalf,
          style: { fontSize: '16px', fontWeight: 'bold', color: '#1e293b' }
        }
      ]
    };

    setNodes(prev => [...prev.filter(n => n.id !== nodeId), newNode1, newNode2]);
    setConnections(prev => [
      ...prev.filter(c => c.from !== nodeId && c.to !== nodeId),
      { from: node.parentId || 'root', to: newNode1.id, type: 'hierarchy', strength: 1.0 },
      { from: node.parentId || 'root', to: newNode2.id, type: 'hierarchy', strength: 1.0 },
      { from: newNode1.id, to: newNode2.id, type: 'association', strength: 0.9 }
    ]);
  }, [nodes]);

  const mergeNodes = useCallback((nodeIds: string[]) => {
    if (nodeIds.length < 2) return;

    const nodesToMerge = nodes.filter(n => nodeIds.includes(n.id));
    const parentNode = nodesToMerge[0].parentId;
    
    const mergedNode: MindMapNode = {
      id: `merged_${Date.now()}`,
      title: nodesToMerge.map(n => n.title).join(' + '),
      x: nodesToMerge.reduce((sum, n) => sum + n.x, 0) / nodesToMerge.length,
      y: nodesToMerge.reduce((sum, n) => sum + n.y, 0) / nodesToMerge.length,
      level: Math.min(...nodesToMerge.map(n => n.level)),
      parentId: parentNode,
      children: [],
      isExpanded: true,
      isEditing: false,
      isAISuggested: true,
      isOfflineCreated: false,
      nodeType: 'rich',
      clusterId: nodesToMerge[0].clusterId,
      tags: [...new Set(nodesToMerge.flatMap(n => n.tags))],
      lastModified: Date.now(),
      aiScore: 0.9,
      contentItems: [
        {
          type: 'text',
          content: nodesToMerge.map(n => n.title).join(' + '),
          style: { fontSize: '16px', fontWeight: 'bold', color: '#1e293b' }
        }
      ],
      style: {
        borderRadius: '12px',
        background: '#f1f5f9',
        padding: '16px',
        minWidth: '250px',
        maxWidth: '300px'
      },
      icon: Merge,
      color: 'bg-indigo-500'
    };

    setNodes(prev => [...prev.filter(n => !nodeIds.includes(n.id)), mergedNode]);
    setConnections(prev => [
      ...prev.filter(c => !nodeIds.includes(c.from) && !nodeIds.includes(c.to)),
      { from: parentNode || 'root', to: mergedNode.id, type: 'hierarchy', strength: 1.0 }
    ]);
  }, [nodes]);

  const connectDistantNodes = useCallback((fromId: string, toId: string, connectionType: Connection['type'] = 'association') => {
    if (connections.some(c => 
      (c.from === fromId && c.to === toId) || 
      (c.from === toId && c.to === fromId)
    )) return;

    const newConnection: Connection = {
      from: fromId,
      to: toId,
      type: connectionType,
      strength: 0.7,
      animated: true
    };

    setConnections(prev => [...prev, newConnection]);
  }, [connections]);

  const renderContentItem = (item: ContentItem, index: number) => {
    const style = item.style || {};
    
    switch (item.type) {
      case 'text':
        return (
          <div 
            key={index}
            style={{
              fontSize: style.fontSize || '14px',
              fontWeight: style.fontWeight || 'normal',
              color: style.color || '#333',
              lineHeight: style.lineHeight || '1.5',
              textAlign: style.textAlign || 'left',
              marginTop: style.marginTop || '0',
              marginBottom: style.marginBottom || '0'
            }}
          >
            {item.content}
          </div>
        );
      case 'image':
      case 'article-thumbnail':
        return (
          <div key={index} style={{ marginTop: style.marginTop || '0', marginBottom: style.marginBottom || '0' }}>
            <ImageWithFallback
              src={item.src || ''}
              alt={item.alt || ''}
              className="rounded-lg"
              style={{
                width: style.width || '100%',
                height: style.height || 'auto',
                borderRadius: style.borderRadius || '8px',
                objectFit: style.objectFit || 'cover'
              }}
            />
          </div>
        );
      default:
        return null;
    }
  };

  const addNode = (parentId: string, title: string) => {
    const parent = nodes.find(n => n.id === parentId);
    if (!parent) return;

    const newNode: MindMapNode = {
      id: `node_${Date.now()}`,
      title,
      x: parent.x + (Math.random() - 0.5) * 30,
      y: parent.y + 25 + parent.level * 5,
      level: parent.level + 1,
      parentId,
      children: [],
      isExpanded: true,
      isEditing: false,
      isAISuggested: isOnline,
      isOfflineCreated: !isOnline,
      nodeType: 'simple',
      clusterId: parent.clusterId,
      tags: ['new'],
      lastModified: Date.now(),
      aiScore: 0.5,
      contentItems: [
        {
          type: 'text',
          content: title,
          style: {
            fontSize: '16px',
            fontWeight: 'bold',
            color: '#1e293b'
          }
        },
        {
          type: 'text',
          content: 'New idea ready for development.',
          style: {
            fontSize: '14px',
            lineHeight: '1.5',
            color: '#475569',
            marginTop: '8px'
          }
        }
      ],
      icon: Users,
      color: 'bg-orange-500',
      style: {
        borderRadius: '12px',
        background: '#f1f5f9',
        padding: '16px',
        minWidth: '200px',
        maxWidth: '280px'
      }
    };

    setNodes(prev => [
      ...prev.map(node => 
        node.id === parentId 
          ? { ...node, children: [...node.children, newNode.id] }
          : node
      ),
      newNode
    ]);

    setConnections(prev => [...prev, { from: parentId, to: newNode.id, type: 'hierarchy', strength: 1.0 }]);
  };

  const toggleNodeExpansion = (nodeId: string) => {
    setNodes(prev => prev.map(node => 
      node.id === nodeId 
        ? { ...node, isExpanded: !node.isExpanded }
        : node
    ));
  };

  const startEditing = (nodeId: string) => {
    setNodes(prev => prev.map(node => 
      node.id === nodeId 
        ? { ...node, isEditing: true }
        : { ...node, isEditing: false }
    ));
  };

  const finishEditing = (nodeId: string, newTitle: string) => {
    setNodes(prev => prev.map(node => 
      node.id === nodeId 
        ? { ...node, title: newTitle, isEditing: false, lastModified: Date.now() }
        : node
    ));
  };

  const deleteNode = (nodeId: string) => {
    if (nodeId === 'root') return;
    
    const nodeToDelete = nodes.find(n => n.id === nodeId);
    if (!nodeToDelete) return;

    setNodes(prev => prev.filter(node => {
      if (node.id === nodeId) return false;
      if (node.children.includes(nodeId)) {
        node.children = node.children.filter(id => id !== nodeId);
      }
      return true;
    }));

    setConnections(prev => prev.filter(conn => 
      conn.from !== nodeId && conn.to !== nodeId
    ));
  };

  const getVisibleNodes = () => {
    const visible: MindMapNode[] = [];
    
    const traverse = (nodeId: string) => {
      const node = nodes.find(n => n.id === nodeId);
      if (!node) return;
      
      visible.push(node);
      
      if (node.isExpanded) {
        node.children.forEach(childId => traverse(childId));
      }
    };
    
    traverse('root');
    return visible;
  };

  const getConnectionStyle = (connection: Connection) => {
    const baseStyle = {
      strokeWidth: Math.max(2, connection.strength * 3),
      opacity: connection.strength,
      fill: 'none'
    };

    switch (connection.type) {
      case 'hierarchy':
        return { ...baseStyle, stroke: '#64748b', strokeDasharray: '0' };
      case 'association':
        return { ...baseStyle, stroke: '#3b82f6', strokeDasharray: '8,4' };
      case 'dependency':
        return { ...baseStyle, stroke: '#f59e0b', strokeDasharray: '12,4' };
      case 'similarity':
        return { ...baseStyle, stroke: '#10b981', strokeDasharray: '4,4' };
      default:
        return baseStyle;
    }
  };

  const visibleNodes = getVisibleNodes();
  const hierarchyConnections = connections.filter(c => c.type === 'hierarchy');
  const connectionPaths = calculateTreeConnections(visibleNodes, hierarchyConnections);

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden">
      {/* Navigation Controls */}
      <div className="absolute bottom-4 right-4 z-40 flex gap-2">
        <div className="bg-background/80 backdrop-blur-sm border rounded-lg p-2 shadow-lg">
          <div className="flex gap-1">
            <Button size="sm" variant="ghost" onClick={handleZoomOut} title="Zoom Out">
              <ZoomOut className="h-4 w-4" />
            </Button>
            <Button size="sm" variant="ghost" onClick={handleResetView} title="Reset View">
              <Maximize className="h-4 w-4" />
            </Button>
            <Button size="sm" variant="ghost" onClick={handleZoomIn} title="Zoom In">
              <ZoomIn className="h-4 w-4" />
            </Button>
          </div>
          <div className="text-xs text-center mt-1 text-muted-foreground">
            {Math.round(viewport.zoom * 100)}%
          </div>
        </div>
        
      </div>

      {/* Mind Map Canvas */}
      <div 
        ref={canvasRef}
        className="flex-1 relative overflow-hidden bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-blue-950/20 dark:to-purple-950/20 cursor-grab active:cursor-grabbing"
        style={{ height: 'calc(100vh - 140px)' }}
        onMouseDown={handleViewportMouseDown}
        onMouseMove={handleViewportMouseMove}
        onMouseUp={handleViewportMouseUp}
        onMouseLeave={handleViewportMouseUp}
      >
        {/* Viewport Container */}
        <motion.div
          className="absolute inset-0 origin-top-left"
          animate={{
            scale: viewport.zoom,
            x: viewport.panX / viewport.zoom,
            y: viewport.panY / viewport.zoom
          }}
          transition={{ type: "spring", stiffness: 400, damping: 40 }}
        >
          {/* Cluster Backgrounds */}
          {showClusters && clusters.filter(c => c.visible).map(cluster => (
            <motion.div
              key={cluster.id}
              className="absolute rounded-2xl border-2 border-dashed"
              style={{
                left: `${cluster.position.x}%`,
                top: `${cluster.position.y}%`,
                width: '35%',
                height: '40%',
                background: cluster.color,
                borderColor: cluster.color.replace('0.1', '0.3'),
                transform: 'translate(-10%, -10%)'
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute -top-6 left-4 px-2 py-1 bg-background/80 backdrop-blur-sm rounded-md border text-xs font-medium">
                {cluster.name}
              </div>
            </motion.div>
          ))}

          {/* Tree-Style Connection Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
            <AnimatePresence>
              {connectionPaths.map((connectionPath) => {
                const connectionStyle = getConnectionStyle({
                  type: connectionPath.type,
                  strength: connectionPath.strength,
                  from: connectionPath.fromNode,
                  to: connectionPath.toNode,
                  animated: connectionPath.animated
                });
                
                return (
                  <motion.path
                    key={connectionPath.id}
                    d={connectionPath.path}
                    {...connectionStyle}
                    className={connectionPath.animated ? 'animate-pulse' : ''}
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: connectionStyle.opacity }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                  />
                );
              })}
              
              {/* Connection type indicators for non-hierarchy connections */}
              {connectionPaths
                .filter(cp => cp.type !== 'hierarchy')
                .map((connectionPath) => {
                  const fromNode = visibleNodes.find(n => n.id === connectionPath.fromNode);
                  const toNode = visibleNodes.find(n => n.id === connectionPath.toNode);
                  if (!fromNode || !toNode) return null;
                  
                  const connectionStyle = getConnectionStyle({
                    type: connectionPath.type,
                    strength: connectionPath.strength,
                    from: connectionPath.fromNode,
                    to: connectionPath.toNode,
                    animated: connectionPath.animated
                  });
                  
                  return (
                    <motion.circle
                      key={`${connectionPath.id}-indicator`}
                      cx={`${(fromNode.x + toNode.x) / 2}%`}
                      cy={`${(fromNode.y + toNode.y) / 2}%`}
                      r="4"
                      fill={connectionStyle.stroke}
                      className="animate-pulse"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 0.8 }}
                      transition={{ duration: 0.3, delay: 0.3 }}
                    />
                  );
                })}
            </AnimatePresence>
          </svg>

          {/* Mind Map Nodes - Unified Design */}
          <AnimatePresence>
            {visibleNodes.map((node) => {
              const Icon = node.icon;
              const suggestions = generateAISuggestions(node.id);
              
              return (
                <motion.div
                  key={node.id}
                  drag
                  dragMomentum={false}
                  dragElastic={0.1}
                  dragConstraints={canvasRef}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  whileDrag={{ scale: 1.05, zIndex: 50 }}
                  onDragEnd={(_, info) => {
                    handleNodeDrag(node.id, { x: info.point.x, y: info.point.y });
                  }}
                  className="absolute z-20 cursor-move"
                  style={{ 
                    left: `${node.x}%`, 
                    top: `${node.y}%`,
                    x: '-50%',
                    y: '-50%'
                  }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ 
                    opacity: 1, 
                    scale: isSyncing && node.isOfflineCreated ? 1.05 : 1 
                  }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 300, 
                    damping: 30 
                  }}
                >
                  {/* AI Suggestion Ring */}
                  {node.isAISuggested && (
                    <motion.div 
                      className="absolute inset-0 rounded-lg border-2 border-blue-400 pointer-events-none" 
                      animate={{ 
                        scale: [1, 1.05, 1],
                        opacity: [0.5, 1, 0.5]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  )}
                  
                  {/* Sync Animation */}
                  {isSyncing && node.isOfflineCreated && (
                    <motion.div 
                      className="absolute inset-0 rounded-lg border-2 border-blue-600 pointer-events-none" 
                      animate={{ 
                        scale: [1, 1.2, 1],
                        opacity: [1, 0, 1]
                      }}
                      transition={{
                        duration: 1,
                        repeat: Infinity
                      }}
                    />
                  )}

                  {/* Unified Content Node */}
                  <div className="relative group">
                    <motion.div
                      className={`
                        rounded-lg shadow-lg border border-white/20 backdrop-blur-sm
                        group-hover:shadow-xl transition-all duration-200 cursor-pointer
                        ${selectedNodes.includes(node.id) ? 'ring-2 ring-purple-400' : ''}
                        text-white
                      `}
                      style={{
                        background: node.style?.background || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        borderRadius: node.style?.borderRadius || '12px',
                        padding: node.style?.padding || '20px',
                        minWidth: node.style?.minWidth || '220px',
                        maxWidth: node.style?.maxWidth || '320px'
                      }}
                      whileHover={{ boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (e.ctrlKey || e.metaKey) {
                          setSelectedNodes(prev => 
                            prev.includes(node.id) 
                              ? prev.filter(id => id !== node.id)
                              : [...prev, node.id]
                          );
                        } else if (!node.isEditing && node.children.length > 0) {
                          toggleNodeExpansion(node.id);
                        }
                      }}
                    >
                      {/* Icon for visual identity */}
                      <div className="absolute -top-3 -left-3 w-8 h-8 bg-background/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md">
                        <Icon className="h-4 w-4 text-foreground" />
                      </div>

                      {/* Rich Content */}
                      <div className="space-y-2">
                        {node.contentItems.length > 0 ? (
                          node.contentItems.map((item, index) => 
                            renderContentItem(item, index)
                          )
                        ) : (
                          // Fallback content for nodes without contentItems
                          <div>
                            <div style={{
                              fontSize: '16px',
                              fontWeight: 'bold',
                              color: '#1e293b',
                              marginBottom: '8px'
                            }}>
                              {node.title}
                            </div>
                            <div style={{
                              fontSize: '14px',
                              lineHeight: '1.5',
                              color: '#475569'
                            }}>
                              Click to expand or edit this node.
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Tags */}
                      {node.tags.length > 0 && (
                        <motion.div 
                          className="flex flex-wrap gap-1 mt-3"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 }}
                        >
                          {node.tags.slice(0, 3).map(tag => (
                            <Badge key={tag} variant="secondary" className="text-xs bg-white/20 text-white border-white/30">
                              {tag}
                            </Badge>
                          ))}
                        </motion.div>
                      )}

                      {/* AI Score Indicator */}
                      {node.aiScore > 0.8 && (
                        <motion.div 
                          className="absolute top-2 left-2"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <div className="w-2 h-2 bg-green-400 rounded-full" title={`AI Score: ${Math.round(node.aiScore * 100)}%`} />
                        </motion.div>
                      )}

                      {/* Expansion Indicator */}
                      {node.children.length > 0 && (
                        <motion.div 
                          className="absolute -bottom-2 -right-2 w-6 h-6 bg-background border-2 border-white rounded-full flex items-center justify-center"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <motion.div
                            animate={{ rotate: node.isExpanded ? 0 : -90 }}
                            transition={{ duration: 0.2 }}
                          >
                            <ChevronDown className="h-3 w-3" />
                          </motion.div>
                        </motion.div>
                      )}

                      {/* Offline Indicator */}
                      {node.isOfflineCreated && (
                        <motion.div 
                          className="absolute -top-2 -right-2 w-4 h-4 bg-orange-500 rounded-full flex items-center justify-center"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          <WifiOff className="h-2 w-2 text-white" />
                        </motion.div>
                      )}

                      {/* AI Badge */}
                      {node.isAISuggested && (
                        <motion.div 
                          className="absolute top-2 right-2"
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: 0.2 }}
                        >
                          <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                            <Sparkles className="h-3 w-3 mr-1" />
                            AI
                          </Badge>
                        </motion.div>
                      )}
                    </motion.div>

                    {/* AI Suggestions */}
                    {suggestions.length > 0 && (
                      <motion.div 
                        className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100"
                        initial={{ y: 10, opacity: 0 }}
                        whileHover={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="bg-blue-500 text-white text-xs px-2 py-1 rounded shadow-lg whitespace-nowrap">
                          <Zap className="h-3 w-3 inline mr-1" />
                          {suggestions.length} AI suggestion{suggestions.length > 1 ? 's' : ''}
                        </div>
                      </motion.div>
                    )}

                    {/* Node Actions */}
                    <motion.div 
                      className="absolute -top-2 -left-2 opacity-0 group-hover:opacity-100"
                      initial={{ scale: 0.8, opacity: 0 }}
                      whileHover={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button size="sm" variant="outline" className="h-6 w-6 p-0 rounded-full bg-background drag-cancel">
                            <MoreVertical className="h-3 w-3" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start">
                          <DropdownMenuItem onClick={() => {
                            setSelectedNodeForAdd(node.id);
                            setShowInputModal(true);
                          }}>
                            <Plus className="h-4 w-4 mr-2" />
                            Add Child
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => startEditing(node.id)}>
                            <Edit3 className="h-4 w-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => {
                            setSelectedNodeForEnrichment(node.id);
                            setEnrichmentMode('split');
                            setShowEnrichmentModal(true);
                          }}>
                            <Split className="h-4 w-4 mr-2" />
                            Split Node
                          </DropdownMenuItem>
                          {selectedNodes.length > 1 && (
                            <DropdownMenuItem onClick={() => mergeNodes(selectedNodes)}>
                              <Merge className="h-4 w-4 mr-2" />
                              Merge Selected
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem onClick={() => {
                            setSelectedNodeForEnrichment(node.id);
                            setEnrichmentMode('connect');
                            setShowEnrichmentModal(true);
                          }}>
                            <GitBranch className="h-4 w-4 mr-2" />
                            Connect to...
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          {node.id !== 'root' && (
                            <DropdownMenuItem 
                              onClick={() => deleteNode(node.id)}
                              className="text-destructive"
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Offline Mode Overlay */}
        {!isOnline && (
          <motion.div 
            className="absolute top-4 left-1/2 transform -translate-x-1/2 z-30"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-orange-100 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg px-4 py-2 shadow-sm">
              <p className="text-sm text-orange-800 dark:text-orange-200 text-center">
                📱 Offline mode: Place your ideas—AI will organize when online
              </p>
            </div>
          </motion.div>
        )}

        {/* Selection Info */}
        <AnimatePresence>
          {selectedNodes.length > 0 && (
            <motion.div 
              className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-30"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-background/90 backdrop-blur-sm border rounded-lg px-4 py-2 shadow-lg">
                <p className="text-sm text-center">
                  {selectedNodes.length} node{selectedNodes.length > 1 ? 's' : ''} selected
                  {selectedNodes.length > 1 && (
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="ml-2"
                      onClick={() => mergeNodes(selectedNodes)}
                    >
                      <Merge className="h-3 w-3 mr-1" />
                      Merge
                    </Button>
                  )}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Input Modal */}
      <Dialog open={showInputModal} onOpenChange={setShowInputModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Idea</DialogTitle>
            <DialogDescription>
              Add a new node to your mind map. Choose your input method below.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            {/* Input Mode Selector */}
            <div className="grid grid-cols-4 gap-2">
              <Button
                variant={inputMode === 'text' ? 'default' : 'outline'}
                onClick={() => setInputMode('text')}
                className="flex flex-col gap-1 h-auto py-3"
              >
                <FileText className="h-4 w-4" />
                <span className="text-xs">Text</span>
              </Button>
              <Button
                variant={inputMode === 'voice' ? 'default' : 'outline'}
                onClick={() => setInputMode('voice')}
                className="flex flex-col gap-1 h-auto py-3"
                disabled={!isOnline}
              >
                <Mic className="h-4 w-4" />
                <span className="text-xs">Voice</span>
              </Button>
              <Button
                variant={inputMode === 'camera' ? 'default' : 'outline'}
                onClick={() => setInputMode('camera')}
                className="flex flex-col gap-1 h-auto py-3"
                disabled={!isOnline}
              >
                <Camera className="h-4 w-4" />
                <span className="text-xs">OCR</span>
              </Button>
              <Button
                variant={inputMode === 'file' ? 'default' : 'outline'}
                onClick={() => setInputMode('file')}
                className="flex flex-col gap-1 h-auto py-3"
                disabled={!isOnline}
              >
                <FileText className="h-4 w-4" />
                <span className="text-xs">File</span>
              </Button>
            </div>

            {/* Input Area */}
            {inputMode === 'text' && (
              <div className="space-y-2">
                <Input
                  placeholder="Enter your idea..."
                  value={newNodeTitle}
                  onChange={(e) => setNewNodeTitle(e.target.value)}
                  autoFocus
                />
                {!isOnline && (
                  <p className="text-xs text-muted-foreground">
                    💡 This will be placed manually. AI will optimize position when online.
                  </p>
                )}
              </div>
            )}

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowInputModal(false)}>
                Cancel
              </Button>
              <Button 
                onClick={() => {
                  if (selectedNodeForAdd && newNodeTitle.trim()) {
                    addNode(selectedNodeForAdd, newNodeTitle);
                    setNewNodeTitle('');
                    setShowInputModal(false);
                  }
                }}
                disabled={inputMode === 'text' && !newNodeTitle.trim()}
              >
                Add Node
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Node Enrichment Modal */}
      <Dialog open={showEnrichmentModal} onOpenChange={setShowEnrichmentModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Node Enrichment</DialogTitle>
            <DialogDescription>
              Enhance your mind map with AI-powered node operations.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-2">
              <Button
                variant={enrichmentMode === 'split' ? 'default' : 'outline'}
                onClick={() => setEnrichmentMode('split')}
                className="flex flex-col gap-1 h-auto py-3"
              >
                <Split className="h-4 w-4" />
                <span className="text-xs">Split</span>
              </Button>
              <Button
                variant={enrichmentMode === 'merge' ? 'default' : 'outline'}
                onClick={() => setEnrichmentMode('merge')}
                className="flex flex-col gap-1 h-auto py-3"
              >
                <Merge className="h-4 w-4" />
                <span className="text-xs">Merge</span>
              </Button>
              <Button
                variant={enrichmentMode === 'connect' ? 'default' : 'outline'}
                onClick={() => setEnrichmentMode('connect')}
                className="flex flex-col gap-1 h-auto py-3"
              >
                <GitBranch className="h-4 w-4" />
                <span className="text-xs">Connect</span>
              </Button>
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowEnrichmentModal(false)}>
                Cancel
              </Button>
              <Button 
                onClick={() => {
                  if (selectedNodeForEnrichment) {
                    switch (enrichmentMode) {
                      case 'split':
                        splitNode(selectedNodeForEnrichment);
                        break;
                      case 'merge':
                        if (selectedNodes.length > 1) {
                          mergeNodes(selectedNodes);
                        }
                        break;
                      case 'connect':
                        console.log('Connect mode');
                        break;
                    }
                    setShowEnrichmentModal(false);
                  }
                }}
              >
                Apply
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}