// =========================================================
// Revela cada "nó" do pipeline conforme entra na tela.
// Respeita prefers-reduced-motion: quem pediu menos animação
// simplesmente vê tudo já visível, sem a transição.
// =========================================================
(function () {
  const nodes = document.querySelectorAll('.node-item');
  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  if (!nodes.length) return;

  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    // Sem motion reduzido não precisa animar: conteúdo já está
    // visível por padrão via CSS, então não fazemos nada.
    return;
  }

  // Só a partir daqui ligamos o modo "animado". Se o script
  // não chegasse a rodar, o CSS puro já garante tudo visível.
  document.documentElement.classList.add('js');

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
  );

  nodes.forEach((node) => observer.observe(node));
})();
