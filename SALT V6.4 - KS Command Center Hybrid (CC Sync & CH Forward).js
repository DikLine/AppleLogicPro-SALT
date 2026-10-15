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

    {name: "🔵 Long(s) 4️⃣ Delay State",  type: "menu", valueStrings: optArtic, defaultValue: 0},
    {name: "Long(s) 4 Min Ch", type: "menu", valueStrings: midiChannels, defaultValue: 0},
    {name: "Long(s) 4 Max Ch", type: "menu", valueStrings: midiChannels, defaultValue: 15},
    {name: "Long(s) 4 KS State", type: "checkbox", defaultValue: 0},
    {name: "Long(s) 4 Min KS", type: "menu", valueStrings: midiNotes, defaultValue: 6},
    {name: "Long(s) 4 Max KS", type: "menu", valueStrings: midiNotes, defaultValue: 6},
    {name: "Long(s) 4 Custom Delay", type: "lin", minValue: 0, maxValue: 400, numberOfSteps: 400, defaultValue: 0},

    // --- SHORT ZONES (45 to 72) ---
    {name: "🟢 Short(s) 1️⃣ Delay State",  type: "menu", valueStrings: optArtic, defaultValue: 1},
    {name: "Short(s) 1 Min Ch", type: "menu", valueStrings: midiChannels, defaultValue: 0},
    {name: "Short(s) 1 Max Ch", type: "menu", valueStrings: midiChannels, defaultValue: 15},
    {name: "Short(s) 1 KS State", type: "checkbox", defaultValue: 0},
    {name: "Short(s) 1 Min KS", type: "menu", valueStrings: midiNotes, defaultValue: 7},
    {name: "Short(s) 1 Max KS", type: "menu", valueStrings: midiNotes, defaultValue: 7},
    {name: "Short(s) 1 Custom Delay", type: "lin", minValue: 0, maxValue: 400, numberOfSteps: 400, defaultValue: 0},

    {name: "🟢 Short(s) 2️⃣ Delay State",  type: "menu", valueStrings: optArtic, defaultValue: 0},
    {name: "Short(s) 2 Min Ch", type: "menu", valueStrings: midiChannels, defaultValue: 0},
    {name: "Short(s) 2 Max Ch", type: "menu", valueStrings: midiChannels, defaultValue: 15},
    {name: "Short(s) 2 KS State", type: "checkbox", defaultValue: 0},
    {name: "Short(s) 2 Min KS", type: "menu", valueStrings: midiNotes, defaultValue: 8},
    {name: "Short(s) 2 Max KS", type: "menu", valueStrings: midiNotes, defaultValue: 8},
    {name: "Short(s) 2 Custom Delay", type: "lin", minValue: 0, maxValue: 400, numberOfSteps: 400, defaultValue: 0},

    {name: "🟢 Short(s) 3️⃣ Delay State",  type: "menu", valueStrings: optArtic, defaultValue: 0},
    {name: "Short(s) 3 Min Ch", type: "menu", valueStrings: midiChannels, defaultValue: 0},
    {name: "Short(s) 3 Max Ch", type: "menu", valueStrings: midiChannels, defaultValue: 15},
    {name: "Short(s) 3 KS State", type: "checkbox", defaultValue: 0},
    {name: "Short(s) 3 Min KS", type: "menu", valueStrings: midiNotes, defaultValue: 9},
    {name: "Short(s) 3 Max KS", type: "menu", valueStrings: midiNotes, defaultValue: 9},
    {name: "Short(s) 3 Custom Delay", type: "lin", minValue: 0, maxValue: 400, numberOfSteps: 400, defaultValue: 0},

    {name: "🟢 Short(s) 4️⃣ Delay State",  type: "menu", valueStrings: optArtic, defaultValue: 0},
    {name: "Short(s) 4 Min Ch", type: "menu", valueStrings: midiChannels, defaultValue: 0},
    {name: "Short(s) 4 Max Ch", type: "menu", valueStrings: midiChannels, defaultValue: 15},
    {name: "Short(s) 4 KS State", type: "checkbox", defaultValue: 0},
    {name: "Short(s) 4 Min KS", type: "menu", valueStrings: midiNotes, defaultValue: 10},
    {name: "Short(s) 4 Max KS", type: "menu", valueStrings: midiNotes, defaultValue: 10},
    {name: "Short(s) 4 Custom Delay", type: "lin", minValue: 0, maxValue: 400, numberOfSteps: 400, defaultValue: 0},

    // --- DEBUG ---
    {name: "🪲 Debug Trace", type: "menu", valueStrings: ["Off", "On"], defaultValue: 0}
];

var params = new Array(74).fill(0);
var activeNotes   = 0;
var delayMemory   = {};
var currentMode   = "none"; 
var currentDelay  = 0;

var lastNoteMode  = "none"; // Stores the mode of the last played note (Hybrid processing)
var lastNoteDelay = 0;      // Stores the delay of the last played note (CC Sync)

function logTrace(msg) {
    if (params[73] === 1) Trace(msg);
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

// 🎯 KEYSWITCH RADAR / DETECTOR
function isValidKS(pitch, channel) {
    if (params[3] === 1 && params[6] === 1 && pitch >= params[7] && pitch <= params[8] && channel >= params[4] && channel <= params[5]) return true;
    if (params[10] === 1 && params[13] === 1 && pitch >= params[14] && pitch <= params[15] && channel >= params[11] && channel <= params[12]) return true;

    if (params[17] > 0 && params[20] === 1 && pitch >= params[21] && pitch <= params[22] && channel >= params[18] && channel <= params[19]) return true;
    if (params[24] > 0 && params[27] === 1 && pitch >= params[28] && pitch <= params[29] && channel >= params[25] && channel <= params[26]) return true;
    if (params[31] > 0 && params[34] === 1 && pitch >= params[35] && pitch <= params[36] && channel >= params[32] && channel <= params[33]) return true;
    if (params[38] > 0 && params[41] === 1 && pitch >= params[42] && pitch <= params[43] && channel >= params[39] && channel <= params[40]) return true;

    if (params[45] > 0 && params[48] === 1 && pitch >= params[49] && pitch <= params[50] && channel >= params[46] && channel <= params[47]) return true;
    if (params[52] > 0 && params[55] === 1 && pitch >= params[56] && pitch <= params[57] && channel >= params[53] && channel <= params[54]) return true;
    if (params[59] > 0 && params[62] === 1 && pitch >= params[63] && pitch <= params[64] && channel >= params[60] && channel <= params[61]) return true;
    if (params[66] > 0 && params[69] === 1 && pitch >= params[70] && pitch <= params[71] && channel >= params[67] && channel <= params[68]) return true;

    return false;
}

function processKeyswitch(ks, channel) {
    if (params[3] === 1 && params[6] === 1 && ks >= params[7] && ks <= params[8] && channel >= params[4] && channel <= params[5]) { 
        currentMode = "legato"; currentDelay = params[9]; logTrace("✅ KS: Legato 1 | Delay: " + currentDelay); return; 
    }
    if (params[10] === 1 && params[13] === 1 && ks >= params[14] && ks <= params[15] && channel >= params[11] && channel <= params[12]) { 
        currentMode = "legato"; currentDelay = params[16]; logTrace("✅ KS: Legato 2 | Delay: " + currentDelay); return; 
    }

    if (params[17] > 0 && params[20] === 1 && ks >= params[21] && ks <= params[22] && channel >= params[18] && channel <= params[19]) { 
        currentMode = "long"; currentDelay = (params[17] === 1) ? params[1] : params[23]; logTrace("✅ KS: Long 1 | Delay: " + currentDelay); return; 
    }
    if (params[24] > 0 && params[27] === 1 && ks >= params[28] && ks <= params[29] && channel >= params[25] && channel <= params[26]) { 
        currentMode = "long"; currentDelay = (params[24] === 1) ? params[1] : params[30]; logTrace("✅ KS: Long 2 | Delay: " + currentDelay); return; 
    }
    if (params[31] > 0 && params[34] === 1 && ks >= params[35] && ks <= params[36] && channel >= params[32] && channel <= params[33]) { 
        currentMode = "long"; currentDelay = (params[31] === 1) ? params[1] : params[37]; logTrace("✅ KS: Long 3 | Delay: " + currentDelay); return; 
    }
    if (params[38] > 0 && params[41] === 1 && ks >= params[42] && ks <= params[43] && channel >= params[39] && channel <= params[40]) { 
        currentMode = "long"; currentDelay = (params[38] === 1) ? params[1] : params[44]; logTrace("✅ KS: Long 4 | Delay: " + currentDelay); return; 
    }

    if (params[45] > 0 && params[48] === 1 && ks >= params[49] && ks <= params[50] && channel >= params[46] && channel <= params[47]) { 
        currentMode = "short"; currentDelay = (params[45] === 1) ? params[2] : params[51]; logTrace("✅ KS: Short 1 | Delay: " + currentDelay); return; 
    }
    if (params[52] > 0 && params[55] === 1 && ks >= params[56] && ks <= params[57] && channel >= params[53] && channel <= params[54]) { 
        currentMode = "short"; currentDelay = (params[52] === 1) ? params[2] : params[58]; logTrace("✅ KS: Short 2 | Delay: " + currentDelay); return; 
    }
    if (params[59] > 0 && params[62] === 1 && ks >= params[63] && ks <= params[64] && channel >= params[60] && channel <= params[61]) { 
        currentMode = "short"; currentDelay = (params[59] === 1) ? params[2] : params[65]; logTrace("✅ KS: Short 3 | Delay: " + currentDelay); return; 
    }
    if (params[66] > 0 && params[69] === 1 && ks >= params[70] && ks <= params[71] && channel >= params[67] && channel <= params[68]) { 
        currentMode = "short"; currentDelay = (params[66] === 1) ? params[2] : params[72]; logTrace("✅ KS: Short 4 | Delay: " + currentDelay); return; 
    }
}

// 🎯 HYBRID RADAR ("Pure Channels") - Identifies if channel triggers an articulation natively
function checkDirectChannel(channel) {
    if (params[3] === 1 && params[6] === 0 && channel >= params[4] && channel <= params[5]) return {mode: "legato", delay: params[9]};
    if (params[10] === 1 && params[13] === 0 && channel >= params[11] && channel <= params[12]) return {mode: "legato", delay: params[16]};

    if (params[17] > 0 && params[20] === 0 && channel >= params[18] && channel <= params[19]) return {mode: "long", delay: (params[17] === 1) ? params[1] : params[23]};
    if (params[24] > 0 && params[27] === 0 && channel >= params[25] && channel <= params[26]) return {mode: "long", delay: (params[24] === 1) ? params[1] : params[30]};
    if (params[31] > 0 && params[34] === 0 && channel >= params[32] && channel <= params[33]) return {mode: "long", delay: (params[31] === 1) ? params[1] : params[37]};
    if (params[38] > 0 && params[41] === 0 && channel >= params[39] && channel <= params[40]) return {mode: "long", delay: (params[38] === 1) ? params[1] : params[44]};

    if (params[45] > 0 && params[48] === 0 && channel >= params[46] &