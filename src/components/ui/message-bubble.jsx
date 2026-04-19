import React from 'react';
import ReactMarkdown from 'react-markdown';

const MessageBubble = ({ message, isUser }) => {
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && (
        <img
          src={message.avatar}
          alt="助手头像"
          className="w-8 h-8 rounded-full mr-2 self-start mt-1 mx-auto object-cover"
        />
      )}
      <div
        className={`max-w-xs md:max-w-2xl rounded-2xl px-4 py-2 ${
          isUser
            ? 'bg-gray-200 text-gray-800 rounded-tr-none'
            : 'bg-blue-500 text-white rounded-tl-none'
        }`}
      >
        <ReactMarkdown
          components={{
            p: ({node, ...props}) => <p className="text-sm" {...props} />,
            h1: ({node, ...props}) => <h1 className="text-lg font-bold mt-2 mb-1" {...props} />,
            h2: ({node, ...props}) => <h2 className="text-md font-bold mt-2 mb-1" {...props} />,
            h3: ({node, ...props}) => <h3 className="font-bold mt-2 mb-1" {...props} />,
            ul: ({node, ...props}) => <ul className="list-disc pl-5 mt-1" {...props} />,
            ol: ({node, ...props}) => <ol className="list-decimal pl-5 mt-1" {...props} />,
            li: ({node, ...props}) => <li className="mb-1" {...props} />,
            strong: ({node, ...props}) => <strong className="font-bold" {...props} />,
            em: ({node, ...props}) => <em className="italic" {...props} />,
            code: ({node, ...props}) => <code className="bg-gray-200 dark:bg-gray-700 rounded px-1 py-0.5" {...props} />,
            pre: ({node, ...props}) => <pre className="bg-gray-200 dark:bg-gray-700 rounded p-2 mt-1 mb-2 overflow-x-auto" {...props} />,
            a: ({node, ...props}) => <a className="text-blue-300 underline" target="_blank" rel="noopener noreferrer" {...props} />,
            blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-gray-300 pl-4 italic" {...props} />,
          }}
        >
          {message.content}
        </ReactMarkdown>
        {message.isEmergency && (
          <p className="text-xs mt-1 italic">紧急求助已发送</p>
        )}
      </div>
      {isUser && (
        <div className="w-8 h-8 rounded-full bg-gray-300 ml-2 flex items-center justify-center">
          <span className="text-xs font-semibold text-gray-600">我</span>
        </div>
      )}
    </div>
  );
};

export default MessageBubble;
