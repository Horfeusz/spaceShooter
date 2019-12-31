/**
 * Prototyp dla obiektów
 */
var EntityPrototype = {
    
    //Pozycja na ekranie
    x:0,
    
    //Pozycja na ekranie
    y:0,
    
    //Atrybut zmiany pozycji obiektu X
    vx:0,
    
    //Atrubut zmiany pozycji obiektu Y
    vy:0,
    
    //Obrazek obiektu
    img: null,
    
    /** O ile ma być skorygowana szerokość obiektu */
    correctWidth: 0,
    
    /** O ile ma być skorygowana wysokość obiektu */
    correctHeight: 0,


    /** Metoda rysowania obiektu */
    draw: function(context) {
        context.drawImage(this.img, this.x, this.y, this.getWidth(), this.getHeight());
    },

    /** Zmiana współżednych obiektów */
    move: () => {
        this.x += this.vx;
        this.y += this.vy;
    },

    /** Zwracam szerokość obiektu */
    getWidth: function() {
        if(this.img === undefined || this.img === null) {
            return 0;
        }
        return this.img.width + this.correctWidth;
    },

    /** Zwracam wysokość obiektu */
    getHeight: function () {
        if(this.img === undefined || this.img === null) {
            return 0;
        }
        return this.img.height + this.correctHeight;
    }
};