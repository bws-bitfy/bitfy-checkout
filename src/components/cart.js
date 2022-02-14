import React from 'react';

import itemBag from '../assets/bag.png';
import itemWatch from '../assets/watch.png';

const Cart = () => {
  const items = [
    {
      id: 1,
      name: 'Bolsa leve para Notebook',
      price: 7.90,
      image: itemBag
    },
    {
      id: 2,
      name: 'Smart Watch a prova d\'agua',
      price: 4.90,
      image: itemWatch
    },
  ];

  return (
    <div className="cart-items">
      <p className="title">Itens no carrinho</p>
      {items.map(item => (
        <div className="cart-item" key={item.id}>
          <div className="cart-item-image">
            <img src={item.image} alt={item.name} />
          </div>
          <div className="cart-item-description">
            <p className="text-gray">{item.name}</p>
            <p className="text-gray">R$ {item.price}</p>
          </div>
        </div>
      ))}
      <div className="cart-items-values">
        <p className="text-gray">
          <strong>Sub Total</strong>
          <span>R$ 12.80</span>
        </p>
        <p className="text-gray">
          <strong>Taxa de entrega</strong>
          <span>R$ 3.00</span>
        </p>
        <hr />
        <p className="black">
          <strong>Total</strong>
          <span>R$ 15.80</span>
        </p>
      </div>
    </div>
  )
};

export default Cart;
