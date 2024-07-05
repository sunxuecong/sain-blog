---
layout: home

hero:
  name: "Sain-admin"
  text: "专注 & 洞察 & 分享"
  tagline: 个人技术知识库，记录 & 分享个人碎片化、结构化、体系化的技术知识内容。
  image:
      src: /sain-admin.svg
      alt: Sain-admin
  actions:
    - theme: brand
      text: 快速开始
      link: /zh/guide/introduction
    - theme: alt
      text: 在Github查看
      link: https://github.com/chansee97/sain-admin
    - theme: alt
      text: 听点音乐
      link: https://github.com/chansee97/sain-admin

features:
  - title: 最新技术栈
    icon: 💻
    details: 基于Vue3、Vite5、TypeScript、NaiveUI、Unocss等最新技术栈开发
  - title: 网络请求
    icon:  📦
    details: 提供完善的网络请求封装，提供统一的响应处理和多场景能力
  - title: 权限管理
    icon: 🔑
    details: 完善的前后端权限管理方案
  - title: 路由配置
    icon: 📋
    details: 支持本地静态路由和后台返回动态路由，路由简单易配置
  - title: 主题适配
    icon: 🎨
    details: 支持暗黑主题适配，界面样式保持Naive风格
  - title: 代码规范
    icon: 📝
    details: 仅在提交时进行eslint校验，没有过多限制，开发更简便
---

<style>
:root {
  --vp-home-hero-name-color: transparent;
  --vp-home-hero-name-background: linear-gradient(120deg,#4894e5  30%,#f378bb 70%);
  /* --vp-home-hero-name-background: linear-gradient(120deg,#4894e5  0%,#52FFEF 80%); */
  /* --vp-home-hero-name-background: linear-gradient(-120deg,#4894e5  0%,#5EBEFF 80%); */
  --vp-home-hero-name-background: linear-gradient(120deg,#4894e5  0%, #f378bb  50% , #FFBD30 80%);

  --vp-home-hero-image-background-image: linear-gradient(-45deg, #9CFFA0 30%, #FF9FD3 50%, #e4cd7e 70%);
  --vp-home-hero-image-filter: blur(44px);
}

@media (min-width: 640px) {
  :root {
    --vp-home-hero-image-filter: blur(56px);
  }
}

@media (min-width: 960px) {
  :root {
    --vp-home-hero-image-filter: blur(68px);
  }
}
</style>
