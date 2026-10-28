// =======================================
// SALT 6 - KS Spitfire UACC Module v7.0
// =======================================

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

// Zone layout: [state parameter, mode, global delay parameter, debug label].
// Each state is followed by Min, Max and Custom Delay in PluginParameters.
// Order preserves the original first-match priority: Legatos, Longs, Shorts.
var articulationZones = [
    [4, "legato", -1, "Legato 1"],
    [8, "legato", -1, "Legato 2"],
    [12, "long", 2, "Long 1"],
    [16, "long", 2, "Long 2"],
    [20, "long", 2, "Long 3"],
    [24, "long", 2, "Long 4"],
    [28, "short", 3, "Short 1"],
    [32, "short", 3, "Short 2"],
    [36, "short", 3, "Short 3"],
    [40, "short", 3, "Short 4"]
];

function processUACC(vel) {
    for (var i = 0; i < articulationZones.length; i++) {
        var zone = articulationZones[i];
        var state = zone[0];
        if ((zone[2] < 0 ? params[state] === 1 : params[state] > 0) && vel >= params[state + 1] && vel <= params[state + 2]) {
            currentMode = zone[1];
            currentDelay = (zone[2] >= 0 && params[state] === 1)
                ? params[zone[2]] : params[state + 3];
            logTrace("✅ UACC: " + zone[3] + " | Delay: " + currentDelay);
            return true;
        }
    }
    return false;
}

function HandleMIDI(event) {
    var isNoteOn  = (event instanceof NoteOn && event.velocity > 0);
    var isNoteOff = (event instanceof NoteOff || (event instanceof NoteOn && event.velocity === 0));

    // The UACC Trigger Note
    var uaccNote = params[1];

    // 1. UACC KEYSWITCH (Detects trigger note and reads Velocity)
    if (isNoteOn && event.pitch === uaccNote) {
        var recognized = processUACC(event.velocity);
        if (!recognized) {
            currentMode = "none";
            currentDelay = 0;
            logTrace("⚠️ UACC Ignored/Off (Vel: " + event.velocity + ") -> Mode Reset");
        }
        event.send();
        return;
    }

    // 2. MUSICAL NOTES
    if (isNoteOn && event.pitch !== uaccNote) {
        var delayToApply = 0;

        if (currentMode === "legato") {
            delayToApply = (activeNotes === 0) ? params[0] : currentDelay;
            logTrace("🎵 Note IN (Legato) - Pitch: " + event.pitch + " | Delay: " + delayToApply + "ms");
        } 
        else if (currentMode === "long" || currentMode === "short") {
            delayToApply = currentDelay;
            logTrace("🎵 Note IN (" + currentMode + ") - Pitch: " + event.pitch + " | Delay: " + delayToApply + "ms");
        }
        else {
            delayToApply = 0;
            logTrace("🎵 Note IN (OFF/None) - Pitch: " + event.pitch + " | Delay: 0ms");
        }

        activeNotes++;
        lastNoteDelay = delayToApply; // Update CC memory
        delayMemory[event.pitch] = delayToApply;
        sendWithSafeDelay(event, delayToApply);
    }

    // 3. NOTE OFF
    else if (isNoteOff) {
        if (event.pitch !== uaccNote) {
            if (activeNotes > 0) activeNotes--;
            var storedDelay = delayMemory[event.pitch] || 0;
            
            logTrace("🔇 Note OUT - Pitch: " + event.pitch + " | Delay: " + storedDelay + "ms | Remaining Notes: " + activeNotes);
            sendWithSafeDelay(event, storedDelay);
        } else {
            event.send(); // Releasing the UACC trigger note has no delay
        }
    }
    
    // 4. CONTINUOUS DATA (CC Sync)
    else {
        var ccDelay = 0;

        if (currentMode === "legato") {
            if (activeNotes === 0) {
                // CCs before attack receive Track Delay
                ccDelay = params[0];
            } else {
                // CCs mid-legato phrase receive transition latency
                ccDelay = lastNoteDelay;
            }
        } 
        else if (currentMode === "long" || currentMode === "short") {
            // Short/Long articulations follow current delay
            ccDelay = currentDelay;
        }
        else {
            // No mode = direct pass-through
            ccDelay = 0;
        }

        sendWithSafeDelay(event, ccDelay);
    }
}

function Reset() {
    activeNotes   = 0;
    delayMemory   = {};
    currentMode   = "none";
    currentDelay  = 0;
    lastNoteDelay = 0;
    logTrace("🔄 SCRIPT RESET");
}
