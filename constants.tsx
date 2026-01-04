
import React from 'react';
import { Achievement } from './types';
import { Cpu, Rocket, Book, Award, Briefcase, Users, BrainCircuit, GraduationCap } from 'lucide-react';

export const PERSONAL_INFO = {
  name: "牛渝文",
  age: 21,
  location: "西安",
  motto: "AI、创业者、国学爱好者",
  bio: "实战派青年创业联盟联合创始人，深耕AI青少年教育与校园流量运营，致力于将前沿AI技术与中国传统文化智慧相结合。"
};

export const ACHIEVEMENTS: Achievement[] = [
  { title: "实战派青年创业联盟联合创始人", category: 'Entrepreneurship' },
  { title: "深圳咪豆科技有限公司创始团队 (青少年AI教育)", category: 'AI' },
  { title: "校园VC 数创精英班二期优秀学员", category: 'Education' },
  { title: "讯飞星火大模型开发者大赛参与者", category: 'AI' },
  { title: "Mindverse (HongKong) 校园大使", category: 'AI' },
  { title: "脱单盲盒操盘手 / 校园流量1w+", category: 'Entrepreneurship' },
  { title: "校园AI项目累计变现上万", category: 'AI' },
  { title: "省级奖项 × 1", category: 'Honors' },
  { title: "北大西安创业训练营学员", category: 'Education' },
  { title: "中小企业AI增长顾问", category: 'Entrepreneurship' },
  { title: "校园VC 投资经理", category: 'Entrepreneurship' },
  { title: "中国青年报线上访谈嘉宾", category: 'Honors' },
  { title: "国学社社长", category: 'Education' },
  { title: "Datawhale 线下分享嘉宾", category: 'AI' },
  { title: "校级课题研究参与者", category: 'Education' }
];

export const CATEGORY_ICONS = {
  AI: <Cpu size={20} className="text-cyan-400" />,
  Entrepreneurship: <Rocket size={20} className="text-indigo-400" />,
  Honors: <Award size={20} className="text-amber-400" />,
  Education: <Book size={20} className="text-emerald-400" />
};
