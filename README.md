# Apple Logic Pro — SALT

### Scripter Articulations Latency Taming

**Articulation timing, controller synchronization and MIDI routing for orchestral sample libraries.**

SALT is a suite of six standalone scripts for **Apple Logic Pro's Scripter MIDI FX plug-in**. Developed by a composer for everyday orchestral programming, it handles the timing differences between sample attacks and true legato transitions, synchronizes accompanying controller data, and provides multi-channel forwarding in the hybrid module.

The suite works together with **the active Articulation Set on the Logic track**, the virtual instrument's articulation configuration, and the track's negative delay. The supplied Lean versions have been tested and approved by the author in Logic Pro.

> **Just add a pinch of SALT to your orchestral template.** 🧂

## Choose your module

**SALT 1–6 identify different modules, not successive replacements.** Each script is self-contained; choose the one that matches the instrument and articulation workflow.

| Module | Script | Articulation detection | CH1 → CH2–16 forwarding |
| --- | --- | --- | --- |
| **SALT 1** | [SALT 1 - CC Module for CSS & CSSS v3.1](SALT%201/SALT%201%20-%20CC%20Module%20for%20CSS%20%26%20CSSS%20v3.1.js) | CC58; low-latency and expressive legato | No |
| **SALT 2** | [SALT 2 - CC Module for CSB v3.2](SALT%202/SALT%202%20-%20CC%20Module%20for%20CSB%20v3.2.js) | CC58; velocity-dependent legato transitions | No |
| **SALT 3** | [SALT 3 - CC Module for CSW v3.1](SALT%203/SALT%203%20-%20CC%20Module%20for%20CSW%20v3.1.js) | CC58; low-latency and expressive legato | No |
| **SALT 4** | [SALT 4 - KS Module v5.3](SALT%204/SALT%204%20-%20KS%20Module%20v5.3.js) | Keyswitch note ranges | No |
| **SALT 5** | [SALT 5 - KS & CH Module v6.4](SALT%205/SALT%205%20-%20KS%20%26%20CH%20Module%20v6.4.js) | Keyswitch note ranges and/or MIDI channel ranges | Yes |
| **SALT 6** | [SALT 6 - KS Spitfire UACC Module v7.0](SALT%206/SALT%206%20-%20KS%20Spitfire%20UACC%20Module%20v7.0.js) | Velocity ranges of one trigger note | No |

**Quick navigation:** [Timing](#how-the-timing-works) · [Installation](#installation) · [Cinematic Studio setup](#cinematic-studio-series-setup) · [Modules](#the-six-modules) · [Workflow tips](#workflow-tips) · [Troubleshooting](#troubleshooting)

To download the complete suite, use **Code → Download ZIP** on the repository page. Each `SALT 1`–`SALT 6` folder contains its script and reference images. To download one script, open its link above and use GitHub's **Download raw file** button.

## How the timing works

### Global advance, articulation-specific adjustment

Sample libraries can need different amounts of MIDI advance for slow legato transitions, faster transitions, sustains and short attacks. SALT combines a **global negative Track Delay in Logic** with **positive delays inside Scripter**.

1. Test the instrument's articulations and find the **highest articulation latency**. This is often a slow legato using long true legato transition samples.
2. In Logic's **Track Inspector**, set a negative Track Delay equal to that latency. For example: **−333 ms**.
3. Set SALT's **`Track Delay [Leg 1st Note]` to the same magnitude, positively: 333 ms**. In SALT 3, this parameter is named `Track Delay [1st Note] (ms)`.
4. Adjust the other articulation/transition delays as needed for the library and your system.

The positive first-note delay compensates for the track's global advance. With the example above:

**−333 ms in Logic + 333 ms in SALT = 0 ms net MIDI offset for the first legato note.**

Following overlapping legato notes use their transition delay instead. For example, a SALT delay of 83 ms leaves **250 ms of MIDI advance**: −333 + 83 = −250 ms. A 0 ms SALT delay leaves the full 333 ms advance in place.

These figures describe MIDI timing before the instrument responds. Audible alignment also depends on the samples and any other offsets in the setup. **SALT does not measure latency or change Logic's Track Delay automatically.**

### First note versus legato transition

In legato mode, the first musical note uses the Track Delay parameter in SALT. A note arriving while another musical note is still held uses the active transition delay. After all musical notes have been released, the next note is a new first note.

This follows incoming NoteOn/NoteOff events, rather than audio or sustain-pedal analysis. Overlap your MIDI notes when testing legato transitions.

### Controller synchronization

All six modules synchronize incoming controller/expression data with the script's timing reference. Before a legato phrase, controllers use the first-note delay; during the phrase they follow the last musical note's delay. Non-legato data follows the relevant articulation timing reference. Articulation-switch messages recognized by the script pass through without an added SALT delay.

## Installation

1. Insert **Scripter** in the instrument track's **MIDI FX** section.
2. Click **Open Script in Editor**.
3. Paste the contents of the chosen `.js` file, replacing the existing code.
4. Click **Run Script**, then close the editor.
5. Assign/configure the track's **Articulation Set** and the virtual instrument's articulation mapping.
6. Match SALT's settings to the controller messages, keyswitches, channels or velocities that reach Scripter in your setup.
7. Configure the negative Track Delay in Logic and the positive timing adjustments in SALT together.
8. Test articulation changes, first notes, overlapping legato transitions and controller automation.

Save the configured script with **Save As…** in Scripter's preset menu. Save the Logic project with its track timing, instrument and Articulation Set configuration.

All SALT delay controls use milliseconds and range from **0 to 400 ms**. The Cinematic Studio modules retain the author's starting values; the generic modules require your own articulation mapping and delay configuration.

## Cinematic Studio Series setup

**SALT 1–3 are designed for the CC-based configuration shown in their reference screenshots.** Reproduce the relevant **Switches**, **Articulations** and **Output** pages in Logic's Articulation Set Editor, and match the instrument's own articulation configuration.

The screenshots show how remote note switches select articulation entries and how those entries output **Controller 58** messages to the instrument. SALT's **Keyswitch CC** parameter defaults to **58** and must match that output selector.

For the illustrated setup:

| Module | Controller values | Timing mode selected by SALT |
| --- | --- | --- |
| SALT 1 — CSS & CSSS | CC58 values 1–5 / 6–10 | Low-latency legato / expressive legato |
| SALT 2 — CSB | CC58 values 1–10 | Legato |
| SALT 3 — CSW | CC58 values 1–5 / 6–10 | Low-latency legato / expressive legato |

The shown Output pages use **value 3** for the low-latency/sustain-legato selection, and **value 8** for expressive legato where available. Other CC58 values select the script's generic non-legato timing. Follow the full screenshot mappings for the library's remaining articulations and controls.

The Articulation IDs in the **Articulations** page are distinct from the controller values in the **Output** page: the scripts detect the outgoing CC message, not the articulation's name or ID.

### Starting timing values

| Instrument / example | Logic Track Delay | SALT first-note delay | SALT Shorts Delay |
| --- | --- | --- | --- |
| CSS & CSSS — script defaults | −333 ms | 333 ms | 278 ms |
| CSB Horn / Trombone / Tuba — script defaults | −230 ms | 230 ms | 180 ms |
| CSB Trumpet — screenshot example | −180 ms | 180 ms | 120 ms |
| CSW — script defaults | −220 ms | 220 ms | 160 ms |

These are starting points from the author's setup, not automatic calibration. Adjust them after testing your instrument and system. **The CSB script opens with the Horn/Trombone/Tuba values; use the separate Trumpet screenshot when configuring that instrument.**

## The six modules

### SALT 1 - CC Module for CSS & CSSS v3.1

**For:** Cinematic Studio Strings & Solo Strings.

[Open / download script](SALT%201/SALT%201%20-%20CC%20Module%20for%20CSS%20%26%20CSSS%20v3.1.js)

Low-latency legato uses its dedicated transition delay. Expressive legato chooses the delay from incoming note velocity: **1–64 Slow, 65–100 Medium, 101–127 Fast**. The first note uses the separate Track Delay parameter in either mode.

<details>
<summary>View Scripter UI</summary>

**SALT 1 - CC Module for CSS & CSSS**

![SALT 1 - CC Module for CSS & CSSS](SALT%201/SALT%201%20-%20CC%20Module%20for%20CSS%20%26%20CSSS.webp)

</details>

<details>
<summary>View Logic Articulation Set configuration: Switches, Articulations and Output</summary>

**1. Switches — remote articulation selection**

![SALT 1 - Logic Pro Articulation Set Editor [Pag 1 - Switches]](SALT%201/SALT%201%20-%20Logic%20Pro%20Articulation%20Set%20Editor%20%5BPag%201%20-%20Switches%5D.webp)

**2. Articulations — names and IDs**

![SALT 1 - Logic Pro Articulation Set Editor [Pag 2 - Articulations]](SALT%201/SALT%201%20-%20Logic%20Pro%20Articulation%20Set%20Editor%20%5BPag%202%20-%20Articulations%5D.webp)

**3. Output — controller messages sent to the instrument**

![SALT 1 - Logic Pro Articulation Set Editor [Pag 3 - Output]](SALT%201/SALT%201%20-%20Logic%20Pro%20Articulation%20Set%20Editor%20%5BPag%203%20-%20Output%5D.webp)

</details>

### SALT 2 - CC Module for CSB v3.2

**For:** Cinematic Studio Brass.

[Open / download script](SALT%202/SALT%202%20-%20CC%20Module%20for%20CSB%20v3.2.js)

Legato transitions use **velocity 1–64 for Medium** and **65–127 for Fast**. The first note uses the separate Track Delay parameter.

| SALT setting | Horn / Trombone / Tuba defaults | Trumpet example |
| --- | --- | --- |
| Track Delay [Leg 1st Note] | 230 ms | 180 ms |
| Keyswitch CC | 58 | 58 |
| Shorts Delay | 180 ms | 120 ms |
| Legato Medium Delay | 0 ms | 0 ms |
| Legato Fast Delay | 130 ms | 80 ms |

<details>
<summary>View Scripter UI examples</summary>

**SALT 2 - CC Module for CSB (Horn Trombone Tuba)**

![SALT 2 - CC Module for CSB (Horn Trombone Tuba)](SALT%202/SALT%202%20-%20CC%20Module%20for%20CSB%20%28Horn%20Trombone%20Tuba%29.webp)

**SALT 2 - CC Module for CSB (Trumpet)**

![SALT 2 - CC Module for CSB (Trumpet)](SALT%202/SALT%202%20-%20CC%20Module%20for%20CSB%20%28Trumpet%29.webp)

</details>

<details>
<summary>View Logic Articulation Set configuration: Switches, Articulations and Output</summary>

**1. Switches — remote articulation selection**

![SALT 2 - Logic Pro Articulation Set Editor [Pag 1 - Switches]](SALT%202/SALT%202%20-%20Logic%20Pro%20Articulation%20Set%20Editor%20%5BPag%201%20-%20Switches%5D.webp)

**2. Articulations — names and IDs**

![SALT 2 - Logic Pro Articulation Set Editor [Pag 2 - Articulations]](SALT%202/SALT%202%20-%20Logic%20Pro%20Articulation%20Set%20Editor%20%5BPag%202%20-%20Articulations%5D.webp)

**3. Output — controller messages sent to the instrument**

![SALT 2 - Logic Pro Articulation Set Editor [Pag 3 - Output]](SALT%202/SALT%202%20-%20Logic%20Pro%20Articulation%20Set%20Editor%20%5BPag%203%20-%20Output%5D.webp)

</details>

### SALT 3 - CC Module for CSW v3.1

**For:** Cinematic Studio Woodwinds.

[Open / download script](SALT%203/SALT%203%20-%20CC%20Module%20for%20CSW%20v3.1.js)

Low-latency legato uses **velocity 1–64 for Medium** and **65–127 for Fast**. Expressive legato uses **1–64 Slow, 65–100 Medium, 101–127 Fast**. Both modes use the separate Track Delay parameter for the first note.

<details>
<summary>View Scripter UI</summary>

**SALT 3 - CC Module for CSW**

![SALT 3 - CC Module for CSW](SALT%203/SALT%203%20-%20CC%20Module%20for%20CSW.webp)

</details>

<details>
<summary>View Logic Articulation Set configuration: Switches, Articulations and Output</summary>

**1. Switches — remote articulation selection**

![SALT 3 - Logic Pro Articulation Set Editor [Pag 1 - Switches]](SALT%203/SALT%203%20-%20Logic%20Pro%20Articulation%20Set%20Editor%20%5BPag%201%20-%20Switches%5D.webp)

**2. Articulations — names and IDs**

![SALT 3 - Logic Pro Articulation Set Editor [Pag 2 - Articulations]](SALT%203/SALT%203%20-%20Logic%20Pro%20Articulation%20Set%20Editor%20%5BPag%202%20-%20Articulations%5D.webp)

**3. Output — controller messages sent to the instrument**

![SALT 3 - Logic Pro Articulation Set Editor [Pag 3 - Output]](SALT%203/SALT%203%20-%20Logic%20Pro%20Articulation%20Set%20Editor%20%5BPag%203%20-%20Output%5D.webp)

</details>

### SALT 4 - KS Module v5.3

**For:** Generic keyswitch libraries.

[Open / download script](SALT%204/SALT%204%20-%20KS%20Module%20v5.3.js)

For libraries selected by ordinary keyswitch notes. Configure **two Legato zones, four Longs zones and four Shorts zones** with inclusive **Min KS / Max KS** ranges. Set Min and Max to the same note for a single keyswitch. This module detects pitch without channel filtering.

Legato zones use **Off / On** and their Custom Delay for transitions. Longs and Shorts use **Off / Use Global / Use Custom**, selecting the corresponding Global or zone-specific delay.

<details>
<summary>View Scripter UI</summary>

**SALT 4 - KS Module**

![SALT 4 - KS Module](SALT%204/SALT%204%20-%20KS%20Module.webp)

</details>

### SALT 5 - KS & CH Module v6.4

**For:** Generic keyswitch / multi-channel libraries.

[Open / download script](SALT%205/SALT%205%20-%20KS%20%26%20CH%20Module%20v6.4.js)

The hybrid module supports the same two Legato, four Longs and four Shorts zones, with **Min Ch / Max Ch** ranges and a **KS State** checkbox for each zone:

| KS State | Detection |
| --- | --- |
| On | Keyswitch must match both the zone's note range and channel range |
| Off | Musical notes are classified directly by channel; that zone's KS range is unused |

A direct channel match takes precedence over the stored keyswitch-selected mode for a musical note. Avoid unintended overlapping channel ranges: a broad active Ch 1–16 zone can capture notes intended for another zone.

**Multi-channel forwarding:** Control Change, Pitch Bend, Channel Pressure and Poly Pressure received on **channel 1** are sent on channel 1 and cloned to **channels 2–16**. Forwarding is automatic, with no destination selector. Musical notes are not broadcast; controller data arriving on other channels is not broadcast.

The copies share the same timing reference based on the script's last-note/selected-mode state. Forwarding distributes shared automation; it does not calculate a different controller delay for each destination channel.

<details>
<summary>View Scripter UI</summary>

**SALT 5 - KS & CH Module**

![SALT 5 - KS & CH Module](SALT%205/SALT%205%20-%20KS%20%26%20CH%20Module.webp)

</details>

### SALT 6 - KS Spitfire UACC Module v7.0

**For:** Spitfire UACC via Velocity libraries.

[Open / download script](SALT%206/SALT%206%20-%20KS%20Spitfire%20UACC%20Module%20v7.0.js)

For Spitfire libraries configured to select articulations through **UACC via Velocity**. Set **UACC Trigger [Global KS]** to the library's trigger note, then map its articulation velocities using the zones' **Min Velocity / Max Velocity** fields.

The trigger note passes through immediately; its velocity selects the timing mode. An unmatched trigger velocity clears that mode to `none`. This detector uses a trigger note's velocity; it does not select articulations from CC32 messages.

<details>
<summary>View Scripter UI</summary>

**SALT 6 - KS Spitfire UACC Module**

![SALT 6 - KS Spitfire UACC Module](SALT%206/SALT%206%20-%20KS%20Spitfire%20UACC%20Module.webp)

</details>

### Generic zone behavior — SALT 4–6

Within each detection pass, zones are checked in this order: **Legato 1–2, Longs 1–4, Shorts 1–4**. The first matching enabled zone wins. Min/Max ranges are inclusive.

`Off` excludes a zone from detection; it does not send a command to change the virtual instrument's articulation or necessarily clear a previously selected mode. In keyswitch workflows, send the intended switch before the notes that should use it, including when starting playback partway through a passage.

The scripts label MIDI note 0 as **C-2**. If another part of the setup uses different octave names, compare MIDI note numbers to confirm the mapping. Generic-module UI screenshots illustrate configurations; they are not universal library presets or necessarily the script's startup defaults.

## Workflow tips

### 1. Match Logic's negative Track Delay with SALT's positive first-note delay

After testing the virtual instrument's articulations, find the highest latency—usually a slow legato with long true legato transition samples. Set the negative **Track Delay in Logic's Track Inspector** accordingly, for example **−333 ms**, and enter its positive magnitude in SALT: **Track Delay [Leg 1st Note] = 333 ms**.

This pairs the global track advance with first-note compensation; use the other SALT delays to adjust the remaining attacks and transitions.

### 2. Type values instead of dragging sliders

For faster editing in SALT's UI, click the displayed delay value, type the new number on your keyboard and press **Enter**.

You can also use keyboard entry for note selections such as **Min KS** and **Max KS**:

- To select **G-2**, click the displayed note/dropdown, type **G-2**, then press **Enter**.
- To select **G#-1**, type **G-1**, press **↓** to move to the following note in the list (**G#-1**), then press **Enter**.

### 3. Save a configured preset for each instrument

Keep the tested SALT settings with the corresponding instrument and Articulation Set in your Logic template. For CSB, save separate presets for the Trumpet and Horn/Trombone/Tuba timing examples after adjusting them for your setup.

## Troubleshooting

- **Wrong articulation or no timing change:** check the active Articulation Set, the instrument mapping and the messages reaching Scripter. SALT 1–3 expect the configured switch CC; SALT 4–6 use the note/channel/velocity mapping of the selected module.
- **First note too early or late:** compare Logic's negative Track Delay with SALT's positive first-note delay and account for any other timing offsets already configured.
- **Legato timing behaves like a new phrase:** check MIDI note overlap; a note arriving after all previous notes have been released is treated as a first note.
- **Unexpected zone in SALT 4–6:** check enabled zones, inclusive ranges and first-match priority. In SALT 5, also check KS State and channel-only ranges.
- **Controllers reach every instrument channel:** this is the intended channel-1 forwarding behavior of SALT 5. Use it where shared automation across channels is required.
- **Need to inspect detection:** enable **Debug Trace** in SALT 4–6 and inspect Scripter's console for mode and delay messages.

## Compatibility and license

The scripts are intended for **Apple Logic Pro Scripter** and its JavaScript MIDI API. They are not standalone applications or conventional browser/Node.js scripts. The author's approved setup is a practical reference; settings may need adjustment for other instruments, systems or library versions.

Feel free to fork, modify, adapt and integrate the scripts into your own orchestral workflows and templates.

Released under the [MIT License](LICENSE).
