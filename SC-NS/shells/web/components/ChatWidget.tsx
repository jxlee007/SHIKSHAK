'use client';

import React from 'react';

const ChatWidget = () => {
  return (
    <main className="flex-1 flex flex-col h-[calc(100vh-65px)] bg-background">
      {/* Chat Header */}
      <header className="flex items-center justify-between p-3 border-b bg-surface">
        <h1 className="text-sm font-semibold text-text">Ask questions about your meeting</h1>
        <button className="flex items-center text-xs text-secondary hover:text-text focus:outline-none">
          Clear
        </button>
      </header>

      {/* Chat History Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* AI Welcome Message - Example from prototype */}
        <div className="flex items-start gap-3">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white flex-shrink-0">
            {/* AI icon */}
          </div>
          <div className="max-w-[85%]">
            <div className="px-4 py-3 rounded-lg rounded-tl-none bg-surface border border-border shadow-sm">
              <p className="text-sm text-text">
                Hi! I&apos;ve analyzed your meeting. What would you like to know?
              </p>
            </div>
            <span className="text-xs text-secondary mt-1">AI Assistant</span>
          </div>
        </div>

        {/* User Question - Example from prototype */}
        <div className="flex items-start gap-3 justify-end">
           <div className="max-w-[85%]">
            <div className="px-4 py-3 rounded-lg rounded-tr-none bg-success text-white">
              <p className="text-sm">
                What were the main points about the fundraising timeline?
              </p>
            </div>
             <span className="text-xs text-secondary mt-1 flex justify-end">You</span>
          </div>
           <div className="flex items-center justify-center w-8 h-8 rounded-full bg-success text-white flex-shrink-0">
            {/* User icon */}
          </div>
        </div>
      </div>

      {/* Input Area */}
      <div className="p-4 bg-surface border-t border-border">
        <form className="flex items-end gap-2">
          <textarea
            className="flex-1 resize-none p-2 border rounded-lg bg-surface text-text border-border focus:ring-primary focus:border-primary"
            placeholder="Ask about this meeting..."
            rows={1}
          ></textarea>
          <button type="submit" className="px-4 py-2 bg-primary text-white rounded-lg font-semibold">
            Send
          </button>
        </form>
      </div>
    </main>
  );
};

export default ChatWidget;
