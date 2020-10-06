import React, { useState } from 'react';

import api from '../services/api';

import SuccessIcon from '../assets/bitfy-success.png';
import PayButton from '../assets/pay-with-bitfy.png';
import LogoBitfy from '../assets/logo-bitfy.png';
import BitfyAppStore from '../assets/bitfy-app-store.png';
import BitfyPlayStore from '../assets/bitfy-play-store.png';

let interval = null;
let count = 0;

const PaymentMethod = ({ item }) => {
  const [ qrcode, setQrcode ] = useState(null);
  const [ pending, setPending ] = useState(null);
  const [ trying, setTrying ] = useState(count);
  const [ success, setSuccess ] = useState(false);

  function checkPaymentStatus(session_id) {
    console.log('Payment:', session_id);

    interval = setInterval(() => {
      count++;
      setTrying(count);

      api.get(`/checkout/session/${session_id}`)
        .then(response => {
          if (response.data.status === 'approved') {
            setSuccess(true);
            clearInterval(interval);
          }
        })
        .catch(e => {
          console.log(e);
        });

      if (count === 10) {
        clearInterval(interval);
      }
    }, 5000);
  }

  async function handleGenerateQRCODE(e) {
    e.preventDefault();

    const params = {
      cart_id: 1,
      value: 30980
    };

    setPending(true);
    
    api.post('/checkout/qrcode', params).then(response => {
      setPending(false);
      setQrcode(response.data)
      checkPaymentStatus(response.data.session_id);
    }).catch(e => {
      setPending(false);
      console.log(e);
    });
  }

  return (
    <div className={`payment-method ${item.id !== 1 ? 'disabled' : ''}`}>
      <div className="payment-method-header">
        <p className="payment-method-name">{item.name}</p>
        <span></span>
      </div>
      <div className="payment-method-content">
        <p className="payment-method-description">{item.description}</p>
        {(item.id === 1 && !qrcode) && (
          <div className="payment-method-qrcode button">
            {!pending ? (
              <a href="#" onClick={handleGenerateQRCODE}>
                <img src={PayButton} />
              </a>
            ) : (
              <div className="loader"></div>
            )}
          </div>
        )}
        {(item.id === 1 && qrcode) && (
          <div className={`payment-method-qrcode ${success ? 'success' : ''}`}>
            <p className="payment-method-description">Acesse o app da <strong>Bitfy</strong>, selecione <strong>"Pagar em Sites"</strong>,<br/>em seguida <strong>scaneie o QR code</strong>.</p>
            <div className="payment-method-qrcode-image">
              <div className="payment-method-qrcode-image-wrapper">
                <img src={qrcode.qrcode} alt="qrcode" />
                {success && <img src={SuccessIcon} alt="success" />}
              </div>
              <br/>
              {!success ? (
                <p>Aguardando pagamento... ({trying})</p>
              ) : (
                <>
                  <p className="big">Confirmado!</p>
                  <p>O pagamento foi realizado com sucesso.</p>
                </>
              )}
              {!success && (
                <a href={qrcode.deeplink} className="small-button">Abrir app da Bitfy</a>
              )}
            </div>
            {!success && (
              <div className="stores">
                <p>Ainda não temo app da Bitfy?<br/><strong>Baixe agora!</strong></p>
                <div className="stores-buttons">
                  <a href="">
                    <img src={BitfyAppStore} />
                  </a>
                  <a href="">
                    <img src={BitfyPlayStore} />
                  </a>
                </div>
              </div>
            )}
            <a href="https://bitfy.app" className="bitfy-logo">
              <img src={LogoBitfy} />
            </a>
          </div>
        )}
      </div>
    </div>
  )
};

export default PaymentMethod;
