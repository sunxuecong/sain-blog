---
layout: home


hero:
  name: "Sain-admin"
  text: "A clean and concise middle template"
  tagline: Vue3, Vite5, TypeScript, NaiveUI, Unocss
  image:
      src: /sain-admin.svg
      alt: Sain-admin
  actions:
    - theme: brand
      text: Learn about Sain-admin
      link: /guide/introduction
    - theme: alt
      text: Github
      link: https://github.com/chansee97/sain-admin
    - theme: alt
      text: Online Preview
      link: https://github.com/chansee97/sain-admin

features:
  - title: Latest Technology Stack
    icon: 💻
    details: Developed based on the latest technology stack such as Vue3, Vite5, TypeScript, NaiveUI, Unocss
  - title: Network Requests
    icon: 📦
    details: Provide comprehensive network request encapsulation, unified response handling, and multi-scenario capabilities
  - title: Permission Management
    icon: 🔑
    details: Comprehensive front-end and back-end permission management solution
  - title: Routing Configuration
    icon: 📋
    details: Support local static routes and dynamically generated routes returned by the backend, making routing simple and easy to configure
  - title: Theme Adaptation
    icon: 🎨
    details: Support dark theme adaptation, maintaining the Naive style of the interface
  - title: Code Standard
    icon: 📝
    details: Only perform eslint validation during submission, without excessive restrictions, making development easier

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
