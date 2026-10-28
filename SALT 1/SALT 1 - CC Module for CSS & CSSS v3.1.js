// ========================================
// SALT 1 - CC Module for CSS & CSSS v3.1
// ========================================
var PluginParameters = [
    {name: "Track Delay [Leg 1st Note]", type: "lin", minValue: 0, maxValue: 400, numberOfSteps: 400, defaultValue: 333},
    {name: "Keyswitch CC (e.g. 58)", type: "lin", minValue: 0, maxValue: 127, numberOfSteps: 127, defaultValue: 58},
    {name: "Shorts Delay", type: "lin", minValue: 0, maxValue: 400, numberOfSteps: 400, defaultValue: 278},
    {name: "Legato Low Latency Delay", type: "lin", minValue: 0, maxValue: 400, numberOfSteps: 400, defaultValue: 183},
    {name: "Leg Expressive Slow Delay", type: "lin", minValue: 0, maxValue: 400, numberOfSteps: 400, defaultValue: 0},
    {name: "Leg Expressive Med Delay", type: "lin", minValue: 0, maxValue: 400, numberOfSteps: 400, defaultValue: 83},
    {name: "Leg Expressive Fast Delay", type: "lin", minValue: 0, maxValue: 400, numberOfSteps: 400, defaultValue: 233}
];

var TRACK_DELAY_MS = 333;
var CC_NUM = 58;
var genericDelay = 278;
var lowLatencyLegatoDelay = 183;
var expressiveLegatoSlowDelay = 0;
var expressiveLegatoMediumDelay = 83;
var expressiveLegatoFastDelay = 233;

var currentGlobalDelay = 250; // Initial non-legato delay; updated when the Shorts Delay parameter changes.
var isLowLatencyLegato = false;
var isExpressiveLegato = false;
var lastNoteDelay = 278; // Stores the note delay used to synchronize subsequent controller events.

function ParameterChanged(param, value) {
    if      (param === 0) TRACK_DELAY_MS = value;
    else if (param === 1) CC_NUM = value;
    else if (param === 2) { genericDelay = value; currentGlobalDelay = value; } 
    else if (param === 3) lowLatencyLegatoDelay = value;
    else if (param === 4) expressiveLegatoSlowDelay = value;
    else if (param === 5) expressiveLegatoMediumDelay = value;
    else if (param === 6) expressiveLegatoFastDelay = value;
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
            delayToApply = lowLatencyLegatoDelay;
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
    isLowLatencyLegato = false;
    isExpressiveLegato = false;
    lastNoteDelay = genericDelay;
}
