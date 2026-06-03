---
name: Synaptic
colors:
  surface: '#101415'
  surface-dim: '#101415'
  surface-bright: '#363a3b'
  surface-container-lowest: '#0b0f10'
  surface-container-low: '#191c1e'
  surface-container: '#1d2022'
  surface-container-high: '#272a2c'
  surface-container-highest: '#323537'
  on-surface: '#e0e3e5'
  on-surface-variant: '#bcc9c6'
  inverse-surface: '#e0e3e5'
  inverse-on-surface: '#2d3133'
  outline: '#879391'
  outline-variant: '#3d4947'
  surface-tint: '#6bd8cb'
  primary: '#6bd8cb'
  on-primary: '#003732'
  primary-container: '#29a195'
  on-primary-container: '#00302b'
  inverse-primary: '#006a61'
  secondary: '#bec6e0'
  on-secondary: '#283044'
  secondary-container: '#3f465c'
  on-secondary-container: '#adb4ce'
  tertiary: '#b9c7e0'
  on-tertiary: '#233144'
  tertiary-container: '#8392a9'
  on-tertiary-container: '#1c2a3d'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#89f5e7'
  primary-fixed-dim: '#6bd8cb'
  on-primary-fixed: '#00201d'
  on-primary-fixed-variant: '#005049'
  secondary-fixed: '#dae2fd'
  secondary-fixed-dim: '#bec6e0'
  on-secondary-fixed: '#131b2e'
  on-secondary-fixed-variant: '#3f465c'
  tertiary-fixed: '#d5e3fd'
  tertiary-fixed-dim: '#b9c7e0'
  on-tertiary-fixed: '#0d1c2f'
  on-tertiary-fixed-variant: '#3a485c'
  background: '#101415'
  on-background: '#e0e3e5'
  surface-variant: '#323537'
typography:
  display-lg:
    fontFamily: Hanken Grotesk
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Hanken Grotesk
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-md-mobile:
    fontFamily: Hanken Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  title-sm:
    fontFamily: Hanken Grotesk
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Geist
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Geist
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  code-sm:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '450'
    lineHeight: 20px
  label-xs:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 4px
  xs: 0.5rem
  sm: 1rem
  md: 1.5rem
  lg: 2.5rem
  xl: 4rem
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 48px
  max-width: 1200px
---

## Brand & Style

This design system is engineered for developers seeking deep work and cognitive clarity. The brand personality is calm, professional, and utilitarian, prioritizing the "flow state" by removing visual friction. 

The design style is **Minimalist-Modern** with a focus on precision. It draws inspiration from high-end developer tools, utilizing a structured layout, subtle depth, and a high-fidelity interface that feels both technical and approachable. The emotional response should be one of quiet confidence and focused progression, avoiding any elements that induce sensory overload or distraction.

## Colors

The color strategy centers on a "Soft Dark" palette to reduce eye strain during long learning sessions.

- **Primary (Teal):** Used sparingly for progress indicators, primary actions, and success states. It provides a calm, intellectual energy.
- **Secondary (Deep Navy):** The foundational surface color, providing a deep, stable environment.
- **Tertiary (Slate):** Used for borders, inactive states, and secondary iconography to create subtle structure without high contrast.
- **Neutral (Off-White):** Reserved strictly for high-readability text and essential highlights.

Backgrounds utilize a tiered system of navy shades rather than pure black to maintain a softer, more sophisticated look.

## Typography

Typography is the primary driver of the UI's hierarchy. **Hanken Grotesk** is used for headlines to provide a modern, sharp professional feel. **Geist** is the workhorse for body text, chosen for its exceptional clarity and developer-centric aesthetic. **JetBrains Mono** is utilized for code snippets and technical metadata/labels, reinforcing the professional workspace environment.

Text contrast is carefully managed: primary content is near-white, while secondary descriptions use a muted slate to recede into the background.

## Layout & Spacing

The layout follows a **Fixed-Fluid Hybrid** model. Content is centered within a maximum-width container to prevent line lengths from becoming unreadable on ultra-wide monitors.

- **Desktop:** A 12-column grid with generous 24px gutters. Sidebars for navigation or progress tracking remain fixed, while the main learning area fluidly adjusts.
- **Mobile:** A single-column flow with 16px horizontal margins.
- **Rhythm:** An 8px linear scale governs all padding and margins to ensure mathematical consistency. 

Generous whitespace (the "lg" and "xl" tokens) is intentionally used between major sections to isolate concepts and prevent cognitive overload.

## Elevation & Depth

Depth is achieved through **Tonal Layering** rather than heavy shadows. In a dark workspace, shadows can often appear muddy; instead, we use light:

- **Surface 0 (Base):** The darkest navy (#0F172A), used for the application background.
- **Surface 1 (Container):** A slightly lighter navy (#1E293B), used for cards and grouped content.
- **Surface 2 (Elevated):** Used for hover states and active menus, defined by a 1px subtle border (#334155).
- **Overlays:** Modals use a subtle 10% opacity primary color tint in their background blur (Backdrop blur: 12px) to maintain focus on the active task.

## Shapes

The shape language is **Soft and Precise**. 

A base radius of 4px (`rounded-sm`) is used for smaller elements like checkboxes and tags, while 8px (`rounded-md`) is used for main cards and buttons. This minimal rounding feels intentional and modern without becoming overly "bubbly" or casual. Larger containers like modals may use 12px (`rounded-lg`) to soften their presence against the background.

## Components

### Buttons & Actions
Primary buttons use a solid Teal fill with white text. Secondary buttons use a "ghost" style with a Slate border and no fill. All interactive elements must have a distinct `focus-visible` state using a 2px Teal ring with an offset.

### Progress Indicators
Use thin, horizontal bars (2px or 4px height). Completed segments are Teal; remaining segments are a low-contrast Slate. Avoid circular loaders unless the process is indeterminate.

### Cards
Cards are defined by a 1px border (#334155) rather than a shadow. The background should be a subtle step up from the base (Surface 1).

### Input Fields
Inputs use a dark background (#020617) to "sink" into the interface. On focus, the border transitions to Teal. Labels are always placed above the field in **JetBrains Mono** at 12px.

### Code Blocks
Code blocks use a specific "midnight" theme with syntax highlighting that matches the primary Teal and secondary Slate tones. They should always have a "Copy" utility in the top-right corner.

### Knowledge Chips
Used for tagging technologies (e.g., "React", "TypeScript"). These are small, utilize a monospaced font, and have a very subtle background tint.
