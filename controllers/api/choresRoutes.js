const router = require('express').Router();
const { Chores } = require('../../models');


// Get exisitig chorse 
outer.get('/', async (req, res) => {
    try {
    
      const choresData = await Chores.findAll();
      res.status(200).json(choresData);
    } catch (err) {
      
      res.status(500).json(err);
    }
  });



// Create a new chore
router.post('/', async (req, res) => {
  try {
    const newChore = await Chores.create({
      ...req.body,
      user_id: req.session.user_id, 
    });

    res.status(201).json(newChore);
  } catch (err) {
    res.status(400).json(err);
  }
});


// Update a chore 
router.put('/:id', async (req, res) => {
    try {

      const choreData = await Chores.findByPk(req.params.id);
  
 
      if (!choreData) {
        res.status(404).json({ message: 'Chore not found' });
        return;
      }
  

      const updatedChore = await choreData.update(req.body);
  
 
      res.status(200).json(updatedChore);
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;