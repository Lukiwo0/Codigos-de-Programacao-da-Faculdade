const puppeteer = require('puppeteer');

const URL = 'http://localhost:3000';
const MIN_DELAY = 2000;
const MAX_DELAY = 8000;

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
const randomDelay = () => Math.floor(Math.random() * (MAX_DELAY - MIN_DELAY + 1)) + MIN_DELAY;

const ROUTES = ['/', '/servicos', '/barbeiros', '/historico', '/agendamento'];

// --- DADOS PARA RANDOMIZAR O DISPOSITIVO DO USUÁRIO ---
const VIEWPORTS = [
  { width: 1920, height: 1080, isMobile: false }, // Desktop Full HD
  { width: 1366, height: 768, isMobile: false },  // Notebook
  { width: 390, height: 844, isMobile: true },    // iPhone 12/13
  { width: 412, height: 915, isMobile: true },    // Android Galaxy
  { width: 820, height: 1180, isMobile: false }   // iPad Air
];

const USER_AGENTS = [
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36', // Chrome Windows
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.5 Safari/605.1.15', // Safari Mac
  'Mozilla/5.0 (iPhone; CPU iPhone OS 16_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.5 Mobile/15E148 Safari/604.1', // Safari iPhone
  'Mozilla/5.0 (Linux; Android 13; SM-S918B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36', // Chrome Android
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/114.0' // Firefox Windows
];

// Massa de dados para formulário
const NAMES = ['Carlos Eduardo', 'João Pedro Silva', 'Lucas Oliveira', 'Rafael Costa', 'Mateus Santos', 'Gabriel Almeida', 'Felipe Rocha', 'Bruno Lima', 'Diego Mendes', 'Thiago Carvalho'];
const PHONES = ['11987654321', '21911223344', '31988776655', '41977665544', '51966554433', '61955443322'];
const EMAILS = ['teste1@gmail.com', 'cliente_novo@hotmail.com', 'contato@yahoo.com', 'msantos_123@outlook.com'];

async function fillBookingForm(page) {
  try {
    console.log('   -> Iniciando fluxo de agendamento...');
    
    const clickContinuar = async () => {
      await page.evaluate(() => {
        const btns = Array.from(document.querySelectorAll('button'));
        const continuarBtn = btns.find(b => b.textContent.includes('Continuar'));
        if (continuarBtn && !continuarBtn.disabled) continuarBtn.click();
      });
      await sleep(randomDelay());
    };

    // Tentar avançar pelas 4 primeiras telas de escolha
    for (let step = 1; step <= 4; step++) {
      await page.evaluate(() => {
        const cards = Array.from(document.querySelectorAll('.grid .cursor-pointer, .grid button:not([disabled])'));
        if(cards.length > 0) cards[Math.floor(Math.random() * cards.length)].click();
      });
      await clickContinuar();
    }

    // Abandono de carrinho: 30% de chance de desistir no meio do formulário!
    if (Math.random() < 0.3) {
      console.log('   -> ⚠️ Usuário desistiu do agendamento na tela de dados (Abandono de Funil)');
      return; 
    }

    // Se não desistiu, preenche dados
    const randName = NAMES[Math.floor(Math.random() * NAMES.length)];
    const randPhone = PHONES[Math.floor(Math.random() * PHONES.length)];
    const randEmail = EMAILS[Math.floor(Math.random() * EMAILS.length)];
    
    console.log(`   -> Digitando dados reais simulados...`);
    const inputs = await page.$$('input');
    if (inputs.length >= 3) {
      await inputs[0].type(randName, { delay: Math.random() * 150 + 50 }); // Digitação variável
      await inputs[1].type(randPhone, { delay: Math.random() * 150 + 50 });
      await inputs[2].type(randEmail, { delay: Math.random() * 150 + 50 });
    }
    await clickContinuar();

    // Confirmar Agendamento
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const confirmarBtn = btns.find(b => b.textContent.includes('Confirmar'));
      if (confirmarBtn && !confirmarBtn.disabled) confirmarBtn.click();
    });
    
    await sleep(5000); // aguarda o redirect
    console.log('   ✅ Agendamento finalizado!');

  } catch (error) {
    console.log('   ❌ Falha ao processar form.');
  }
}

async function runSimulation() {
  console.log('💈 Iniciando simulador EXTREMO BarberTime...');

  while (true) {
    let browser;
    try {
      console.log('\n--- Novo Visitante ---');
      browser = await puppeteer.launch({ headless: 'new' });
      const page = await browser.newPage();
      
      // Randomiza o dispositivo (Mobile, Desktop) e o Navegador (Chrome, Firefox, Safari)
      const vp = VIEWPORTS[Math.floor(Math.random() * VIEWPORTS.length)];
      const ua = USER_AGENTS[Math.floor(Math.random() * USER_AGENTS.length)];
      await page.setViewport(vp);
      await page.setUserAgent(ua);
      
      console.log(`💻 Dispositivo: ${vp.isMobile ? 'Mobile' : 'Desktop'} | Resol: ${vp.width}x${vp.height}`);

      // Ponto de entrada aleatório
      const startRoute = ROUTES[Math.floor(Math.random() * ROUTES.length)];
      console.log(`Ponto de entrada: ${startRoute}`);
      await page.goto(`${URL}${startRoute}`, { waitUntil: 'networkidle2' });
      await sleep(randomDelay());

      // Quantidade de ações
      const actionsCount = Math.floor(Math.random() * 10) + 3;

      for (let i = 0; i < actionsCount; i++) {
        // Pausa longa de leitura
        if (Math.random() < 0.15) {
           const readTime = Math.floor(Math.random() * 15000) + 10000;
           console.log(`   [Ação ${i+1}] Usuário parado lendo a tela (${readTime/1000}s)...`);
           await sleep(readTime);
        }

        const actionType = Math.random();

        if (actionType < 0.1) {
          // Trigger de erro Dynatrace
          console.log(`   [Ação ${i+1}] Clicou no Trigger de Erro.`);
          try {
            await page.evaluate(() => {
              const errorBtn = document.querySelector('footer button');
              if (errorBtn) errorBtn.click();
            });
          } catch(e) {}
          await sleep(randomDelay());
        } 
        else if (actionType < 0.3) {
          // Scroll super aleatório para cima/baixo
          console.log(`   [Ação ${i+1}] Scroll na página...`);
          const scrollAmout = Math.floor(Math.random() * 800) - 400; // Sobe ou desce
          await page.evaluate((val) => window.scrollBy(0, val), scrollAmout);
          await sleep(randomDelay());
        }
        else {
          // Navega
          const nextRoute = ROUTES[Math.floor(Math.random() * ROUTES.length)];
          console.log(`   [Ação ${i+1}] Acessou: ${nextRoute}`);
          await page.goto(`${URL}${nextRoute}`, { waitUntil: 'networkidle2' });
          await sleep(randomDelay());
          
          if (nextRoute === '/agendamento') {
             await fillBookingForm(page);
             break; // Se fez fluxo de agendamento, encerra sessão.
          }
        }
      }

      console.log('--- Fim da Sessão ---');
      await browser.close();

      const waitTime = Math.floor(Math.random() * 8000) + 2000;
      await sleep(waitTime);

    } catch (error) {
      console.error('Erro na sessão:', error.message);
      if (browser) await browser.close();
      await sleep(3000);
    }
  }
}

runSimulation();
