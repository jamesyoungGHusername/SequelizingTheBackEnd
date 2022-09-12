const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try{
    const tage = await Tag.findAll({
      include:[
        {
          model:Product,
          through:{
            attributes:[]
          }
        }
      ]
    });
    res.status(200).json(tags);
  } catch (err){
    res.status(500).json(err);
  }
  // find all tags
  // be sure to include its associated Product data
});

router.get('/:id', async (req, res) => {
  try{

    res.status(200).json(tags);
  } catch (err){
    res.status(500).json(err);
  }
  // find a single tag by its `id`
  // be sure to include its associated Product data
});

router.post('/', async (req, res) => {
  try{

    res.status(200).json(tags);
  } catch (err){
    res.status(500).json(err);
  }
  // create a new tag
});

router.put('/:id', async (req, res) => {
  try{

    res.status(200).json(tags);
  } catch (err){
    res.status(500).json(err);
  }
  // update a tag's name by its `id` value
});

router.delete('/:id', async (req, res) => {
  try{

    res.status(200).json(tags);
  } catch (err){
    res.status(500).json(err);
  }
  // delete on tag by its `id` value
});

module.exports = router;
