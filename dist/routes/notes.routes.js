"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var router = (0, express_1.Router)();
router.get("/user", function (req, res) {
    res.json({
        name: "Terrel",
        age: 33,
    });
});
module.exports = router;
