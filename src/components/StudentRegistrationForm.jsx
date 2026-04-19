import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  School, 
  Calendar,
  Eye,
  EyeOff,
  CheckCircle
} from 'lucide-react';

const StudentRegistrationForm = () => {
  const [step, setStep] = useState(1); // 1: form, 2: preview, 3: success
  const [formData, setFormData] = useState({
    name: '',
    studentId: '',
    phone: '',
    email: '',
    address: '',
    major: '',
    enrollmentDate: '',
    emergencyContact: '',
    emergencyPhone: '',
    specialNeeds: ''
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = '姓名不能为空';
    }
    
    if (!formData.studentId.trim()) {
      newErrors.studentId = '学号不能为空';
    } else if (!/^\d{10}$/.test(formData.studentId)) {
      newErrors.studentId = '学号必须为10位数字';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = '手机号不能为空';
    } else if (!/^1[3-9]\d{9}$/.test(formData.phone)) {
      newErrors.phone = '请输入正确的手机号';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = '邮箱不能为空';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = '请输入正确的邮箱格式';
    }
    
    if (!formData.major.trim()) {
      newErrors.major = '专业不能为空';
    }
    
    if (!formData.enrollmentDate) {
      newErrors.enrollmentDate = '入学日期不能为空';
    }
    
    if (!formData.emergencyContact.trim()) {
      newErrors.emergencyContact = '紧急联系人不能为空';
    }
    
    if (!formData.emergencyPhone.trim()) {
      newErrors.emergencyPhone = '紧急联系人电话不能为空';
    } else if (!/^1[3-9]\d{9}$/.test(formData.emergencyPhone)) {
      newErrors.emergencyPhone = '请输入正确的手机号';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setStep(2); // 进入预览页面
    }
  };

  const handleConfirm = () => {
    // 这里可以调用API提交数据
    console.log('提交数据:', formData);
    setStep(3); // 进入成功页面
  };

  const handleEdit = () => {
    setStep(1); // 返回表单页面
  };

  const handleReset = () => {
    setFormData({
      name: '',
      studentId: '',
      phone: '',
      email: '',
      address: '',
      major: '',
      enrollmentDate: '',
      emergencyContact: '',
      emergencyPhone: '',
      specialNeeds: ''
    });
    setErrors({});
    setStep(1);
  };

  if (step === 3) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[500px]">
        <div className="text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">提交成功</h2>
          <p className="text-gray-600 mb-6">您的信息已成功提交，欢迎加入北京邮电大学！</p>
          <Button onClick={handleReset}>重新填写</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {step === 1 ? (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="mr-2" />
              新生信息登记表
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* 基本信息 */}
                <div className="space-y-2">
                  <Label htmlFor="name">姓名 *</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="pl-10"
                      placeholder="请输入您的姓名"
                    />
                  </div>
                  {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="studentId">学号 *</Label>
                  <div className="relative">
                    <School className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="studentId"
                      name="studentId"
                      value={formData.studentId}
                      onChange={handleInputChange}
                      className="pl-10"
                      placeholder="请输入10位学号"
                    />
                  </div>
                  {errors.studentId && <p className="text-sm text-red-500">{errors.studentId}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">手机号 *</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="pl-10"
                      placeholder="请输入手机号"
                    />
                  </div>
                  {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">邮箱 *</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="pl-10"
                      placeholder="请输入邮箱"
                    />
                  </div>
                  {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="address">家庭住址</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="pl-10"
                      placeholder="请输入家庭住址"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="major">专业 *</Label>
                  <div className="relative">
                    <School className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="major"
                      name="major"
                      value={formData.major}
                      onChange={handleInputChange}
                      className="pl-10"
                      placeholder="请输入专业名称"
                    />
                  </div>
                  {errors.major && <p className="text-sm text-red-500">{errors.major}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="enrollmentDate">入学日期 *</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="enrollmentDate"
                      name="enrollmentDate"
                      type="date"
                      value={formData.enrollmentDate}
                      onChange={handleInputChange}
                      className="pl-10"
                    />
                  </div>
                  {errors.enrollmentDate && <p className="text-sm text-red-500">{errors.enrollmentDate}</p>}
                </div>

                {/* 紧急联系人 */}
                <div className="space-y-2">
                  <Label htmlFor="emergencyContact">紧急联系人 *</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="emergencyContact"
                      name="emergencyContact"
                      value={formData.emergencyContact}
                      onChange={handleInputChange}
                      className="pl-10"
                      placeholder="请输入紧急联系人姓名"
                    />
                  </div>
                  {errors.emergencyContact && <p className="text-sm text-red-500">{errors.emergencyContact}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="emergencyPhone">紧急联系人电话 *</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="emergencyPhone"
                      name="emergencyPhone"
                      value={formData.emergencyPhone}
                      onChange={handleInputChange}
                      className="pl-10"
                      placeholder="请输入紧急联系人电话"
                    />
                  </div>
                  {errors.emergencyPhone && <p className="text-sm text-red-500">{errors.emergencyPhone}</p>}
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="specialNeeds">特殊需求说明</Label>
                  <Textarea
                    id="specialNeeds"
                    name="specialNeeds"
                    value={formData.specialNeeds}
                    onChange={handleInputChange}
                    placeholder="如有特殊需求请在此说明（如身体残疾、过敏史等）"
                    rows={3}
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button type="submit">预览信息</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Eye className="mr-2" />
              信息预览
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-medium text-gray-500">姓名</h3>
                  <p className="text-lg">{formData.name}</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-500">学号</h3>
                  <p className="text-lg">{formData.studentId}</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-500">手机号</h3>
                  <p className="text-lg">{formData.phone}</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-500">邮箱</h3>
                  <p className="text-lg">{formData.email}</p>
                </div>
                <div className="md:col-span-2">
                  <h3 className="font-medium text-gray-500">家庭住址</h3>
                  <p className="text-lg">{formData.address || '未填写'}</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-500">专业</h3>
                  <p className="text-lg">{formData.major}</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-500">入学日期</h3>
                  <p className="text-lg">
                    {formData.enrollmentDate 
                      ? new Date(formData.enrollmentDate).toLocaleDateString('zh-CN') 
                      : '未选择'}
                  </p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-500">紧急联系人</h3>
                  <p className="text-lg">{formData.emergencyContact}</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-500">紧急联系人电话</h3>
                  <p className="text-lg">{formData.emergencyPhone}</p>
                </div>
                <div className="md:col-span-2">
                  <h3 className="font-medium text-gray-500">特殊需求说明</h3>
                  <p className="text-lg">{formData.specialNeeds || '无特殊需求'}</p>
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <Button variant="outline" onClick={handleEdit}>
                  <EyeOff className="mr-2 h-4 w-4" />
                  重新编辑
                </Button>
                <Button onClick={handleConfirm}>
                  <CheckCircle className="mr-2 h-4 w-4" />
                  确认提交
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default StudentRegistrationForm;
