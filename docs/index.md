---
layout: home
layoutClass: 'm-home-layout'

hero:
  name: Sain-notes
  text: 专注 & 洞察 & 分享
  tagline: 记录分享个人碎片化、体系化的技术知识内容。
  image:
    src: /logo.svg
    alt: Sain-notes
  actions:
    - text: 快速开始
      link: /front/es6/
    - text: 在Github查看
      link: https://github.com/sunxuecong
      theme: alt
    - text: 听点音乐
      link: /music/guest
      theme: alt
features:
  - icon: 📖
    title: 前端物语
    details: 整理前端常用知识点，方便查漏补缺。
    link: /front/javascript/types
    linkText: 开始阅读
  - icon: 📘
    title: 后端物语
    details: 围绕后端开发的技术、经验、故事和知识的分享。
    link: /backend/node/index
    linkText: 查看问题
  - icon: 💡
    title: 实用技巧
    details: 工作中积累的一些开发技巧。
    link: /workflow/utils/library
    linkText:  插件扩展
  - icon: 🐞
    title: 经验心得
    details: 记录一下踩过的坑，总有一些让你意想不到的问题。
    link: /pit/npm
    linkText: 经验心得
  - icon:  🔧
    title: 工具软件
    details: 归纳一些编程相关工具与网站，提高效率。
    link: /efficiency/online-tools
    linkText: 提高效率
  - icon:  🎉
    title: 风来自很远的地方，去看看也无妨 😄。
    details: '<small class="bottom-small">-- Sain Sun</small>'
    link: /cong
---

<style>
.m-home-layout .image-bg {
  background:none
}



.m-home-layout .details small {
  opacity: 0.8;
}

.m-home-layout .item:last-child .details {
  display: flex;
  justify-content: flex-end;
  align-items: end;
}
</style>
