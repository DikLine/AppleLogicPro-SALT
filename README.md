# Logic Pro Scripter — SALT

### Sample Articulation Library Timing

**Orchestral Articulation & Delay Management for Apple Logic Pro**

SALT is a suite of MIDI processing scripts built for **Apple Logic Pro's Scripter MIDI FX plugin**.

It is designed to make orchestral sample libraries easier to play, program, and automate by handling articulation-dependent timing, Continuous Controller synchronization, and multi-channel MIDI routing directly inside Logic Pro.

> **Just add a pinch of SALT to your orchestral template.** 🧂

---

## 🚀 Key Features

### Dynamic Negative Delay Compensation

Automatically applies specific millisecond delays to MIDI events depending on the currently active articulation.

Different delay values can be used to compensate for articulations with very different attack and transition characteristics, such as:

- Slow Legato transitions
- Sustains and Long articulations
- Fast Shorts
- Spiccato or Staccato attacks

This allows different articulations to remain rhythmically aligned without relying on a single static Track Delay value.

### CC Sync — Continuous Controller Synchronization

When MIDI notes are delayed, automation such as **Mod Wheel, Expression, Pitch Bend**, and other CC data can otherwise arrive too early relative to the delayed notes.

SALT keeps track of the active articulation delay and applies the same timing compensation to incoming CC data, keeping dynamics, expression, and note events synchronized.

### Hybrid Routing & Multi-Channel Forwarding

Designed to work around some of the limitations of Logic Pro's Articulation Sets when controlling multi-timbral instruments.

CC data received on **MIDI Channel 1** can be forwarded across all **16 MIDI channels**, allowing automation to reach every articulation or instrument channel while maintaining the appropriate timing compensation.

### UACC Velocity Support

Full support for **Spitfire Audio's UACC via Velocity** articulation switching.

A single trigger note can be used while its **Velocity value determines the selected articulation and corresponding delay**.

---

## 📜 The SALT Scripts

### 1. SALT V5.3 — KS Command Center
**CC Sync Edition**

File: `SALT V5.3 - KS Command Center (CC Sync).js`

The core engine for standard **Keyswitch (KS)** libraries.

It allows you to define MIDI pitch ranges for:

- Legatos
- Longs
- Shorts

Each group can be assigned a specific millisecond delay.

Incoming CC data is automatically synchronized with the delay of the currently active articulation.

---

### 2. SALT V6.4 — KS Command Center Hybrid
**CC Sync & CH Forward**

File: `SALT V6.4 - KS Command Center Hybrid (CC Sync & CH Forward).js`

Built for more complex **multi-timbral routing**.

This version introduces a **Hybrid Radar**, allowing articulations to be triggered either by:

- Standard Keyswitches
- Specific isolated MIDI Channels

It also includes the **Multi-Channel Forwarding Engine**.

Any CC data received on **Channel 1** is automatically cloned across **Channels 2–16** while retaining the appropriate articulation delay.

---

### 3. SALT V7 — Spitfire
**UACC Velocity & CC Sync**

File: `SALT V7 - Spitfire (UACC Velocity & CC Sync).js`

Designed specifically for **Spitfire Audio libraries using UACC via Velocity**.

Instead of mapping articulation switches across multiple notes, the script monitors a single **Trigger Note** — for example, `C-2`.

The **Velocity value** of that trigger note determines:

1. The active articulation mode
2. The corresponding MIDI delay

CC data is then synchronized with the currently active delay.

---

## 🛠️ Installation & Usage

1. Open **Logic Pro** and insert the **Scripter MIDI FX plugin** on your instrument track.
2. Click `Open Script in Editor`.
3. Copy the contents of the desired `.js` file from this repository and paste it into the Scripter Editor, replacing the default example code.
4. Click `Run Script`.
5. Close the editor.

You can now configure your specific:

- Delay timings
- Keyswitch ranges
- MIDI channels
- UACC trigger notes
- Articulation mappings

directly from the **Scripter Plugin UI parameters**.

> **Tip:** You can save the script using the **Save As...** option in the Scripter Editor so you do not need to paste the code again every time you use it.

---

## 👨‍💻 Note to Composers & Developers

SALT was developed to act as an invisible **"First Officer"** between MIDI input, articulation management, and orchestral sample-engine rendering.

The goal is simple: reduce the manual timing and routing work required when building, programming, and performing with large orchestral templates.

Feel free to **fork, modify, adapt, and integrate** the scripts into your own orchestral workflows and templates.

---

## Compatibility

- **Apple Logic Pro**
- **Scripter MIDI FX Plugin**
- JavaScript syntax and API as supported by **Logic Pro Scripter**

> **Important:** Logic Pro's Scripter environment uses its own JavaScript API and execution model. These scripts are intended specifically for **Logic Pro Scripter** and should not be treated as conventional browser or Node.js JavaScript.