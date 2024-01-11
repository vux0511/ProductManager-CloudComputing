const Product = require("../models/Product");

module.exports = {
    index: async (req, res) => {
        const products = await Product.find({});
        res.render("index.ejs", { products });
    },
    create: async (req, res) => {
        try {
            const product = new Product(req.body);
            await product.save();
            res.redirect("/home");
        } catch (error) {
            console.log(error.message);
        }
    },
    update: async (req, res) => {
        const { productName, description, price, productId, image } = req.body;

        let product = await Product.findById(productId);
        product.productName = productName;
        product.description = description;
        product.image = image;
        product.price = price;
        await product.save();

        res.redirect("/");
    },
    edit: async (req, res) => {
        const productId = req.params.id;

        const product = await Product.findById(productId);

        res.render("edit-product.ejs", { product });
    },
    delete: async (req, res) => {
        const { productId } = req.body;
        console.log(productId);

        const product = await Product.findById(productId);
        if (product) {
            await product.deleteOne();
        }

        res.redirect("/");
    },
    search: async (req, res) => {
        const { productName } = req.query;

        const products = await Product.find({
            productName: new RegExp(".*" + productName + ".*"),
        });
        res.render("search.ejs", { products });
    },
    product: async (req, res) => {
        const products = await Product.find({});
        res.render("product.ejs", { products });
    },
};
