// listen for DOM content to load.
$(document).ready(function () {
    console.log("Loading..");
    $(keysUpper).toggle();
    console.log("Loaded.");
});

// shortcut variables.
let keysUpper = '#keyboard-upper-container';
let keysLower = '#keyboard-lower-container';

// test buttons.
$('body').prepend('<button id="toggleLower">Toggle lowercase keys</button>');
$('body').prepend('<button id="toggleUpper">Toggle uppercase keys</button>');
$('#toggleLower').click(function() {
    $(keysLower).toggle();
});
$('#toggleUpper').click(function() {
    $(keysUpper).toggle();
});

// shift listening.
let shiftPressed = false;
$(document).bind('keydown', function(event) {
    if (event.which === 16) {
        shiftPressed = true;
    }
})
$(document).bind('keyup', function(event) {
    if (event.which === 16) {
        shiftPressed = false;
    }
})
$(document).bind('keydown keyup', function(event) {
    if (shiftPressed === true) {
        $(keysUpper).show();
        $(keysLower).hide();
    } else {
        $(keysUpper).hide();
        $(keysLower).show();
    }
})