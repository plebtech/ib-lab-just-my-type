const OLD_BG = $('#126').css("background-color"); // save original key bg color.
const SENTENCES = ['ten ate neite ate nee enet ite ate inet ent eate',
    'Too ato too nOt enot one totA not anot tOO aNot',
    'oat itain oat tain nate eate tea anne inant nean',
    'itant eate anot eat nato inate eat anot tain eat',
    'nee ene ate ite tent tiet ent ine ene ete ene ate'];
let sentenceIndex = 0; // current sentence position within array.
let letterIndex = 0; // current letter position within sentence.
let currentSentence = SENTENCES[sentenceIndex]; // current sentence VALUE (the sentence string).
let currentLetter = currentSentence[letterIndex]; // current letter VALUE (the letter).
let expected;
let mistakes = 0; // counter for number of wrong keypresses.
let clockStarted = false; // controls whether timer has begun.
let stopwatch;
let elapsed = 0;

// on load.
$('#sentence').text(currentSentence); // set initial value.
$('#target-letter').text(currentLetter); // set initial value.
$('#keyboard-upper-container').hide(); // pre-hide uppercase keyboard.
$(document).keydown(function (e) { // hide/show keyboards on shift.
    if (e.keyCode === 16) {
        $('#keyboard-upper-container').show();
        $('#keyboard-lower-container').hide();
    }
});
$(document).keyup(function (e) { // hide/show keyboards on shift.
    $(".key").css("background-color", OLD_BG);
    if (e.keyCode === 16) {
        $('#keyboard-upper-container').hide();
        $('#keyboard-lower-container').show();
    }
});
$(document).keypress(keypressMaster); // main functionality, driven by keypresses.
function keypressMaster(e) {
    keyHilight(e);
    letterWatch(e);
}
function keyHilight(e) { // hilight the pressed key.
    $("#" + e.keyCode).css("background-color", "#ffff00");
}
function glyphicon(expected) { // update 'feedback' based on whether keypress matches current letter.
    if (expected === currentLetter) {
        $('#feedback').html('<span class="glyphicon glyphicon-ok"></span>');
    } else {
        $('#feedback').html('<span class="glyphicon glyphicon-remove"></span>');
    }
}
function letterWatch(e) { // updates sentence/letter based on keystroke.
    expected = String.fromCharCode(e.which);
    glyphicon(expected);
    if (expected === currentLetter) {
        blockMove();
        if (letterIndex === (currentSentence.length - 1)) { // checks for end of sentence.
            sentenceIndex++;
            feedbackClear();
            if (sentenceIndex >= (SENTENCES.length - 1)) { // checks for end of game.
                gameEnd();
            } else { // if not end of game, move to next line.
                letterIndex = 0;
                updateSentence();
                updateLetter();
                blockReset();
            }
        } else { // if not end of sentence, proceed to next letter.
            if (clockStarted === false) {
                clockStarted = true;
                stopwatch = setInterval(clock, 1000);
            }
            letterIndex++;
            updateSentence();
            updateLetter();
        }
    } else {
        mistakes++;
    };
}
function updateLetter() { // set current letter to the indexed letter of current sentence, update target css.
    currentLetter = currentSentence[letterIndex];
    $('#target-letter').text(currentLetter);
}
function updateSentence() { // set current sentence to indexed sentence of array, update sentence css.
    currentSentence = SENTENCES[sentenceIndex];
    $('#sentence').text(currentSentence);
}
function blockMove() { // move the hilight block through the sentence.
    $('#yellow-block').css("left", "+=17.5px");
}
function blockReset() { // move block to initial position.
    $('#yellow-block').css("left", '');
}
function gameEnd() { // update status / remove css & most listeners once game is over.
    clearInterval(stopwatch);
    $('#sentence').text("You've reached the end!");
    $('#target-letter').text('');
    $(document).unbind('keypress', keypressMaster);
    $(document).keypress(keyHilight);
    $('#yellow-block').toggle();
    results();
    setTimeout(playAgain, 5000);
}
function feedbackClear() {
    $('#feedback').html('');
}
function results() {
    let wpm = Math.floor(54 / (elapsed / 60) - 2 * mistakes);
    $('#feedback').html(`<span>Finished in ${elapsed} seconds. ${mistakes} mistakes. Words per minute: ${wpm}.</span>`);
}
function clock() {
    elapsed++;
    // console.log(elapsed);
}
function playAgain() { // reset variables, restart listeners.
    $('#feedback').append(`<div id="queryUser"><div  style="margin: 1%; padding: 1%;">Play Again?</div><div><button id="no" style="margin: 1%; padding: 1%;">No thanks</button><button id="yes" style="margin: 1%; padding: 1%;">Yes!</button></div></div>`);
    $('#no').click(function (e) {
        $('#no').remove();
    });
    $('#yes').click(function (e) {
        sentenceIndex = 0;
        letterIndex = 0;
        currentSentence = SENTENCES[sentenceIndex];
        currentLetter = currentSentence[letterIndex];
        mistakes = 0;
        clockStarted = false;
        elapsed = 0;
        feedbackClear();
        $(document).unbind('keypress', keyHilight);
        $(document).keypress(keypressMaster);
        $('#sentence').text(currentSentence);
        $('#target-letter').text(currentLetter);
        $('#yellow-block').toggle();
        blockReset();
    });
};