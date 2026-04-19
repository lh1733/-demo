import { useState, useMemo } from 'react';
import { feedItems } from '@/pages/SocialIcebreaker';

export const useSocialIcebreaker = () => {
  // 页面状态：list(列表), detail(详情)
  const [page, setPage] = useState('list');
  
  // 当前查看的详情项
  const [currentItem, setCurrentItem] = useState(null);
  
  // 兴趣标签状态
  const [activeTag, setActiveTag] = useState('all');
  
  // 匿名发布状态
  const [isAnonymous, setIsAnonymous] = useState(false);
  
  // 位置可见性状态
  const [showLocation, setShowLocation] = useState(true);
  
  // 评论状态
  const [comment, setComment] = useState('');

  // 处理卡片点击
  const handleCardClick = (item) => {
    setCurrentItem(item);
    setPage('detail');
  };

  // 返回列表页
  const backToList = () => {
    setPage('list');
    setCurrentItem(null);
  };

  // 处理报名
  const handleSignUp = () => {
    alert('报名成功！');
  };

  // 处理发送评论
  const handleSendComment = () => {
    if (comment.trim()) {
      alert('评论已发送：' + comment);
      setComment('');
    }
  };

  // 处理文件上传
  const handleFileUpload = () => {
    alert('文件上传功能已触发');
  };

  // 根据标签筛选信息流数据
  const filteredFeedItems = useMemo(() => {
    if (activeTag === 'all') {
      return feedItems;
    }
    return feedItems.filter(item => item.type === activeTag);
  }, [activeTag]);

  return {
    // 状态
    page,
    setPage,
    currentItem,
    setCurrentItem,
    activeTag,
    setActiveTag,
    isAnonymous,
    setIsAnonymous,
    showLocation,
    setShowLocation,
    comment,
    setComment,
    
    // 方法
    handleCardClick,
    backToList,
    handleSignUp,
    handleSendComment,
    handleFileUpload,
    filteredFeedItems
  };
};
