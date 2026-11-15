/* Based on the owner's Tableau Public Share code; no financial calculations. */
(() => {
  'use strict';
  const container = document.getElementById('viz1794721768150');
  const viz = container && container.querySelector('object.tableauViz');
  if (!viz) return;
  // Preserve the workbook's 1280px layout and accommodate Financing (1320px)
  // plus visible workbook tabs and toolbar. Narrow screens scroll in the host.
  viz.style.width = '1280px';
  viz.style.height = '1420px';
  const script = document.createElement('script');
  script.src = 'https://public.tableau.com/javascripts/api/viz_v1.js';
  script.async = true;
  script.addEventListener('error', () => {
    const note = document.getElementById('embed-error');
    if (note) note.hidden = false;
  });
  viz.parentNode.insertBefore(script, viz);
})();
