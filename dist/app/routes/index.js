"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const admin_route_1 = require("../modules/admin/admin.route");
const blog_routes_1 = require("../modules/blog/blog.routes");
const car_route_1 = require("../modules/car/car.route");
const adminMeta_route_1 = require("../modules/meta/adminMeta/adminMeta.route");
const userMeta_route_1 = require("../modules/meta/userMeta/userMeta.route");
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
        path: '/blog',
        route: blog_routes_1.blogRoutes,
    },
    {
        path: '/order',
        route: order_route_1.orderRoutes,
    },
    {
        path: '/admin',
        route: admin_route_1.adminRoute,
    },
    {
        path: '/admin-meta',
        route: adminMeta_route_1.adminMetaRoutes,
    },
    {
        path: '/user-meta',
        route: userMeta_route_1.userMetaRoutes,
    },
];
appRoutes.forEach((route) => {
    router.use(route.path, route.route);
});
exports.default = router;
