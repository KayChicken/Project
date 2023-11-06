const Router = require('express')
const router = new Router()
const Product = require('../../models/Item');




router.post('/create', async (req, res) => {

    try {
        const { _id , name, description, price, sizes, colors, material, brand, img } = req.body
        console.log(req.body)
        const product = new Product({
            "_id" : _id,
            "name": name,
            "description": description,
            "price": price,
            "sizes": sizes,
            "colors": colors,
            "material": material,
            "brand": brand,
            "img": img

        })
        const saveProduct = await product.save();
        res.json({ "message": "succesful" })
    }

    catch (e) {
        res.json({ "message": "error" })
        console.log(e)
    }

})



router.patch('/update/:id', (req, res) => {
    try {
        const { id } = req.params
        Product.findOneAndUpdate({
            _id: id
        }, {
            "name": req.body.name,
            "description": req.body.description,
            "price": req.body.price,
            "sizes": req.body.sizes,
            "colors": req.body.colors,
            "material": req.body.material,
            "brand": req.body.brand,
            "img": req.body.img
        })
        res.json({ "message": "succesful" })
    }

    catch (e) {
        console.log(e)
        return res.status(500).json({ "message": "error" })
    }

})







router.delete('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params;
       

        const product = await Product.findOneAndDelete({ _id: id });

        if (!product) {
            return res.status(404).json({ message: "Продукт не найден" });
        }

        res.json({ success: true });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Ошибка" });
    }
});


router.get('/', async (req, res) => {
    try {
        const products = await Product.find()
        res.json(products)
    }

    catch (e) {
        console.log(e)
        return res.status(500).json({ "message": "error" })

    }
})



router.get('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const product = await Product.findById(id)
        res.json(product)
    }

    catch (e) {
        res.json({ "message": "error" })
        console.log(e)
    }

})


module.exports = router