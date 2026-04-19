import React from 'react';
import FeedList from '@/components/FeedList';
import FeedDetail from '@/components/FeedDetail';
import Navbar from '@/components/Navbar';
import { useSocialIcebreaker } from '@/hooks/useSocialIcebreaker';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// 导出 tags 数组供其他组件使用
export const tags = [
  { id: 'all', name: '全部', icon: 'Users' },
  { id: 'match', name: '学友匹配', icon: 'Users' },
  { id: 'activity', name: '活动召集', icon: 'Calendar' },
  { id: 'help', name: '问答求助', icon: 'MessageCircle' },
  { id: 'skill', name: '技能交换', icon: 'Zap' }
];

// 导出 feedItems 数组供其他组件使用
export const feedItems = [
  {
    id: 1,
    type: 'match',
    name: '张同学',
    avatar: 'https://nocode.meituan.com/photo/search?keyword=student,avatar&width=48&height=48',
    time: '2分钟前',
    matchPercentage: 85,
    interests: ['编程', '音乐', '篮球'],
    content: '大家好！我是计算机学院的新生，希望能找到志同道合的朋友一起学习和生活。'
  },
  {
    id: 2,
    type: 'activity',
    title: '新生篮球友谊赛',
    clubLogo: 'https://nocode.meituan.com/photo/search?keyword=basketball,club&width=48&height=48',
    organizer: '篮球社',
    time: '明天下午3点',
    location: '体育馆',
    timeAgo: '1小时前',
    content: '欢迎所有新生参加篮球友谊赛，不限水平，重在参与！',
    报名人数: 15,
    总人数: 30,
    报名列表: [
      { name: '李同学', time: '刚刚' },
      { name: '王同学', time: '5分钟前' },
      { name: '陈同学', time: '10分钟前' }
    ]
  },
  {
    id: 3,
    type: 'help',
    name: '小明',
    avatar: 'https://nocode.meituan.com/photo/search?keyword=student,help&width=48&height=48',
    title: '关于选课的问题',
    timeAgo: '30分钟前',
    content: '请问大家知道怎么选择通识课吗？有什么推荐的课程？',
    replies: [
      {
        id: 1,
        name: '学长A',
        avatar: 'https://nocode.meituan.com/photo/search?keyword=senior,student&width=32&height=32',
        content: '推荐选择《大学语文》和《心理学基础》，比较实用。',
        time: '20分钟前',
        likes: 5
      },
      {
        id: 2,
        name: '学姐B',
        avatar: 'https://nocode.meituan.com/photo/search?keyword=senior,female&width=32&height=32',
        content: '可以先看看课程介绍，选择自己感兴趣的。',
        time: '15分钟前',
        likes: 3
      }
    ]
  },
  {
    id: 4,
    type: 'skill',
    name: '程序员小王',
    avatar: 'https://nocode.meituan.com/photo/search?keyword=programmer,avatar&width=48&height=48',
    skill: 'Python编程',
    timeAgo: '2小时前',
    content: '可以教大家Python基础，希望有人能教我英语口语。',
    files: [
      { name: 'Python入门教程.pdf', size: '2.5MB' },
      { name: '练习代码.zip', size: '1.2MB' }
    ]
  }
];

const SocialIcebreaker = () => {
  const {
    // 状态
    page,
    currentItem,
    activeTag,
    setActiveTag,
    isAnonymous,
    setIsAnonymous,
    showLocation,
    setShowLocation,
    comment,
    setComment,
    filteredFeedItems,
    
    // 方法
    handleCardClick,
    backToList,
    handleSignUp,
    handleSendComment,
    handleFileUpload
  } = useSocialIcebreaker();

  const navigate = useNavigate();

  // 渲染列表页面
  const renderListPage = () => (
    <FeedList 
      activeTag={activeTag}
      setActiveTag={setActiveTag}
      isAnonymous={isAnonymous}
      setIsAnonymous={setIsAnonymous}
      showLocation={showLocation}
      setShowLocation={setShowLocation}
      handleCardClick={handleCardClick}
      feedItems={filteredFeedItems} // 传递筛选后的数据
      onPublishClick={() => navigate('/content-publish')}
    />
  );

  // 渲染详情页面
  const renderDetailPage = () => {
    if (!currentItem) return null;

    return (
      <FeedDetail 
        currentItem={currentItem}
        backToList={backToList}
        handleSignUp={handleSignUp}
        comment={comment}
        setComment={setComment}
        handleSendComment={handleSendComment}
        handleFileUpload={handleFileUpload}
      />
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white md:pb-16 pt-24 md:pt-0">
      <Navbar />
      {page === 'list' ? renderListPage() : renderDetailPage()}
      {/* 为移动端导航栏留出空间 */}
      <div className="md:hidden h-16"></div>
    </div>
  );
};

export default SocialIcebreaker;
