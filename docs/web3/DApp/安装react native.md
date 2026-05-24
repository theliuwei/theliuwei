🛠️ 环境搭建步骤
1. 安装React Native开发环境
bash# 安装必要的全局工具
npm install -g @react-native-community/cli
npm install -g expo-cli

# 安装iOS开发必需品（Mac专用）
brew install watchman
2. 安装Xcode（iOS开发必需）

从App Store安装Xcode
安装Xcode Command Line Tools：

bashxcode-select --install
3. 安装Android开发环境（可选，但推荐）
bash# 安装Java Development Kit
brew install --cask zulu@17

# 下载Android Studio
# 或者使用命令行工具
brew install --cask android-studio
🚀 创建项目
方式1：使用Expo（推荐新手）
bash# 创建项目
npx create-expo-app CryptoPortfolioTracker
cd CryptoPortfolioTracker

# 启动开发服务器
npx expo start
方式2：原生React Native（更灵活）
bash# 创建项目
npx react-native init CryptoPortfolioTracker
cd CryptoPortfolioTracker

# iOS运行
npx react-native run-ios
# Android运行
npx react-native run-android
📱 投资组合追踪器技术栈
前端依赖包
bash# 核心Web3库
npm install ethers @walletconnect/web3-provider

# 图表库
npm install react-native-chart-kit react-native-svg

# 导航
npm install @react-navigation/native @react-navigation/stack
npm install react-native-screens react-native-safe-area-context

# UI组件
npm install react-native-elements react-native-vector-icons

# 异步存储
npm install @react-native-async-storage/async-storage

# HTTP请求
npm install axios

# 二维码扫描（钱包连接用）
npm install react-native-qrcode-scanner
后端选择（Python推荐）
bash# 创建后端项目
pip install fastapi uvicorn web3 requests python-dotenv

# 数据库
pip install sqlalchemy sqlite3
🎯 MVP功能规划
第一阶段核心功能（2-4周）

钱包地址输入/扫描
多链资产查询（ETH, BSC, Polygon）
实时价格显示
总价值计算
基础收益/损失统计

第二阶段功能（4-8周）

价格图表展示
历史收益追踪
DeFi协议集成
交易历史记录

🔧 VSCode + Cursor配置建议
推荐扩展
json{
  "recommendations": [
    "ms-vscode.vscode-typescript-next",
    "bradlc.vscode-tailwindcss",
    "esbenp.prettier-vscode",
    "ms-vscode.vscode-eslint",
    "msjsdiag.vscode-react-native",
    "formulahendry.auto-rename-tag",
    "christian-kohler.path-intellisense"
  ]
}
VSCode配置文件
json// .vscode/settings.json
{
  "typescript.preferences.importModuleSpecifier": "relative",
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
📊 数据源API推荐
免费API（开发阶段）

CoinGecko API：价格数据，免费额度充足
Moralis API：多链钱包数据，有免费层
Etherscan API：以太坊数据，免费
BSCScan API：BSC数据，免费

项目结构建议
CryptoPortfolioTracker/
├── src/
│   ├── components/        # 可复用组件
│   ├── screens/          # 页面组件
│   ├── services/         # API调用
│   ├── utils/            # 工具函数
│   ├── hooks/            # 自定义hooks
│   └── types/            # TypeScript类型
├── backend/              # Python后端
│   ├── app/
│   ├── models/
│   └── api/
└── docs/                 # 项目文档
🎯 下一步行动计划

今天：搭建React Native环境，创建项目
本周：完成基础UI界面和导航
下周：集成第一个区块链API，实现基础查询
第3周：添加价格数据和图表展示
第4周：完成MVP，开始测试

💡 开发提示
使用Cursor的优势：

利用AI辅助编写Web3集成代码
快速生成样板代码和API调用
代码审查和优化建议

VSCode + React Native调试：

使用React Native Debugger
Chrome DevTools集成
热重载加速开发

想要开始的话，我建议先运行第一个命令创建项目。如果遇到任何环境配置问题，随时告诉我具体的错误信息，我会帮你解决。