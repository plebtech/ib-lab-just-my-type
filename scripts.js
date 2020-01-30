// DOM ready loader.
$(document).ready(function () {
    console.log("Loading..");
    $(KEYS_UPPER).toggle();
    letterWatcher();
});

// global variables.
const OLD_BG = $('#126').css("background-color"); // save original key bg color.
const SENTENCES = ['ten ate neite ate nee enet ite ate inet ent eate', 'Too ato too nOt enot one totA not anot tOO aNot', 'oat itain oat tain nate eate tea anne inant nean', 'itant eate anot eat nato inate eat anot tain eat', 'nee ene ate ite tent tiet ent ine ene ete ene ate'];
const KEYS_UPPER = '#keyboard-upper-container'; // shortcut.
const KEYS_LOWER = '#keyboard-lower-container'; // shortcut.
let shiftPressed = false; // tracks pressing of shift modifier.
let keyPressed; // tracks current keypress.
let keyValue;   // string of keyPressed.
let sentNow = 0; // tracks which sentence the user is on.
let charNow = 0; // tracks which character the user is on (within the current sentence).

// shift listening.
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
        $(KEYS_UPPER).show();
        $(KEYS_LOWER).hide();
    } else {
        $(KEYS_UPPER).hide();
        $(KEYS_LOWER).show();
    }
})

// keypress functions.
$(document).keypress(keypressMaster);
function keypressMaster() {
    keySet(event);    // sets keyPressed variable.
    keyHilight();       // hilights currently pressed key.
    letterWatcher();    // updates current sentence/character.
    // keyCheck();
}
function keySet(event) {
    keyPressed = event.keyCode;
    keyValue = String.fromCharCode(event.which);
    // console.log(keyValue);
}
function keyHilight() {
    $(`#${keyPressed}`).css("background-color", "#ffff00");
}
// function keyCheck() {
//     console.log(keyValue);
//     console.log(SENTENCES[sentNow].charCodeAt(charNow));
//     if (keyPressed === charNow) {
//         $('#feedback').html('<span class="glyphicon glyphicon-ok"></span>');
//         console.log("ok");
//     } else {
//         $('#feedback').html('<span class="glyphicon glyphicon-remove"></span>');
//         console.log("bad");
//     }
// }
$(document).bind('keyup', function (event) {
    $('.key').css("background-color", OLD_BG);
});
function letterWatcher() {
    if (charNow === SENTENCES[sentNow].length) {
        sentNow++;
        console.log(sentNow + " " + SENTENCES.length);
        if (sentNow >= SENTENCES.length) {
            $('#sentence').text("You've reached the end!");
            $('#target-letter').text('');
            $(document).unbind('keypress', keypressMaster);
            $(document).keypress(function (event) {
                keySet(event);
                keyHilight();
            });
        } else {
            charNow = 0;
            updateSent();
            updateChar();
            charNow++;
        }
    } else {
        updateSent();
        updateChar();
        charNow++;
    }
}
function updateSent() {
    $('#sentence').text(SENTENCES[sentNow]);
}
function updateChar() {
    $('#target-letter').text(SENTENCES[sentNow].charAt(charNow));
}

console.log("Loaded.");