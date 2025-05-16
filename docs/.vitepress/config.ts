import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "React-DDD",
  description: "React ddd study",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
    ],

    sidebar: [
      {
        text: '基础知识',
        items: [
          { text: '基础概念', link: '/基础概念' },
          { text: '商品列表-案例', link: '/商品列表' },
          { text: '领域服务与应用服务', link: '/领域服务与应用服务' },
          { text: '聚合和仓储', link: '/聚合和仓储' },
          { text: '多端复用', link: '/多端复用' },
          { text: '端能力使用', link: '/端能力使用' },
          { text: 'domain中如何使用端能力', link: '/domain中如何使用端能力' },
          { text: '差异化逻辑处理-执行流程差异', link: '/差异化逻辑处理-1' },
          { text: '差异化逻辑处理-接口调用不同', link: '/差异化逻辑处理-2' },
        ]
      },
      {
        text: 'DDD 手册',
        items: [
          { text: 'DDD模式实践手册', link: '/前端开发者DDD模式实践手册' },
          { text: 'domain中如何使用端能力', link: '/domain中如何使用端能力' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})

