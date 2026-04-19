import React from 'react';
import { 
  Users, 
  Plus,
  Calendar,
  MessageCircle,
  Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import FeedItem from './FeedItem';
import { tags } from '@/pages/SocialIcebreaker';

const FeedList = ({ 
  activeTag, 
  setActiveTag, 
  isAnonymous, 
  setIsAnonymous, 
  showLocation, 
  setShowLocation, 
  handleCardClick,
  feedItems,
  onPublishClick
}) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* 顶部发布区域 */}
      <div className="bg-white shadow-sm sticky top-16 md:top-0 z-10 p-4 border-b">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Users className="h-6 w-6 text-blue-600" />
            <span className="text-lg font-semibold text-gray-800">社交破冰</span>
          </div>
          <Button variant="default" size="sm" onClick={onPublishClick}>
            <Plus className="h-5 w-5 mr-1" />
            <span>发布内容</span>
          </Button>
        </div>
        
        {/* 发布提示卡片 */}
        <Card className="mb-4 bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center">
              <div className="flex-1">
                <h3 className="font-medium text-gray-800">分享你的校园生活</h3>
                <p className="text-sm text-gray-600">发布学友匹配、活动召集、问答求助或技能交换信息</p>
              </div>
              <Button variant="default" size="sm" onClick={onPublishClick}>
                <Plus className="h-4 w-4 mr-1" />
                <span>立即发布</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 兴趣标签栏 */}
      <div className="bg-white border-b border-gray-200 py-3 px-4">
        <div className="flex space-x-3 overflow-x-auto pb-2">
          {tags.map((tag) => {
            const iconMap = {
              'Users': Users,
              'Calendar': Calendar,
              'MessageCircle': MessageCircle,
              'Zap': Zap
            };
            const IconComponent = iconMap[tag.icon] || Users;
            
            return (
              <button
                key={tag.id}
                onClick={() => setActiveTag(tag.id)}
                className={`flex items-center space-x-1 flex-shrink-0 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  activeTag === tag.id
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <IconComponent className="h-4 w-4" />
                <span>{tag.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 信息流 */}
      <div className="p-4 space-y-4 pb-24 md:pb-4">
        {feedItems.map((item) => (
          <FeedItem key={item.id} item={item} onClick={handleCardClick} />
        ))}
      </div>
    </div>
  );
};

export default FeedList;
