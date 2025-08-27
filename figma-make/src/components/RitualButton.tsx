import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Sun, Moon } from 'lucide-react';

interface RitualButtonProps {
  onRitualClick: (type: 'morning' | 'evening') => void;
}

export function RitualButton({ onRitualClick }: RitualButtonProps) {
  const [ritualType, setRitualType] = useState<'morning' | 'evening'>('morning');

  useEffect(() => {
    const updateRitualType = () => {
      const now = new Date();
      const hour = now.getHours();
      
      // Morning: 5 AM - 5 PM, Evening: 5 PM - 5 AM
      const isMorning = hour >= 5 && hour < 17;
      setRitualType(isMorning ? 'morning' : 'evening');
    };

    updateRitualType();
    
    // Update every minute to handle timezone changes
    const interval = setInterval(updateRitualType, 60000);
    
    return () => clearInterval(interval);
  }, []);

  const handleClick = () => {
    onRitualClick(ritualType);
  };

  return (
    <Button
      variant="outline"
      size="sm"
      className="gap-2 rounded-full px-4"
      onClick={handleClick}
    >
      {ritualType === 'morning' ? (
        <>
          <Sun className="h-4 w-4 text-yellow-500" />
          Ritual
        </>
      ) : (
        <>
          <Moon className="h-4 w-4 text-blue-400" />
          Ritual
        </>
      )}
    </Button>
  );
}