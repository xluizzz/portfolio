/* ====== Código JavaScript simples (puro) ======
       - Atualiza o link ativo do menu conforme o usuário rola a página
       - Implementa comportamento do formulário (visual)
       - Comentários em português explicando cada parte
    */

    // selecionar todas as seções que têm id e os links do nav
    const sections = document.querySelectorAll('main section[id]');
    const navLinks = document.querySelectorAll('nav a.nav-link');

    // Função para determinar qual seção está mais próxima do topo
    function onScroll(){
      const scrollPos = window.scrollY + 110; // compensação do header fixo
      let currentId = '';
      sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        if(scrollPos >= top && scrollPos < top + height){
          currentId = section.id;
        }
      });
      // atualiza estilo dos links
      navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + currentId));
    }
    window.addEventListener('scroll', onScroll);
    // Chamar uma vez ao carregar para marcar o item correto
    onScroll();

    // Gerencia envio do formulário apenas no front-end (simulação)
    function handleSubmit(e){
      e.preventDefault();
      const nome = document.getElementById('nome').value.trim();
      const email = document.getElementById('email').value.trim();
      const mensagem = document.getElementById('mensagem').value.trim();

      // validação simples
      if(!nome || !email || !mensagem){
        showStatus('Preencha todos os campos', true);
        return false;
      }

      // Exemplo: mostrar mensagem de sucesso (front-end). Para tornar funcional, integrar com backend.
      showStatus('Mensagem enviada com sucesso (simulação).', false);
      // limpar campos
      e.target.reset();
      return false; // evita reload
    }

    function showStatus(text, isError){
      const el = document.getElementById('form-status');
      el.textContent = text;
      el.style.color = isError ? '#ff7777' : '';
      // limpa após 5 segundos
      setTimeout(()=>{ el.textContent = ''; }, 5000);
    }

    // Melhora de acessibilidade: focar a seção quando o link for clicado (ajuda avaliador a navegar sem botão voltar)
    navLinks.forEach(a=>{
      a.addEventListener('click', (ev)=>{
        // pequena animação de rolagem suave
        ev.preventDefault();
        const href = a.getAttribute('href');
        const target = document.querySelector(href);
        if(target){
          target.scrollIntoView({behavior:'smooth', block:'start'});
          // após rolar, aplica foco para leitores de tela
          setTimeout(()=> target.focus({preventScroll:true}), 600);
        }
      });
    });