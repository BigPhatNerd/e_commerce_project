const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
    // find all categories
    // be sure to include its associated Products
    Category.findAll({
            include: [Product]
        })
        .then(categoryData => {
            console.log("All Categories retrieved!");
            res.json(categoryData)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
});

router.get('/:id', (req, res) => {
    // find one category by its `id` value
    // be sure to include its associated Products
    const id = req.params.id;
    Category.findOne({

        where: {
            id: id
        },
        include: [Product]
    }).then(categoryData => {
        if (!categoryData) {
            res.status(404).json({ message: "No record found!" });
            return;
        }
        console.log("\nCategory found!");
        res.json(categoryData);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

router.post('/', (req, res) => {
    // create a new category
    Category.create({
        category_name: req.body.category_name
    }).then(categoryData => {
        console.log("\nCategory created successfully");
        res.json(categoryData);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

router.put('/:id', (req, res) => {
    // update a category by its `id` value
    Category.update(req.body, {
        where: {
            id: req.params.id
        }
    }).then(categoryData => {
        if (!categoryData) {
            res.status(404).json({ message: "Could not find record with that id!" });
            return;
        }
        console.log("\nRecord updated successfully!");
        res.json(categoryData);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

router.delete('/:id', (req, res) => {
    // delete a category by its `id` value
    Category.destroy({
        where: {
            id: req.params.id
        },
    }).then(categoryData => {
        if (!categoryData) {
            res.status(404).json({ message: "Could not find record with that id!" });
            return;
        }
        console.log(`Category with id ${req.params.id} was successfully deleted!`);
        res.json(categoryData);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

module.exports = router;