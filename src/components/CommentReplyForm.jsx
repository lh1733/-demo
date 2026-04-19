import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Send } from 'lucide-react';

const CommentReplyForm = ({ onSubmit, onCancel, placeholder = "写下你的回答..." }) => {
  const [comment, setComment] = useState('');

  const handleSubmit = () => {
    if (comment.trim()) {
      onSubmit(comment);
      setComment('');
    }
  };

  return (
    <div className="mt-4">
      <Textarea 
        placeholder={placeholder} 
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="flex-1"
      />
      <div className="flex justify-end space-x-2 mt-2">
        <Button variant="outline" onClick={onCancel} size="sm">
          取消
        </Button>
        <Button onClick={handleSubmit} size="sm">
          <Send className="h-4 w-4 mr-1" />
          发送
        </Button>
      </div>
    </div>
  );
};

export default CommentReplyForm;
