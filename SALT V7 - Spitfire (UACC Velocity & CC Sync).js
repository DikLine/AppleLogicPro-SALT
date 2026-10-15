// ==========================================================================
// 🎹 SCRIPT 3: KS COMMAND CENTER V7 - SPITFIRE (UACC VEL. EDITION / CC SYNC)
// ==========================================================================

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

var optLegato = ["Off", "On"];
var optArtic  = ["Off", "Use Global", "Use Custom"];

// 🎛️ INTERFACE - 45 Parameters
var PluginParameters = [
    // --- GLOBALS (0 to 3) ---
    {name: "Track Delay [Leg 1st Note]", type: "lin", minValue: 0, maxValue: 400, numberOfSteps: 400, defaultValue: 0},
    {name: "UACC Trigger [Global KS]", type: "menu", valueStrings: midiNotes, defaultValue: 0}, // Defaults to C-2
    {name: "Global Longs Delay", type: "lin", minValue: 0, maxValue: 400, numberOfSteps: 400, defaultValue: 0},
    {name: "Global Shorts Delay", type: "lin", minValue: 0, maxValue: 400, numberOfSteps: 400, defaultValue: 0},
    
    // --- LEGATO ZONES (4 to 11) ---
    {name: "🟡 Legato 1️⃣ State", type: "menu", valueStrings: optLegato, defaultValue: 0},
    {name: "Legato 1 Min Velocity", type: "lin", minValue: 1, maxValue: 127, numberOfSteps: 126, defaultValue: 1},
    {name: "Legato 1 Max Velocity", type: "lin", minValue: 1, maxValue: 127, numberOfSteps: 126, defaultValue: 1},
    {name: "Legato 1 Custom Delay", type: "lin", minValue: 0, maxValue: 400, numberOfSteps: 400, defaultValue: 0},
    
    {name: "🟡 Legato 2️⃣ State", type: "menu", valueStrings: optLegato, defaultValue: 0},
    {name: "Legato 2 Min Velocity", type: "lin", minValue: 1, maxValue: 127, numberOfSteps: 126, defaultValue: 1},
    {name: "Legato 2 Max Velocity", type: "lin", minValue: 1, maxValue: 127, numberOfSteps: 126, defaultValue: 1},
    {name: "Legato 2 Custom Delay", type: "lin", minValue: 0, maxValue: 400, numberOfSteps: 400, defaultValue: 0},

    // --- LONG ZONES (12 to 27) ---
    {name: "🔵 Long(s) 1️⃣ Delay State", type: "menu", valueStrings: optArtic, defaultValue: 1},
    {name: "Long(s) 1 Min Velocity", type: "lin", minValue: 1, maxValue: 127, numberOfSteps: 126, defaultValue: 1},
    {name: "Long(s) 1 Max Velocity", type: "lin", minValue: 1, maxValue: 127, numberOfSteps: 126, defaultValue: 1},
    {name: "Long(s) 1 Custom Delay", type: "lin", minValue: 0, maxValue: 400, numberOfSteps: 400, defaultValue: 0},

    {name: "🔵 Long(s) 2️⃣ Delay State",  type: "menu", valueStrings: optArtic, defaultValue: 0},
    {name: "Long(s) 2 Min Velocity", type: "lin", minValue: 1, maxValue: 127, numberOfSteps: 126, defaultValue: 1},
    {name: "Long(s) 2 Max Velocity", type: "lin", minValue: 1, maxValue: 127, numberOfSteps: 126, defaultValue: 1},
    {name: "Long(s) 2 Custom Delay", type: "lin", minValue: 0, maxValue: 400, numberOfSteps: 400, defaultValue: 0},

    {name: "🔵 Long(s) 3️⃣ Delay State",  type: "menu", valueStrings: optArtic, defaultValue: 0},
    {name: "Long(s) 3 Min Velocity", type: "lin", minValue: 1, maxValue: 127, numberOfSteps: 126, defaultValue: 1},
    {name: "Long(s) 3 Max Velocity", type: "lin", minValue: 1, maxValue: 127, numberOfSteps: 126, defaultValue: 1},
    {name: "Long(s) 3 Custom Delay", type: "lin", minValue: 0, maxValue: 400, numberOfSteps: 400, defaultValue: 0},

    {name: "🔵 Long(s) 4️⃣ Delay State",  type: "menu", valueStrings: optArtic, defaultValue: 0},
    {name: "Long(s) 4 Min Velocity", type: "lin", minValue: 1, maxValue: 127, numberOfSteps: 126, defaultValue: 1},
    {name: "Long(s) 4 Max Velocity", type: "lin", minValue: 1, maxValue: 127, numberOfSteps: 126, defaultValue: 1},
    {name: "Long(s) 4 Custom Delay", type: "lin", minValue: 0, maxValue: 400, numberOfSteps: 400, defaultValue: 0},

    // --- SHORT ZONES (28 to 43) ---
    {name: "🟢 Short(s) 1️⃣ Delay State",  type: "menu", valueStrings: optArtic, defaultValue: 1},
    {name: "Short(s) 1 Min Velocity", type: "lin", minValue: 1, maxValue: 127, numberOfSteps: 126, defaultValue: 1},
    {name: "Short(s) 1 Max Velocity", type: "lin", minValue: 1, maxValue: 127, numberOfSteps: 126, defaultValue: 1},
    {name: "Short(s) 1 Custom Delay", type: "lin", minValue: 0, maxValue: 400, numberOfSteps: 400, defaultValue: 0},

    {name: "🟢 Short(s) 2️⃣ Delay State",  type: "menu", valueStrings: optArtic, defaultValue: 0},
    {name: "Short(s) 2 Min Velocity", type: "lin", minValue: 1, maxValue: 127, numberOfSteps: 126, defaultValue: 1},
    {name: "Short(s) 2 Max Velocity", type: "lin", minValue: 1, maxValue: 127, numberOfSteps: 126, defaultValue: 1},
    {name: "Short(s) 2 Custom Delay", type: "lin", minValue: 0, maxValue: 400, numberOfSteps: 400, defaultValue: 0},

    {name: "🟢 Short(s) 3️⃣ Delay State",  type: "menu", valueStrings: optArtic, defaultValue: 0},
    {name: "Short(s) 3 Min Velocity", type: "lin", minValue: 1, maxValue: 127, numberOfSteps: 126, defaultValue: 1},
    {name: "Short(s) 3 Max Velocity", type: "lin", minValue: 1, maxValue: 127, numberOfSteps: 126, defaultValue: 1},
    {name: "Short(s) 3 Custom Delay", type: "lin", minValue: 0, maxValue: 400, numberOfSteps: 400, defaultValue: 0},

    {name: "🟢 Short(s) 4️⃣ Delay State",  type: "menu", valueStrings: optArtic, defaultValue: 0},
    {name: "Short(s) 4 Min Velocity", type: "lin", minValue: 1, maxValue: 127, numberOfSteps: 126, defaultValue: 1},
    {name: "Short(s) 4 Max Velocity", type: "lin", minValue: 1, maxValue: 127, numberOfSteps: 126, defaultValue: 1},
    {name: "Short(s) 4 Custom Delay", type: "lin", minValue: 0, maxValue: 400, numberOfSteps: 400, defaultValue: 0},

    // --- DEBUG ---
    {name: "🪲 Debug Trace", type: "menu", valueStrings: ["Off", "On"], defaultValue: 0}
];

var params = new Array(45).fill(0);

var activeNotes   = 0;
var delayMemory   = {};
var currentMode   = "none"; 
var currentDelay  = 0;
var lastNoteDelay = 0; // Stores delay memory for CC Sync

function logTrace(msg) {
    if (params[44] === 1) Trace(msg);
}

function sendWithSafeDelay(event, delayMs) {
    var delayInt = Math.round(delayMs);
    if (delayInt <= 0) { event.send(); return; }

    var newEvent;
    if (event instanceof NoteOn) {
        newEvent = new NoteOn();
    } else if (event instanceof NoteOff) {
        newEvent = new NoteOff();
    } else {
        // Pass-through for CCs, Pitchbend, etc., already containing delay
        event.sendAfterMilliseconds(delayInt);
        return;
    }
    
    newEvent.pitch = event.pitch;
    newEvent.velocity = event.velocity;
    newEvent.channel = event.channel;
    newEvent.sendAfterMilliseconds(delayInt);
}

function ParameterChanged(param, value) {
    params[param] = value;
}

function isWithin(vel, minIdx, maxIdx) {
    return (vel >= params[minIdx] && vel <= params[maxIdx]);
}

function processUACC(vel) {
    // 1. LEGATOS
    if (params[4] === 1 && isWithin(vel, 5, 6)) { 
        currentMode = "legato"; currentDelay = params[7]; logTrace("✅ UACC: Legato 1 | Delay: " + currentDelay); return true; 
    }
    if (params[8] === 1 && isWithin(vel, 9, 10)) { 
        currentMode = "legato"; currentDelay = params[11]; logTrace("✅ UACC: Legato 2 | Delay: " + currentDelay); return true; 
    }

    // 2. LONGS
    if (params[12] > 0 && isWithin(vel, 13, 14)) { 
        currentMode = "long"; currentDelay = (params[12] === 1) ? params[2] : params[15]; logTrace("✅ UACC: Long 1 | Delay: " + currentDelay); return true; 
    }
    if (params[16] > 0 && isWithin(vel, 17, 18)) { 
        currentMode = "long"; currentDelay = (params[16] === 1) ? params[2] : params[19]; logTrace("✅ UACC: Long 2 | Delay: " + currentDelay); return true; 
    }
    if (params[20] > 0 && isWithin(vel, 21, 22)) { 
        currentMode = "long"; currentDelay = (params[20] === 1) ? params[2] : params[23]; logTrace("✅ UACC: Long 3 | Delay: " + currentDelay); return true; 
    }
    if (params[24] > 0 && isWithin(vel, 25, 26)) { 
        currentMode = "long"; currentDelay = (params[24] === 1) ? params[2] : params[27]; logTrace("✅ UACC: Long 4 | Delay: " + currentDelay); return true; 
    }

    // 3. SHORTS
    if (params[28] > 0 && isWithin(vel, 29, 30)) { 
        currentMode = "short"; currentDelay = (params[28] === 1) ? params[3] : params[31]; logTrace("✅ UACC: Short 1 | Delay: " + currentDelay); return true; 
    }
    if (params[32] > 0 && isWithin(vel, 33, 34)) { 
        currentMode = "short"; currentDelay = (params[32] === 1) ? params[3] : params[35]; logTrace("✅ UACC: Short 2 | Delay: " + currentDelay); return true; 
    }
    if (params[36] > 0 && isWithin(vel, 37, 38)) { 
        currentMode = "short"; currentDelay = (params[36] === 1) ? params[3] : params[39]; logTrace("✅ UACC: Short 3 | Delay: " + currentDelay); return true; 
    }
    if (params[40] > 0 && isWithin(vel, 41, 42)) { 
        currentMode = "short"; currentDelay = (params[40] === 1) ? params[3] : params[43]; logTrace("✅ UACC: Short 4 | Delay: " + currentDelay); return true; 
    }

    return false;
}

function HandleMIDI(event) {
    var isNoteOn  = (event instanceof NoteOn && event.velocity > 0);
    var isNoteOff = (event instanceof NoteOff || (event instanceof NoteOn && event.velocity === 0));

    // The UACC Trigger Note
    var uaccNote = params[1];

    // 1. UACC KEYSWITCH (Detects trigger note and reads Velocity)
    if (isNoteOn && event.pitch =