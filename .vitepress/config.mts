import { defineConfig } from 'vitepress'
import nav from "./nav"
import sidebar from "./sidebar"
import footer from './footer'

export default defineConfig({
  title: "THELIUWEI",
  description: "THELIUWEI",
  srcDir:"./docs/",
  themeConfig: {
    logo:"/Subtract.svg",
    search:{
      provider: 'local'
    },
    nav,
    sidebar,


    socialLinks: [
      { icon: 'github', link: 'https://github.com/pythonliuwei-root' }
    ],
    footer:{
      message: 'Released under the MIT License.',
        copyright: 'Copyright © 2024-present Liu Wei'
    }
    
  }
  
})
