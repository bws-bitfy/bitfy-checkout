import React, { useState } from 'react';

import api from '../services/api';

import SuccessIcon from '../assets/bitfy-success.png';
import PayButton from '../assets/pay-with-bitfy.png';
import LogoBitfy from '../assets/logo-bitfy.png';
import BitfyAppStore from '../assets/bitfy-app-store.png';
import BitfyPlayStore from '../assets/bitfy-play-store.png';

let interval = null;
let count = 0;
let countLimit = 30;

const PaymentMethod = ({ item }) => {
  const [qrcode, setQrcode] = useState(null);
  const [pending, setPending] = useState(null);
  const [trying, setTrying] = useState(count);
  const [success, setSuccess] = useState(false);

  function checkPaymentStatus(session_id) {
    console.log('Payment:', session_id);

    interval = setInterval(() => {
      count++;
      setTrying(count);

      api.get(`/checkout/payment/${session_id}`)
        .then(response => {
          if (response.data.status === 'payment-in-process') {
            setSuccess(true);
            clearInterval(interval);
          }
        })
        .catch(e => {
          console.log(e);
        });

      if (count === countLimit) {
        clearInterval(interval);
      }
    }, 5000);
  }

  async function handleGenerateQRCODE(e) {
    e.preventDefault();

    /**
     * cart_id - Seu número de identificação do carrinho ou compra
     * value - Valor da compra em "centavos"
     */
    const params = {
      cart_id: 1,
      value: 1580
    };

    setPending(true);

    api.post('/checkout/payment', params).then(response => {
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
              <a href="?button" onClick={handleGenerateQRCODE}>
                <img src={PayButton} alt="Generate QRCODE" />
              </a>
            ) : (
              <div className="loader"></div>
            )}
          </div>
        )}
        {(item.id === 1 && qrcode) && (
          <div className={`payment-method-qrcode ${success ? 'success' : ''}`}>
            <p className="payment-method-description">Acesse o app da <strong>Bitfy</strong>, selecione <strong>"Pagar em Sites"</strong>,<br />em seguida <strong>scaneie o QR code</strong>.</p>
            <div className="payment-method-qrcode-image">
              <div className="payment-method-qrcode-image-wrapper">
                <img src={qrcode.qrcode} alt="qrcode" />
                {success && <img src={SuccessIcon} alt="success" />}
              </div>
              <br />
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
                <p>Ainda não temo app da Bitfy?<br /><strong>Baixe agora!</strong></p>
                <div className="stores-buttons">
                  <a href="https://apps.apple.com/us/app/bitfy-a-carteira-de-bitcoin/id1483269793">
                    <img src={BitfyAppStore} alt="Bitfy on App Store" />
                  </a>
                  <a href="https://play.google.com/store/apps/details?id=com.bitfyapp&hl=pt_BR">
                    <img src={BitfyPlayStore} alt="Bitfy on Play Store" />
                  </a>
                </div>
              </div>
            )}
            <a href="https://bitfy.app" className="bitfy-logo">
              <img src={LogoBitfy} alt="Bitfy logo" />
            </a>
          </div>
        )}
      </div>
    </div>
  )
};

export default PaymentMethod;
