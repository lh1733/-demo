import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { ArrowLeft, Send, Users, Calendar, MessageCircle, Zap, Image as ImageIcon, FileText, MapPin, Clock } from 'lucide-react';
import Navbar from '@/components/Navbar';

const ContentPublish = () => {
  const navigate = useNavigate();
  const [selectedTag, setSelectedTag] = useState('');
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [time, setTime] = useState('');
  const [files, setFiles] = useState([]);
  const [images, setImages] = useState([]);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [showLocation, setShowLocation] = useState(true);

  const tags = [
    { id: 'match', name: '学友匹配', icon: Users },
    { id: 'activity', name: '活动召集', icon: Calendar },
    { id: 'help', name: '问答求助', icon: MessageCircle },
    { id: 'skill', name: '技能交换', icon: Zap }
  ];

  const handlePublish = () => {
    // 这里可以添加发布逻辑
    console.log('发布内容:', { selectedTag, title, content, location, time, files, images, isAnonymous, showLocation });
    alert('内容发布成功！');
    navigate('/social-icebreaker');
  };

  const handleFileUpload = (e) => {
    const newFiles = Array.from(e.target.files);
    setFiles(prev => [...prev, ...newFiles]);
  };

  const handleImageUpload = (e) => {
    const newImages = Array.from(e.target.files);
    setImages(prev => [...prev, ...newImages]);
  };

  const removeFile = (index) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const removeImage = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white md:pb-16 pt-24 md:pt-0">
      <Navbar />
      
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center mb-6">
          <Button variant="ghost" onClick={() => navigate('/social-icebreaker')} className="mr-2">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold text-gray-800">发布内容</h1>
        </div>

        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>选择标签</CardTitle>
              <Button 
                variant="outline" 
                onClick={() => navigate('/social-icebreaker')}
                className="flex items-center"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                返回
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {tags.map((tag) => {
                const IconComponent = tag.icon;
                return (
                  <Button
                    key={tag.id}
                    variant={selectedTag === tag.id ? "default" : "outline"}
                    className="h-20 flex flex-col items-center justify-center"
                    onClick={() => setSelectedTag(tag.id)}
                  >
                    <IconComponent className="h-8 w-8 mb-1" />
                    <span>{tag.name}</span>
                  </Button>
                );
              })}
            </div>

            {selectedTag && (
              <div className="mt-6">
                <h2 className="text-xl font-semibold mb-4">
                  {tags.find(t => t.id === selectedTag)?.name}内容
                </h2>
                
                {(selectedTag === 'activity' || selectedTag === 'help') && (
                  <div className="space-y-4 mb-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">标题 *</Label>
                      <Input
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder={`请输入${selectedTag === 'activity' ? '活动' : '问题'}标题`}
                      />
                    </div>
                  </div>
                )}
                
                {selectedTag === 'activity' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="space-y-2">
                      <Label htmlFor="location">
                        <MapPin className="inline h-4 w-4 mr-1" />
                        活动地点
                      </Label>
                      <Input
                        id="location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="请输入活动地点"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="time">
                        <Clock className="inline h-4 w-4 mr-1" />
                        活动时间
                      </Label>
                      <Input
                        id="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        placeholder="请输入活动时间"
                      />
                    </div>
                  </div>
                )}
                
                <div className="space-y-2 mb-4">
                  <Label htmlFor="content">内容 *</Label>
                  <Textarea
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="请输入详细内容..."
                    rows={5}
                  />
                </div>
                
                {selectedTag === 'skill' && (
                  <div className="space-y-2 mb-4">
                    <Label htmlFor="file-upload">
                      <FileText className="inline h-4 w-4 mr-1" />
                      上传资料
                    </Label>
                    <Input
                      id="file-upload"
                      type="file"
                      multiple
                      onChange={handleFileUpload}
                    />
                    {files.length > 0 && (
                      <div className="mt-2">
                        <p className="text-sm text-gray-500 mb-1">已选择文件:</p>
                        <ul className="text-sm">
                          {files.map((file, index) => (
                            <li key={index} className="flex justify-between items-center">
                              <span>{file.name}</span>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => removeFile(index)}
                              >
                                删除
                              </Button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
                
                <div className="space-y-2 mb-4">
                  <Label htmlFor="image-upload">
                    <ImageIcon className="inline h-4 w-4 mr-1" />
                    上传图片
                  </Label>
                  <Input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                  />
                  {images.length > 0 && (
                    <div className="mt-2">
                      <p className="text-sm text-gray-500 mb-1">已选择图片:</p>
                      <div className="grid grid-cols-3 gap-2">
                        {images.map((image, index) => (
                          <div key={index} className="relative">
                            <img 
                              src={URL.createObjectURL(image)} 
                              alt="预览" 
                              className="w-full h-20 object-cover rounded"
                            />
                            <Button 
                              variant="destructive" 
                              size="sm" 
                              className="absolute top-0 right-0 h-6 w-6 p-1"
                              onClick={() => removeImage(index)}
                            >
                              ×
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="anonymous">匿名发布</Label>
                    <Switch
                      id="anonymous"
                      checked={isAnonymous}
                      onCheckedChange={setIsAnonymous}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="show-location">显示位置</Label>
                    <Switch
                      id="show-location"
                      checked={showLocation}
                      onCheckedChange={setShowLocation}
                    />
                  </div>
                </div>
                
                <Button 
                  className="w-full" 
                  onClick={handlePublish}
                  disabled={!content.trim() || (selectedTag !== 'match' && !title.trim())}
                >
                  <Send className="h-4 w-4 mr-2" />
                  发布
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      {/* 为移动端导航栏留出空间 */}
      <div className="md:hidden h-16"></div>
    </div>
  );
};

export default ContentPublish;
