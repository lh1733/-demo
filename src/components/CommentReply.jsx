import React from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ThumbsUp, MessageSquare } from 'lucide-react';

const CommentReply = ({ reply, onLike, onReply }) => {
  return (
    <div className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
      <div className="flex items-start space-x-2">
        <img 
          src={reply.avatar} 
          alt={reply.name} 
          className="w-8 h-8 rounded-full object-cover"
        />
        <div className="flex-1">
          <div className="flex items-center">
            <span className="font-medium text-sm">{reply.name}</span>
            <span className="text-xs text-gray-500 ml-2">{reply.time}</span>
          </div>
          <p className="mt-1 text-gray-700 text-sm">{reply.content}</p>
          <div className="flex items-center mt-2">
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-gray-500 hover:text-blue-600"
              onClick={() => onLike(reply.id)}
            >
              <ThumbsUp className="h-4 w-4 mr-1" />
              <span className="text-xs">{reply.likes}</span>
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-gray-500 hover:text-blue-600 ml-1"
              onClick={() => onReply(reply)}
            >
              <MessageSquare className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentReply;
