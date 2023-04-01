const FilterService = require('../service/filterService.js');

class FilterController {
    async filter(req, res, next) {
        //Достаем из строки параметров данные описание endpoint читайте ниже там описаны все переменные
        const {sv, sp, fl, rm, ps, pe, ts, te, ls, le, ks, ke} = req.query;
        try {
            const filterData = await FilterService.filter(sv, sp, fl, rm, ps, pe, ts, te, ls, le, ks, ke);
            res.status(200).json(filterData);
        } catch (e) {
            next(e);
        }

    }
    async filterElements(req, res, next) {
        //Достаем из строки параметров данные описание endpoint читайте ниже там описаны все переменные
        const {sv, sp, fl, rm, ps, pe, ts, te, ls, le, ks, ke} = req.query;
        try {
            const filterData = await FilterService.filter(sv, sp, fl, rm, ps, pe, ts, te, ls, le, ks, ke);
            res.status(200).json({elements: filterData.length});
        } catch (e) {
            next(e);
        }

    }
}

module.exports = new FilterController();

/* filter and elements
Query params:


    sv - '0' - decrease  Sort params by increase and decrease
         '1' - increase
    sp - '0' - floor     Sort by params
         '1' - price
         '2' - rooms
         '3' - area_total
         '4' - area_live
         '5' - area_kitchen
    fl - '1234'       Floors
    rm - '123'        Rooms
    ps - '2880000'    price from
    pe - '5000000'    price to
    ts - '12.4'       total_area from
    te - '55.4'       total_area to
    ls - '11.32'      live_area from
    le - '14.23'      live_area to
    ks - '11.2'       kitchen_area from
    ke - '14.2'       kitchen_area to

http://localhost:5000/api/filter?sv=1&fl=23&rm=3&ps=0&pe=5000000
http://localhost:5000/api/elements?sv=1&fl=23&rm=3&ps=0&pe=5000000

*/