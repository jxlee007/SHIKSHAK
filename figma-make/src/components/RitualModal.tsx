import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Sun, Moon, Target, CheckCircle, Calendar, Lightbulb } from 'lucide-react';

interface RitualModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  type: 'morning' | 'evening';
}

export function RitualModal({ open, onOpenChange, type }: RitualModalProps) {
  const [priorities, setPriorities] = useState('');
  const [reflections, setReflections] = useState('');
  const [gratitude, setGratitude] = useState('');

  const handleSave = () => {
    console.log(`Saving ${type} ritual:`, { priorities, reflections, gratitude });
    // Reset form
    setPriorities('');
    setReflections('');
    setGratitude('');
    onOpenChange(false);
  };

  const morningPrompts = [
    "What are your top 3 priorities for today?",
    "What would make today feel successful?",
    "What obstacles might you face today and how will you handle them?",
  ];

  const eveningPrompts = [
    "What went well today?",
    "What could have gone better?",
    "What are you grateful for today?",
    "What did you learn today?",
  ];

  const prompts = type === 'morning' ? morningPrompts : eveningPrompts;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {type === 'morning' ? (
              <>
                <Sun className="h-5 w-5 text-yellow-500" />
                Morning Brief
              </>
            ) : (
              <>
                <Moon className="h-5 w-5 text-blue-400" />
                Evening Reflection
              </>
            )}
          </DialogTitle>
          <DialogDescription>
            {type === 'morning' 
              ? 'Set your intentions and priorities for the day ahead with guided prompts.'
              : 'Reflect on your day, celebrate accomplishments, and practice gratitude.'
            }
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Current time and date */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    {new Date().toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </span>
                </div>
                <Badge variant="outline" className="gap-1">
                  <div className={`w-2 h-2 rounded-full ${type === 'morning' ? 'bg-yellow-500' : 'bg-blue-400'}`}></div>
                  {type === 'morning' ? 'Morning' : 'Evening'}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Guided prompts */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Lightbulb className="h-5 w-5" />
                Guided Questions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {prompts.map((prompt, index) => (
                <div key={index} className="p-3 bg-muted/50 rounded-lg">
                  <p className="text-sm font-medium text-muted-foreground">{prompt}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Main reflection area */}
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                {type === 'morning' ? (
                  <>
                    <Target className="h-4 w-4" />
                    Today's Priorities
                  </>
                ) : (
                  <>
                    <CheckCircle className="h-4 w-4" />
                    Today's Accomplishments
                  </>
                )}
              </label>
              <Textarea
                placeholder={type === 'morning' 
                  ? "What are the most important things you want to accomplish today?"
                  : "What did you accomplish today? What went well?"
                }
                value={priorities}
                onChange={(e) => setPriorities(e.target.value)}
                className="min-h-[100px] resize-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                {type === 'morning' ? 'Intentions & Mindset' : 'Reflections & Learnings'}
              </label>
              <Textarea
                placeholder={type === 'morning'
                  ? "How do you want to show up today? What mindset will serve you?"
                  : "What did you learn today? What would you do differently?"
                }
                value={reflections}
                onChange={(e) => setReflections(e.target.value)}
                className="min-h-[100px] resize-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Gratitude</label>
              <Textarea
                placeholder="What are you grateful for right now?"
                value={gratitude}
                onChange={(e) => setGratitude(e.target.value)}
                className="min-h-[80px] resize-none"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Skip for now
            </Button>
            <Button onClick={handleSave}>
              Complete {type === 'morning' ? 'Brief' : 'Reflection'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}