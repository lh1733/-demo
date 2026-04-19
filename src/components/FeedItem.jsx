import React from 'react';
import { 
  MessageCircle,
  Calendar,
  MapPin,
  Zap,
  Send,
  User
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const FeedItem = ({ item, onClick }) => {
  return (
    <Card key={item.id} className="overflow-hidden">
      <CardContent className="p-0">
        {item.type === 'match' && (
          <div className="p-4">
            <div className="flex items-start space-x-3">
              <img 
                src={item.avatar} 
                alt={item.name} 
                className="w-12 h-12 rounded-full mx-auto object-cover"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-gray-900">{item.name}</h3>
                  <span className="text-sm text-gray-500">{item.time}</span>
                </div>
                <div className="flex items-center mt-1">
                  <span className="text-sm text-gray-500">匹配度</span>
                  <span className="ml-1 text-sm font-bold text-blue-600">{item.matchPercentage}%</span>
                </div>
                <div className="flex flex-wrap gap-1 mt-2">
                  {item.interests.map((interest, index) => (
                    <span 
                      key={index} 
                      className="px-2 py-0.5 bg-blue-50 text-blue-700 text-xs rounded-full"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
                <p className="mt-2 text-gray-700 text-sm">{item.content}</p>
                <Button className="mt-3 w-full" variant="outline" onClick={() => onClick(item)}>
                  <User className="h-4 w-4 mr-2" />
                  进行匹配
                </Button>
              </div>
            </div>
          </div>
        )}
        
        {item.type === 'activity' && (
          <div className="p-4">
            <div className="flex items-start space-x-3">
              <img 
                src={item.clubLogo} 
                alt="社团logo" 
                className="w-12 h-12 rounded-lg mx-auto object-cover"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-gray-900">{item.title}</h3>
                  <span className="text-sm text-gray-500">{item.timeAgo}</span>
                </div>
                <div className="flex items-center mt-1 text-sm text-gray-500">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>{item.time}</span>
                </div>
                <div className="flex items-center mt-1 text-sm text-gray-500">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{item.location}</span>
                </div>
                <p className="mt-2 text-gray-700 text-sm">{item.content}</p>
                <div className="mt-2 text-sm text-gray-500">
                  <span>已报名: {item.报名人数}/{item.总人数}</span>
                </div>
                <Button className="mt-3 w-full" onClick={() => onClick(item)}>
                  <Send className="h-4 w-4 mr-2" />
                  立即报名
                </Button>
              </div>
            </div>
          </div>
        )}
        
        {item.type === 'help' && (
          <div className="p-4">
            <div className="flex items-start space-x-3">
              <img 
                src={item.avatar} 
                alt={item.name} 
                className="w-12 h-12 rounded-full mx-auto object-cover"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-gray-900">{item.name}</h3>
                  <span className="text-sm text-gray-500">{item.timeAgo}</span>
                </div>
                <h4 className="font-medium mt-1">{item.title}</h4>
                <p className="mt-2 text-gray-700 text-sm">{item.content}</p>
                <div className="flex items-center mt-3 text-sm text-gray-500">
                  <MessageCircle className="h-4 w-4 mr-1" />
                  <span>{item.replies && Array.isArray(item.replies) ? item.replies.length : 0} 条回复</span>
                </div>
                <Button className="mt-3 w-full" variant="outline" onClick={() => onClick(item)}>
                  <MessageCircle className="h-4 w-4 mr-2" />
                  查看详情
                </Button>
              </div>
            </div>
          </div>
        )}
        
        {item.type === 'skill' && (
          <div className="p-4">
            <div className="flex items-start space-x-3">
              <img 
                src={item.avatar} 
                alt={item.name} 
                className="w-12 h-12 rounded-full mx-auto object-cover"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-gray-900">{item.name}</h3>
                  <span className="text-sm text-gray-500">{item.timeAgo}</span>
                </div>
                <div className="flex items-center mt-1">
                  <Zap className="h-4 w-4 text-yellow-500 mr-1" />
                  <span className="text-sm font-medium text-gray-700">{item.skill}</span>
                </div>
                <p className="mt-2 text-gray-700 text-sm">{item.content}</p>
                <Button className="mt-3 w-full" variant="outline" onClick={() => onClick(item)}>
                  <Zap className="h-4 w-4 mr-2" />
                  查看详情
                </Button>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FeedItem;
