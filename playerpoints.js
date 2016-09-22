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