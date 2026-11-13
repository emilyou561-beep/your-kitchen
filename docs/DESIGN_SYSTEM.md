# Yoru Kitchen 设计系统

> 说明文档用中文；App 界面文字一律英文。日文只作装饰（招牌、印章），必须 `aria-hidden`，不能承载任何功能信息。
> 代码里的唯一真源：`src/styles/tokens.css`。改设计先改 token。

## 1. 风格定位

昭和复古家庭厨房：暖纸色、朱红、藏青、芥末黄；粗墨线描边 + 无模糊的"印刷错位"投影；真实食物照片做主角；文字极少。

**不要：** 渐变铺底、玻璃拟态、emoji、餐厅点餐风、樱花/灯笼等堆砌装饰、首屏教程文字。

## 2. 颜色

| Token | 值 | 用途 | 对比度 |
|---|---|---|---|
| `--yk-vermilion` | #B83227 | 主按钮、标题、缺货提示 | 纸色上 4.9:1 |
| `--yk-vermilion-dark` | #8F251C | 主按钮 hover | |
| `--yk-navy` | #234D76 | 首页背景、选中态、次级标题 | 纸色上 7.2:1 |
| `--yk-navy-deep` | #1A3A5A | 青海波底色 | |
| `--yk-navy-shadow` | #14304D | 藏青底上的错位投影 | |
| `--yk-paper` | #F5E8CD | 页面底色、冰箱门 | |
| `--yk-paper-light` | #FFFBF1 | 卡片、面板 | |
| `--yk-paper-edge` | #D8C7A2 | 虚线分隔、便签边 | 仅装饰 |
| `--yk-mustard` | #D6A642 | 焦点环、把手、选中描边、"Almost" 状态点 | 仅装饰/非文字 |
| `--yk-ink` | #28251F | 正文、描边、投影 | 纸色上 13:1 |
| `--yk-ink-soft` | #5A5246 | 次要文字 | 纸色上 6.9:1 |
| `--yk-moss` | #3F6B3A | "Ready" 状态、已拥有 | 纸色上 5.6:1 |

规则：芥末黄不做文字色；状态不能只靠颜色区分（状态徽章一定带文字）。

## 3. 字体

| 角色 | 字体 | 场景 |
|---|---|---|
| Display | Shrikhand 400 | Logo、页面标题、卡片菜名、首页问题 |
| UI | Archivo 500/600/700/800 | 导航、按钮、正文、表单 |
| 手写 | Kalam 400 | 冰箱便签（仅装饰） |
| 日文装饰 | Zen Antique | 招牌、印章、页面上方小字 |

字体通过 `@fontsource` 本地打包，离线可用，不依赖 Google 服务。

字号阶梯（rem）：13 / 15 / 17（正文）/ 22 / 28 / 40 / 首页问题 `clamp(44px → 72px)`。

## 4. 间距 · 圆角 · 投影

- 间距：4px 基准：4, 8, 12, 16, 24, 32, 48, 64, 96。
- 圆角：8（输入）、16（食材格）、28（卡片/面板）、40（冰箱门）、999（按钮）。
- 描边：3px 墨线（主要）、2px（次要控件）。
- 投影全部无模糊：按钮 `0 6px 0 ink`；卡片 `6px 8px 0 ink`；首页大块 `14px 16px 0 navy-shadow`（手机 8px 10px）。

## 5. 纹理

- 纸纹：`/images/paper-grain.png` 320px 平铺，透明度已烘焙在图里（约 15%），用于 body、页头、冰箱门。
- 遮阳棚条纹：朱红/纸色 56px 竖条（手机 32px），下接 3px 墨线。
- 青海波：SVG pattern，纸色线 45% 不透明度，仅用于首页底部。
- 首页放射光：芥末黄 `repeating-conic-gradient`，16% 不透明度，手机端隐藏。

## 6. 图片方向

- 写实照片，日式陶瓷（蓝白染付、粗陶），木桌，暖色侧光，有热气。
- 菜品居中偏左，留出右上角给装饰招牌。
- 处理方式：纸色 10–12px 相框 + 墨线 + 错位投影，轻微旋转（±1.5°）。
- 统一比例：首页 16:9.3；菜谱卡 5:3；详情页 16:10。
- 来源：Canva AI 生成（原创），或有授权的图库。禁止电视截图、商标、网图。
- 没有照片时用 `RecipeImage` 的插画占位（碗 + 菜色），绝不出现破图。

## 7. 断点

| 名称 | 宽度 | 变化 |
|---|---|---|
| Mobile | ≤ 720px | 汉堡菜单、首页照片在上冰箱门压在下方、遮阳棚变窄 |
| Tablet | 721–1100px | 首页两栏收窄 |
| Desktop | > 1100px | 完整布局，最大宽 1440（页面内容 1280） |
| 其它 | ≤ 960 | My Kitchen / 详情页单栏；≤ 520 收据行收紧 |

## 8. 组件库

| 组件 | 文件 | 要点 |
|---|---|---|
| Header（遮阳棚 + Logo + 导航） | `components/Header.tsx` | 当前页芥末下划线；数量徽章；手机汉堡菜单，Esc 关闭 |
| Button | `.yk-btn` + `--primary / --secondary / --navy / --lg / --sm` | 最小 44px 高；按下下沉 4–6px；`:disabled` 半透明 |
| Icon button | `.yk-icon-btn` | 44×44，必须有 `aria-label` |
| Fridge door（首页） | `pages/Home.tsx` | 冷冻室便签 + 冷藏门问题 + 唯一 CTA |
| Ingredient tile | `.yk-tile` | 点击加入/移除，`aria-pressed`；可拖拽 |
| Category filter | `.yk-tab` | `aria-pressed` 按钮组 |
| Inventory row | `.yk-row` | 数量步进器、单位、存放位置、删除 |
| Recipe card | `.yk-card` | 照片、状态徽章、菜名（英文/罗马音）、日文装饰、时间、缺少的必需食材、Select |
| Status badge | `.yk-status--ready / almost / shop` | 圆点 + 文字 |
| Plan bar | `.yk-planbar` | 选中菜品后出现，吸底 |
| Receipt | `.yk-receipt` | 锯齿边、等宽数字、可编辑行、打印样式 |
| Toast | `.yk-toast` | `role=status`，2.4 秒自动消失 |
| Waves | `components/Waves.tsx` | 纯装饰 |
