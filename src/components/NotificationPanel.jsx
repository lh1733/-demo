import React, { useState } from 'react';
import { Bell, X, BookOpen, CreditCard, FileText, Info, Users, Calendar, MessageCircle, Zap, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const NotificationPanel = ({ isOpen, onClose, registrationSteps = [] }) => {
  const [activeTab, setActiveTab] = useState('all'); // all, system, social

  // 系统通知数据
  const systemNotifications = [
    {
      id: 1,
      title: "欢迎使用智邮迎新",
      content: "欢迎使用北京邮电大学新生服务平台！我们将根据你的报到进度推送相关通知和实用信息。",
      icon: Info,
      type: "welcome",
      time: "刚刚",
      category: "system"
    }
  ];

  // 社交互动通知数据
  const socialNotifications = [
    {
      id: 101,
      title: "学友匹配消息",
      content: "张同学已接受你的学友匹配请求，你们现在可以开始交流了！",
      icon: Users,
      type: "match",
      time: "5分钟前",
      category: "social"
    },
    {
      id: 102,
      title: "活动即将开始",
      content: "你报名的'新生篮球友谊赛'将在30分钟后开始，请准时到达体育馆。",
      icon: Calendar,
      type: "activity",
      time: "10分钟前",
      category: "social"
    },
    {
      id: 103,
      title: "问答收到新回复",
      content: "你的问题'关于选课的问题'收到了新的回复，点击查看详细内容。",
      icon: MessageCircle,
      type: "help",
      time: "15分钟前",
      category: "social"
    },
    {
      id: 104,
      title: "技能交换新消息",
      content: "程序员小王对你的Python技能很感兴趣，发送了交换请求。",
      icon: Zap,
      type: "skill",
      time: "20分钟前",
      category: "social"
    },
    {
      id: 105,
      title: "问答收到点赞",
      content: "你的回答'推荐选择《大学语文》和《心理学基础》'获得了5个点赞。",
      icon: MessageCircle,
      type: "help",
      time: "25分钟前",
      category: "social"
    }
  ];

  // 根据报到环节完成情况生成相关通知
  const registrationNotifications = [];
  
  // 添加空值检查，确保 registrationSteps 是一个数组
  if (Array.isArray(registrationSteps)) {
    // 检查宿舍分配是否完成
    const dormStep = registrationSteps.find(step => step.title === "宿舍分配");
    if (dormStep && dormStep.status === "completed") {
      registrationNotifications.push({
        id: 2,
        title: "宿舍规章制度",
        content: "恭喜你已完成宿舍分配！请查看宿舍相关规章制度，了解住宿注意事项、作息时间、安全须知等重要信息。",
        icon: BookOpen,
        type: "dorm",
        time: "刚刚",
        category: "system"
      });
    }
    
    // 检查校园卡办理是否完成
    const cardStep = registrationSteps.find(step => step.title === "校园卡办理");
    if (cardStep && cardStep.status === "completed") {
      registrationNotifications.push({
        id: 3,
        title: "校园卡使用指南",
        content: "校园卡已办理成功！点击查看校园卡使用指南，了解充值、消费、门禁、借书等功能的详细说明及常见问题解答。",
        icon: CreditCard,
        type: "card",
        time: "刚刚",
        category: "system"
      });
    }
    
    // 检查学籍注册是否完成
    const registrationStep = registrationSteps.find(step => step.title === "学籍注册");
    if (registrationStep && registrationStep.status === "completed") {
      registrationNotifications.push({
        id: 4,
        title: "学籍管理须知",
        content: "学籍注册已完成！请了解学籍管理相关规定，包括选课、成绩查询、学分要求、转专业政策等重要信息。",
        icon: FileText,
        type: "registration",
        time: "刚刚",
        category: "system"
      });
    }
  }

  // 合并所有通知
  const allNotifications = [...systemNotifications, ...registrationNotifications, ...socialNotifications];

  // 根据当前标签过滤通知
  const filteredNotifications = activeTab === 'all' 
    ? allNotifications 
    : allNotifications.filter(notification => notification.category === activeTab);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75" onClick={onClose}></div>
        </div>
        
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <Bell className="h-6 w-6 text-blue-600 mr-2" />
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  消息通知
                </h3>
              </div>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            
            {/* 标签切换 */}
            <div className="flex space-x-2 mb-4">
              <Button 
                variant={activeTab === 'all' ? 'default' : 'outline'} 
                size="sm" 
                onClick={() => setActiveTab('all')}
                className="flex items-center"
              >
                <Filter className="h-4 w-4 mr-1" />
                全部
              </Button>
              <Button 
                variant={activeTab === 'system' ? 'default' : 'outline'} 
                size="sm" 
                onClick={() => setActiveTab('system')}
              >
                系统通知
              </Button>
              <Button 
                variant={activeTab === 'social' ? 'default' : 'outline'} 
                size="sm" 
                onClick={() => setActiveTab('social')}
              >
                互动消息
              </Button>
            </div>
            
            <div className="mt-2 space-y-3 max-h-[60vh] overflow-y-auto">
              {filteredNotifications.length > 0 ? (
                filteredNotifications.map((notification) => {
                  const IconComponent = notification.icon;
                  return (
                    <Card key={notification.id} className="border-l-4 border-blue-500">
                      <CardContent className="p-4">
                        <div className="flex">
                          <div className="flex-shrink-0">
                            <IconComponent className="h-5 w-5 text-blue-500" />
                          </div>
                          <div className="ml-3">
                            <h4 className="text-sm font-medium text-gray-900">{notification.title}</h4>
                            <p className="mt-1 text-sm text-gray-500">{notification.content}</p>
                            <p className="mt-2 text-xs text-gray-400">{notification.time}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })
              ) : (
                <div className="text-center py-8">
                  <Bell className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">暂无通知</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {activeTab === 'all' 
                      ? "当前没有新的通知" 
                      : activeTab === 'system' 
                        ? "当前没有系统通知" 
                        : "当前没有互动消息"}
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <Button onClick={onClose} className="w-full sm:w-auto">
              关闭
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationPanel;
