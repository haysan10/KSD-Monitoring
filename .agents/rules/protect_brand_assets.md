---
name: protect_brand_assets
description: "Strict workspace rule that forbids any modification to Picture1.svg and preserves core branding assets."
always_on: true
---

# Brand Asset Protection Rule (KSD Monitor)

## 🚨 CRITICAL RULE: NEVER MODIFY Picture1.svg

1. **`Picture1.svg` is an immutable, original brand asset**:
   - You MUST NOT edit, overwrite, format, optimize, rename, or delete `Picture1.svg`.
   - Any tool call attempting to modify `Picture1.svg` is strictly forbidden.
   - All derivative branding (such as favicons, app icons, and web manifests) must be stored in `/icons/` or `/pb_public/icons/` without modifying `Picture1.svg`.

2. **Logo & Graphic Reference**:
   - If UI components or documentation need to reference the original master logo, read `Picture1.svg` as read-only.
   - Never write to or touch the bytes of `Picture1.svg`.
