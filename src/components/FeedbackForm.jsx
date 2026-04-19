import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { MessageSquare, ThumbsUp, ThumbsDown } from 'lucide-react';

const FeedbackForm = ({ onSubmit, onCancel }) => {
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!feedback.trim()) {
      setError('请填写反馈内容');
      return;
    }

    if (rating === 0) {
      setError('请评分');
      return;
    }

    // 模拟提交成功
    setSubmitted(true);
    
    // 调用父组件的提交函数
    onSubmit({
      feedback,
      rating,
      timestamp: new Date().toISOString()
    });

    // 3秒后自动关闭
    setTimeout(() => {
      setSubmitted(false);
      onCancel();
    }, 3000);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center">
          <MessageSquare className="mr-2 h-5 w-5" />
          问题反馈
        </CardTitle>
      </CardHeader>
      <CardContent>
        {submitted ? (
          <div className="text-center py-8">
            <ThumbsUp className="mx-auto h-12 w-12 text-green-500 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">反馈提交成功</h3>
            <p className="text-gray-500">感谢您的反馈，我们会尽快处理！</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="feedback">反馈内容 *</Label>
              <Textarea
                id="feedback"
                placeholder="请详细描述您遇到的问题或建议..."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                rows={5}
                className="resize-none"
              />
            </div>
            
            <div className="space-y-2">
              <Label>满意度评分 *</Label>
              <div className="flex justify-center space-x-4 py-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    className={`flex flex-col items-center p-2 rounded-lg transition-all ${
                      rating === star 
                        ? 'bg-blue-100 text-blue-600' 
                        : 'hover:bg-gray-100'
                    }`}
                    onClick={() => setRating(star)}
                  >
                    <div className="text-2xl">
                      {star <= rating ? (
                        <ThumbsUp className="h-8 w-8 text-blue-500" />
                      ) : (
                        <ThumbsDown className="h-8 w-8 text-gray-400" />
                      )}
                    </div>
                    <span className="text-xs mt-1">
                      {star === 1 && '非常不满意'}
                      {star === 2 && '不满意'}
                      {star === 3 && '一般'}
                      {star === 4 && '满意'}
                      {star === 5 && '非常满意'}
                    </span>
                  </button>
                ))}
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-500">
                  当前选择: {
                    rating === 1 ? '非常不满意' :
                    rating === 2 ? '不满意' :
                    rating === 3 ? '一般' :
                    rating === 4 ? '满意' :
                    rating === 5 ? '非常满意' : '未选择'
                  }
                </p>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 pt-4">
              <Button variant="outline" onClick={onCancel}>
                取消
              </Button>
              <Button type="submit">
                提交反馈
              </Button>
            </div>
          </form>
        )}
      </CardContent>
    </Card>
  );
};

export default FeedbackForm;
