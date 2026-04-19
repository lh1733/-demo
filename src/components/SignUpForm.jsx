import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

const formSchema = z.object({
  name: z.string().min(2, {
    message: '姓名至少需要2个字符',
  }),
  studentId: z.string().min(8, {
    message: '学号至少需要8位数字',
  }),
  college: z.string().min(1, {
    message: '请选择学院',
  }),
  major: z.string().min(1, {
    message: '请选择专业',
  }),
  message: z.string().optional(),
});

const SignUpForm = ({ onSubmit, onCancel }) => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      studentId: '',
      college: '',
      major: '',
      message: '',
    },
  });

  const handleSubmit = (values) => {
    onSubmit(values);
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>姓名 *</FormLabel>
              <FormControl>
                <Input placeholder="请输入您的姓名" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="studentId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>学号 *</FormLabel>
              <FormControl>
                <Input placeholder="请输入您的学号" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="college"
          render={({ field }) => (
            <FormItem>
              <FormLabel>学院 *</FormLabel>
              <FormControl>
                <Input placeholder="请输入您的学院" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="major"
          render={({ field }) => (
            <FormItem>
              <FormLabel>专业 *</FormLabel>
              <FormControl>
                <Input placeholder="请输入您的专业" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>留言 (可选)</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="您可以添加额外的留言信息..." 
                  className="resize-none" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="flex justify-end space-x-2 pt-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            取消
          </Button>
          <Button type="submit">提交报名</Button>
        </div>
      </form>
    </Form>
  );
};

export default SignUpForm;
