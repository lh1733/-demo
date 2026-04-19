import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  HomeIcon, 
  MapIcon, 
  UsersIcon, 
  HelpCircleIcon,
  BookOpen,
  Navigation,
  MessageSquare,
  FileText,
  UserCheck,
  MapPin,
  Phone,
  Calendar,
  Zap
} from 'lucide-react';
import Navbar from '@/components/Navbar';

const HelpCenter = () => {
  const helpSections = [
    {
      id: 'introduction',
      title: '系统介绍',
      icon: BookOpen,
      content: '智邮迎新是专为北京邮电大学新生设计的一站式服务平台，帮助您顺利完成入学报到流程，快速适应校园生活。'
    },
    {
      id: 'navigation',
      title: 'AR导航',
      icon: Navigation,
      content: '通过增强现实技术，为您提供精准的校园导航服务，帮助您快速找到教学楼、图书馆、餐厅等重要场所。'
    },
    {
      id: 'social',
      title: '社交破冰',
      icon: UsersIcon,
      content: '通过学友匹配、活动召集、技能交换等功能，帮助您快速结识新朋友，丰富校园生活。'
    },
    {
      id: 'assistant',
      title: '问答助手',
      icon: MessageSquare,
      content: '24小时在线智能助手，解答您关于入学、学习、生活等方面的问题。'
    },
    {
      id: 'registration',
      title: '报到流程',
      icon: FileText,
      content: '详细展示新生报到的各个环节，包括学籍注册、宿舍分配、校园卡办理等，让您清晰了解进度。'
    },
    {
      id: 'map',
      title: '校园地图',
      icon: MapIcon,
      content: '提供详细的校园地图，标注所有重要建筑和设施，支持搜索和导航功能。'
    }
  ];

  const features = [
    {
      title: '智能推荐',
      description: '根据您的报到进度和兴趣爱好，智能推荐相关服务和活动',
      icon: UserCheck
    },
    {
      title: '实时导航',
      description: '基于AR技术的实时导航，提供沉浸式校园探索体验',
      icon: MapPin
    },
    {
      title: '即时通讯',
      description: '与同学、志愿者、老师实时沟通，解决入学疑问',
      icon: MessageSquare
    },
    {
      title: '紧急求助',
      description: '遇到紧急情况时，一键联系校园安全服务中心',
      icon: Phone
    },
    {
      title: '活动日历',
      description: '查看校园活动安排，不错过任何精彩活动',
      icon: Calendar
    },
    {
      title: '技能交换',
      description: '发布技能需求，寻找志同道合的学习伙伴',
      icon: Zap
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white md:pb-16 pt-24 md:pt-0">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">帮助中心</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            欢迎使用智邮迎新系统！这里是您的使用指南，帮助您快速了解和使用所有功能。
          </p>
        </div>

        {/* 主要功能介绍 */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">主要功能模块</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {helpSections.map((section) => {
              const IconComponent = section.icon;
              return (
                <Card key={section.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <IconComponent className="h-6 w-6 text-blue-600 mr-2" />
                      {section.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{section.content}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* 特色功能 */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">特色功能</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Card key={index} className="text-center">
                  <CardContent className="pt-6">
                    <div className="mx-auto bg-blue-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                      <IconComponent className="h-8 w-8 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* 使用指南 */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">使用指南</h2>
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-blue-100 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">1</div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">开始使用</h3>
                    <p className="text-gray-600">注册并登录系统，完善个人信息，开始您的迎新之旅。</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-blue-100 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">2</div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">查看报到进度</h3>
                    <p className="text-gray-600">在首页查看您的报到进度，了解已完成和待完成的环节。</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-blue-100 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">3</div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">使用AR导航</h3>
                    <p className="text-gray-600">通过AR导航功能，快速找到校园内的各个地点。</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-blue-100 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">4</div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">参与社交活动</h3>
                    <p className="text-gray-600">在社交破冰板块寻找志同道合的朋友，参与校园活动。</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-blue-100 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">5</div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">获取帮助</h3>
                    <p className="text-gray-600">遇到问题时，可以使用问答助手或联系志愿者获得帮助。</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 常见问题 */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">常见问题</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">如何更新我的个人信息？</h3>
                <p className="text-gray-600">您可以在"我的"页面中找到个人信息设置，点击编辑按钮即可更新您的信息。</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">报到流程需要多长时间？</h3>
                <p className="text-gray-600">完整的报到流程通常需要1-2天，具体时间取决于各环节的办理速度。</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">如何联系志愿者？</h3>
                <p className="text-gray-600">在首页的快捷功能中点击"呼叫志愿者"按钮，即可与在线志愿者取得联系。</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">AR导航需要什么设备支持？</h3>
                <p className="text-gray-600">AR导航功能需要支持ARCore（Android）或ARKit（iOS）的设备。</p>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="text-center">
          <Button asChild>
            <Link to="/">返回首页</Link>
          </Button>
        </div>
      </div>
      
      {/* 为移动端导航栏留出空间 */}
      <div className="md:hidden h-16"></div>
    </div>
  );
};

export default HelpCenter;
