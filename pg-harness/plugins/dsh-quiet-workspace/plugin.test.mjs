import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { JSDOM } from 'jsdom'
import { transform } from 'lightningcss'

const source = readFileSync(new URL('./client.js', import.meta.url), 'utf8')

function mount() {
 const dom = new JSDOM('<main id="root"><button>Existing action</button><input value="Retained draft"></main>', { runScripts: 'outside-only', url: 'https://harness.invalid' })
 let dispose
 dom.window.__ModuleLoader__ = { load: ({ factory }) => factory().apply({ effect(fn) { dispose = fn() } }) }
 dom.window.eval(source)
 return { dom, document: dom.window.document, dispose }
}

test('appearance mounts and disposes without changing application content, theme choice, or draft', () => {
 const app = mount()
 try {
  const original = app.document.querySelector('#root').innerHTML
  const input = app.document.querySelector('input')
  input.value = 'Unsaved work'
  app.document.body.setAttribute('data-ds-dark-theme', '')
  assert.ok(app.document.querySelector('#pg-quiet-workspace'))
  app.dispose()
  assert.equal(app.document.querySelector('#pg-quiet-workspace'), null)
  assert.equal(app.document.querySelector('#root').innerHTML, original)
  assert.equal(input.value, 'Unsaved work')
  assert.equal(app.document.body.hasAttribute('data-ds-dark-theme'), true)
  app.dom.window.eval(source)
  assert.equal(app.document.querySelectorAll('#pg-quiet-workspace').length, 1)
 } finally { app.dom.window.close() }
})

test('stylesheet parses and keeps preference, mobile, collapsed-sidebar, and focus treatments', () => {
 const app = mount()
 try {
  const css = app.document.querySelector('style').textContent
  assert.doesNotThrow(() => transform({ filename: 'quiet-workspace.css', code: Buffer.from(css) }))
  assert.match(css, /font-family: var\(--dsw-font-family\)/)
  assert.match(css, /font-family: var\(--ds-font-family-code\)/)
  assert.match(css, /prefers-reduced-motion: reduce/)
  assert.match(css, /@media \(pointer: coarse\)/)
  assert.match(css, /@media \(max-width: 600px\)/)
  assert.match(css, /\[data-composer-card\]:focus-within/)
  assert.match(css, /:not\(\[class\*='_collapsed'\]\) button\[class\*='_newSession'\]/)
  assert.match(css, /\[data-composer-card\]\[class\*='_cardWorkspaceTrigger'\]::after/)
  assert.ok(!css.includes('font-weight: 600'))
  app.document.querySelector('#root').innerHTML = '<div data-slot="sidebar"><div class="fixture_root"><button class="fixture_newSession"></button></div><div class="fixture_root fixture_collapsed"><button class="fixture_newSession"></button></div></div>'
  const expandedButtonRule = css.match(/([^{}]+button\[class\*='_newSession'\]) \{[^{}]*justify-content: flex-start/)[1].trim()
  assert.equal(app.document.querySelectorAll(expandedButtonRule).length, 1)
  assert.equal(app.document.querySelector(expandedButtonRule).parentElement.className, 'fixture_root')
 } finally { app.dom.window.close() }
})

function luminance(hex) {
 const channels = hex.slice(1).match(/../g).map(value => parseInt(value, 16) / 255)
 const linear = channels.map(value => value <= .04045 ? value / 12.92 : ((value + .055) / 1.055) ** 2.4)
 return linear[0] * .2126 + linear[1] * .7152 + linear[2] * .0722
}
function contrast(a, b) {
 const [lighter, darker] = [luminance(a), luminance(b)].sort((x, y) => y - x)
 return (lighter + .05) / (darker + .05)
}

test('both palettes meet WCAG AA for text, selected labels, and primary actions', () => {
 const app = mount()
 try {
  const css = app.document.querySelector('style').textContent
  const blocks = [...css.matchAll(/body(?:\[data-ds-dark-theme\])? \{([^}]+)\}/g)].slice(0, 2)
  assert.equal(blocks.length, 2)
  for (const [index, block] of blocks.entries()) {
   const tokens = Object.fromEntries([...block[1].matchAll(/--pg-([\w-]+): (#[0-9a-f]{6})/g)].map(match => [match[1], match[2]]))
   for (const surface of ['surface', 'sidebar', 'raised', 'hover', 'message']) {
    for (const label of ['ink', 'muted']) assert.ok(contrast(tokens[label], tokens[surface]) >= 4.5, `${index}: ${label}/${surface}`)
   }
   assert.ok(contrast(tokens.accent, tokens.selected) >= 4.5)
   assert.ok(contrast('#ffffff', tokens.action) >= 4.5)
   assert.ok(contrast('#ffffff', tokens['action-hover']) >= 4.5)
  }
 } finally { app.dom.window.close() }
})
