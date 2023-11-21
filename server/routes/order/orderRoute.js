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
        res.status(200).json({"message": "Заказ успешно создан"});
    } catch (e) {
        console.log(e)
        res.status(400).json({"message": "Ошибка при создании заказа"});
    }
});




router.get("/get" , async (req,res) => {
    try {
        const dsa = await Order.find()
        const orders = await Order.find().populate('user').populate('items.item').exec();
        console.log(orders[0].items);
        res.status(200).json(orders);
    }


    catch(e) {
        res.status(404).json({"message" : "failed"})
        console.log(e)
    }
})



router.get("/category" , async (req,res) => {
    const category = new Category({
        category : 'Футболки'
    })
    await category.save()
    res.status(200).json("Succesful")
}) 






module.exports = router;