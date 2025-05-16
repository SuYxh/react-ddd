# 前端开发者DDD模式实践手册

## 🧠 什么是 DDD

DDD（Domain-Driven Design，领域驱动设计）是一种以业务为中心的软件建模方法，强调以业务语义划分模块结构，促进复杂系统的可维护性、可扩展性和团队协作。



## 🧩 明确 DDD 的基本原则

| 原则                                | 解释                                                  |
| ----------------------------------- | ----------------------------------------------------- |
| **业务驱动设计**                    | 不是从 UI 或数据库出发，而是从“业务行为”建模          |
| **分层解耦**                        | 不同职责拆分到不同层：UI / 应用服务 / 领域 / 基础设施 |
| **限界上下文（Bounded Context）**   | 不同业务模块边界清晰，每个模块独立建模                |
| **通用语言（Ubiquitous Language）** | 代码中的命名应与业务专家的术语一致                    |



## 🧱 核心理念

| 概念                          | 含义                                           |
| ----------------------------- | ---------------------------------------------- |
| 领域模型                      | 映射业务概念到代码的对象（实体、值对象、服务） |
| 限界上下文（Bounded Context） | 业务逻辑的边界，一个上下文就是一个独立模块     |
| 分层架构                      | 按照 UI、应用、领域、基础设施划分职责层        |
| 通用语言                      | 所有人（开发、产品、设计）共用的业务语言       |



## 📦 推荐的目录结构模板

```
src/
├── features/                      // 每个模块是一个限界上下文
│   └── order/
│       ├── domain/               // 实体、值对象、领域服务
│       ├── application/          // 应用服务（状态、业务流程）
│       ├── infrastructure/       // 接口、持久化等
│       └── ui/                   // 组件层
├── shared/                       // 通用事件、工具、跨模块能力
└── app/                          // App入口、全局配置
```





## 🧠 每个层级怎么开发

| 层级              | 作用                         | 你应该做的事情                                          | 示例                                 |
| ----------------- | ---------------------------- | ------------------------------------------------------- | ------------------------------------ |
| `domain/`         | 表达业务概念和行为           | 建立 **Entity**、**ValueObject**、**DomainService**     | `CartItem`, `DiscountService`        |
| `application/`    | 执行业务用例，组织流程和状态 | 编写 **useXxxService()**，封装状态逻辑、发起请求        | `useCartService()`                   |
| `infrastructure/` | 与外部世界打交道             | 封装 API 请求、localStorage、DB、消息队列等             | `productApi.ts`, `CartRepository.ts` |
| `ui/`             | 呈现界面                     | 编写组件，尽量**不包含业务逻辑**，通过 service 提供数据 | `ProductList.tsx`                    |
| `shared/`         | 可复用机制                   | 管理通用事件、权限、日志等                              | `EventBus.ts`, `Toast`, `Logger`     |



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



## 🧩 开发时的一般步骤（实战流程）

```text
1. 识别用例（比如“添加到购物车”）
2. 建立实体和领域对象模型（Product, CartItem）
3. 封装纯业务逻辑为 Domain Service
4. 编写 Application Service，组织流程
5. 设计仓储（Repository）持久化模型
6. 接入 UI 层使用服务调用
7. 发布领域事件供外部响应
```



## 💡 经验建议与常见误区

| 建议                       | 说明                                                         |
| -------------------------- | ------------------------------------------------------------ |
| 从小处开始                 | 不要一开始就试图全模块 DDD，可以从复杂模块如 cart/order 下手 |
| 实体行为优先于函数工具     | 把行为封装到模型中，而不是 utils 函数堆                      |
| 领域服务保持纯净           | 不访问状态/UI，不进行副作用处理                              |
| 应用服务只协调，不编码细节 | 让 domain 去“做事”，service 只是“调度”                       |
| 把 repository 当成黑盒     | 读取/保存聚合，屏蔽底层数据细节（HTTP/本地）                 |



## ✅ 长期演化建议

| 阶段         | 你可以做的事                                         |
| ------------ | ---------------------------------------------------- |
| MVP 初期     | 1-2 个模块试水 DDD，整理术语，实践实体建模           |
| 业务复杂后   | 每个子系统一个 Bounded Context，抽出 shared 核心能力 |
| 多人协作时   | 模块自包含，职责清晰，便于多人协同开发               |
| 接入后端协同 | 前后端通用领域语言，Repository 实现对接真实接口      |
| 自动化阶段   | 可测试性提升，引入单测、领域事件追踪                 |



## 🧠 思维模式切换

| 传统思维               | DDD 思维                       |
| ---------------------- | ------------------------------ |
| 页面 = 状态 + 数据拉取 | 页面 = 用例执行 + 业务建模     |
| 状态分散在组件中       | 状态集中于 application service |
| 操作数据 = setState    | 操作行为 = 调用 service 方法   |
| 逻辑散落 utils         | 行为聚合于模型/服务中          |
| JSON 数据直接用        | 映射为实体类，封装行为         |



## 📌 总结

- 从“组件驱动”转向“业务驱动”
- 明确模块边界，按业务模型划分文件
- 保持层与层之间职责清晰
- 让状态和行为有归属，逻辑更易维护

DDD 在前端不是“用不用”的问题，而是**一套思维方式**，可以帮助你更好地组织复杂业务，提升协作效率和系统可演化性。