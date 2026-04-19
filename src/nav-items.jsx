import { HomeIcon, MapIcon, UsersIcon, HelpCircleIcon, UserIcon, MessageCircle, Plus } from "lucide-react";
import Index from "./pages/Index.jsx";
import ArNavigation from "./pages/ArNavigation.jsx";
import SocialIcebreaker from "./pages/SocialIcebreaker.jsx";
import VirtualAssistant from "./pages/VirtualAssistant.jsx";
import CampusMap from "./pages/CampusMap.jsx";
import HelpCenter from "./pages/HelpCenter.jsx";
import Login from "./pages/Login.jsx";
import PersonalCenter from "./pages/PersonalCenter.jsx";
import ChatPage from "./pages/ChatPage.jsx";
import ContentPublish from "./pages/ContentPublish.jsx";

/**
* Central place for defining the navigation items. Used for navigation components and routing.
*/
export const navItems = [
{
    title: "首页",
    to: "/",
    icon: <HomeIcon className="h-4 w-4" />,
    page: <Index />,
},
{
    title: "AR导航",
    to: "/ar-navigation",
    icon: <MapIcon className="h-4 w-4" />,
    page: <ArNavigation />,
},
{
    title: "社交破冰",
    to: "/social-icebreaker",
    icon: <UsersIcon className="h-4 w-4" />,
    page: <SocialIcebreaker />,
},
{
    title: "问答助手",
    to: "/virtual-assistant",
    icon: <HelpCircleIcon className="h-4 w-4" />,
    page: <VirtualAssistant />,
},
{
    title: "校园地图",
    to: "/campus-map",
    icon: <MapIcon className="h-4 w-4" />,
    page: <CampusMap />,
},
{
    title: "帮助中心",
    to: "/help-center",
    icon: <HelpCircleIcon className="h-4 w-4" />,
    page: <HelpCenter />,
},
{
    title: "聊天页面",
    to: "/chat",
    icon: <MessageCircle className="h-4 w-4" />,
    page: <ChatPage />,
},
{
    title: "登录",
    to: "/login",
    icon: <HomeIcon className="h-4 w-4" />,
    page: <Login />,
},
{
    title: "个人中心",
    to: "/personal-center",
    icon: <UserIcon className="h-4 w-4" />,
    page: <PersonalCenter />,
},
{
    title: "发布内容",
    to: "/content-publish",
    icon: <Plus className="h-4 w-4" />,
    page: <ContentPublish />,
},
];
