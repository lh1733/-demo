# NoCode 校园迎新项目

这是一个基于美团 NoCode 制作的校园迎新与社交导航应用，使用 `Vite + React` 开发，已集成多种交互页面和体验模块。

## 项目简介

该项目面向高校新生，提供：

- 登录认证（本地模拟）
- 新生迎新首页与报到进度管理
- 学生信息登记与反馈表单
- AR 导航与校园地图
- 社交破冰与问答助手
- 内容发布、聊天页面、个人中心与帮助中心

## 核心技术栈

- `React 18`
- `Vite 5`
- `Tailwind CSS`
- `React Router`（`HashRouter` 路由模式，适合 GitHub Pages 部署）
- `@tanstack/react-query`
- `Supabase JS`
- `Radix UI`
- `@meituan-nocode` 插件

## 运行说明

1. 安装依赖

```bash
npm install
```

2. 启动本地开发服务器

```bash
npm run dev
```

3. 打开浏览器访问

```text
http://localhost:8080
```

4. 登录信息提示

- 学号：任意 10 位数字
- 密码：任意 6 位数字（模拟身份证后六位）

> 当前登录逻辑为前端模拟校验，登录成功后会使用 `localStorage` 保存状态。

## 主要页面说明

- `/login`：新生登录页面
- `/`：迎新首页，包含报到进度、资料登记、意见反馈等
- `/ar-navigation`：AR 导航页面
- `/campus-map`：校园地图页面
- `/social-icebreaker`：社交破冰页面
- `/virtual-assistant`：问答助手页面
- `/chat`：聊天页面
- `/personal-center`：个人中心
- `/content-publish`：内容发布
- `/help-center`：帮助中心

## 构建与部署

1. 构建项目

```bash
npm run build
```

2. 构建输出目录

- 默认输出目录：`build/`

3. 推荐部署方式：GitHub Pages

- 如果你使用仓库页面（`https://<用户名>.github.io/<仓库名>/`），建议保持 `HashRouter`，并将构建输出目录发布到 GitHub Pages。
- 如果需要自定义 `base`，可以设置环境变量 `PUBLIC_PATH` 对应你的仓库路径，例如：

```bash
PUBLIC_PATH="/<repo-name>" npm run build
```

### 可选：使用 `gh-pages` 自动部署

1. 安装：

```bash
npm install --save-dev gh-pages
```

2. 在 `package.json` 中添加脚本：

```json
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d build"
}
```

3. 运行部署：

```bash
npm run deploy
```

## 说明与提示

- 当前项目对外展示时，登录页是入口，用户需先登录后访问内部页面。
- 因为使用 `HashRouter`，部署到 GitHub Pages 时无需额外的服务器重写规则。
- 组件内有部分接口调用为模拟演示，例如 `/api/dashboard`、反馈提交等，可按需替换为真实后端。

## 目录说明

- `src/`：应用源码
- `src/pages/`：页面路由组件
- `src/components/`：UI 和功能组件
- `src/lib/`：API 客户端和工具函数
- `vite.config.js`：构建配置
- `.gitignore`：忽略项配置

## 你可以直接做的事

- 将本仓库推送到 GitHub
- 使用 GitHub Pages 发布 `build/`
- 让访问者直接打开链接使用前端交互功能

如果你要，我也可以继续帮你补一个 `gh-pages` 或 GitHub Actions 自动部署配置。