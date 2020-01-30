const OLD_BG = $('#126').css("background-color"); // save original key bg color.
const SENTENCES = ['ten ate neite ate nee enet ite ate inet ent eate', 'Too ato too nOt enot one totA not anot tOO aNot', 'oat itain oat tain nate eate tea anne inant nean', 'itant eate anot eat nato inate eat anot tain eat', 'nee ene ate ite tent tiet ent ine ene ete ene ate'];
let sentenceIndex = 0; // current sentence position within array.
let letterIndex = 0; // current letter position within sentence.
let currentSentence = SENTENCES[sentenceIndex]; // current sentence VALUE (the sentence string).
let currentLetter = currentSentence[letterIndex]; // current letter VALUE (the letter).
let mistakes = 0; // counter for number of wrong keypresses.

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
    glyphicon(e);
    letterWatch();
    blockMove();
}
function keyHilight(e) { // hilight the pressed key.
    $("#" + e.keyCode).css("background-color", "#ffff00");
}
function glyphicon(e) { // update 'feedback' based on whether keypress matches current letter.
    let expected = String.fromCharCode(e.which);
    if (expected === currentLetter) {
        $('#feedback').html('<span class="glyphicon glyphicon-ok"></span>');
    } else {
        $('#feedback').html('<span class="glyphicon glyphicon-remove"></span>');
        mistakes++;
    }
}
function letterWatch() { // updates sentence/letter based on keystroke.
    if (letterIndex === (currentSentence.length - 1)) { // checks for end of sentence.
        sentenceIndex++;
        // feedbackClear();
        if (sentenceIndex >= (SENTENCES.length - 1)) { // checks for end of game.
            gameEnd();
        } else { // if not end of game, move to next line.
            letterIndex = 0;
            updateSentence();
            updateLetter();
            blockReset();
        }
    } else { // if not end of sentence, proceed to next letter.
        letterIndex++;
        updateSentence();
        updateLetter();
    }
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
    $('#yellow-block').css("left", "0px");
}
function gameEnd() { // update status / remove css once game is over.
    $('#sentence').text("You've reached the end!");
    $('#target-letter').text('');
    $(document).unbind('keypress', keypressMaster);
    $(document).keypress(function (e) {
        keyHilight(e);
    });
    $('#yellow-block').remove();
    feedbackClear();
}
function feedbackClear() {
    $('#feedback').html('');
}