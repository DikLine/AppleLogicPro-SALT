// =========================
// SALT 4 - KS Module v5.3
// =========================

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

// 🎛️ INTERFACE - 44 Parameters
var PluginParameters = [
    // --- GLOBALS (0 to 2) ---
    {name: "Track Delay [Leg 1st Note]", type: "lin", minValue: 0, maxValue: 400, numberOfSteps: 400, defaultValue: 0}, 
    {name: "Global Longs Delay", type: "lin", minValue: 0, maxValue: 400, numberOfSteps: 400, defaultValue: 0}, 
    {name: "Global Shorts Delay", type: "lin", minValue: 0, maxValue: 400, numberOfSteps: 400, defaultValue: 0}, 
    
    // --- LEGATO ZONES (3 to 10) ---
    {name: "🟡 Legato 1️⃣ State",  type: "menu", valueStrings: optLegato, defaultValue: 0}, 
    {name: "Legato 1 Min KS", type: "menu", valueStrings: midiNotes, defaultValue: 1}, 
    {name: "Legato 1 Max KS", type: "menu", valueStrings: midiNotes, defaultValue: 1}, 
    {name: "Legato 1 Custom Delay", type: "lin", minValue: 0, maxValue: 400, numberOfSteps: 400, defaultValue: 0}, 
    
    {name: "🟡 Legato 2️⃣ State",  type: "menu", valueStrings: optLegato, defaultValue: 0}, 
    {name: "Legato 2 Min KS", type: "menu", valueStrings: midiNotes, defaultValue: 2}, 
    {name: "Legato 2 Max KS", type: "menu", valueStrings: midiNotes, defaultValue: 2}, 
    {name: "Legato 2 Custom Delay", type: "lin", minValue: 0, maxValue: 400, numberOfSteps: 400, defaultValue: 0}, 

    // --- LONG ZONES (11 to 26) ---
    {name: "🔵 Long(s) 1️⃣ State", type: "menu", valueStrings: optArtic, defaultValue: 1}, 
    {name: "Long(s) 1 Min KS", type: "menu", valueStrings: midiNotes, defaultValue: 3}, 
    {name: "Long(s) 1 Max KS", type: "menu", valueStrings: midiNotes, defaultValue: 3}, 
    {name: "Long(s) 1 Custom Delay", type: "lin", minValue: 0, maxValue: 400, numberOfSteps: 400, defaultValue: 0}, 

    {name: "🔵 Long(s) 2️⃣ State", type: "menu", valueStrings: optArtic, defaultValue: 0}, 
    {name: "Long(s) 2 Min KS", type: "menu", valueStrings: midiNotes, defaultValue: 4}, 
    {name: "Long(s) 2 Max KS", type: "menu", valueStrings: midiNotes, defaultValue: 4}, 
    {name: "Long(s) 2 Custom Delay", type: "lin", minValue: 0, maxValue: 400, numberOfSteps: 400, defaultValue: 0}, 

    {name: "🔵 Long(s) 3️⃣ State", type: "menu", valueStrings: optArtic, defaultValue: 0}, 
    {name: "Long(s) 3 Min KS", type: "menu", valueStrings: midiNotes, defaultValue: 5}, 
    {name: "Long(s) 3 Max KS", type: "menu", valueStrings: midiNotes, defaultValue: 5}, 
    {name: "Long(s) 3 Custom Delay", type: "lin", minValue: 0, maxValue: 400, numberOfSteps: 400, defaultValue: 0}, 

    {name: "🔵 Long(s) 4️⃣ State", type: "menu", valueStrings: optArtic, defaultValue: 0}, 
    {name: "Long(s) 4 Min KS", type: "menu", valueStrings: midiNotes, defaultValue: 6}, 
    {name: "Long(s) 4 Max KS", type: "menu", valueStrings: midiNotes, defaultValue: 6}, 
    {name: "Long(s) 4 Custom Delay", type: "lin", minValue: 0, maxValue: 400, numberOfSteps: 400, defaultValue: 0}, 

    // --- SHORT ZONES (27 to 42) ---
    {name: "🟢 Short(s) 1️⃣ State", type: "menu", valueStrings: optArtic, defaultValue: 1}, 
    {name: "Short(s) 1 Min KS", type: "menu", valueStrings: midiNotes, defaultValue: 7}, 
    {name: "Short(s) 1 Max KS", type: "menu", valueStrings: midiNotes, defaultValue: 7}, 
    {name: "Short(s) 1 Custom Delay", type: "lin", minValue: 0, maxValue: 400, numberOfSteps: 400, defaultValue: 0}, 

    {name: "🟢 Short(s) 2️⃣ State", type: "menu", valueStrings: optArtic, defaultValue: 0}, 
    {name: "Short(s) 2 Min KS", type: "menu", valueStrings: midiNotes, defaultValue: 8}, 
    {name: "Short(s) 2 Max KS", type: "menu", valueStrings: midiNotes, defaultValue: 8}, 
    {name: "Short(s) 2 Custom Delay", type: "lin", minValue: 0, maxValue: 400, numberOfSteps: 400, defaultValue: 0}, 

    {name: "🟢 Short(s) 3️⃣ State", type: "menu", valueStrings: optArtic, defaultValue: 0}, 
    {name: "Short(s) 3 Min KS", type: "menu", valueStrings: midiNotes, defaultValue: 9}, 
    {name: "Short(s) 3 Max KS", type: "menu", valueStrings: midiNotes, defaultValue: 9}, 
    {name: "Short(s) 3 Custom Delay", type: "lin", minValue: 0, maxValue: 400, numberOfSteps: 400, defaultValue: 0}, 

    {name: "🟢 Short(s) 4️⃣ State", type: "menu", valueStrings: optArtic, defaultValue: 0}, 
    {name: "Short(s) 4 Min KS", type: "menu", valueStrings: midiNotes, defaultValue: 10}, 
    {name: "Short(s) 4 Max KS", type: "menu", valueStrings: midiNotes, defaultValue: 10}, 
    {name: "Short(s) 4 Custom Delay", type: "lin", minValue: 0, maxValue: 400, numberOfSteps: 400, defaultValue: 0}, 

    // --- DEBUG ---
    {name: "🪲 Debug Trace", type: "menu", valueStrings: ["Off", "On"], defaultValue: 0} 
];

var params = new Array(44).fill(0);

var activeNotes   = 0;
var delayMemory   = {};
var currentMode   = "none"; 
var currentDelay  = 0;
var lastNoteDelay = 0; // Stores delay memory for upcoming Control Changes

function logTrace(msg) {
    if (params[43] === 1) Trace(msg);
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
        // Send CC, Pitchbend, Aftertouch directly with delay
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
    [3, "legato", -1, "Legato Range 1"],
    [7, "legato", -1, "Legato Range 2"],
    [11, "long", 1, "Long Range 1"],
    [15, "long", 1, "Long Range 2"],
    [19, "long", 1, "Long Range 3"],
    [23, "long", 1, "Long Range 4"],
    [27, "short", 2, "Short Range 1"],
    [31, "short", 2, "Short Range 2"],
    [35, "short", 2, "Short Range 3"],
    [39, "short", 2, "Short Range 4"]
];

function findKSZone(pitch) {
    for (var i = 0; i < articulationZones.length; i++) {
        var zone = articulationZones[i];
        var state = zone[0];
        if ((zone[2] < 0 ? params[state] === 1 : params[state] > 0) && pitch >= params[state + 1] && pitch <= params[state + 2]) {
            return zone;
        }
    }
    return null;
}

function isAnyKSValid(pitch) {
    return findKSZone(pitch) !== null;
}

function processKeyswitch(ks) {
    var zone = findKSZone(ks);
    if (!zone) return false;

    currentMode = zone[1];
    currentDelay = (zone[2] >= 0 && params[zone[0]] === 1)
        ? params[zone[2]] : params[zone[0] + 3];
    logTrace("✅ KS: " + zone[3] + " | Delay: " + currentDelay);
    return true;
}

function HandleMIDI(event) {
    var isNoteOn  = (event instanceof NoteOn && event.velocity > 0);
    var isNoteOff = (event instanceof NoteOff || (event instanceof NoteOn && event.velocity === 0));

    // 1. KEYSWITCHES (Direct Hierarchy - Pass through without delay)
    if (isNoteOn && isAnyKSValid(event.pitch)) {
        processKeyswitch(event.pitch);
        event.send();
        return;
    }

    // 2. MUSICAL NOTES
    if (isNoteOn) {
        var delayToApply = 0;

        if (currentMode === "legato") {
            // Apply Track Delay on the first note, Custom Delay for the following legato notes
            delayToApply = (activeNotes === 0) ? params[0] : currentDelay;
            logTrace("🎵 Note IN (Legato) - Pitch: " + event.pitch + " | Delay: " + delayToApply + "ms");
        } 
        else if (currentMode === "long" || currentMode === "short") {
            delayToApply = currentDelay;
            logTrace("🎵 Note IN (" + currentMode + ") - Pitch: " + event.pitch + " | Delay: " + delayToApply + "ms");
        }
        else {
            delayToApply = 0;
            logTrace("🎵 Note IN (Modo OFF / No Delay) - Pitch: " + event.pitch + " | Delay: 0ms");
        }

        activeNotes++;
        lastNoteDelay = delayToApply; // Store delay memory for subsequent CCs
        delayMemory[event.pitch] = delayToApply;
        sendWithSafeDelay(event, delayToApply);
    }

    // 3. NOTE OFF
    else if (isNoteOff) {
        if (isAnyKSValid(event.pitch)) {
            event.send(); // Releasing a KS note has no delay
        } else {
            if (activeNotes > 0) activeNotes--;
            var storedDelay = delayMemory[event.pitch] || 0;
            
            logTrace("🔇 Note OUT - Pitch: " + event.pitch + " | Delay: " + storedDelay + "ms | Remaining Notes: " + activeNotes);
            sendWithSafeDelay(event, storedDelay);
        }
    }
    
    // 4. CONTROL CHANGES & CONTINUOUS DATA (CC Sync)
    else {
        var ccDelay = 0;

        if (currentMode === "legato") {
            if (activeNotes === 0) {
                // CCs drawn before the initial attack inherit the Track Delay
                ccDelay = params[0]; 
            } else {
                // CCs drawn during a legato phrase inherit the ongoing transition latency
                ccDelay = lastNoteDelay; 
            }
        } 
        else if (currentMode === "long" || currentMode === "short") {
            // In discrete articulations, CCs inherit the current defined delay
            ccDelay = currentDelay;
        }
        else {
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
