问题：在前端，很可能在 domain 中需要通过端能力获取数据，对吧？ 这种场景怎么处理呢？ 

> ⚠️ 在前端项目中，**domain 层是否可以访问端能力（如扫码、拍照、定位）？**



## 🧠 正确答案：**❌ 不可以，必须绕开。**

在 DDD 中，**domain 层是纯净的、平台无关的、业务驱动的模型层**。它：

- 不应该直接调用 `scanService.scan()`、`cameraService.takePhoto()` 之类的“基础设施代码”
- 不处理副作用（I/O、网络、设备能力、UI 操作）



## ✅ 那该怎么办？

> **将“调用端能力”放到 application 层，结果传入 domain 层。**

这是 DDD 中的标准模式：
 🟢 application 层协调副作用 + 平台能力
 🟦 domain 层只处理传入的结构化数据



## 📌 举例说明：扫码创建购物车项（CartItem）

### ❌ 错误做法（污染 domain 层）：

```ts
// ❌ domain/CartItem.ts
import { scanService } from '../../shared/platform/scanService';

export class CartItem {
  static async fromScan(): Promise<CartItem> {
    const code = await scanService.getImpl().scan(); // ❌ platform adapter 混入 domain
    return new CartItem(code, 1);
  }
}
```


### ✅ 正确做法（application 层调用平台能力 + 领域建模）：

```ts
// ✅ application/useScanWorkflow.ts
import { scanService } from '../../shared/platform/scanService';
import { CartItem } from '../../features/cart/domain/CartItem';

export const useScanWorkflow = () => {
  const scanAndCreateCartItem = async (): Promise<CartItem> => {
    const code = await scanService.getImpl().scan(); // 副作用
    return new CartItem(code, 1); // 构造实体
  };

  return { scanAndCreateCartItem };
};
```



## 🎯 总结角色分工

| 层级             | 职责                                           | 是否可以访问平台能力            |
| ---------------- | ---------------------------------------------- | ------------------------------- |
| `domain`         | 业务模型，纯粹建模 （字段 + 行为）             | ❌ 绝不访问平台能力              |
| `application`    | 协调服务、处理流程 （调用平台扫码 + 创建实体） | ✅ 调用平台能力，结果传入 domain |
| `infrastructure` | 接入平台 / 外部系统                            | ✅ 提供平台能力的注册与实现      |
| `ui`             | 响应用户操作                                   |                                 |



## ✅ 为什么这样设计是对的？

| 原因                 | 说明                                                         |
| -------------------- | ------------------------------------------------------------ |
| 解耦副作用与业务模型 | domain 中没有任何平台/环境依赖，容易测试、复用               |
| 可多平台复用         | PC、mobile、小程序的扫码逻辑全部被隐藏在 adapter 中          |
| 符合 DDD 职责边界    | domain 定义规则，application 组织流程，infra 提供能力        |
| 便于测试             | 你可以 mock `scanService.getImpl().scan()` 做测试，不依赖真实设备 |





## 💡 实战技巧：如果 domain 层需要端能力，通常是设计错位，应重构为：

- 将数据**在 application 层先准备好**
- 再通过构造函数 / 工厂方法注入 domain



## ✅ 延伸建议：工厂模式 + DTO

可通过 application 层封装 `CartItemFactory.createFromScan()`，保持 domain 的纯粹性：

```ts
// application/factories/CartItemFactory.ts
export class CartItemFactory {
  static async createFromScan(): Promise<CartItem> {
    const code = await scanService.getImpl().scan();
    return new CartItem(code, 1);
  }
}
```



## 📌 结语

**DDD 中，domain 层的“干净”是系统可维护性的关键。**
平台能力是基础设施，必须通过 application 服务层注入，而不能“上穿”到 domain。


