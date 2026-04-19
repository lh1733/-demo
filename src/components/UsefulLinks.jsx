import React from 'react';
import { Link } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const UsefulLinks = () => {
  const links = [
    {
      category: "教务系统",
      items: [
        { name: "教务处官网", url: "https://jwc.bupt.edu.cn/" },
        { name: "选课系统", url: "https://xk.bupt.edu.cn/" },
        { name: "成绩查询", url: "https://cj.bupt.edu.cn/" },
        { name: "考试安排", url: "https://ks.bupt.edu.cn/" }
      ]
    },
    {
      category: "学生服务",
      items: [
        { name: "学生邮箱", url: "https://mail.bupt.edu.cn/" },
        { name: "图书馆", url: "https://lib.bupt.edu.cn/" },
        { name: "校园卡服务", url: "https://card.bupt.edu.cn/" },
        { name: "就业信息网", url: "https://career.bupt.edu.cn/" }
      ]
    },
    {
      category: "生活服务",
      items: [
        { name: "后勤服务", url: "https://hq.bupt.edu.cn/" },
        { name: "校园网", url: "https://net.bupt.edu.cn/" },
        { name: "校医院", url: "https://hospital.bupt.edu.cn/" },
        { name: "心理咨询", url: "https://xl.bupt.edu.cn/" }
      ]
    }
  ];

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">校内实用网址</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {links.map((category, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-lg">{category.category}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {category.items.map((item, itemIndex) => (
                  <li key={itemIndex}>
                    <a 
                      href={item.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      <Link className="h-4 w-4 mr-2" />
                      <span className="text-sm">{item.name}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default UsefulLinks;
