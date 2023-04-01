module.exports = class FlatDto {
    id;
    floor;
    price;
    rooms;
    area_total;
    area_kitchen;
    area_live;
    layout_image;

    constructor(model) {
        this.id = model.id;
        this.floor = model.floor;
        this.price = model.price;
        this.rooms = model.rooms;
        this.area_total = model.area_total;
        this.area_kitchen = model.area_kitchen;
        this.area_live = model.area_live;
        this.layout_image = model.layout_image;
    }
}