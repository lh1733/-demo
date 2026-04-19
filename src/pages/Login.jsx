import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { User, Lock } from 'lucide-react';

const Login = () => {
  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // 模拟登录验证
    setTimeout(() => {
      // 简单验证：学号为10位数字，密码为6位数字（身份证后6位）
      if (!/^\d{10}$/.test(studentId)) {
        setError('学号必须为10位数字');
        setLoading(false);
        return;
      }

      if (!/^\d{6}$/.test(password)) {
        setError('密码必须为6位数字（身份证号码后六位）');
        setLoading(false);
        return;
      }

      // 模拟登录成功
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('studentId', studentId);
      setLoading(false);
      navigate('/');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto bg-blue-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
            <User className="h-8 w-8 text-blue-600" />
          </div>
          <CardTitle className="text-2xl font-bold">新生迎新系统</CardTitle>
          <CardDescription>请使用学号和密码登录</CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="studentId">学号</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  id="studentId"
                  type="text"
                  placeholder="请输入10位学号"
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">密码</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  id="password"
                  type="password"
                  placeholder="请输入身份证号码后六位"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              首次登录默认密码为身份证号码后六位
            </p>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? '登录中...' : '登录'}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col">
          <p className="text-sm text-gray-500 text-center">
            遇到问题请联系迎新服务热线：010-12345678
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
