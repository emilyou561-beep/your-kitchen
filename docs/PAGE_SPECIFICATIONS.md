# 页面规格

路由：`/` 首页 · `/kitchen` My Kitchen · `/recipes` 菜谱 · `/recipes/:id` 详情 · `/list` 购物清单。
所有页面共用 Header（遮阳棚条纹 + Logo + 3 个导航）。界面文字英文，下方引号内为实际文案。

---

## 1. 首页 `/`

**目标：** 3 秒内明白只有一件事要做——加食材。

**首屏文字全部清单（不得增加）：** Logo "Yoru Kitchen"、导航 3 项、问题 "What's in your fridge?"、按钮 "Add Ingredients"、便签 "egg · tofu · scallion"、照片标签 "Nikujaga"。

### 桌面（≥1101px）
- 背景藏青 + 纸纹 + 右上芥末放射光。
- 两栏 grid：左 400–520px 冰箱门；右侧照片卡，向左压 24px 叠在冰箱门下层。
- 冰箱门：冷冻室 168px（便签 + "夜"磁铁 + 短把手）；冷藏门：问题 72px Shrikhand 朱红 → 芥末下划线 → 主按钮 72px 高。
- 照片卡：纸色边框 12px，旋转 1.4°，右下"Nikujaga"朱红标签。
- 底部青海波 130px。
- 首屏高度 = 视口高度，不需要滚动。

### 手机（≤720px）
- 顺序：照片（250px 高，全宽）→ 冰箱门（上移 40px 压住照片）→ 青海波 96px。
- 冰箱门四周 18px 边距；按钮全宽 60px 高。
- 放射光隐藏；≤360px 隐藏"夜"磁铁。

### 动态
- 已有食材时，便签显示用户前 3 个食材名，让冰箱"活起来"。

---

## 2. My Kitchen `/kitchen`

**目标：** 最快地把家里的食材录进去。

- 页头：日文装饰"冷蔵庫" + 标题 "My Kitchen" + 右侧 "See Recipes →"（没有食材时禁用）。
- 桌面两栏（1.15 : 1）；≤960px 单栏，食材市场在上。

### 左：食材市场
1. 搜索框 "Search ingredients"（英文名、罗马音、别名都能搜，如 negi / scallion / green onion）。
2. 分类按钮（搜索时隐藏）：Vegetables / Meat & Fish / Tofu & Eggs / Rice & Noodles / Seasonings / Extras。
3. 食材格（自适应列，最小 150px）：英文名 + 罗马音小字 + 右侧 ⊕。已拥有：藏青底 + 芥末 ✓，再点一次移除。
4. 无结果："No match for "…". Try another name, like "negi" or "scallion"."

### 右：In your kitchen（桌面吸顶）
- 标题 + 数量徽章。
- 按 Fridge / Freezer / Pantry 分组。
- 每行：名称（第一行）；步进器（− 数量 +）、单位下拉、存放位置下拉（第二行）；右侧删除。
- 空状态："Your fridge is empty" / "Tap an ingredient to add it."
- 拖拽时虚线芥末描边提示可放下。

---

## 3. 菜谱 `/recipes`

- 页头："献立" + "Recipes" + 筛选 All / Ready / Almost（带数量）。
- 无食材时提示："Add ingredients to see what you can cook right now."
- 卡片网格（最小 280px）。排序：Ready → Almost → Needs shopping；同级按缺少数、已有数、时间。
- 卡片：照片 5:3 → 状态徽章骑在照片下沿 → 菜名（Shrikhand）+ 日文装饰 → ⏱ 分钟 → "Missing: …"（朱红标签）或 "You have every essential." → Select / Selected 按钮。
- 整张卡可点进详情；Select 按钮在链接层之上。
- 选中卡片：芥末外描边。
- 选中 ≥1 道菜时出现吸底条："N dishes selected" + "Make Grocery List →"。

### 状态规则
- 每个菜谱食材分 essential / optional。
- Ready = 必需食材全有；Almost = 缺 1–2 个必需；Needs shopping = 缺 3 个以上。
- 可选食材永远不影响状态。

---

## 4. 菜谱详情 `/recipes/:id`

- "← All recipes" 返回。
- 桌面两栏：左照片（相框旋转 −1°，状态徽章）；右：日文装饰、菜名、一句介绍、⏱ 时间 · 人份、按钮（Select dish / Add missing to list →）。
- 下方两栏：Ingredients 面板（✓ 已有 / 空框 缺少；缺少的加粗，右侧 ⊕ "I have this"）；Steps（朱红圆形序号）。
- ≤860px 全部单栏。
- 找不到菜谱："Recipe not found" + 返回按钮。

---

## 5. 购物清单 `/list`

- 页头："買い物" + "Grocery List" + Print / Clear checked。
- 收据：上下锯齿边、店名"YORU KITCHEN"、日文装饰、日期 → "For: 菜名…" → 条目 → 添加输入框 → "Items left N" → 日文"谢谢惠顾"装饰。
- 每行：复选框 · 名称（可编辑，下方小字显示来自哪道菜）· 点线 · 数量 · 单位 · 删除。勾选后划线变灰。
- 同一食材多道菜需要时合并，单位相同则数量相加。
- 重新生成清单时保留手动添加项和已勾选状态。
- 空状态："Your list is empty" / "Select dishes and we'll list what's missing." + "Browse Recipes"。
- 打印：隐藏页头、按钮、删除键、输入框，白底。

---

## 通用状态

| 状态 | 处理 |
|---|---|
| 空 | 每页都有专门空状态 + 下一步按钮 |
| 加载 | 当前数据全在本地，无网络加载；照片 `loading="lazy"`，未加载前显示藏青底色 |
| 错误 | 本地存储不可用时静默回退到内存；未知路由回首页；未知菜谱显示 not found |
