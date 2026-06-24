# AGENTS.md

## 项目概览
校园模拟养成主游戏 + 内嵌钓鱼/跑酷小游戏的纯前端项目。原生 HTML/CSS/JS，无构建步骤，使用 ES Module。

## 目录结构
```
index.html         - 主游戏入口（校园模拟养成）
diaoyu-B.html      - 钓鱼小游戏（iframe 内嵌）
rungame.html       - 跑酷小游戏（iframe 内嵌）
config.js          - 主游戏配置（角色、物品、背景图等）
main.js            - 主游戏引擎（事件处理、商店、跑酷/钓鱼结果接收）
scenes.js          - 主游戏场景（校园、教室、图书馆等）
state.js           - 主游戏状态管理
storylines.js      - 主游戏剧情线
ui.js              - 主游戏 UI 渲染
images/fish/       - 9种十字绣风格鱼图片 (fish1.jpg ~ fish9.jpg)
images/avatar/     - 角色头像及男高中生图片 (boy.jpg)
```

## 技术栈
- 纯原生 HTML5 + CSS3 + JavaScript (ES Module)
- Canvas 2D 渲染（钓鱼小游戏）
- 无构建工具，Python SimpleHTTPServer 直接服务
- Google Fonts: ZCOOL KuaiLe

## 核心机制（钓鱼小游戏 diaoyu-B.html）
- 27条鱼：9种类型(fish1~fish9)，每种3条(小/中/大)
- 鱼在水中 X/Y 轴随机运动模拟真鱼行为
- 抛竿 → 鱼上钩 → 拉鱼（力度条 QTE）
- 限时 180 秒
- 金币：小鱼10、中鱼50、大鱼200
- 连续5次未中鱼线断裂
- 通过 postMessage 向主游戏回传结果

## 构建与运行
- 开发：`python -m http.server ${DEPLOY_RUN_PORT} --bind 0.0.0.0`
- 无需构建步骤

## 代码风格
- 中文注释
- 缩进：2空格（HTML/CSS）、4空格（JS）
- 驼峰命名
