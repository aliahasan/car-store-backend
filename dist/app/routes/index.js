"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const admin_route_1 = require("../modules/admin/admin.route");
const car_route_1 = require("../modules/car/car.route");
const order_route_1 = require("../modules/orders/order.route");
const user_route_1 = require("../modules/user/user.route");
const router = (0, express_1.Router)();
const appRoutes = [
    {
        path: '/user',
        route: user_route_1.userRoutes,
    },
    {
        path: '/cars',
        route: car_route_1.carRoutes,
    },
    {
        path: '/order',
        route: order_route_1.orderRoutes,
    },
    {
        path: '/auth',
        route: admin_route_1.authRoutes,
    },
];
appRoutes.forEach((route) => {
    router.use(route.path, route.route);
});
exports.default = router;
