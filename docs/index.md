---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "React-DDD"
  text: "React DDD 学习与实践"
  tagline: 通过实战案例，深入理解并应用领域驱动设计思想于 React 项目。
  image:
    src: ./react.svg # 你可以替换成项目 Logo，如果 public 目录下有 vite.svg，它会显示
    alt: React-DDD Logo
  actions:
    - theme: brand
      text: 开始学习
      link: /基础概念 # 链接到文档的 "基础概念" 页面
    - theme: alt
      text: 查看源码
      link: https://github.com/vuejs/vitepress # 请将此链接替换为你的项目 GitHub 仓库地址

features:
  - icon: 💡
    title: 核心概念解析
    details: 系统学习实体、值对象、聚合、仓储、领域服务等 DDD 核心模式，打下坚实的理论基础。
    link: /基础概念
    linkText: 学习基础概念
  - icon: 🛍️
    title: 实战案例驱动
    details: 通过 "商品列表" 等具体案例，演示 DDD 在前端项目中的实际应用与代码组织。
    link: /商品列表
    linkText: 查看商品列表案例
  - icon: 🏗️
    title: 前端架构探讨
    details: 深入探讨分层架构、多端复用策略、领域与应用服务划分等前端架构设计要点。
    link: /多端复用 # 或者链接到 /领域服务与应用服务
    linkText: 了解架构设计
  - icon: 🛠️
    title: DDD 实践手册
    details: 提供前端开发者视角下的 DDD 模式实践手册，总结常见问题与解决方案。
    link: /前端开发者DDD模式实践手册
    linkText: 阅读实践手册
---