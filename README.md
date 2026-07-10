# 🌌 Gravity Sandbox 2D

An interactive, physics-based N-body orbital mechanics simulator built with pure JavaScript and HTML5 Canvas. The system models multi-body gravitational fields in real-time using numerical integration, allowing complex astrophysical phenomena – like stable planetary systems, multi-moon captures, and orbital slingshots – to emerge naturally from fundamental physical equations.

<img width="1897" height="940" alt="image" src="https://github.com/user-attachments/assets/a5908b1c-35dd-4b3d-b7e0-fa5584c40faa" />


---

## Features & Physics Implemented

Unlike standard keyframe animations, this sandbox computes the interaction of all active celestial bodies frame-by-frame:
* **True N-Body Physics Engine:** Every object in the universe exerts a gravitational pull on every other object, allowing the simulation of complex binary star systems and orbital chaos.
* **Intelligent Satellite Orbital Assist:** A real-time helper algorithm that dynamically computes the first cosmic velocity ($v_c$) relative to the nearest planet. It allows the user to snap satellites into perfect circular orbits with a single click.
* **Mathematical Softening (Anti-Crash):** Implements a gravitational softening factor ($\epsilon$) within the vector code. This stabilizes calculations and prevents velocity spikes towards infinity (division by zero) during close physical encounters.

---

## HUD & Interactive Interface

The simulation features a high-tech engineering dashboard layout optimized for real-time sandbox creation:
* **Active Controls Dashboard:** Side-mounted sliding panel allowing users to switch active celestial object profiles, tweak entity mass/color inputs, and adjust the master simulation time-step warp.
* **Dynamic Live Vector Engine:** 
   **Slingshot Vector:** A dynamic projection rendering line generated when clicking and dragging (slingshot mechanic) to adjust the precise initial velocity vector before injection.
   **Engineering Vector Visualizer:** Real-time translucent vector overlays bound to each body, illustrating the current magnitude and direction of the velocity vector.
* **Aura Glow Rendering:** Custom vector shadow-blur filtering mapped exclusively to specific stellar bodies (`type === 'star'`), replicating atmospheric star-glow without sacrificing global GPU rendering performance.

---

## Tech Stack & Concepts

* **Frontend:** HTML5, CSS3 (Modern Glassmorphic Sidebar, Fixed Engineering Grid HUD Layout), Vanilla JavaScript (ES6+).
* **Graphics:** HTML5 Canvas API (Dynamic alpha-fading trail path buffers, precise vector line rendering).
* **Physics Integration:** Classical mechanics integration loops executing continuously inside a high-frequency `requestAnimationFrame` loop.

### Core Physics Equations Used:

Distance vector magnitude calculation between body $i$ and body $j$:
$$d = \sqrt{(x_j - x_i)^2 + (y_j - y_i)^2 + \epsilon^2}$$

Gravitational acceleration field force vector allocation ($a$):
$$a_g = G \cdot \frac{M_j}{d^2}$$

Vector components applied to velocity integration step ($v_x, v_y$):
$$a_x = \frac{a_g \cdot (x_j - x_i)}{d}, \quad a_y = \frac{a_g \cdot (y_j - y_i)}{d}$$

Instantaneous orbital velocity ($v_c$) computed for satellite insertion:
$$v_c = \sqrt{\frac{G \cdot M_{\text{planet}}}{d}}$$

---

## Getting Started

Since this sandbox project relies purely on native web technologies with zero external dependencies, running the code is entirely plug-and-play.

### Live Deployment (GitHub Pages)
The latest build of the simulator is fully deployed and accessible via any web browser. You can play it right now without any setup

### Local Setup
If you want to run the code locally or modify the physics engine on your machine:

1. Clone the repository:
   ```bash
   git clone [https://github.com/alicjac0/SpaceSandbox.git](https://github.com/alicjac0/SpaceSandbox.git)
