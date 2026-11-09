# dsh-toonflow-canvas

在 DeepSeek Harness（dsh）里内嵌 **Toonflow** 无限画布：左侧栏出现「Toonflow」图标，点开是一个整页面板，嵌入本地运行的 Toonflow 画布；顶部可填地址、连接、重载、在新窗口打开。

## 前置条件（重要）
本插件是一个**画布外壳/启动器**，本身不含 Toonflow 程序。使用前需在本机运行 Toonflow：

```bash
git clone https://github.com/HBAI-Ltd/Toonflow-app
cd Toonflow-app && bun install
# 生产模式（推荐，快）：前端构建一次
cd apps/web && bunx vite build      # 产物到 ../../build/web
# 启动单端口服务（页面+API 同端口）
cd ../server && NODE_ENV=production TOONFLOW_SERVER_PORT=6017 bun src/index.ts
```

Toonflow 是 MIT 开源项目：https://github.com/HBAI-Ltd/Toonflow-app

## 安装
- 通过插件市场/`plugin_manager install_bundle` 安装本包；
- 或本地 tarball：`plugin_manager install_bundle` 目标填该 `.tgz` 路径。

## 使用
1. 先启动 Toonflow（见上），默认地址 `http://127.0.0.1:6017`。
2. dsh 左侧点「Toonflow」→ 地址栏填 `http://127.0.0.1:6017` → 连接/重载。
3. 想用 Muse 出图/出片：需另在 Toonflow 里接入 Muse 供应商（登录态，经 muse2api 网关），与本插件无关。

## 说明
- 面板用 iframe 嵌入第三方 Toonflow 应用（因此不继承 dsh 主题）。
- 地址保存在浏览器 localStorage（键 `toonflow.canvas.url`）。

## License
MIT。Toonflow 为其作者所有（MIT）；本插件仅做嵌入，不打包其代码。
