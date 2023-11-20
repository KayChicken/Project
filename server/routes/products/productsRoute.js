const Router = require("express");
const router = new Router();
const Product = require("../../models/Item");
const Category = require("../../models/Category");
const mongoose = require('mongoose');

router.post("/create", async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      sizes,
      category,
      colors,
      material,
      brand,
      img,
    } = req.body;

    const product = new Product({
      name: name,
      description: description,
      price: price,
      sizes: sizes,
      colors: colors,
      category : category,
      material: material,
      brand: brand,
      img: img,
    });
    const saveProduct = await product.save();
    res.json({ message: "succesful" });
  } catch (e) {
    res.json({ message: "error" });
    console.log(e);
  }
});

router.patch("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Product.findOneAndUpdate(
      {
        _id: id,
      },
      {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        sizes: req.body.sizes,
        colors: req.body.colors,
        material: req.body.material,
        brand: req.body.brand,
        img: req.body.img,
      },
    );
    res.json({ message: "succesful" });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "error" });
  }
});

router.delete("/delete/:id", async (req, res) => {
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

router.post("/", async (req, res) => {
  try {
    const category = req.body.category ? {category : req.body.category
    } : {};
    const products = await Product.find(category).populate('category').exec();
    res.status(200).json(products);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "error" });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id).populate('category').exec();;
    res.json(product);
  } catch (e) {
    res.json({ message: "error" });
    console.log(e);
  }
});



router.get("/api/info" , async (req,res) => {
  const variants = await Category.find()
  res.status(200).json(variants)
 
} )



module.exports = router;
