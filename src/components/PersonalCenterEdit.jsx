import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { User, Camera, Save, X } from 'lucide-react';
import AvatarEditor from 'react-avatar-editor';

const PersonalCenterEdit = ({ userInfo, onSave, onCancel }) => {
  const [editedInfo, setEditedInfo] = useState({ ...userInfo });
  const [avatar, setAvatar] = useState(null);
  const [isEditingAvatar, setIsEditingAvatar] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const editorRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatarPreview(e.target.result);
        setIsEditingAvatar(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveAvatar = () => {
    if (editorRef.current) {
      const canvas = editorRef.current.getImage();
      const dataUrl = canvas.toDataURL();
      setAvatar(dataUrl);
      setIsEditingAvatar(false);
    }
  };

  const handleSave = () => {
    onSave({
      ...editedInfo,
      avatar
    });
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <User className="h-6 w-6 text-blue-600 mr-2" />
            编辑个人信息
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col items-center">
            <div className="relative">
              <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200">
                {avatar ? (
                  <img src={avatar} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-blue-100 flex items-center justify-center">
                    <User className="h-12 w-12 text-blue-600" />
                  </div>
                )}
              </div>
              <label className="absolute bottom-0 right-0 bg-blue-600 rounded-full p-2 cursor-pointer">
                <Camera className="h-4 w-4 text-white" />
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleAvatarChange}
                />
              </label>
            </div>
            <p className="text-sm text-gray-500 mt-2">点击头像修改</p>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">昵称</Label>
              <Input
                id="name"
                name="name"
                value={editedInfo.name}
                onChange={handleInputChange}
                placeholder="请输入昵称"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="realName">真实姓名</Label>
              <Input
                id="realName"
                name="realName"
                value={editedInfo.realName}
                onChange={handleInputChange}
                placeholder="请输入真实姓名"
                disabled
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="studentId">学号</Label>
              <Input
                id="studentId"
                name="studentId"
                value={editedInfo.studentId}
                onChange={handleInputChange}
                disabled
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">手机号</Label>
              <Input
                id="phone"
                name="phone"
                value={editedInfo.phone}
                onChange={handleInputChange}
                placeholder="请输入手机号"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">邮箱</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={editedInfo.email}
                onChange={handleInputChange}
                placeholder="请输入邮箱"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="college">学院</Label>
              <Input
                id="college"
                name="college"
                value={editedInfo.college}
                onChange={handleInputChange}
                placeholder="请输入学院"
                disabled
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="major">专业</Label>
              <Input
                id="major"
                name="major"
                value={editedInfo.major}
                onChange={handleInputChange}
                placeholder="请输入专业"
                disabled
              />
            </div>
          </div>
          
          <div className="flex space-x-3 pt-4">
            <Button variant="outline" onClick={onCancel} className="flex-1">
              <X className="h-4 w-4 mr-2" />
              取消
            </Button>
            <Button onClick={handleSave} className="flex-1">
              <Save className="h-4 w-4 mr-2" />
              保存
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {/* 头像编辑弹窗 */}
      <Dialog open={isEditingAvatar} onOpenChange={setIsEditingAvatar}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>编辑头像</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center">
            {avatarPreview && (
              <AvatarEditor
                ref={editorRef}
                image={avatarPreview}
                width={200}
                height={200}
                border={50}
                borderRadius={100}
                color={[255, 255, 255, 0.6]} // RGBA
                scale={1}
                rotate={0}
              />
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditingAvatar(false)}>
              取消
            </Button>
            <Button onClick={handleSaveAvatar}>
              确定
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PersonalCenterEdit;
