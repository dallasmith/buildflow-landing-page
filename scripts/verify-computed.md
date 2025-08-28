# BuildFlow Landing Page - Layout Verification

## Desktop Layout Check (≥1024px)

1. **Open DevTools** → Elements tab
2. **Select #hero element** → Computed tab
3. **Verify these computed values:**
   - `display: grid`
   - `grid-template-columns: 1.1fr 0.9fr`
   - `padding: 60px 40px`

4. **Check .container computed padding:**
   - Should be `40px` (1024px) or `60px` (1200px+)
   - NOT `67px+` from clamp variables

5. **Check .section computed padding:**
   - Should be `60px` vertical
   - NOT `100px+` from clamp variables

## Mobile Layout Check (≤768px)

1. **Resize to mobile width**
2. **Verify hero stacks single-column**
3. **Scroll down ~700px** → Sticky CTA should appear
4. **Test FAQ accordion** → Tab through, Enter/Space to toggle

## Network Check

1. **DevTools** → Network tab
2. **Reload page**
3. **CSS request** should show:
   - `styles/landing.css?v=...`
   - Status: 200 (not cached)
   - Fresh timestamp in query param

## Expected Result

- **Desktop**: Two-column hero grid, left-aligned text, reasonable padding
- **Mobile**: Single-column stack, sticky CTA functional, FAQ interactive
- **No horizontal scrollbars** or excessive spacing
