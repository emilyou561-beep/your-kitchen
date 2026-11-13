# 交互规格

## 1. 核心流程

首页 "Add Ingredients" → My Kitchen 点击/搜索/拖拽加入食材 → "See Recipes" → 菜谱按可做程度排序 → Select 选菜 → "Make Grocery List" → 收据清单里编辑、勾选、打印。

数据保存在浏览器 localStorage（键 `yoru-kitchen:v1`），刷新不丢；存储不可用时退回内存。没有账号、没有服务器。

## 2. 加入 / 移除食材

| 动作 | 结果 |
|---|---|
| 点击未拥有的食材格 | 按默认数量/单位/位置加入；格子变藏青 + ✓；toast "Potato added" |
| 再点已拥有的格子 | 移除；toast "Potato removed" |
| 拖拽食材格到右侧面板 | 面板芥末虚线高亮，放下即加入（增强功能，点击永远可用） |
| 步进器 −/+ | 数量 ±1，最小 0 |
| 直接输入数量 | 接受小数，负数归 0 |
| 改单位 / 位置 | 立即生效；改位置后条目移到对应分组 |
| 删除按钮 | 移除该行 + toast |

## 3. 菜谱与清单

- Select 是开关按钮（`aria-pressed`）。
- 详情页 "Add missing to list" = 自动选中该菜 + 生成清单 + 跳转清单页。
- 详情页缺少食材旁 ⊕ = "I have this"，直接加入库存，状态即时更新。
- 生成清单只放**必需且缺少**的食材；toast 告知数量，或 "You have everything you need"。

## 4. 动效

| 元素 | 动效 | 时长 |
|---|---|---|
| 按钮 | hover 下沉 1–2px，按下下沉到底（投影归零） | 120ms |
| 食材格 | 同上，幅度更小 | 120ms |
| 菜谱卡 | hover 上浮 3px，投影加深 | 220ms |
| Toast | 从下方淡入上升 | 220ms |

缓动曲线 `cubic-bezier(0.2, 0.7, 0.2, 1)`。不做页面转场、视差、自动播放。

**减少动态效果**（`prefers-reduced-motion: reduce`）：所有过渡和动画时长归零，位置变化直接完成；不影响任何功能。

## 5. 键盘与焦点

- 每页第一个 Tab 是 "Skip to content"，跳到 `#main`。
- 焦点环：3px 芥末黄实线，偏移 3px，所有可交互元素一致。
- Tab 顺序与视觉顺序一致：Logo → 导航 → 页面主操作 → 内容。
- 手机菜单：按钮 `aria-expanded`；Esc 关闭；切换路由自动关闭。
- 食材格、分类、Select 都是原生 `<button>`；Enter/Space 触发。
- 收据：Tab 依次经过 复选框 → 名称 → 数量 → 单位 → 删除；添加框回车提交。
- 路由切换后滚动到顶部。

## 6. 屏幕阅读器

- 日文文字全部 `aria-hidden`。
- 图标按钮必须有 `aria-label`（如 "Remove Potato"、"Less Egg"）。
- 食材格附带隐藏说明 ", press to add." / ", in your kitchen. Press to remove."
- Toast 和 "Items left" 用 `aria-live="polite"`。
- 照片有描述性 alt；占位插画 `role="img"` + "(photo coming soon)"。

## 7. 响应式

- 触控目标 ≥ 44×44（手机菜单 48）。
- 手机导航收进汉堡菜单，展开后每项 52px 高。
- 详见 PAGE_SPECIFICATIONS.md 各页断点。
