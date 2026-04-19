import React, { useState } from 'react';
import { 
  ArrowLeft,
  MessageCircle,
  Calendar,
  MapPin,
  Phone,
  Mail,
  FileText,
  Upload,
  ThumbsUp,
  MessageSquare,
  Send,
  Zap,
  Download,
  User
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import SignUpForm from './SignUpForm';
import CommentReply from './CommentReply';
import CommentReplyForm from './CommentReplyForm';
import MatchRequestDialog from './MatchRequestDialog';

const FeedDetail = ({ 
  currentItem, 
  backToList, 
  handleSignUp, 
  comment, 
  setComment, 
  handleSendComment, 
  handleFileUpload 
}) => {
  const [showSignUpDialog, setShowSignUpDialog] = useState(false);
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyComment, setReplyComment] = useState('');
  const [showMatchDialog, setShowMatchDialog] = useState(false);

  if (!currentItem) return null;

  const handleSignUpSubmit = (values) => {
    console.log('报名信息:', values);
    // 这里可以调用API提交报名信息
    alert(`报名成功！\n姓名: ${values.name}\n学号: ${values.studentId}\n学院: ${values.college}\n专业: ${values.major}`);
    setShowSignUpDialog(false);
  };

  const handleLikeReply = (replyId) => {
    // 这里可以调用API更新点赞数
    console.log(`点赞回复 ${replyId}`);
  };

  const handleReplyToComment = (reply) => {
    setReplyingTo(reply);
  };

  const handleSendReply = (content) => {
    // 这里可以调用API提交回复
    console.log(`回复 ${replyingTo?.name}: ${content}`);
    setReplyingTo(null);
    setReplyComment('');
  };

  const handleMatchRequest = (values) => {
    console.log('匹配请求:', values);
    // 这里可以调用API提交匹配请求
    alert(`匹配请求已发送！\n消息: ${values.message}\n联系方式: ${values.contact}`);
    setShowMatchDialog(false);
  };

  // 渲染学友匹配详情
  const renderMatchDetail = () => (
    <Card className="overflow-hidden">
      <CardContent className="p-4">
        <div className="flex items-start space-x-3">
          <img 
            src={currentItem.avatar} 
            alt={currentItem.name} 
            className="w-16 h-16 rounded-full mx-auto object-cover"
          />
          <div className="flex-1">
            <h3 className="font-medium text-gray-900 text-lg">{currentItem.name}</h3>
            <div className="flex items-center mt-1">
              <span className="text-sm text-gray-500">匹配度</span>
              <span className="ml-1 text-sm font-bold text-blue-600">{currentItem.matchPercentage}%</span>
            </div>
            <div className="flex flex-wrap gap-1 mt-2">
              {currentItem.interests.map((interest, index) => (
                <span 
                  key={index} 
                  className="px-2 py-0.5 bg-blue-50 text-blue-700 text-xs rounded-full"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>
        </div>
        
        <div className="mt-4">
          <h4 className="font-medium text-gray-900">个人介绍</h4>
          <p className="mt-2 text-gray-700 text-sm">{currentItem.content}</p>
        </div>
        
        <Button className="w-full mt-6" onClick={() => setShowMatchDialog(true)}>
          <User className="h-4 w-4 mr-2" />
          发起匹配
        </Button>
      </CardContent>
    </Card>
  );

  // 渲染活动召集详情
  const renderActivityDetail = () => (
    <Card className="overflow-hidden">
      <CardContent className="p-4">
        <div className="flex items-start space-x-3">
          <img 
            src={currentItem.clubLogo} 
            alt="社团logo" 
            className="w-16 h-16 rounded-lg mx-auto object-cover"
          />
          <div className="flex-1">
            <h3 className="font-medium text-gray-900 text-lg">{currentItem.title}</h3>
            <div className="flex items-center mt-1 text-sm text-gray-500">
              <span>主办方: {currentItem.organizer}</span>
            </div>
          </div>
        </div>
        
        <div className="mt-4 space-y-2">
          <div className="flex items-center text-sm text-gray-500">
            <Calendar className="h-4 w-4 mr-2" />
            <span>{currentItem.time}</span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <MapPin className="h-4 w-4 mr-2" />
            <span>{currentItem.location}</span>
          </div>
        </div>
        
        <div className="mt-4">
          <h4 className="font-medium text-gray-900">活动介绍</h4>
          <p className="mt-2 text-gray-700 text-sm">{currentItem.content}</p>
        </div>
        
        <div className="mt-4">
          <div className="flex justify-between text-sm text-gray-500 mb-1">
            <span>报名进度</span>
            <span>{currentItem.报名人数}/{currentItem.总人数}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full" 
              style={{ width: `${(currentItem.报名人数 / currentItem.总人数) * 100}%` }}
            ></div>
          </div>
        </div>
        
        <div className="mt-4">
          <h4 className="font-medium text-gray-900">已报名同学</h4>
          <div className="mt-2 space-y-2">
            {currentItem.报名列表.map((person, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <span>{person.name}</span>
                <span className="text-gray-500">{person.time}</span>
              </div>
            ))}
          </div>
        </div>
        
        <Button className="w-full mt-6" onClick={() => setShowSignUpDialog(true)}>
          <Send className="h-4 w-4 mr-2" />
          立即报名
        </Button>
      </CardContent>
    </Card>
  );

  // 渲染问答求助详情
  const renderHelpDetail = () => (
    <Card className="overflow-hidden">
      <CardContent className="p-4">
        <div className="flex items-start space-x-3">
          <img 
            src={currentItem.avatar} 
            alt={currentItem.name} 
            className="w-12 h-12 rounded-full mx-auto object-cover"
          />
          <div className="flex-1">
            <h3 className="font-medium text-gray-900">{currentItem.name}</h3>
            <h4 className="font-medium mt-1">{currentItem.title}</h4>
            <div className="flex items-center mt-1 text-sm text-gray-500">
              <span>发布于 {currentItem.timeAgo}</span>
            </div>
          </div>
        </div>
        
        <div className="mt-4">
          <p className="text-gray-700 text-sm">{currentItem.content}</p>
        </div>
        
        <div className="mt-6">
          <h4 className="font-medium text-gray-900">
            回复 ({currentItem.replies && Array.isArray(currentItem.replies) ? currentItem.replies.length : 0})
          </h4>
          <div className="mt-3 space-y-4">
            {currentItem.replies && Array.isArray(currentItem.replies) && currentItem.replies.map((reply) => (
              <CommentReply 
                key={reply.id} 
                reply={reply} 
                onLike={handleLikeReply}
                onReply={handleReplyToComment}
              />
            ))}
          </div>
        </div>
        
        {replyingTo ? (
          <CommentReplyForm 
            onSubmit={handleSendReply}
            onCancel={() => setReplyingTo(null)}
            placeholder={`回复 ${replyingTo.name}...`}
          />
        ) : (
          <CommentReplyForm 
            onSubmit={handleSendComment}
            onCancel={() => {}}
            placeholder="写下你的回答..."
          />
        )}
      </CardContent>
    </Card>
  );

  // 渲染技能交换详情
  const renderSkillDetail = () => (
    <Card className="overflow-hidden">
      <CardContent className="p-4">
        <div className="flex items-start space-x-3">
          <img 
            src={currentItem.avatar} 
            alt={currentItem.name} 
            className="w-12 h-12 rounded-full mx-auto object-cover"
          />
          <div className="flex-1">
            <h3 className="font-medium text-gray-900">{currentItem.name}</h3>
            <div className="flex items-center mt-1">
              <Zap className="h-4 w-4 text-yellow-500 mr-1" />
              <span className="text-sm font-medium text-gray-700">{currentItem.skill}</span>
            </div>
          </div>
        </div>
        
        <div className="mt-4">
          <h4 className="font-medium text-gray-900">技能介绍</h4>
          <p className="mt-2 text-gray-700 text-sm">{currentItem.content}</p>
        </div>
        
        <div className="mt-4">
          <div className="flex justify-between items-center">
            <h4 className="font-medium text-gray-900">学习资料</h4>
            <Button variant="ghost" size="sm" onClick={handleFileUpload}>
              <Upload className="h-4 w-4 mr-1" />
              <span>上传</span>
            </Button>
          </div>
          <div className="mt-2 space-y-2">
            {currentItem.files && currentItem.files.map((file, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <div className="flex items-center">
                  <FileText className="h-4 w-4 text-gray-500 mr-2" />
                  <div>
                    <div className="text-sm font-medium">{file.name}</div>
                    <div className="text-xs text-gray-500">{file.size}</div>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-6">
          <Textarea 
            placeholder="分享你的学习心得或上传资料..." 
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="flex-1"
          />
        </div>
        <Button className="w-full mt-2" onClick={handleSendComment}>
          <Send className="h-4 w-4 mr-2" />
          发布心得
        </Button>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 顶部导航栏 */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="flex items-center px-4 py-3">
          <Button variant="ghost" size="sm" onClick={backToList} className="mr-2">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex items-center space-x-2">
            <MessageCircle className="h-6 w-6 text-blue-600" />
            <span className="text-lg font-semibold text-gray-800">
              {currentItem.type === 'match' && '学友匹配'}
              {currentItem.type === 'activity' && '活动召集'}
              {currentItem.type === 'help' && '问答求助'}
              {currentItem.type === 'skill' && '技能交换'}
            </span>
          </div>
        </div>
      </header>

      <div className="p-4 space-y-4">
        {currentItem.type === 'match' && renderMatchDetail()}
        {currentItem.type === 'activity' && renderActivityDetail()}
        {currentItem.type === 'help' && renderHelpDetail()}
        {currentItem.type === 'skill' && renderSkillDetail()}
        
        {/* 添加返回原界面的按钮 */}
        <div className="flex justify-center mt-4">
          <Button onClick={backToList} variant="outline" className="flex items-center">
            <ArrowLeft className="h-4 w-4 mr-2" />
            返回社交破冰页面
          </Button>
        </div>
      </div>

      {/* 报名弹窗 */}
      <Dialog open={showSignUpDialog} onOpenChange={setShowSignUpDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>活动报名</DialogTitle>
          </DialogHeader>
          <SignUpForm 
            onSubmit={handleSignUpSubmit} 
            onCancel={() => setShowSignUpDialog(false)} 
          />
        </DialogContent>
      </Dialog>

      {/* 匹配请求弹窗 */}
      <MatchRequestDialog 
        open={showMatchDialog} 
        onOpenChange={setShowMatchDialog}
        onSubmit={handleMatchRequest}
      />
    </div>
  );
};

export default FeedDetail;
