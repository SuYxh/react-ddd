import "./App.css";
import React, { useEffect } from 'react';
import { ProductList } from "./features/product/ui/ProductList";
import { CartPanel } from './features/cart/ui/CartPanel';
import { EventBus } from './shared/domain-events/EventBus';
import { PRODUCT_ADDED_TO_CART } from './shared/domain-events/ProductAddedToCart';


function App() {

  useEffect(() => {
    console.log('📢 订阅事件：商品已加入购物车');
    
    EventBus.subscribe(PRODUCT_ADDED_TO_CART, (payload) => {
      console.log('📢 事件通知：商品已加入购物车 -', payload);
    });
  }, []);

  return (
    <>
      <div style={{ padding: "20px" }}>
        <h1>📦 DDD 商品管理系统</h1>
        <ProductList />
        <CartPanel />
      </div>
    </>
  );
}

export default App;
