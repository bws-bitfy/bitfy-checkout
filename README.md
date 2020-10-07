# Bitfy Checkout - Integração

### Conteúdo

- O que é o Bitfy Checkout
- O que é preciso realizar a integração
- Como funciona
- Código de exemplo
- Assets

## O que é o Bitfy Checkout

Bitfy Checkout é a forma mais rápida e prática de você aceitar criptomoedas no seu site ou e-commerce.

## O que é preciso para realizar a integração

Para integrar o Bitfy Checkout ao seu site ou e-commerce, basta criar uma conta em https://bitfy.app e enviar os documentos da sua empresa para análise. Com os documentos aprovados você já tem acesso às chaves de integração da API.

## Como funciona

A integração do Bitfy Checkout ocorre via API Restful e é simples e de fácil implementação.

[Documentação da API (Swagger)](https://app.swaggerhub.com/apis-docs/bitfy/bitfy-checkout/1.0.0)

<br/>

O fluxo de pagamento utilizando o Bitfy Checkout deve ser:

- No momento em que o usuário escolhe pagar com Criptomoedas, um QRCODE deve ser solicitado via API.
- Uma vez que o QRCODE é exibido na tela do computador, o usuário pode ler o QRCODE diretamente pelo app da Bitfy. Caso ele esteja fazendo a compra no celular, poderá abrir o app da Bitfy tocando no botão "abrir app da Bitfy".
- Quando o usuário efetuar o pagamento, uma url de callback (cadastrada previamente no painel do Bitfy Checkout) será chamada, informando o site/e-commerce de que o pagamento foi realizado.

<br/><br/>
<img src="https://bitfy-assets.s3-sa-east-1.amazonaws.com/checkout/bitfy-checkout-bitfy.png">
<br/><br/><br/>
### Estratégias para monitoramento de pagamento

Uma vez que não existe uma comunicação direta entre a API da Bitfy e o navegador/app onde a compra está ocorrendo, será necessário usar uma estratégia para reconhecer quando um pagamento é realizado. Pensando neste cenário, temos a seguinte sugestão:

#### Polling

Uma vez que a URL de callback do site/e-commerce será chamada sempre que um pagamento for realizado, o status da compra poderá ser alterado na base de dados do site/e-commerce, e uma estratégia de ***polling*** poderá ser adotada, a fim de verificar de tempos em tempos, na API do próprio site/e-commerce, quando o status de uma compra foi alterado.

## Código de exemplo

Neste repositório está disponível uma integração de exemplo, utilizando inclusive, a estratégia de ***polling*** proposta no tópico anterior.

Lembrando que a URL que retorna o status de uma compra está disponível de forma "aberta" apenas no ambiente **Sandbox**, pois em ambiente de produção ela não funcionará de forma direta, ou seja, não poderá ser invocada diretamente pelo navegador do cliente.

### Para ver o exemplo em funcionamento, siga os passos a seguir:

Clone o repositório
```bash
git clone https://github.com/bitfyapp/bitfy-checkout.git
```

Entre na pasta do projeto e instale suas dependências
```bash
cd bitfy-checkout && yarn install
```

Renomeie o arquivo ***src/config/credentials-example.js*** para **credentials.js** e configure-o com as suas chaves de API
```javascript
export default {
  apiKey: '123',
  apiSecret: '123abc',
};
```

Rode o projeto
```bash
yarn start
```

## Assets

#### Botão "Pagar com Criptomoedas" da Bitfy
<br/>
<img src="https://bitfy-assets.s3-sa-east-1.amazonaws.com/checkout/pay-with-bitfy.png" width="300">