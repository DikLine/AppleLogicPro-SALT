// =================================
// SALT 3 - CC Module for CSW v3.1
// =================================
var PluginParameters = [
    {name: "Track Delay [1st Note] (ms)", type: "lin", minValue: 0, maxValue: 400, numberOfSteps: 400, defaultValue: 220},
    {name: "Keyswitch CC (e.g. 58)", type: "lin", minValue: 0, maxValue: 127, numberOfSteps: 127, defaultValue: 58},
    {name: "Shorts Delay (ms)", type: "lin", minValue: 0, maxValue: 400, numberOfSteps: 400, defaultValue: 160},
    {name: "Leg Low Latency Med Delay", type: "lin", minValue: 0, maxValue: 400, numberOfSteps: 400, defaultValue: 130},
    {name: "Leg Low Latency Fast Delay", type: "lin", minValue: 0, maxValue: 400, numberOfSteps: 400, defaultValue: 150},
    {name: "Leg Expressive Slow Delay", type: "lin", minValue: 0, maxValue: 400, numberOfSteps: 400, defaultValue: 0},
    {name: "Leg Expressive Med Delay", type: "lin", minValue: 0, maxValue: 400, numberOfSteps: 400, defaultValue: 90},
    {name: "Leg Expressive Fast Delay", type: "lin", minValue: 0, maxValue: 400, numberOfSteps: 400, defaultValue: 130}
];

var TRACK_DELAY_MS = 220;
var CC_NUM = 58;
var genericDelay = 160;
var lowLatencyLegatoMediumDelay = 130;
var lowLatencyLegatoFastDelay = 150;
var expressiveLegatoSlowDelay = 0;
var expressiveLegatoMediumDelay = 90;
var expressiveLegatoFastDelay = 130;

var currentGlobalDelay = 160; // Initial non-legato delay; updated when the Shorts Delay parameter changes.
var isLowLatencyLegato = false;
var isExpressiveLegato = false;
var lastNoteDelay = 160; // Stores the note delay used to synchronize subsequent controller events.

function ParameterChanged(param, value) {
    if      (param === 0) TRACK_DELAY_MS = value;
    else if (param === 1) CC_NUM = value;
    else if (param === 2) { genericDelay = value; currentGlobalDelay = value; } // Update both the configured and current non-legato delays.
    else if (param === 3) lowLatencyLegatoMediumDelay = value;
    else if (param === 4) lowLatencyLegatoFastDelay = value;
    else if (param === 5) expressiveLegatoSlowDelay = value;
    else if (param === 6) expressiveLegatoMediumDelay = value;
    else if (param === 7) expressiveLegatoFastDelay = value;
}

var activeNotes = 0;
var noteDelayMemory = {};

function HandleMIDI(event) {
    // Articulation-switch CCs always pass through without delay.
    if (event instanceof ControlChange && event.number === CC_NUM) {
        var value = event.value;
        isLowLatencyLegato = value >= 1 && value <= 5;
        isExpressiveLegato = value >= 6 && value <= 10;
        if (!isLowLatencyLegato && !isExpressiveLegato) currentGlobalDelay = genericDelay;
        event.send();
        return;
    }

    var legatoActive = isLowLatencyLegato || isExpressiveLegato;
    var delayToApply = currentGlobalDelay;

    if (event instanceof NoteOn) {
        // First legato note offsets the track advance; overlaps use transition timing.
        if (legatoActive && activeNotes === 0) {
            delayToApply = TRACK_DELAY_MS;
        } else if (isLowLatencyLegato) {
            delayToApply = (event.velocity <= 64 ? lowLatencyLegatoMediumDelay : lowLatencyLegatoFastDelay);
        } else if (isExpressiveLegato) {
            if (event.velocity <= 64) delayToApply = expressiveLegatoSlowDelay;
            else if (event.velocity <= 100) delayToApply = expressiveLegatoMediumDelay;
            else delayToApply = expressiveLegatoFastDelay;
        }
        lastNoteDelay = delayToApply;
        activeNotes++;
        noteDelayMemory[event.pitch] = delayToApply;
    } else if (event instanceof NoteOff) {
        if (activeNotes > 0) activeNotes--;
        delayToApply = noteDelayMemory[event.pitch] || 0;
    } else if (legatoActive) {
        // Controllers follow first-note timing before a phrase, then its last note.
        delayToApply = activeNotes === 0 ? TRACK_DELAY_MS : lastNoteDelay;
    }

    // One shared output path for notes and all other non-switch MIDI events.
    if (delayToApply > 0) event.sendAfterMilliseconds(Math.round(delayToApply));
    else event.send();
}

function Reset() {
    activeNotes = 0;
    noteDelayMemory = {};
    currentGlobalDelay = genericDelay;
    isExpressiveLegato = false;
    isLowLatencyLegato = false;
    lastNoteDelay = genericDelay;
}
