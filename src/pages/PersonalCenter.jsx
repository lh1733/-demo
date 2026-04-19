import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Phone, Mail, School, LogOut, Edit, Lock, Home } from 'lucide-react';
import Navbar from '@/components/Navbar';
import PersonalCenterEdit from '@/components/PersonalCenterEdit';
import ChangePassword from '@/components/ChangePassword';

const PersonalCenter = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: '',
    realName: '',
    studentId: localStorage.getItem('studentId') || '',
    phone: '',
    email: '',
    major: '',
    college: ''
  });

  useEffect(() => {
    // 从localStorage获取用户信息或设置默认值
    const storedUserInfo = localStorage.getItem('userInfo');
    if (storedUserInfo) {
      setUserInfo(JSON.parse(storedUserInfo));
    } else {
      // 设置默认昵称：学院+姓+"同学"
      const defaultCollege = '计算机学院';
      const defaultName = '张同学';
      const defaultRealName = '张三';
      
      const newUser = {
        name: defaultName,
        realName: defaultRealName,
        studentId: localStorage.getItem('studentId') || '',
        phone: '138****5678',
        email: 'zhang@bupt.edu.cn',
        major: '计算机科学与技术',
        college: defaultCollege
      };
      
      setUserInfo(newUser);
      localStorage.setItem('userInfo', JSON.stringify(newUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('studentId');
    localStorage.removeItem('userInfo');
    navigate('/login');
  };

  const handleSave = (updatedInfo) => {
    setUserInfo(updatedInfo);
    localStorage.setItem('userInfo', JSON.stringify(updatedInfo));
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleChangePassword = () => {
    setIsChangingPassword(true);
  };

  const handlePasswordChangeComplete = () => {
    setIsChangingPassword(false);
  };

  const handlePasswordChangeCancel = () => {
    setIsChangingPassword(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white md:pb-16 pt-24 md:pt-0">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {isEditing ? (
            <PersonalCenterEdit 
              userInfo={userInfo} 
              onSave={handleSave} 
              onCancel={handleCancel} 
            />
          ) : isChangingPassword ? (
            <ChangePassword 
              onSave={handlePasswordChangeComplete} 
              onCancel={handlePasswordChangeCancel} 
            />
          ) : (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center">
                    <User className="h-6 w-6 text-blue-600 mr-2" />
                    个人中心
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" onClick={() => navigate('/')}>
                      <Home className="h-4 w-4 mr-2" />
                      首页
                    </Button>
                    <Button variant="outline" onClick={() => setIsEditing(true)}>
                      <Edit className="h-4 w-4 mr-2" />
                      编辑
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col items-center mb-6">
                  <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 mb-4">
                    {userInfo.avatar ? (
                      <img src={userInfo.avatar} alt="Avatar" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-blue-100 flex items-center justify-center">
                        <User className="h-12 w-12 text-blue-600" />
                      </div>
                    )}
                  </div>
                  <h2 className="text-2xl font-bold">{userInfo.name}</h2>
                  <p className="text-gray-600">{userInfo.college}</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-500">昵称</label>
                    <p className="text-lg">{userInfo.name}</p>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-500">真实姓名</label>
                    <p className="text-lg">{userInfo.realName}</p>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-500">学号</label>
                    <p className="text-lg">{userInfo.studentId}</p>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-500">手机号</label>
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 text-gray-400 mr-2" />
                      <p className="text-lg">{userInfo.phone}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-500">邮箱</label>
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 text-gray-400 mr-2" />
                      <p className="text-lg">{userInfo.email}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-500">学院</label>
                    <div className="flex items-center">
                      <School className="h-4 w-4 text-gray-400 mr-2" />
                      <p className="text-lg">{userInfo.college}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-500">专业</label>
                    <p className="text-lg">{userInfo.major}</p>
                  </div>
                </div>
                
                <div className="pt-6">
                  <Button 
                    variant="outline" 
                    onClick={handleChangePassword}
                    className="w-full mb-4"
                  >
                    <Lock className="h-4 w-4 mr-2" />
                    修改密码
                  </Button>
                  
                  <Button 
                    variant="destructive" 
                    onClick={handleLogout}
                    className="w-full"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    退出登录
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
      
      {/* 为移动端导航栏留出空间 */}
      <div className="md:hidden h-16"></div>
    </div>
  );
};

export default PersonalCenter;
