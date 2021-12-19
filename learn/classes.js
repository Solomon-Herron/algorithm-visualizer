class Polygon {
    constructor(height, width) {
        this.area = height * width;
    }
}

class FilledPolygon extends Polygon {
    constructor(height, width, color){
        super(height, width);
        this.name = "poopy";
        this.color = color;
    }
}
console.log(new FilledPolygon(4, 3, "green").name);
