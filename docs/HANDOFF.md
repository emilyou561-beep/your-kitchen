# 交接说明（给 Codex）

> 说明用中文；代码、注释、界面文案保持英文。

## 现状

可运行的本地 MVP：Vite + React 19 + TypeScript + react-router。五个页面和完整流程都已实现，见 `docs/PAGE_SPECIFICATIONS.md`。
没有后端、账号、付费 API、部署。数据存在 localStorage。

```bash
npm install
npm run dev      # http://localhost:5180
npm run build    # 类型检查 + 打包
npm test         # 单元测试（vitest，23 个）
```

## 目录

```
src/
  styles/tokens.css      设计 token（唯一真源）
  index.css              全局样式 + 通用组件
  data/ingredients.ts    食材表（英文名/罗马音/别名/默认单位与位置）
  data/recipeTypes.ts    菜谱类型（kind / 汤底 / 插画参数 / 两条路线）
  data/ramen.ts          拉面目录 + Ramen Basics
  data/recipes.ts        配菜 + 汇总导出
  lib/units.ts           单位换算与取整
  lib/match.ts           可做程度计算（按数量）与排序
  lib/grocery.ts         购物清单汇总（跨菜品合并、扣库存）
  lib/logic.test.ts      单元测试
  state/KitchenContext   全局状态 + localStorage
  components/            Header, Icons, Waves, RecipeImage
  pages/                 Home, MyKitchen, Recipes, RecipeDetail, GroceryList（各带 .css）
public/images/           照片和纸纹
docs/                    设计规格（中文）
```

## 待办（按优先级）

**P0**
1. 替换首页主图：`public/images/hero-nikujaga.jpg` 目前是参考图裁切的低分辨率占位，需要换成 Canva 生成的高清图（≥ 2400px 宽，导出后压缩到 < 400KB 的 JPG/WebP）。
2. 为其余 9 道菜补照片，放 `public/images/<recipe-id>.jpg`，并在 `data/recipes.ts` 填 `image` 字段。
3. ~~单元测试~~ 已完成（`src/lib/logic.test.ts`）。补充：React 组件测试（Testing Library）。

**P1**
4. Playwright 截图测试：按 `VISUAL_QA.md` 的四个尺寸自动截图。
5. axe 可访问性自动检查，0 个 serious/critical。
6. 收据锯齿边在 Safari 下检查 `mask` 兼容性。

**P2**
7. 当前 109 种食材；41 种拉面（多数有快速版 + 正宗版）、11 个拉面基础组件、27 道配菜（见 docs/RAMEN_SOURCES.md）。继续扩充时保持 essential 标注准确，测试会自动检查食材 id 是否存在、界面文字是否为英文。
8. 收据清单可按超市区域分组（蔬菜/肉/调料）。

## 规则

- 不改视觉方向；需要改时先问 Emily。
- Claude 负责设计规格和视觉验收；Codex 负责实现和测试。不要同时编辑同一个文件。
- 新文案必须是英文，日文只能装饰并 `aria-hidden`。
- 新颜色、字号、间距先加到 `tokens.css`。
