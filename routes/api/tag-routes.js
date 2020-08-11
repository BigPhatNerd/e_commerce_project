const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
    // find all tags
    // be sure to include its associated Product data
    Tag.findAll({
        include: Product

    }).then(tagData => {
        console.log("\nFound tag data!");
        res.status(200).json(tagData);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

router.get('/:id', (req, res) => {
    // find a single tag by its `id`
    // be sure to include its associated Product data
    Tag.findOne({
        where: {
            id: req.params.id
        },
        include: Product,
    }).then(tagData => {
        if (!tagData) {
            res.status(404).json({ message: "No tag data found!" });
            return;
        }
        console.log("Tag data found!");
        res.status(200).json(tagData);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

router.post('/', (req, res) => {
    // create a new tag
    Tag.create({
        tag_name: req.body.tag_name
    }).then(tagData => {
        console.log("\nSuccessfully created Tag!");
        res.status(200).json(tagData);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

router.put('/:id', (req, res) => {
    // update a tag's name by its `id` value
    Tag.update(req.body, {
        where: {
            id: req.params.id
        }
    }).then(tagData => {
        if (!tagData) {
            res.status(404).json({ message: "No tag found with that id!" });
            return;
        }
        console.log("\nTag was successfully updated!")
        res.status(200).json(tagData)
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

router.delete('/:id', (req, res) => {
    // delete on tag by its `id` value
    Tag.destroy({
        where: {
            id: req.params.id
        }
    }).then(tagData => {
        if (!tagData) {
            res.status(404).json({ message: "No Tag found with that id" });
            return;
        }
        console.log("\nTag successfully updated!");
        res.status(200).json(tagData);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    })

});

module.exports = router;