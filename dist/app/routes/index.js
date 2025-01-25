"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const car_route_1 = require("../modules/car/car.route");
const router = (0, express_1.Router)();
const appRoutes = [
    {
        path: '/cars',
        route: car_route_1.carRoutes,
    },
];
appRoutes.forEach((route) => {
    router.use(route.path, route.route);
});
exports.default = router;
