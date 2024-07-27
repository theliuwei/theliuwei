import { defineConfig } from 'vitepress'
import nav from "./nav"
import sidebar from "./sidebar"
import footer from './footer'

export default defineConfig({
  vite: {
    build: {
      chunkSizeWarningLimit: 1000,
      rollupOptions: {
        output: {
          manualChunks(id) {
            // 自定义的分块逻辑
          }
        }
      }
    }
  },
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
    
  },
 
  
})
