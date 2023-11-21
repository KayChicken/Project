const Router = require("express");
const router = new Router();
const Order = require("../../models/Order");
const Category = require("../../models/Category");
const Product = require("../../models/Item");



router.post("/create", async (req, res) => {
    try {
        console.log(req.body)
        const order = new Order(req.body)
        const saveOrder = await order.save();
        res.status(200).json({ "message": "Заказ успешно создан" });
    } catch (e) {
        console.log(e)
        res.status(400).json({ "message": "Ошибка при создании заказа" });
    }
});




router.get("/get", async (req, res) => {
    try {
        const dsa = await Order.find()
        const orders = await Order.find().populate('user').populate('items.item').exec();
        console.log(orders[0].items);
        res.status(200).json(orders);
    }


    catch (e) {
        res.status(404).json({ "message": "failed" })
        console.log(e)
    }
})



router.get("/category", async (req, res) => {
    const category = new Category({
        category: 'Футболки'
    })
    await category.save()
    res.status(200).json("Succesful")
})






router.get("/api/aggregate/fullprice", async (req, res) => {
    try {
        const info = await Order.aggregate([
            {
                $group: {
                  _id: null,
                  totalFullPrice: { $sum: "$fullPrice" }
                }
              }
        ]);

        if (info.length > 0) {
            const totalCost = info[0].totalFullPrice;
            return res.status(200).json(totalCost);
        } else {
            console.log("No order data.");
            return res.status(404).json({ error: "No order data" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
});





module.exports = router;