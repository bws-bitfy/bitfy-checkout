import React from 'react';

import Cart from './components/cart';
import PaymentMethod from './components/payment-method';

import './App.css';

const methods = [
  {
    id: 1,
    name: 'Pagar com Criptomoedas',
    helper_text: '',
    description: 'Pagamentos seguro utilizando as principais criptomoedas do mercado.'
  },
  {
    id: 2,
    name: 'Cartão de Crédito',        
    helper_text: '',
    description: 'Pagamentos seguro utilizando as principais bandeiras do mercado.'
  }
];

function App() {
  return (
    <div className="container">
      <Cart/>

      <div className="cart-payment">
        <ul>
          <li><a href="?customer-data" className="disabled">01 Dados do cliente</a></li>
          <li><a href="?customer-address" className="disabled">02 Endereço de entrega</a></li>
          <li><a href="?payment">03 Pagamento</a></li>
        </ul>

        <div className="payment-methods">
          <p className="title">Selecione o método de pagamento</p>
          {methods.map(item => (
            <PaymentMethod key={item.id} item={item} />
          ))}
        </div>
      </div>

      <Cart/>
    </div>
  );
}

export default App;
