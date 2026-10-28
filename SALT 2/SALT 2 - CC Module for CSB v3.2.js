// =================================
// SALT 2 - CC Module for CSB v3.2
// =================================
var PluginParameters = [
    {name: "Track Delay [Leg 1st Note]", type: "lin", minValue: 0, maxValue: 400, numberOfSteps: 400, defaultValue: 230},
    {name: "Keyswitch CC (e.g. 58)", type: "lin", minValue: 0, maxValue: 127, numberOfSteps: 127, defaultValue: 58},
    {name: "Shorts Delay", type: "lin", minValue: 0, maxValue: 400, numberOfSteps: 400, defaultValue: 180},
    {name: "Legato Medium Delay", type: "lin", minValue: 0, maxValue: 400, numberOfSteps: 400, defaultValue: 0},
    {name: "Legato Fast Delay", type: "lin", minValue: 0, maxValue: 400, numberOfSteps: 400, defaultValue: 130}
];

var TRACK_DELAY_MS = 230;
var CC_NUM = 58;
var genericDelay = 180;
var legatoMediumDelay = 0;
var legatoFastDelay = 130;

var currentGlobalDelay = 170; // Initial non-legato delay; updated when the Shorts Delay parameter changes.
var isLegato = false;
var lastNoteDelay = 120; // Stores the note delay used to synchronize subsequent controller events.

function ParameterChanged(param, value) {
    if      (param === 0) TRACK_DELAY_MS = value;
    else if (param === 1) CC_NUM = value;
    else if (param === 2) { genericDelay = value; currentGlobalDelay = value; } // Update both the configured and current non-legato delays.
    else if (param === 3) legatoMediumDelay = value;
    else if (param === 4) legatoFastDelay = value;
}

var activeNotes = 0;
var noteDelayMemory = {};

function HandleMIDI(event) {
    // Articulation-switch CCs always pass through without delay.
    if (event instanceof ControlChange && event.number === CC_NUM) {
        isLegato = event.value >= 1 && event.value <= 10;
        if (!isLegato) currentGlobalDelay = genericDelay;
        event.send();
        return;
    }

    var legatoActive = isLegato;
    var delayToApply = currentGlobalDelay;

    if (event instanceof NoteOn) {
        // First legato note offsets the track advance; overlaps use transition timing.
        if (legatoActive) {
            delayToApply = activeNotes === 0 ? TRACK_DELAY_MS
                : (event.velocity <= 64 ? legatoMediumDelay : legatoFastDelay);
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
    isLegato = false;
    lastNoteDelay = genericDelay;
}
