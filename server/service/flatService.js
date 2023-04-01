const ApiError = require("../exeptions/apiError");
const sequelize = require("../db");
const FlatDto = require("../DTO/flatDto");
const {isNumeric} = require("../utils/utils")
class FlatService {

    async flatByID(flatID) {
        if (!flatID || !isNumeric(flatID)) throw ApiError.BadRequest('Отправлен пустой или некорректный запрос');

        const queryString = `SELECT * FROM flats WHERE id = ${flatID};`;

        const flat = await sequelize.query(queryString);

        //Создаем DTO и выбираем нужные нам поля в объекте для более удобной работы
        return new FlatDto(flat[0][0]);
    }

    async flatByFloorPosition(fl, p) {
        if (!fl || !p) throw ApiError.BadRequest('Отправлен пустой или некорректный запрос');

        const queryString = `SELECT * FROM flats WHERE floor = ${fl} AND pos_on_floor = ${p};`;

        const flat = await sequelize.query(queryString);

        return new FlatDto(flat[0][0]);
    }
}

module.exports = new FlatService();