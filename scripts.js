// listen for DOM content to load.
$(document).ready(function () {
    console.log("Loading..");
    $(keysUpper).toggle();
    letterWatcher();
});

// save old key background color.
let oldBg = $('#126').css("background-color");

// shortcut variables.
let keysUpper = '#keyboard-upper-container';
let keysLower = '#keyboard-lower-container';

// BEGIN shift listening.
let shiftPressed = false;
$(document).bind('keydown', function (event) {
    if (event.which === 16) {
        shiftPressed = true;
    }
})
$(document).bind('keyup', function (event) {
    if (event.which === 16) {
        shiftPressed = false;
    }
})
$(document).bind('keydown keyup', function (event) {
    if (shiftPressed === true) {
        $(keysUpper).show();
        $(keysLower).hide();
    } else {
        $(keysUpper).hide();
        $(keysLower).show();
    }
})
// END shift listening.

// BEGIN hilighting.
let keyPressed;
$(document).keypress(function (event) {
    keyCheck(event);
    keyHilight();
});
function keyCheck(event) {
    keyPressed = event.keyCode;
    keyValue = String.fromCharCode(event.which);
    // console.log(keyValue);
}
function keyHilight() {
    $(`#${keyPressed}`).css("background-color", "#ffff00");
}
$(document).bind('keyup', function (event) {
    $('.key').css("background-color", oldBg);
});
// END hilighting.

// BEGIN sentence/letter update.
let sentences = ['ten ate neite ate nee enet ite ate inet ent eate', 'Too ato too nOt enot one totA not anot tOO aNot', 'oat itain oat tain nate eate tea anne inant nean', 'itant eate anot eat nato inate eat anot tain eat', 'nee ene ate ite tent tiet ent ine ene ete ene ate'];
let sentNow = 0;
let charNow = 0;
$(document).keypress(letterWatcher);
function letterWatcher() {
    if (charNow === sentences[sentNow].length) {
        sentNow++;
        charNow = 1;
        updateSent();
        updateChar();
        // console.log("ding");
        // console.log(sentences[sentNow]);
        // console.log(charNow);
    } else {
        updateSent();
        updateChar();
        charNow++;
        // console.log(charNow);
    }
}
function updateSent() {
    $('#sentence').text(sentences[sentNow]);
}
function updateChar() {
    $('#target-letter').text(sentences[sentNow].charAt(charNow));
}

// END sentence/letter update.

console.log("Loaded.");