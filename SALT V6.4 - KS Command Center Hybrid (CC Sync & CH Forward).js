// ===================================================================
// 🎹 SCRIPT 2: KS COMMAND CENTER V6.4 - HYBRID (CC SYNC & CH FORWARD)
// ===================================================================

var NeedsTimingInfo = true;

var midiNotes = [
    "C-2","C#-2","D-2","D#-2","E-2","F-2","F#-2","G-2","G#-2","A-2","A#-2","B-2",
    "C-1","C#-1","D-1","D#-1","E-1","F-1","F#-1","G-1","G#-1","A-1","A#-1","B-1",
    "C0","C#0","D0","D#0","E0","F0","F#0","G0","G#0","A0","A#0","B0",
    "C1","C#1","D1","D#1","E1","F1","F#1","G1","G#1","A1","A#1","B1",
    "C2","C#2","D2","D#2","E2","F2","F#2","G2","G#2","A2","A#2","B2",
    "C3","C#3","D3","D#3","E3","F3","F#3","G3","G#3","A3","A#3","B3",
    "C4","C#4","D4","D#4","E4","F4","F#4","G4","G#4","A4","A#4","B4",
    "C5","C#5","D5","D#5","E5","F5","F#5","G5","G#5","A5","A#5","B5",
    "C6","C#6","D6","D#6","E6","F6","F#6","G6","G#6","A6","A#6","B6",
    "C7","C#7","D7","D#7","E7","F7","F#7","G7","G#7","A7","A#7","B7",
    "C8","C#8","D8","D#8","E8","F8","F#8","G8"
];

var midiChannels = ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16"];
var optLegato  = ["Off", "On"];
var optArtic   = ["Off", "Use Global", "Use Custom"];

// 🎛️ INTERFACE - 74 Parameters
var PluginParameters = [
    // --- GLOBALS (0 to 2) ---
    {name: "Track Delay [Leg 1st Note]", type: "lin", minValue: 0, maxValue: 400, numberOfSteps: 400, defaultValue: 0},
    {name: "Global Longs Delay", type: "lin", minValue: 0, maxValue: 400, numberOfSteps: 400, defaultValue: 0},
    {name: "Global Shorts Delay", type: "lin", minValue: 0, maxValue: 400, numberOfSteps: 400, defaultValue: 0},
    
    // --- LEGATO ZONES (3 to 16) ---
    {name: "🟡 Legato 1️⃣ State", type: "menu", valueStrings: optLegato, defaultValue: 0},
    {name: "Legato 1 Min Ch", type: "menu", valueStrings: midiChannels, defaultValue: 0},
    {name: "Legato 1 Max Ch", type: "menu", valueStrings: midiChannels, defaultValue: 15},
    {name: "Legato 1 KS State", type: "checkbox", defaultValue: 0},
    {name: "Legato 1 Min KS", type: "menu", valueStrings: midiNotes, defaultValue: 1},
    {name: "Legato 1 Max KS", type: "menu", valueStrings: midiNotes, defaultValue: 1},
    {name: "Legato 1 Custom Delay", type: "lin", minValue: 0, maxValue: 400, numberOfSteps: 400, defaultValue: 0},
    
    {name: "🟡 Legato 2️⃣ State", type: "menu", valueStrings: optLegato, defaultValue: 0},
    {name: "Legato 2 Min Ch", type: "menu", valueStrings: midiChannels, defaultValue: 0},
    {name: "Legato 2 Max Ch", type: "menu", valueStrings: midiChannels, defaultValue: 15},
    {name: "Legato 2 KS State", type: "checkbox", defaultValue: 0},
    {name: "Legato 2 Min KS", type: "menu", valueStrings: midiNotes, defaultValue: 2},
    {name: "Legato 2 Max KS", type: "menu", valueStrings: midiNotes, defaultValue: 2},
    {name: "Legato 2 Custom Delay", type: "lin", minValue: 0, maxValue: 400, numberOfSteps: 400, defaultValue: 0},

    // --- LONG ZONES (17 to 44) ---
    {name: "🔵 Long(s) 1️⃣ Delay State", type: "menu", valueStrings: optArtic, defaultValue: 1},
    {name: "Long(s) 1 Min Ch", type: "menu", valueStrings: midiChannels, defaultValue: 0},
    {name: "Long(s) 1 Max Ch", type: "menu", valueStrings: midiChannels, defaultValue: 15},
    {name: "Long(s) 1 KS State", type: "checkbox", defaultValue: 0},
    {name: "Long(s) 1 Min KS", type: "menu", valueStrings: midiNotes, defaultValue: 3},
    {name: "Long(s) 1 Max KS", type: "menu", valueStrings: midiNotes, defaultValue: 3},
    {name: "Long(s) 1 Custom Delay", type: "lin", minValue: 0, maxValue: 400, numberOfSteps: 400, defaultValue: 0},

    {name: "🔵 Long(s) 2️⃣ Delay State",  type: "menu", valueStrings: optArtic, defaultValue: 0},
    {name: "Long(s) 2 Min Ch", type: "menu", valueStrings: midiChannels, defaultValue: 0},
    {name: "Long(s) 2 Max Ch", type: "menu", valueStrings: midiChannels, defaultValue: 15},
    {name: "Long(s) 2 KS State", type: "checkbox", defaultValue: 0},
    {name: "Long(s) 2 Min KS", type: "menu", valueStrings: midiNotes, defaultValue: 4},
    {name: "Long(s) 2 Max KS", type: "menu", valueStrings: midiNotes, defaultValue: 4},
    {name: "Long(s) 2 Custom Delay", type: "lin", minValue: 0, maxValue: 400, numberOfSteps: 400, defaultValue: 0},

    {name: "🔵 Long(s) 3️⃣ Delay State",  type: "menu", valueStrings: optArtic, defaultValue: 0},
    {name: "Long(s) 3 Min Ch", type: "menu", valueStrings: midiChannels, defaultValue: 0},
    {name: "Long(s) 3 Max Ch", type: "menu", valueStrings: midiChannels, defaultValue: 15},
    {name: "Long(s) 3 KS State", type: "checkbox", defaultValue: 0},
    {name: "Long(s) 3 Min KS", type: "menu", valueStrings: midiNotes, defaultValue: 5},
    {name: "Long(s) 3 Max KS", type: "menu", valueStrings: midiNotes, defaultValue: 5},
    {name: "Long(s) 3 Custom Delay", type: "lin", minValue: 0, maxValue: 400, numberOfSteps: 400, defaultValue: 0},

    {name: "🔵 Long(s) 4️⃣ Delay State",  type: "menu", valueStrings: optArtic, defau