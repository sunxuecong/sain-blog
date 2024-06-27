import { defineConfig } from "vitepress";
import { search as zhSearch } from "./zh";
import { qq } from "./icon";

export const shared = defineConfig({
  title: "Sain-admin",

  lastUpdated: true,
  cleanUrls: true,
  metaChunk: true,

  srcDir: "src",

  /* prettier-ignore */
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/Sain-admin.svg' }],
    ['script', { async: '', src: 'https://www.googletagmanager.com/gtag/js?id=G-JYHD4M2FMM' }],
    [
      'script',
      {},
      `window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-JYHD4M2FMM');`
    ]
  ],

  themeConfig: {
    logo: { src: "/sain-admin.svg", width: 24, height: 24 },

    search: {
      provider: "algolia",
      options: {
        appId: "XVJOMWXWDI",
        apiKey: "763016448ef3b797fc4ed0283c5046ca",
        indexName: "Sain-admin-netlify",
        locales: { ...zhSearch },
      },
    },

    socialLinks: [
      // { icon: 'mastodon', link: 'https://elk.zone/m.webtoo.ls/@vite' },
      // { icon: 'twitter', link: 'https://twitter.com/vite_js' },
      { icon: 'discord', link: 'https://discord.gg/XK5gp6eZn8' },
      { icon: 'github', link: 'https://github.com/sunxuecong' },
    ],
  },
});
