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
    nodes.forEach((node) => node.classList.add('is-visible'));
    return;
  }

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
