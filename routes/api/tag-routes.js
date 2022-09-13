const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try{
    const tags = await Tag.findAll({
      include:[{model:Product}]
    });
    res.status(200).json(tags);
  } catch (err){
    res.status(500).json(err);
  }

});

router.get('/:id', async (req, res) => {
  try{
    const tags = await Tag.findByPk(req.params.id,{
      include: [{model:Product}]
    });
    if(!tags){
      res.status(404).json({ message: 'No tags found with that id!' });
      return;
    }
    res.status(200).json(tags);
  } catch (err){
    res.status(500).json(err);
  }

});

router.post('/', async (req, res) => {
  try{
    const tag = await Tag.create({
      tag_name:req.body.tag_name,
    });
    res.status(200).json({message:"created"});
  } catch (err){
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try{
    const tag = await Tag.update(
      {tag_name:req.body.tag_name},
      {where:{id:req.params.id}}
    );
    if(!tag){
      res.status(404).json({message:"no tag found with that id"});
      return;
    }
    res.status(200).json({message:"updated"});
  } catch (err){
    res.status(500).json(err);
  }
  // update a tag's name by its `id` value
});

router.delete('/:id', async (req, res) => {
  try{
    const tag = await Tag.destroy({
      where:{
        id: req.params.id
      }
    });
    if(!tag){
      res.status(404).json({message:"no tag found with that id"});
      return;
    }
    res.status(200).json({message:"deleted"});
  } catch (err){
    res.status(500).json(err);
  }

});

module.exports = router;
