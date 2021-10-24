const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const allTags = await Tag.findAll({
      include: [
        {
          model: Product
        }
      ]
    })

    // Send success response, and retrieved data.
		res.status(200).json(allTags)

  } catch (error) {
    // Error on our end. Change response status to 500, and send the error.
		res.status(500).json(error)
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const specificTag = await Tag.findByPk(
      req.params.id,
      {
        include: [
          {
            model: Product
          }
        ]
      }
    )

    // Send success response, and retrieved data.
		res.status(200).json(specificTag)

  } catch (error) {
    // Error on our end. Change response status to 500, and send the error.
		res.status(500).json(error)
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const newTag = await Tag.create(
      {
        tag_name: req.body.tag_name
      }
    )

    // Send success response, and retrieved data.
		res.status(200).json(newTag)

  } catch (error) {
    // Error on our end. Change response status to 500, and send the error.
		res.status(500).json(error)
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const updatedTag = await Tag.update(
      {
        tag_name: req.body.tag_name
      },
      {
        where: {
          id: req.params.id
        }
      }
    )

    // Send success response, and retrieved data.
		res.status(200).json(updatedTag)

  } catch (error) {
    // Error on our end. Change response status to 500, and send the error.
		res.status(500).json(error)
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const deletedTag = await Tag.destroy(
      {
        where: {
          id: req.params.id
        }
      }
    )

    // Send success response, and retrieved data.
		res.status(200).json(`Tag '${req.params.id}' deleted.`)

  } catch (error) {
    // Error on our end. Change response status to 500, and send the error.
		res.status(500).json(error)
  }
});

module.exports = router;
