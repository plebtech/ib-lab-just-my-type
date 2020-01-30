const OLD_BG = $('#126').css("background-color"); // save original key bg color.
const SENTENCES = ['ten ate neite ate nee enet ite ate inet ent eate', 'Too ato too nOt enot one totA not anot tOO aNot', 'oat itain oat tain nate eate tea anne inant nean', 'itant eate anot eat nato inate eat anot tain eat', 'nee ene ate ite tent tiet ent ine ene ete ene ate'];
let sentIndex = 0;
let letterIndex = 0;
let currentSentence = SENTENCES[sentIndex];
let currentLetter = currentSentence[letterIndex];

$('#sentence').text(currentSentence);
$('#target-letter').text(currentLetter);
$('#keyboard-upper-container').hide();
$(document).keydown(function (e) {
    if (e.keyCode === 16) {
        $('#keyboard-upper-container').show();
        $('#keyboard-lower-container').hide();
    }
});
$(document).keyup(function (e) {
    $(".key").css("background-color", OLD_BG);
    if (e.keyCode === 16) {
        $('#keyboard-upper-container').hide();
        $('#keyboard-lower-container').show();
    }
});
$(document).keypress(function (e) {
    keyHilight(e);
    glyphicon(e);
    blockMove();
});
function keyHilight(e) {
    $("#" + e.keyCode).css("background-color", "#ffff00");
}
function glyphicon(e) {
    if (e.keyCode === currentSentence.charCodeAt(currentLetter)) {
        $('#feedback').html('<span class="glyphicon glyphicon-ok"></span>');
    } else {
        $('#feedback').html('<span class="glyphicon glyphicon-remove"></span>');
    }
}
function blockMove() {
    $('#yellow-block').css("left", "+=17.5px");
}