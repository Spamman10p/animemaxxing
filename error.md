# Error Archive — ANIMEMAXXING Implementation

This document tracks all significant technical hurdles and architectural pivots encountered during the Phase 13-14 buildup.

## 1. AI Art Generation Rate Limits
- **Issue**: Received `429 Too Many Requests` when generating a large batch of meme assets.
- **Root Cause**: Excessive parallel calls to the image generation endpoint.
- **Fix**: Pivoted to a curated batch of 12 high-impact images. Reduced generation scope to focus on quality over volume.

## 2. Browser Subagent "Search Fatigue"
- **Issue**: Subagent initially failed to locate the Countdown Timer because it was looking for a specific text string that hadn't rendered yet or was below a complex hero section.
- **Root Cause**: Scroll offset was too aggressive, bypassing the section entirely.
- **Fix**: Refined the verification task to use methodical 200px sweeps and PageDown keypresses. Verified DOM presence before assuming failure.

## 3. CSS "Glassmorphism 2.0" Stroke Conflict
- **Issue**: `border-image` gradient was overriding `border-radius` on some elements.
- **Root Cause**: `border-image` does not respect `border-radius` in standard CSS.
- **Fix**: Used nested pseudo-elements with `background-clip` or standard `border` with high-transparency `solid` colors and inner `box-shadow` to simulate the depth without breaking the rounded corners.

## 4. Persistent Timer Reset
- **Issue**: Timer would reset to 24:00 on every page refresh.
- **Root Cause**: Logic initialized a new `Date.now()` target every time `DOMContentLoaded` fired.
- **Fix**: Implemented `localStorage` persistence for `anime_countdown_start`. If a start time exists, retrieve it; otherwise, create a new one.

## 5. Mobile Nav Z-Index
- **Issue**: The `custom-cursor` and `particles` were appearing *over* the mobile navigation menu.
- **Fix**: Adjusted `z-index` stack. 
  - `custom-cursor`: 100000
  - `navbar`: 90000
  - `mobile-nav`: 80000
  - `particles`: -1
