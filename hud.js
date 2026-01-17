/*
  Force HUD scaffolding
  --------------------
  This file intentionally keeps a stable public API so you can drop in
  “real” telemetry later without rewriting markup.

  Elements are referenced by ID:
    yawNeedle, yawExpectedNeedle, yawLabelCurrent, yawLabelExpected
    latLeft, latRight, lonFwd, lonRev
    gDot

  Public API:
    window.ValkyriesHUD.setState({
      yawDeg: number,           // current yaw (deg)
      yawExpectedDeg: number,   // expected/reference yaw (deg)
      latG: number,             // lateral accel (g), +right, -left
      lonG: number,             // longitudinal accel (g), +forward, -brake
      gMag: number              // optional magnitude for dot
    })
*/

(function(){
  const $ = (id) => document.getElementById(id);

  const el = {
    yawNeedle: $('yawNeedle'),
    yawExpectedNeedle: $('yawExpectedNeedle'),
    yawLabelCurrent: $('yawLabelCurrent'),
    yawLabelExpected: $('yawLabelExpected'),
    latLeft: $('latLeft'),
    latRight: $('latRight'),
    lonFwd: $('lonFwd'),
    lonRev: $('lonRev'),
    gDot: $('gDot')
  };

  function clamp(n, a, b){ return Math.max(a, Math.min(b, n)); }

  function setArrowScale(node, scale){
    if (!node) return;
    const k = clamp(scale, 0, 1);
    // Keep this dead-simple: we mutate opacity + a gentle scale.
    // (Later, you can replace this with a geometry-accurate arrow length model.)
    node.setAttribute('data-active', k > 0.02 ? '1' : '0');
    node.style.opacity = String(0.18 + 0.82 * k);
    node.style.transform = `scale(${0.35 + 0.65 * k})`;
  }

  function rotateNeedle(node, deg){
    if (!node) return;
    node.style.transform = `rotate(${deg}deg)`;
  }

  function setDot(lat, lon){
    if (!el.gDot) return;
    const x = clamp(lat, -1.2, 1.2);
    const y = clamp(-lon, -1.2, 1.2);
    // SVG viewBox is -100..100; keep inside
    el.gDot.setAttribute('cx', String(x*75));
    el.gDot.setAttribute('cy', String(y*75));
  }

  const state = {
    yawDeg: 0,
    yawExpectedDeg: 0,
    latG: 0,
    lonG: 0,
    gMag: 0
  };

  function apply(){
    rotateNeedle(el.yawNeedle, clamp(state.yawDeg, -28, 28));
    rotateNeedle(el.yawExpectedNeedle, clamp(state.yawExpectedDeg, -28, 28));

    if (el.yawLabelCurrent) el.yawLabelCurrent.textContent = `Current ${state.yawDeg.toFixed(0)}°`;
    if (el.yawLabelExpected) el.yawLabelExpected.textContent = `Expected ${state.yawExpectedDeg.toFixed(0)}°`;

    const lat = clamp(state.latG, -1.2, 1.2);
    const lon = clamp(state.lonG, -1.2, 1.2);

    setArrowScale(el.latLeft,  lat < 0 ? Math.abs(lat)/1.2 : 0);
    setArrowScale(el.latRight, lat > 0 ? Math.abs(lat)/1.2 : 0);
    setArrowScale(el.lonFwd,   lon > 0 ? Math.abs(lon)/1.2 : 0);
    setArrowScale(el.lonRev,   lon < 0 ? Math.abs(lon)/1.2 : 0);

    setDot(lat, lon);
  }

  window.ValkyriesHUD = {
    setState(next){
      Object.assign(state, next || {});
      apply();
    }
  };

  // Demo animation (remove whenever you drive from real data)
  const demo = document.documentElement.getAttribute('data-hud-demo') !== 'off';
  if (demo){
    let t = 0;
    setInterval(() => {
      t += 0.06;
      window.ValkyriesHUD.setState({
        yawDeg: 16*Math.sin(t*0.7),
        yawExpectedDeg: 8*Math.sin(t*0.7 + 0.9),
        latG: 0.9*Math.sin(t),
        lonG: 0.55*Math.cos(t*0.8),
      });
    }, 50);
  } else {
    apply();
  }
})();
