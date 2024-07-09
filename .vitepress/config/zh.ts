import { defineConfig, type DefaultTheme } from "vitepress";

export const zh = defineConfig({
  lang: "zh-Hans",
  description: "一个简洁、干净的中后台框架",

  themeConfig: {
    nav: nav(),

    sidebar: {
      "/zh/frontend/": {
        base: "/zh/frontend/",
        items: [
          {
            text: "JavaScript 基础知识",
            items: [
              { text: "原型与原型链详解", link: "js/prototypeChain" },
              { text: "JavaScript手写代码汇总", link: "js/handwriting" },
              { text: "前端代码规范", link: "js/specification" }
            ],
          },
          {
            text: "ES6 常用知识点",
            link: "index"
          },
          {
            text: "TypeScript",
            items: [
              { text: "基础知识", link: "js/base" },
              { text: "工具类型", link: "js/tool" }
            ],
          },
        ],
      },
      // "/zh/guide/": { base: "/zh/guide/", items: sidebarGuide() },
      "/zh/other/": { base: "/zh/other/", items: sidebarReference() },
      "/zh/dev/": { base: "/zh/dev/", items: sidebarEnv() },
    },

    editLink: {
      pattern:
        "https://github.com/chansee97/sain-admin-docs/edit/main/src/:path",
      text: "在 GitHub 上编辑此页面",
    },

    footer: {
      message: "基于 MIT 许可发布",
      copyright: `版权所有 © 2024-present Sain Sun`,
    },

    docFooter: {
      prev: "上一页",
      next: "下一页",
    },

    outline: {
      label: "页面导航",
    },

    lastUpdated: {
      text: "最后更新于",
      formatOptions: {
        dateStyle: "short",
        timeStyle: "medium",
      },
    },

    langMenuLabel: "多语言",
    returnToTopLabel: "回到顶部",
    sidebarMenuLabel: "菜单",
    darkModeSwitchLabel: "主题",
    lightModeSwitchTitle: "切换到浅色模式",
    darkModeSwitchTitle: "切换到深色模式",
  },
});

function nav(): DefaultTheme.NavItem[] {
  return [
    {
      text: "前端",
      link: "/zh/frontend/js/prototypeChain",
      activeMatch: "/zh/frontend/",
    },
    {
      text: "指南",
      link: "/zh/guide/introduction",
      activeMatch: "/zh/guide/",
    },
    {
      text: "开发配置",
      link: "/zh/dev/git",
      activeMatch: "/zh/dev/",
    },
    {
      text: "其他问题",
      link: "/zh/other/FAQ",
      activeMatch: "/zh/other/",
    },
    {
      text: "关于",
      items: [
        {
          text: "在线预览",
          link: "https://sain-admin-site.netlify.app/",
        },
        {
          text: "Github",
          link: "https://github.com/chansee97/sain-admin",
        },
        {
          text: "Gitee",
          link: "https://gitee.com/chansee97/sain-admin",
        },
        {
          text: "文档仓库",
          link: "https://github.com/chansee97/sain-admin-docs",
        },
        {
          text: "更新日志",
          link: "https://github.com/chansee97/sain-admin/releases",
        },
      ],
    },
  ];
}

function sidebarReference(): DefaultTheme.NavItem[] {
  return [
    {
      text: "其他问题",
      items: [{ text: "FAQ", link: "FAQ" }],
    },
  ];
}
function sidebarEnv(): DefaultTheme.NavItem[] {
  return [
    {
      text: "开发工具",
      items: [
        { text: "vscode插件", link: "vc-plugins" },
        { text: "便利工具", link: "awesome-tools" },
      ],
    },
    {
      text: "开发环境",
      items: [
        { text: "Git", link: "git" },
        { text: "NodeJs", link: "nodejs" },
        { text: "Mysql", link: "mysql" },
      ],
    },
  ];
}
export const search: DefaultTheme.AlgoliaSearchOptions["locales"] = {
  zh: {
    placeholder: "搜索文档",
    translations: {
      button: {
        buttonText: "搜索文档",
        buttonAriaLabel: "搜索文档",
      },
      modal: {
        searchBox: {
          resetButtonTitle: "清除查询条件",
          resetButtonAriaLabel: "清除查询条件",
          cancelButtonText: "取消",
          cancelButtonAriaLabel: "取消",
        },
        startScreen: {
          recentSearchesTitle: "搜索历史",
          noRecentSearchesText: "没有搜索历史",
          saveRecentSearchButtonTitle: "保存至搜索历史",
          removeRecentSearchButtonTitle: "从搜索历史中移除",
          favoriteSearchesTitle: "收藏",
          removeFavoriteSearchButtonTitle: "从收藏中移除",
        },
        errorScreen: {
          titleText: "无法获取结果",
          helpText: "你可能需要检查你的网络连接",
        },
        footer: {
          selectText: "选择",
          navigateText: "切换",
          closeText: "关闭",
          searchByText: "搜索提供者",
        },
        noResultsScreen: {
          noResultsText: "无法找到相关结果",
          suggestedQueryText: "你可以尝试查询",
          reportMissingResultsText: "你认为该查询应该有结果？",
          reportMissingResultsLinkText: "点击反馈",
        },
      },
    },
  },
};
