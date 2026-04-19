import React, { useState } from 'react';
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
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

const formSchema = z.object({
  message: z.string().min(10, {
    message: '交友消息至少需要10个字符',
  }),
  contact: z.string().min(5, {
    message: '联系方式至少需要5个字符',
  }),
  additionalInfo: z.string().optional(),
});

const MatchRequestDialog = ({ open, onOpenChange, onSubmit }) => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: '',
      contact: '',
      additionalInfo: '',
    },
  });

  const handleSubmit = (values) => {
    onSubmit(values);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>发起匹配</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>交友消息 *</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="请输入你想对对方说的话..." 
                      className="resize-none" 
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>
                    介绍你自己，说明你想交什么样的朋友
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="contact"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>联系方式 *</FormLabel>
                  <FormControl>
                    <Input placeholder="请输入你的联系方式（微信/手机号等）" {...field} />
                  </FormControl>
                  <FormDescription>
                    对方将通过此方式与你联系
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="additionalInfo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>其他信息 (可选)</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="可以添加其他你想说明的信息..." 
                      className="resize-none" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="flex justify-end space-x-2 pt-4">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                取消
              </Button>
              <Button type="submit">发送匹配请求</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default MatchRequestDialog;
