#  Twister Web: Jogo Interativo em JavaScript

Projeto desenvolvido para demonstrar manipulação do DOM, manipulação de CSS por JS, controle de estado e validação de formulários no front-end.

##  Sobre o Projeto
O **Twister Web** traz a experiência do clássico jogo de tabuleiro para os navegadores. O sistema permite cadastrar múltiplos jogadores, gerenciar turnos, girar a roleta com cálculo de ângulos e destacar visualmente os alvos no tapete digital.

##  Funcionalidades Principais
- **Validação de Entrada:** Controle de exceções para entradas vazias, nomes curtos (<3 caracteres) e duplicados.
- **Roleta Dinâmica:** Animação baseada em `conic-gradient` e controle do fim da rotação via evento `transitionend`.
- **Efeitos de Destaque:** Animações CSS em `@keyframes` sincronizadas via JavaScript para destacar a cor sorteada.
- **Sistema de Turnos:** Fila dinâmica de jogadores com alternância automática a cada rodada.

##  Tecnologias Utilizadas
- **HTML5:** Estruturação semântica da roleta e do tapete.
- **CSS3:** Animações, layouts com `CSS Grid` e gradientes cônicos (`conic-gradient`).
- **JavaScript (ES6+):** Lógica do jogo, manipulação do DOM e escutadores de eventos.

##  Estrutura de Arquivos
- `twister.html`: Markup do painel, roleta e tapete.
- `twister.css`: Estilização gráfica e animação `@keyframes piscar`.
- `script.js`: Regras de negócio, validações e matemática do sorteio.
