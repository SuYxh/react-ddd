# 前端开发者 DDD 模式实践手册

## 🧠 什么是 DDD？

DDD（Domain-Driven Design，领域驱动设计）是一种以业务为中心的软件建模方法，强调以业务语义划分模块结构，促进复杂系统的可维护性、可扩展性和团队协作。

## 🧱 核心理念

| 概念                          | 含义                                           |
| ----------------------------- | ---------------------------------------------- |
| 领域模型                      | 映射业务概念到代码的对象（实体、值对象、服务） |
| 限界上下文（Bounded Context） | 业务逻辑的边界，一个上下文就是一个独立模块     |
| 分层架构                      | 按照 UI、应用、领域、基础设施划分职责层        |
| 通用语言                      | 所有人（开发、产品、设计）共用的业务语言       |

## 📦 推荐项目结构

```
src/
├── features/
│   └── cart/
│       ├── domain/               // 实体、值对象、领域服务
│       ├── application/          // 应用服务（状态、流程）
│       ├── infrastructure/       // API / localStorage / DB
│       └── ui/                   // React/Vue组件
├── shared/                       // 通用工具/事件/模型
└── app/                          // 应用入口
```

## 🧩 战术设计实践指南

### ✅ Entity（实体）

表示具备唯一标识的业务对象，生命周期较长。

```
class CartItem {
  constructor(public product: Product, public quantity: number) {}
  totalPrice() { return this.product.price.value * this.quantity; }
}
```

### ✅ Value Object（值对象）

没有唯一标识，通常表示属性组合。

```
class Price {
  constructor(public value: number, public currency: string) {}
  toString() { return `${this.currency}${this.value}`; }
}
```

### ✅ Domain Service（领域服务）

不属于任何实体，但又是领域中重要的行为逻辑。

```
class DiscountService {
  calculateDiscount(product: Product, level: 'vip' | 'normal'): number {
    return level === 'vip' ? product.price.value * 0.9 : product.price.value;
  }
}
```

### ✅ Application Service（应用服务）

协调各个领域对象，执行业务用例，管理状态、副作用。

```
export const useCartService = create((set, get) => ({
  items: [],
  addToCart: (product) => { ... },
  removeFromCart: (id) => { ... },
}));
```

### ✅ Repository（仓储）

管理实体的读取/保存，隐藏底层数据源（如 HTTP、localStorage）。

```
CartRepository.save(cartItems);
CartRepository.load(): CartItem[];
```

### ✅ Domain Event（领域事件）

事件驱动的业务模型响应机制，可用于消息通知、审计等。

```
EventBus.publish({ type: 'ProductAdded', payload: {...} });
```

## 🚀 开发流程建议

```
1. 识别用例（比如“添加到购物车”）
2. 建立实体和领域对象模型（Product, CartItem）
3. 封装纯业务逻辑为 Domain Service
4. 编写 Application Service，组织流程
5. 设计仓储（Repository）持久化模型
6. 接入 UI 层使用服务调用
7. 发布领域事件供外部响应
```

## ✅ 常见问题与实践建议

| 场景       | 做法                                           |
| ---------- | ---------------------------------------------- |
| 多模块协作 | 使用限界上下文隔离逻辑，每个模块独立模型和流程 |
| 状态膨胀   | 拆分为应用服务管理，组件仅消费状态             |
| 重复逻辑   | 用领域服务封装规则，聚合行为                   |
| 状态丢失   | 使用仓储持久化模型（localStorage、API）        |

## 🧠 思维模型切换

| 传统方式           | DDD 模式                  |
| ------------------ | ------------------------- |
| setState 修改数据  | 通过应用服务执行业务行为  |
| utils 管理逻辑     | 封装到模型/服务中         |
| props 链传状态     | 使用共享 service 状态管理 |
| 直接操作 JSON 数据 | 映射为实体，封装行为      |

## 📌 总结

- 从“组件驱动”转向“业务驱动”
- 明确模块边界，按业务模型划分文件
- 保持层与层之间职责清晰
- 让状态和行为有归属，逻辑更易维护

DDD 在前端不是“用不用”的问题，而是**一套思维方式**，可以帮助你更好地组织复杂业务，提升协作效率和系统可演化性。