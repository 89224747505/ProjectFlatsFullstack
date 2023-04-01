const FlatDto = require('../DTO/flatDto');
const ApiError = require('../exeptions/apiError');
const sequelize = require('../db');

class FilterService {

    async filter(sv, sp, fl, rm, ps, pe, ts, te, ls, le, ks, ke) {
        //Значение переменных см. в контроллере filterController
        let queryString = 'SELECT * FROM flats WHERE';
        if (fl)
            fl.length > 1
                ? queryString += ` floor IN (${fl.split('').join(',')}) AND`
                : queryString += ` floor = ${fl} AND`;
        if (rm)
            rm.length > 1
                ? queryString += ` rooms IN (${rm.split('').join(',')}) AND`
                : queryString += ` rooms = ${rm} AND`;
        if (ps) queryString += ` price >= ${ps} AND`;
        if (pe) queryString += ` price <= ${pe} AND`;
        if (ts) queryString += ` area_total >= ${ts} AND`;
        if (te) queryString += ` area_total <= ${te} AND`;
        if (ls) queryString += ` area_live >= ${ls} AND`;
        if (le) queryString += ` area_live <= ${le} AND`;
        if (ks) queryString += ` area_kitchen >= ${ks} AND`;
        if (ke) queryString += ` area_kitchen <= ${ke} AND`;
        queryString = queryString.slice(0, queryString.length-4);
        if (!fl && !rm && !ps && !pe && !ts && !te && !ls && !le && !ks && !ke)
            queryString = "SELECT * FROM flats";
        switch(sp) {
            case '0': queryString += ` ORDER BY floor`;break;
            case '1': queryString += ` ORDER BY price`;break;
            case '2': queryString += ` ORDER BY rooms`;break;
            case '3': queryString += ` ORDER BY area_total`;break;
            case '4': queryString += ` ORDER BY area_live`;break;
            case '5': queryString += ` ORDER BY area_kitchen`;break;
            default: queryString += ` ORDER BY floor`;
        }
        (sv === '1') ? queryString += ` ASC` : queryString += ` DESC`;

        const filteredFlats = await sequelize.query(queryString);

        //Создаем DTO и выбираем нужные нам поля в объекте для более удобной работы
        let flatDto = [];

        for (let flat of filteredFlats[0])
            flatDto.push(new FlatDto(flat));

        return flatDto;
    }
}

module.exports = new FilterService();