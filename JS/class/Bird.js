export default class Bird {
    #x
    #y
    #width
    #height 
    constructor(x, y, width, height) {
        this.#x = x;
        this.#y = y;
        this.#width = width;
        this.#height = height;
    }


    draw(ctx, image, position) {
        ctx.drawImage(
            image,
            this.#x, // Utilisez les coordonnées de découpage x
            this.#y, // Utilisez les coordonnées de découpage y
            this.#width,
            this.#height,
            position.x,
            position.y,
            80,
            50
        );
    }
}