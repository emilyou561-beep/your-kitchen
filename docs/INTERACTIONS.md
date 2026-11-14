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

### 按数量判断
- 不只看"有没有"，还看"够不够"：家里 1 个鸡蛋、菜谱要 3 个 → 显示 "Egg (2 pc more)"，并按缺少的数量进购物清单。
- 同类单位自动换算：g ↔ kg，ml ↔ L ↔ tbsp(15ml) ↔ tsp(5ml)。不同类单位（如 g 对 tbsp）无法比较时，视为够用，不误报。
- 数量为 0 视为没有。
- 鸡蛋、包、把这类整件单位，购买数量向上取整。

### 其他
- "Pantry basics" 一键加入 8 样常备调料和米（已有的跳过），可撤销。
- 删除食材、清空厨房、删除清单条目、清除已勾选：都会出现带 **Undo** 的提示，6 秒内可撤销。

## 3. 菜谱与清单

- 菜谱页：搜索框（匹配菜名、简介、食材名）+ 时间筛选（不限 / ≤15 / ≤30 分钟）+ 状态筛选；无结果时提供 "Clear filters"。
- 详情页：份量步进器（1–12 人份），所有用量、缺少数量、购物清单按份量同步缩放；份量会被记住。
- 购物清单汇总规则：先把所有选中菜品的需求**相加**，再和库存比一次（两道菜各要 2 个蛋、家里有 3 个 → 买 1 个）。
- 清单页 "Include optional ingredients" 勾选后点 "Update from recipes" 把可选食材也加进来；手动添加的条目和已勾选状态在更新后保留。
- 勾选买到的食材后点 "Put bought items in My Kitchen"：按清单数量加进库存（同类单位会合并），并从清单移除。
- "Copy" 把清单复制成纯文本，方便粘贴到备忘录或聊天里。


- Select 是开关按钮（`aria-pressed`）。
- 详情页 "Add missing to list" = 自动选中该菜 + 生成清单 + 跳转清单页。
- 详情页缺少食材旁 ⊕ = "I have this"，直接加入库存，状态即时更新。
- 生成清单只放**必需且缺少**的食材；toast 告知数量，或 "You have everything you need"。

## 4. 触感交互（第一批）

| 位置 | 交互 | 实现 |
|---|---|---|
| My Kitchen 食材格 | 点击加入：格子先压下再弹起；一个芥末色小标签沿弧线**飞进右侧冰箱面板**（手机上冰箱在下方看不到时飞向顶部 My Kitchen 导航）；落地时冰箱面板轻晃、数字弹跳；安卓手机轻震 10ms | `lib/tactile.ts` 的 `flyTo / replay / buzz`；Web Animations API |
| 菜谱卡 / 详情页 | 能直接做的菜，卡片滚进视野时**"啪"地盖上红色印章**（可 / READY），前 6 张依次错开 | `components/Stamp.tsx`；IntersectionObserver |
| 购物清单 | 进入页面或"Update from recipes"时，小票从顶部的**打印机出纸口一格一格打出来** | `.yk-printing`，`steps(16)` |
| 购物清单 | 勾选条目：一笔**手写红色划线**画过名字 | `Strike` SVG，stroke-dashoffset 动画 |
| 购物清单 | 有已勾选条目时，小票底部出现**可撕下的存根**："N bought — Pull down to tear off & put away"。往下拖超过 60px 就撕下飞走，已买的食材放进 My Kitchen、手动条目一并清掉，可撤销。键盘或点击（Enter / 空格 / 单击）同样能撕 | `components/TearStub.tsx`；Pointer Events |

全部遵守 `prefers-reduced-motion`：开启后不飞、不晃、不盖章动画，结果直接出现。

### 活的照片（LivePhoto）
- 有照片的拉面（`public/images/ramen/<id>.jpg`）自动启用：汤面轻微荡漾（SVG 噪声 + 位移，只作用在汤的椭圆区域内）、一道光泽缓慢滑过汤面、碗上方升起热气、鼠标移动时整张照片朝鼠标方向轻微倾斜并有高光。
- 详情页持续播放；菜单木牌上只在鼠标悬停或键盘聚焦时播放，节省性能；滚出屏幕自动暂停。
- 汤不在画面中央的照片，可在 `src/data/photoSoup.ts` 给这张图单独设汤的位置。
- 开启「减少动态效果」时全部关闭，只显示静态照片。

## 5. 动效

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
