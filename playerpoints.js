
var PLAYER_POINTS = 0;

/**
 * Metoda rysuje liczbę zdobytych punktów
 */
function playerPointsDraw(ctx) {
    ctx.font="15px Verdana";
    // Create gradient
    var gradient = ctx.createLinearGradient(0, 0, 100, 0);
    gradient.addColorStop("0","magenta");
    gradient.addColorStop("0.5","blue");
    gradient.addColorStop("1.0","red");
    // Fill with gradient
    ctx.fillStyle = gradient;
    ctx.fillText("Your points: " + PLAYER_POINTS, 10, 20);
};

/**
 * Dodanie punktów
 */
function addPlayerPoints(point) {
    //Dodaje punkt użytkownikowi
    PLAYER_POINTS += point;
    switch(PLAYER_POINTS) {
        case 20:
            UFO_X_SPEED++;
            break;
        case 40:
            UFO_X_SPEED++;
            break;
        case 60:
            UFO_X_SPEED++;
            break;
        case 80:
            UFO_X_SPEED++;
            break;
        case 100:
            UFO_X_SPEED++;
            break;
        default:
            break;
    }    
};