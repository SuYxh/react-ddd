# React-DDD 学习项目

本项目是一个使用 React、TypeScript 和 Vite 构建的，用于学习和实践领域驱动设计（DDD）思想的前端项目。

## ✨ 项目特性

- **领域驱动设计 (DDD)**: 核心业务逻辑遵循 DDD 原则进行建模。
- **分层架构**: 清晰的 UI 层、应用层、领域层和基础设施层划分。
- **React 19 & TypeScript**: 使用最新的 React 特性以及强类型语言 TypeScript。
- **Vite**: 快速的冷启动和模块热更新（HMR）。
- **Zustand**: 轻量级的状态管理库。
- **VitePress**: 用于项目文档的静态站点生成器。
- **ESLint**: 代码规范和质量检查。

## 📚 项目文档

本项目使用 VitePress 搭建了详细的文档网站，包含了 DDD 的基础概念、案例分析、实践手册等。

- **本地启动文档**: `pnpm docs:dev`
- **构建文档**: `pnpm docs:build`
- **预览文档**: `pnpm docs:preview`

文档内容主要在 `/docs` 目录下，你可以在这里找到：
- 基础概念
- 商品列表案例
- 领域服务与应用服务
- 聚合和仓储
- 多端复用方案
- 端能力使用指南
- DDD 模式实践手册

## 🚀 快速开始

### 环境要求

- Node.js (推荐 >=18.x)
- pnpm (推荐)

### 安装依赖

```bash
pnpm install
```

### 启动开发服务器

```bash
pnpm dev
```

项目将在 `http://localhost:5173` (或其他可用端口) 启动。

### 构建生产版本

```bash
pnpm build
```

构建产物将输出到 `dist` 目录。

### 代码检查

```bash
pnpm lint
```

## 📝 可用脚本

在 `package.json` 文件中，你可以找到以下主要脚本：

- `dev`: 启动开发服务器。
- `build`: 构建生产版本。
- `lint`: 执行 ESLint 代码检查。
- `preview`: 本地预览生产构建版本。
- `docs:dev`: 启动 VitePress 文档开发服务器。
- `docs:build`: 构建 VitePress 文档。
- `docs:preview`: 预览构建好的 VitePress 文档。

## 📁 项目结构概览

```
.
├── docs/                      # VitePress 文档目录
│   ├── .vitepress/            # VitePress 配置
│   └── *.md                   # Markdown 文档文件
├── public/                    # 静态资源
├── src/                       # 项目源码
│   ├── App.css                # 全局应用样式
│   ├── App.tsx                # 应用根组件
│   ├── assets/                # 静态资源 (如图片)
│   ├── features/              # 功能模块 (限界上下文)
│   │   ├── cart/              # 购物车模块
│   │   │   ├── application/   # 应用服务
│   │   │   ├── domain/        # 领域模型 (实体, 值对象, 领域服务)
│   │   │   ├── infrastructure/# 基础设施 (API, 本地存储等)
│   │   │   └── ui/            # UI 组件
│   │   └── product/           # 商品模块 (类似结构)
│   ├── index.css              # 入口样式
│   ├── main.tsx               # 应用入口文件
│   ├── shared/                # 共享模块
│   │   ├── domain-events/     # 领域事件
│   │   └── platform/          # 平台相关能力抽象
│   ├── store.ts               # 全局状态管理 (如果需要)
│   └── vite-env.d.ts          # Vite 环境变量类型定义
├── .gitignore                 # Git 忽略配置
├── eslint.config.js           # ESLint 配置文件
├── index.html                 # HTML 入口文件
├── package.json               # 项目依赖和脚本配置
├── pnpm-lock.yaml             # pnpm 锁文件
├── README.md                  # 项目说明文档 (本文档)
├── tsconfig.app.json          # 应用 TypeScript 配置
├── tsconfig.json              # 基础 TypeScript 配置
├── tsconfig.node.json         # Node 环境 TypeScript 配置 (如 vite.config.ts)
└── vite.config.ts             # Vite 配置文件
```

## 💡核心 DDD 概念实践

本项目旨在通过实际代码演示 DDD 的核心概念：

- **实体 (Entity)**: 具有唯一标识符并且可变的对象 (例如: `Product`, `CartItem`)。
- **值对象 (Value Object)**: 没有唯一标识符且不可变的对象，用于描述事物的属性 (例如: `Price`, `Money`)。
- **聚合 (Aggregate)**: 一组相关对象的集群，作为数据修改的单元，有一个聚合根 (Aggregate Root) 作为入口。
- **仓储 (Repository)**: 封装数据持久化逻辑，提供类似集合的接口来访问领域对象。
- **领域服务 (Domain Service)**: 当某些业务逻辑不适合放在实体或值对象中时，可以使用领域服务。
- **应用服务 (Application Service)**: 协调领域对象和仓储来完成用户用例，不包含业务逻辑。
- **限界上下文 (Bounded Context)**: 业务模型的边界，确保模型在内部一致。在本项目中，`features/` 下的每个子目录（如 `product`, `cart`）可以视为一个限界上下文。
- **领域事件 (Domain Event)**: 表示领域中发生的重要事情，用于解耦不同限界上下文或模块之间的通信。

## 🛠️ 技术栈

- **React 19**
- **TypeScript**
- **Vite**
- **Zustand** (用于状态管理)
- **VitePress** (用于文档)
- **ESLint** (代码检查)
- **pnpm** (包管理)

## 🤝 贡献

欢迎对本项目提出改进意见或贡献代码。你可以通过以下方式参与：

1. Fork 本仓库
2. 创建你的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交你的更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开一个 Pull Request

## 📄 开源许可

本项目遵循 MIT 开源许可。

