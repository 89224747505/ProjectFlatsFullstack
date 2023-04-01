const FlatService = require("../service/flatService");

class FlatController {
    async flatByID(req, res, next) {
        //Доставем из строки параметров /:id - id и помещаем ее в константу flatID
        const flatID = req.params.id;

        try {
            const FlatData = await FlatService.flatByID(flatID);
            res.status(200).json(FlatData);
        } catch (e) {
            next(e);
        }

    }

    async flatByFloorPosition(req, res, next) {
        //Достаем из строки параметров данные описание endpoint читайте ниже там описаны все переменные
        const {fl, p} = req.query;

        try {
            const FlatData = await FlatService.flatByFloorPosition(fl, p);
            res.status(200).json(FlatData);
        } catch (e) {
            next(e);
        }

    }
}

module.exports = new FlatController();

/*
flatByID - http://localhost:5000/api/101 , where 101 is ID of flat in database.


flatByFloorPosition - http://localhost:5000/api/map?fl=1&p=1

, where:
    fl - floor
    p - position on the floor (property pos_on_floor)
*/