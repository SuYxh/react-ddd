## 🧱 一、基本原则

> **平台能力是基础设施（Infrastructure）的一部分，不属于业务领域模型（Domain）本身。**

| 层级                                 | 是否可访问平台能力 | 原因                                          |
| ------------------------------------ | ------------------ | --------------------------------------------- |
| ✅ Application Layer（应用服务）      | ✅ 允许             | 需要编排平台调用和业务流程                    |
| ❌ Domain Layer（领域模型）           | ❌ 禁止             | 必须保持纯净，不依赖副作用或平台 API          |
| ✅ Infrastructure Layer（平台适配器） | ✅ 允许             | 提供具体平台能力实现（如调用微信 API）        |
| ❌ UI 层                              | ⛔ *尽量不要*       | 若业务相关，建议通过 application 封装统一逻辑 |



## 🧭 二、职责划分图

```text
+-------------------------------+
|        UI / View Layer        |   ← 展示 UI，调用应用服务
+-------------------------------+
|      Application Layer        |   ← 调用平台能力，控制业务流程
| - useScanWorkflow             |
| - useUploadWorkflow           |
+-------------------------------+
|        Domain Layer           |   ← 定义业务模型和规则，不直接调用平台能力
| - CartItem, Product, etc.     |
+-------------------------------+
|   Infrastructure / Adapter    |   ← 注册平台能力（scan/upload/camera）
+-------------------------------+
```



## ✅ 三、推荐实现模式：三层职责分离

### 1. `platformService` 接口定义（shared/platform）

```ts
export interface ScanService {
  scan(): Promise<string>;
}
export const scanService = createPlatformService<ScanService>('scanService');
```

------

### 2. 各端注册平台能力（platforms/*/platformAdapter.ts）

```ts
// PC 示例
scanService.register({
  scan: async () => {
    return window.prompt('模拟扫码结果') || '';
  },
});
```

------

### 3. 在 Application 层封装逻辑使用

```ts
// application/useScanWorkflow.ts
import { scanService } from '../../shared/platform/scanService';
import { CartItem } from '../../features/cart/domain/CartItem';

export const useScanWorkflow = () => {
  const scanAndCreateCartItem = async (): Promise<CartItem> => {
    const code = await scanService.getImpl().scan();
    return new CartItem(code, 1);
  };

  return { scanAndCreateCartItem };
};
```

------

### 4. Domain 层禁止如下操作

```ts
// ❌ 不要在 domain 层直接引用 platform service
import { scanService } from '../../shared/platform/scanService';

export class CartItem {
  static async fromScan() {
    const code = await scanService.getImpl().scan(); // 🚨 错误做法
    return new CartItem(code, 1);
  }
}
```

> ⚠️ 这将导致：
>
> - domain 无法测试（纯函数不再纯）
> - domain 与平台耦合（违背 DDD 的独立性）
> - 可复用性极差（业务逻辑变得依赖具体设备）



## 🧠 四、典型平台能力分类与处理方式

| 能力类型 | 举例                 | 正确做法（位置）                                  |
| -------- | -------------------- | ------------------------------------------------- |
| ✅ 输入类 | 扫码、拍照、定位     | 在 App 层或 Application 层调用平台能力，构造模型  |
| ✅ 文件类 | 上传图片/视频        | 在 Application 层发起上传，返回资源路径           |
| ✅ 支付类 | 微信支付、支付宝 SDK | Application 负责封装支付逻辑，传入订单对象        |
| ✅ 设备类 | 蓝牙连接、麦克风权限 | 通过 platform service 统一抽象，封装在 App 层使用 |



## ✅ 五、常见误区与最佳实践

| 常见误区                             | 正确做法                                                |
| ------------------------------------ | ------------------------------------------------------- |
| 在 Entity 中调用摄像头               | 应用服务获取照片，构建 Entity                           |
| 在 Domain 触发上传                   | 应用层 upload 完成后注入 URL                            |
| 在 UI 组件直接调用 wx.scanCode       | 封装到 useScanWorkflow.ts 中，从组件调用 useXxxWorkflow |
| Domain 使用 `window` / `wx` 全局对象 | 所有平台能力都通过 adapter 注入，统一封装               |





## 🔐 六、边界检测建议（团队协作）

| 检查点                               | 是否建议   |
| ------------------------------------ | ---------- |
|                                      |            |
| Domain 层引用 platform 模块          | ❌ 禁止     |
| Application 层引用 domain + platform | ✅ 合理     |
| UI 组件只引用 application hook       | ✅ 推荐做法 |



## 📦 七、最终总结（一图胜千言）

```text
[UI] --> [Application] --> [Domain]
           ↓
     [Platform Adapter]  ← 不允许 domain 越层直接调用
```

- ✅ Domain：负责“规则”
- ✅ Application：负责“协调”
- ✅ Platform：负责“实现”
- ❌ 任何“平台能力”不能直接渗透进 Domain！





