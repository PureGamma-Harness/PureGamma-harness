# Quiet workspace

English | [中文](README.zh.md)

This optional appearance plugin gives PureGamma a graphite dark theme and off-white light theme, blue selection and focus accents, compact navigation, and a raised composer. It paints existing controls without changing conversations, credentials, model selection, or tools. Text and code use the user's saved font preferences. Primary text, secondary text, selected labels, and send controls use WCAG AA contrast pairs in both palettes.

The plugin follows the existing light/dark selection, respects reduced motion, and keeps the native sidebar collapse, editor scrolling, menu anchors, and window-control clearance. Expanded sidebar controls and narrow-screen composer corners have separate treatments; touch input keeps the editor at least 16px. Capability navigation comes from [plugin rail](../dsh-plugin-rail/README.md).

The PureGamma installer enables this plugin and stops enabling the earlier pixel-font and blue-bubble bundles. Their dependencies and settings remain available for manual re-enabling. Disable this plugin in the plugin manager to restore the native appearance.

Run the focused appearance and navigation checks from the repository root with `node --test pg-harness/plugins/dsh-quiet-workspace/plugin.test.mjs pg-harness/plugins/dsh-plugin-rail/plugin.test.mjs`. The palette fixture in `preview.html` previews both themes and a narrow layout; it is not the running application or an end-to-end test.
