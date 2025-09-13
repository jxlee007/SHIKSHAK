'use client';

import React from 'react';

// A new component for message bubbles
const MessageBubble = ({ message, isUser }: { message: string, isUser: boolean }) => {
  const bubbleClasses = isUser
    ? "bg-success text-white self-end rounded-br-none"
    : "bg-surface text-text self-start rounded-bl-none";

  return (
    <div className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'}`}>
        <div className={`max-w-[80%] p-3 rounded-xl shadow-sm relative ${bubbleClasses}`}>
            <p className="text-sm">{message}</p>
            <div className="text-xs opacity-70 mt-1 text-right">10:00 AM</div>
        </div>
    </div>
  );
};


const ChatWidget = () => {
  return (
    <main className="flex-1 flex flex-col h-[calc(100vh-65px)] bg-gray-100">
      {/* Chat Header */}
      <header className="flex items-center justify-between p-2 border-b bg-surface">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold">
            AI
          </div>
          <div>
            <h2 className="font-semibold text-text">AI Companion</h2>
            <p className="text-xs text-secondary">Online</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 text-secondary rounded-full hover:bg-gray-100 hover:text-primary">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </button>
          <button className="p-2 text-secondary rounded-full hover:bg-gray-100 hover:text-primary">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498A1 1 0 0119 15.72V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </button>
        </div>
      </header>

      {/* Chat History Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        <MessageBubble message="Hi! I&apos;ve analyzed your meeting. What would you like to know?" isUser={false} />
        <MessageBubble message="What were the main points about the fundraising timeline?" isUser={true} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-surface border-t border-border">
        <form className="flex items-end gap-2">
          <button type="button" className="p-2 text-secondary rounded-full hover:bg-gray-100 hover:text-primary">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
            </svg>
          </button>
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
