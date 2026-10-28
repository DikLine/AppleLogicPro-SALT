// ==============================
// SALT 5 - KS & CH Module v6.4
// ==============================

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

// 🎯 ARTICULATION RADAR — parameter order is also the priority order.
// Each zone occupies 7 consecutive PluginParameters; keep their indices unchanged.
var zoneStarts = [3, 10, 17, 24, 31, 38, 45, 52, 59, 66];

function findZone(pitch, channel, useKS) {
    for (var i = 0; i < zoneStarts.length; i++) {
        var p = zoneStarts[i];
        if ((i < 2 ? params[p] === 1 : params[p] > 0) &&
            params[p + 3] === (useKS ? 1 : 0) &&
            channel >= params[p + 1] && channel <= params[p + 2] &&
            (!useKS || (pitch >= params[p + 4] && pitch <= params[p + 5]))) {
            return i;
        }
    }
    return -1;
}

function zoneMode(i) {
    return i < 2 ? "legato" : (i < 6 ? "long" : "short");
}

function zoneDelay(i) {
    var p = zoneStarts[i];
    if (i < 2) return params[p + 6]; // Legato custom delay
    return params[p] === 1 ? params[i < 6 ? 1 : 2] : params[p + 6];
}

function processKeyswitch(i) {
    currentMode = zoneMode(i);
    currentDelay = zoneDelay(i);
    var label = i < 2 ? "Legato " + (i + 1) :
                i < 6 ? "Long " + (i - 1) : "Short " + (i - 5);
    logTrace("✅ KS: " + label + " | Delay: " + currentDelay);
}

// 🎯 HYBRID RADAR ("Pure Channels") — first matching channel wins.
function checkDirectChannel(channel) {
    var i = findZone(0, channel, false);
    return i === -1 ? null : {mode: zoneMode(i), delay: zoneDelay(i)};
}

function HandleMIDI(event) {
    var isNoteOn  = (event instanceof NoteOn && event.velocity > 0);
    var isNoteOff = (event instanceof NoteOff || (event instanceof NoteOn && event.velocity === 0));

    var chIndex = event.channel - 1; 

    // 1. NOTES (ON)
    if (isNoteOn) {
        var ksZone = findZone(event.pitch, chIndex, true);
        if (ksZone !== -1) {
            processKeyswitch(ksZone);
            event.send();
            return;
        }

        var delayToApply = 0;
        var directMatch = checkDirectChannel(chIndex);
        
        var activeMode = directMatch ? directMatch.mode : currentMode;
        var activeDelay = directMatch ? directMatch.delay : currentDelay;

        if (activeMode === "legato") {
            delayToApply = (activeNotes === 0) ? params[0] : activeDelay;
            logTrace("🎵 Note IN (Legato" + (directMatch?" CH-Direct":" KS") + ") - Pitch: " + event.pitch + " | Delay: " + delayToApply + "ms");
        } 
        else if (activeMode === "long" || activeMode === "short") {
            delayToApply = activeDelay;
            logTrace("🎵 Note IN (" + activeMode + (directMatch?" CH-Direct":" KS") + ") - Pitch: " + event.pitch + " | Delay: " + delayToApply + "ms");
        } 
        else {
            delayToApply = 0;
            logTrace("🎵 Note IN (OFF/None) - Pitch: " + event.pitch + " | Delay: 0ms");
        }

        activeNotes++;
        lastNoteMode = activeMode;
        lastNoteDelay = delayToApply;
        delayMemory[event.pitch] = delayToApply;
        sendWithSafeDelay(event, delayToApply);
    } 
    
    // 2. NOTES (OFF)
    else if (isNoteOff) {
        if (findZone(event.pitch, chIndex, true) !== -1) {
            event.send(); 
        } else {
            if (activeNotes > 0) activeNotes--;
            var storedDelay = delayMemory[event.pitch] || 0;
            logTrace("🔇 Note OUT - Pitch: " + event.pitch + " | Delay: " + storedDelay + "ms | Remaining Notes: " + activeNotes);
            sendWithSafeDelay(event, storedDelay);
        }
    } 
    
    // 3. CONTINUOUS DATA (CCs, PitchBend, Aftertouch, etc.)
    else {
        var ccDelay = 0;
        var referenceMode = (lastNoteMode !== "none") ? lastNoteMode : currentMode;
        var referenceDelay = (lastNoteDelay !== 0) ? lastNoteDelay : currentDelay;

        if (referenceMode === "legato") {
            ccDelay = (activeNotes === 0) ? params[0] : referenceDelay;
        } 
        else if (referenceMode === "long" || referenceMode === "short") {
            ccDelay = referenceDelay;
        }

        // --- 🚀 MULTI-CHANNEL FORWARDER (FROM CH 1) ---
        // Clones Ch 1 continuous data to Ch 2-16 to support Logic Pro's Articulation Sets limitations
        if (event.channel === 1 && (event instanceof ControlChange || event instanceof PitchBend || event instanceof ChannelPressure || event instanceof PolyPressure)) {
            
            // A. Send on Channel 1
            sendWithSafeDelay(event, ccDelay);

            // B. Clone to Channels 2 through 16
            for (var c = 2; c <= 16; c++) {
                var clone = null;
                if (event instanceof ControlChange) {
                    clone = new ControlChange(); clone.number = event.number; clone.value = event.value;
                } else if (event instanceof PitchBend) {
                    clone = new PitchBend(); clone.value = event.value;
                } else if (event instanceof ChannelPressure) {
                    clone = new ChannelPressure(); clone.value = event.value;
                } else if (event instanceof PolyPressure) {
                    clone = new PolyPressure(); clone.pitch = event.pitch; clone.value = event.value;
                }
                
                if (clone) {
                    clone.channel = c;
                    sendWithSafeDelay(clone, ccDelay);
                }
            }
        } 
        else {
            // Standard passthrough for non-Ch 1 events or other MIDI data
            sendWithSafeDelay(event, ccDelay);
        }
    }
}

function Reset() {
    activeNotes   = 0;
    delayMemory   = {};
    currentMode   = "none";
    currentDelay  = 0;
    lastNoteMode  = "none";
    lastNoteDelay = 0;
    logTrace("🔄 SCRIPT RESET");
}