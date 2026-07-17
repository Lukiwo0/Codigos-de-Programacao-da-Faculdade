# 💈 BarberTime - Plataforma Frontend com Foco em Observabilidade (Dynatrace)

Bem-vindo ao **BarberTime**! Este projeto é uma simulação de um sistema de agendamentos moderno para uma barbearia premium. 

Ele foi desenvolvido **inteiramente no frontend** utilizando **Next.js (App Router), React, TypeScript e Tailwind CSS**. Não existe banco de dados real nem backend físico; todos os dados são mockados (falsos) ou utilizam o `localStorage` do navegador para simular a persistência de dados.

O **grande diferencial** deste projeto é que ele foi arquitetado desde o princípio para ser uma ferramenta de teste e validação de observabilidade e monitoramento usando o **Dynatrace (RUM - Real User Monitoring)**.

---

## 🎯 Qual é o objetivo deste projeto?

Quando estamos configurando painéis, alertas e monitoramento de experiência de usuário no Dynatrace, precisamos de uma aplicação que gere tráfego "sujo" e realista. Uma aplicação perfeitamente rápida e sem erros não permite testar gráficos de falhas ou métricas de frustração do usuário.

Por isso, o **BarberTime simula comportamentos reais de um sistema em produção sob estresse**, incluindo:
- Lentidão em requisições de rede (latência).
- Quedas de API e falhas de comunicação.
- Erros de JavaScript no lado do cliente.
- Fluxos longos de cliques (User Actions) em formulários multi-etapas.
- Navegação entre páginas Single Page Application (SPA).

---

## 📊 Cenários de Observabilidade (Dynatrace) Implementados

Abaixo, detalhamos exatamente o que a aplicação faz por baixo dos panos para alimentar o Dynatrace com métricas ricas:

### 1. Atrasos de Rede (Network Delays) e Percepção de Performance
O Dynatrace mede o tempo que uma página leva para ficar interativa (LCP - Largest Contentful Paint, Time to Interactive, etc). Para simular servidores lentos ou instabilidade de rede:
- **Página de Serviços (`/servicos`):** Possui um *delay* artificial (usando `setTimeout`) randomizado entre **2 a 4 segundos** toda vez que é carregada. Isso é extremamente útil para testar a percepção de performance da aplicação. No Dynatrace, você verá que o tempo de carregamento da ação de usuário nessa tela será alto, permitindo que você configure e teste alertas de degradação de performance (Ex: "Avisar se o carregamento da lista de serviços passar de 3 segundos").
- **Finalização do Agendamento (`/agendamento`):** Ao clicar em "Confirmar Agendamento", a tela fica bloqueada em "Loading" por 1,5 a 3,5 segundos, simulando um POST pesado para o backend antes do redirecionamento de sucesso.

### 2. Simulação de Falhas e Disponibilidade (Error Rate)
Nem toda requisição dá certo na vida real. O Dynatrace rastreia a taxa de sucesso das chamadas XHR/Fetch.
- **Roleta Russa na Página de Barbeiros (`/barbeiros`):** Quando o usuário acessa a lista de profissionais, o código rola um dado virtual. Existe **20% de chance** da requisição "falhar" de propósito. Quando isso acontece, um log de erro é disparado no console e a interface exibe uma mensagem de *"Servidor demorando para responder"*, junto com um botão de "Tentar Novamente". 
- **O que isso gera no Dynatrace:** Isso vai causar picos no gráfico de "JavaScript/Ajax Errors" e diminuir o Apdex (índice de satisfação do usuário), permitindo que você teste a criação de dashboards de taxa de erro de API.

### 3. JavaScript Exceptions Clássicas
Erros de código que quebram a interface ou fluxos ocultos.
- **Botão Oculto no Footer:** No rodapé de todas as páginas do site, existe um pequeno texto invisível/cinza escrito `[Observability: Trigger Error]`. Ao clicar neste texto, a aplicação intencionalmente lança um `throw new Error('Dynatrace Observability Test...')`.
- **O que isso gera no Dynatrace:** Vai capturar imediatamente uma *Unhandled Exception* no navegador do usuário, coletando o Stack Trace, o sistema operacional e o navegador de onde o clique partiu.

### 4. User Actions e Comportamento (User Journey)
Para testar como o Dynatrace agrupa cliques em sessões de usuários contínuas:
- **Formulário Multi-etapas:** A tela de `/agendamento` é propositalmente dividida em 6 passos (Escolha de Serviço > Profissional > Data > Hora > Dados Pessoais > Resumo). Isso obriga o usuário a fazer dezenas de interações (cliques em cards, digitação em inputs, botões de avançar/voltar). O Dynatrace vai capturar isso como dezenas de *User Actions* individuais amarradas a uma única *User Session*.
- **Transições SPA:** O Next.js usa roteamento no cliente. A transição entre as páginas (Home -> Serviços -> Histórico) testa a habilidade do agente RUM do Dynatrace de injetar métricas sem recarregar o navegador.

---

## 🛠 Tecnologias Utilizadas

- **[Next.js (App Router)](https://nextjs.org/)** v15+ - Framework React utilizado.
- **React** - Biblioteca de construção de interface.
- **TypeScript** - Tipagem estática para evitar bugs não intencionais.
- **Tailwind CSS v4** - Estilização moderna, utilitária e focada em Dark Mode.
- **Lucide React** - Biblioteca de ícones SVG leves.

---

## ⚙️ Como Configurar e Rodar o Projeto

### Pré-requisitos
- **Node.js** (versão 18 ou superior).

### Instalação
1. Clone ou baixe este repositório para o seu computador.
2. Abra o terminal na raiz do projeto.
3. Instale as dependências executando:
   ```bash
   npm install
   ```

### Executando em Desenvolvimento
1. Para iniciar o servidor local, execute:
   ```bash
   npm run dev
   ```
2. Abra o seu navegador no endereço: [http://localhost:3000](http://localhost:3000)

*(Nota: Se houver lentidão na compilação em discos secundários, recomenda-se desativar o Turbopack alterando o script de dev no `package.json` para `"next dev --no-turbo"` ou mover o projeto para o seu SSD principal)*.

---

## 🔌 Injetando o Dynatrace OneAgent (RUM)

Para que a mágica da observabilidade funcione, você precisa colocar o código de monitoramento do Dynatrace no projeto:

1. Acesse o seu painel do Dynatrace.
2. Crie uma aplicação Web (Frontend).
3. Copie o script HTML fornecido pelo Dynatrace.
4. No código do BarberTime, abra o arquivo `src/app/layout.tsx`.
5. Localize a tag `<head>` e cole o seu script logo abaixo do comentário reservado. Ficará parecido com isso:

```tsx
<head>
  {/* DYNATRACE SCRIPT PLACEHOLDER */}
  <script type="text/javascript" src="https://<SEU_INQUILINO>.live.dynatrace.com/jstag/..." async></script>
</head>
```

6. Salve o arquivo. O Next.js fará o reload automático e as sessões já começarão a ser enviadas para a sua nuvem do Dynatrace!

---

## 🤖 Simulação Automática de Tráfego (Puppeteer)

Para não precisar clicar manualmente no site o tempo todo e gerar uma boa massa de dados para o Dynatrace, você pode rodar o simulador automático incluso no projeto.

1. Instale o Puppeteer (ele vai baixar um navegador invisível):
   ```bash
   npm install puppeteer
   ```
2. Mantenha o seu site rodando em um terminal (`npm run dev`).
3. Abra um **segundo terminal** na raiz do projeto e execute:
   ```bash
   node simulate-traffic.js
   ```
4. O script vai começar a navegar sozinho pelo site, clicar nos botões, simular a lentidão e gerar os erros de JavaScript de forma contínua e aleatória. Deixe rodando por algumas horas para popular o seu Dashboard!

---
*Desenvolvido focado em qualidade visual premium e monitoramento avançado de UX.*
