/** Neutral workspace tokens and chrome; native navigation and theme selection remain authoritative. */
window.__ModuleLoader__.load({ id: 'dsh-quiet-workspace', factory: () => ({
 name: 'quiet-workspace-client',
 apply(ctx) {
  ctx.effect(() => {
   const style = document.createElement('style'); style.id = 'pg-quiet-workspace';
   style.textContent = `
body {
 --pg-surface: #fcfcfd; --pg-sidebar: #f1f3f6; --pg-raised: #ffffff; --pg-ink: #202530;
 --pg-muted: #596476; --pg-hover: #e9edf3; --pg-line: #dce1e9; --pg-input: #ffffff;
 --pg-message: #eef2f8; --pg-accent: #2458c6; --pg-selected: #e6edfc;
 --pg-action: #2458c6; --pg-action-hover: #1b46a6; --pg-focus: #2458c6;
 --pg-shadow: 0 8px 28px #2025300d, 0 1px 4px #20253008;
}
body[data-ds-dark-theme] {
 --pg-surface: #15181e; --pg-sidebar: #101217; --pg-raised: #1d222b; --pg-ink: #eef1f7;
 --pg-muted: #a9b3c4; --pg-hover: #272e39; --pg-line: #303744; --pg-input: #1d222b;
 --pg-message: #222a36; --pg-accent: #a8c5ff; --pg-selected: #23334c;
 --pg-action: #315fbf; --pg-action-hover: #2b53a5; --pg-focus: #a8c5ff;
 --pg-shadow: 0 12px 36px #00000026, 0 1px 4px #00000020;
}
body, body[data-ds-dark-theme] {
 --dsw-alias-bg-base: var(--pg-surface) !important;
 --dsw-alias-bg-layer-1: var(--pg-surface) !important;
 --dsw-alias-bg-layer-2: var(--pg-raised) !important;
 --dsw-specific-sidebar-fill: var(--pg-sidebar) !important;
 --dsw-specific-input-major: var(--pg-input) !important;
 --dsw-specific-bubble: var(--pg-message) !important;
 --dsw-specific-bubble-highlight: var(--pg-selected) !important;
 --dsw-alias-label-primary: var(--pg-ink) !important;
 --dsw-alias-label-secondary: var(--pg-muted) !important;
 --dsw-alias-border-l3: var(--pg-line) !important;
 --dsw-alias-interactive-bg-hover: var(--pg-hover) !important;
 --dsw-alias-button-elevated-fill: var(--pg-raised) !important;
 --dsw-alias-button-info-fill: var(--pg-action) !important;
 --dsw-alias-button-info-hover: var(--pg-action-hover) !important;
 --dsw-alias-state-business-primary: var(--pg-accent) !important;
}
body, button, input, textarea, select, [class*='_brandName'], [class*='_fallbackBrandName'] {
 font-family: var(--dsw-font-family) !important;
 -webkit-font-smoothing: antialiased;
}
pre, code, kbd, pre *, code * { font-family: var(--ds-font-family-code) !important; }
body #root { margin-left: 0; width: 100%; }
body [class$='_sidebarCol'], body[data-ds-dark-theme] [class$='_sidebarCol'] {
 background: var(--pg-sidebar) !important; border-right: 1px solid var(--pg-line);
}
body [class$='_centerCol'] { border-left: none !important; }
[data-slot='sidebar'] [class*='_logoRow'] { height: 44px; margin-top: -4px; margin-bottom: 8px; padding: 4px 8px; }
[data-slot='sidebar'] [class*='_brandName'] { font-size: 17px; font-weight: 500; letter-spacing: -.5px; }
[data-slot='sidebar.brand.name'] { display: none !important; }
[data-slot='sidebar'] [class*='_brandName']::after { content: 'PureGamma'; }
[data-slot='sidebar'] [class*='_brandMark'] { width: 22px; }
[data-slot='sidebar'] [class*='_brandIdentity'] { gap: 9px; }
[data-slot='sidebar'] [class*='_localBuildBrand'] { display: none; }
[data-slot='sidebar'] [class*='_newSession'] { border: 0; box-shadow: none; background: transparent !important; border-radius: 9px; }
[data-slot='sidebar'] [class*='_root']:not([class*='_collapsed']) button[class*='_newSession'] { justify-content: flex-start; height: 38px; margin-bottom: 4px; padding: 8px 12px; font-size: 13px; }
[data-slot='sidebar'] [class*='_root']:not([class*='_collapsed']) [class*='_newSessionContent'] { width: auto; justify-content: flex-start; gap: 10px; }
@media (hover: hover) { [data-slot='sidebar'] button[class*='_newSession']:hover { background: var(--pg-hover) !important; } }
[data-slot='sidebar'] [class*='_panelList'] { gap: 2px; padding-bottom: 4px; }
[data-slot='sidebar'] [class*='_root']:not([class*='_collapsed']) [class*='_panelRow'] { min-height: 36px; padding: 8px 12px; border-radius: 9px; font-size: 13px; }
[data-slot='sidebar'] [class*='_panelActive'], body #dsh-plugin-rail button[aria-current='page'] { background: var(--pg-selected); color: var(--pg-accent); box-shadow: inset 2px 0 var(--pg-accent); }
[data-slot='sidebar'] [class*='_panelGlyph'] { width: 17px; height: 17px; }
[data-slot='sidebar'] [class*='_footArea'] { padding-top: 8px; border-top: 1px solid var(--pg-line); }
[data-slot='sidebar'] [class*='_regionArea'] { margin-top: 8px; }
[data-slot='sidebar'] button { transition: background-color 120ms ease; }
header:has([data-conversation-header-leading]) { padding: 12px 24px 10px 20px; min-height: 56px; border-bottom-color: var(--pg-line); }
header:has([role='tablist']) { border-bottom-color: var(--pg-line); }
[data-conversation-header-leading] { margin-right: 16px; }
.pg-header-name { display: inline-flex; align-items: center; gap: 8px; font-size: 17px; font-weight: 500; letter-spacing: -.45px; white-space: nowrap; }
.pg-header-name small { font-size: 11px; font-weight: 400; color: var(--pg-muted); letter-spacing: 0; }
html[data-platform='darwin'] [data-sidebar-collapsed='true'] .pg-header-name { margin-inline-start: max(0px, calc(var(--dsh-frame-leading-clearance, 0px) - 20px)); }
[data-sidebar-collapsed='true'] header:has(.pg-header-name) [class*='_titleRow'] { padding-inline-start: 0; }
[class*='_headerActions'], [class*='_headerUtilities'], [data-conversation-header-corner] { gap: 4px; }
[data-conversation-header-corner] { margin-right: -12px; }
[data-conversation-header-corner] button, [class*='_headerUtilities'] button, [class*='_headerActions'] button {
 min-width: 32px; min-height: 32px; border-radius: 9px; box-shadow: none;
}
.pg-header-more { display: grid; place-items: center; width: 32px; height: 32px; flex: none; margin-right: 4px; padding: 0; border: 0; border-radius: 9px; background: transparent; color: var(--pg-ink); cursor: pointer; -webkit-app-region: no-drag; }
@media (hover: hover) { .pg-header-more:hover { background: var(--pg-hover); } }
.pg-header-more svg { width: 19px; height: 19px; }
button:focus-visible, input:focus-visible, textarea:focus-visible, [contenteditable='true']:focus-visible { outline: 2px solid var(--pg-focus); outline-offset: 2px; }
body #dsh-plugin-rail button:focus-visible, body #dsh-plugin-rail-menu button:focus-visible { outline-color: var(--pg-focus); }
body [class$='_bubble'] { color: var(--pg-ink) !important; --dsw-alias-label-primary: var(--pg-ink); --dsw-alias-label-secondary: var(--pg-muted); border-radius: 20px; }
body [class$='_bubble'] a { color: var(--pg-accent) !important; }
[data-composer-card] {
 border-radius: 20px;
 background: var(--pg-input);
 box-shadow: 0 0 0 1px var(--pg-line), var(--pg-shadow);
 transition: box-shadow 140ms ease;
}
[data-composer-card]:focus-within { box-shadow: 0 0 0 2px var(--pg-focus), var(--pg-shadow); }
[data-composer-card][class*='_cardWorkspaceTrigger']::after { border-radius: inherit; }
@media (pointer: coarse) {
 [data-composer-card] { font-size: max(16px, var(--dsh-content-font-size, 14px)); }
 [data-conversation-header-corner] button, [class*='_headerUtilities'] button, .pg-header-more { min-width: 40px; min-height: 40px; }
}
@media (max-width: 600px) {
 header:has([data-conversation-header-leading]) { padding-inline: 16px; }
 [data-conversation-header-corner] { margin-right: -4px; }
 [data-composer-card], body [class$='_bubble'] { border-radius: 16px; }
}
@media (max-width: 850px) { .pg-header-name small { display: none; } [data-conversation-header-leading] { margin-right: 8px; } }
@media (prefers-reduced-motion: reduce) { [data-slot='sidebar'] button, [data-composer-card] { transition: none; } }
`;
   document.head.append(style);
   return () => style.remove();
  }, 'quiet-workspace: appearance');
 }
}) });
