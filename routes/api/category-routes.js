const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
	// find all categories
	// be sure to include its associated Products
	try {
		const allCategories = await Category.findAll({
			include: [{
				model: Product
			}]
		})

		// Send success response, and retrieved data.
		res.status(200).json(allCategories)

	} catch (error) {
		// Error on our end. Change response status to 500, and send the error.
		res.status(500).json(error)
	}
});

router.get('/:id', async (req, res) => {
	// find one category by its `id` value
	// be sure to include its associated Products
	try {
		const theCategory = await Category.findByPk(
			req.params.id,
			{
				include: [{
					model: Product
				}]
			}

		)

		// Send success response, and retrieved data.
		res.status(200).json(theCategory)

	} catch (error) {
		// Error on our end. Change response status to 500, and send the error.
		res.status(500).json(error)
	}
});

router.post('/', async (req, res) => {
	// create a new category
	try {
		const newCategory = await Category.create({
			category_name: req.body.category_name
		})

		// Send success response, and retrieved data.
		res.status(200).json(newCategory)
		
	} catch (error) {
		// Error on our end. Change response status to 500, and send the error.
		res.status(500).json(error)
	}
});

router.put('/:id', async (req, res) => {
	// update a category by its `id` value
	try {
		const updatedCategory = await Category.update(
			{
				category_name: req.body.category_name
			},
			{
				where: {
					id: req.params.id
				}
			}
		)

		// Send success response, and retrieved data.
		res.status(200).json(updatedCategory)
		
	} catch (error) {
		// Error on our end. Change response status to 500, and send the error.
		res.status(500).json(error)
	}
});

router.delete('/:id', async (req, res) => {
	// delete a category by its `id` value
	try {
		const destroyedCategory = await Category.destroy({
			where: {
				id: req.params.id
			}
		})

		// Send success response, and retrieved data.
		res.status(200).json(`Category '${req.params.id}' deleted.`)
		
	} catch (error) {
		// Error on our end. Change response status to 500, and send the error.
		res.status(500).json(error)
	}
});

module.exports = router;
