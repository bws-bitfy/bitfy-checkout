# Bitfy Checkout - Integração

### Conteúdo

- O que é o Bitfy Checkout
- O que é preciso realizar a integração
- Como funciona
- Código de exemplo

## O que é o Bitfy Checkout

Bitfy Checkout é a forma mais rápida e prática de você aceitar criptomoedas no seu site ou e-commerce.

## O que é preciso realizar a integração

Para integrar o Bitfy Checkout ao seu site ou e-commerce, basta criar uma conta em https://bitfy.app e enviar os docuentos da sua empresa para análise. Com os documentos aprovados você já tem acesso aos chaves de integração da API.

## Como funciona

A integração do Bitfy Checkout ocorre via API Restful e é simples e de fácil implementação.

O fluxo de pagamento utilizando o Bitfy Checkout deve ser:

- No momento em que o usuário escolhe pagar com Criptomoedas, um QRCODE deve ser solicitado via API
- Uma vez que o QRCODE é exibido na tela, o usuário pode ler o QRCODE diretamente pelo app da Bitfy, ou caso ele já esteja no celular, pode abrir o app da Bitfy diretamente.
- Quando o usuário efetuar o pagamento, uma url de callback (cadastrada previamente no painel do Bitfy Checkout) será chamada, informando o site/e-commerce de que o pagamento foi realizado

### Estratégias para monitoramento de pagamento

Uma vez que não existe uma comunicação direta entre a API da Bitfy e o navegador/app onde a compra está ocorrendo, será necessário uma estratégia para reconhecer quando um pagamento é realizado. Pensando neste cenário, temos a seguinte sugestão:

#### Pooling

Uma vez que a URL de callback do site/e-commerce será chamada sempre que um pagamento for realizado, o status da compra poderá ser alterado na base de dados do site/e-commerce, e uma estratégia de ***pooling*** poderá ser adotada, afim de verificar de tempos em tempos, na API do próprio site/e-commerce, quando o status de uma compra foi alterado.

## Como funciona

Neste repositório está disponível uma integração de exemplo, utilizando inclusive, a estratégia de ***pooling*** proposta no tópico anterior.

Lembrando que a URL que retorna o status de uma compra, está disponível de forma "aberta" apenas no ambiente **Sandbox**, pois em ambiente de produção ela não funcionará de forma direta, ou seja, não poderá ser invocada diretamente pelo navegador do cliente.

### Para ver o exemplo em funcionamento, siga os passos a seguir:

Clone o repositório
```bash
git clone https://github.com/bitfyapp/bitfy-checkout.git
```

Entre na pasta do projeto e instale suas dependências
```bash
cd bitfy-checkout && yarn install
```

Configure o arquivo src/config/credentials.js com as suas chaves de API
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
