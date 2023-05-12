var express = require('express');
const product = require('../model/product');
var authMiddleware = require('../middleware/auth');
var router = express.Router();

const defaultImage = () => {
    return {
        "id": 1,
        "thumbnail": "/assets/images/products/p-20-m.png",
        "original": "/assets/images/products/p-20-m.png"
    }
}
const getDefaultGallery = () => {
    return [
        {
            "id": 1,
            "thumbnail": "/assets/images/products/p-20-1.png",
            "original": "/assets/images/products/p-20-1.png"
        },
        {
            "id": 2,
            "thumbnail": "/assets/images/products/p-20-2.png",
            "original": "/assets/images/products/p-20-2.png"
        },
        {
            "id": 3,
            "thumbnail": "/assets/images/products/p-20-3.png",
            "original": "/assets/images/products/p-20-3.png"
        },
        {
            "id": 4,
            "thumbnail": "/assets/images/products/p-20-4.png",
            "original": "/assets/images/products/p-20-4.png"
        }
    ]
}

const getdefaultVariations = () => {
    return [
        {
            "id": 1,
            "value": "S",
            "attribute": {
                "id": 1,
                "name": "Size",
                "slug": "size"
            }
        },
        {
            "id": 2,
            "value": "M",
            "attribute": {
                "id": 1,
                "name": "Size",
                "slug": "size"
            }
        },
        {
            "id": 3,
            "value": "L",
            "attribute": {
                "id": 1,
                "name": "Size",
                "slug": "size"
            }
        },
        {
            "id": 4,
            "value": "XL",
            "attribute": {
                "id": 1,
                "name": "Size",
                "slug": "size"
            }
        },
    ]
}
/* GET home page. */
router.post('/addProduct', authMiddleware, async function (req, res, next) {
    try {
        const { name, description, slug, image, gallery, price, sale_price, variations } = req.body
        if (!(name && slug)) {
            return res.status(401).json({ errors: ["The name is required! all the data is being saved as default values "] })
        }
        const existingProduct = await product.findOne({ slug })
        if (existingProduct) {
            return res.status(401).json({ errors: [`The slug you are assigning is already assign to the ${existingProduct} is `] })
        }
        const productDB = await product.create({
            name: name,
            description: description ? "demo description" : description,
            slug,
            image: image ? image : defaultImage(),
            gallery: gallery ? gallery : getDefaultGallery(),
            price,
            sale_price,
            variations: variations ? variations : getdefaultVariations()
        });
        res.status(201).send(JSON.stringify(req.body))
    } catch (error) {
        console.log(error
        )
    }
});

// Update a product
router.put("/updateProduct/:id", authMiddleware, async (req, res, next) => {
    try {
        const { name, description, slug, image, gallery, price, sale_price, variations,} = req.body;
        const productId = req.params.id;

        const existingProduct = await product.findById(productId);
        if (!existingProduct) {
            return res.status(404).json({ errors: ["Product not found."] });
        }

        existingProduct.name = name || existingProduct.name;
        existingProduct.description = description || existingProduct.description;
        existingProduct.slug = slug || existingProduct.slug;
        existingProduct.image = image || existingProduct.image;
        existingProduct.gallery = gallery || existingProduct.gallery;
        existingProduct.price = price || existingProduct.price;
        existingProduct.sale_price = sale_price || existingProduct.sale_price;
        existingProduct.variations = variations || existingProduct.variations;

        const updatedProduct = await existingProduct.save();
        res.status(200).json(updatedProduct);
    } catch (error) {
        console.log(error);
        res.status(500).json({ errors: ["server error."] });
    }
});




router.get('/allProducts', authMiddleware, async function (req, res, next) {
    try {
        // const { name, description, slug, image, gallery, price, sale_price, variations } = req.body
        // if (!(name && slug)) {
        //     return res.status(401).json({ errors: ["The name is required! all the data is being saved as default values "] })
        // }
        const existingProduct = await product.find();
        if (!existingProduct) {
            return res.status(401).json({ errors: [`Empty ${existingProduct} `] })
        }
        res.status(200).send(JSON.stringify(existingProduct))
    } catch (error) {
        console.log(error
        )
    }
});
module.exports = router;