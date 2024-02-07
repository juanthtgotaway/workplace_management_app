const router = require('express').Router();
const { Reports } = require('../../models');

// Create a new indcident 
router.post('/', async (req, res) => {
  try {
    const newReport = await Report.create({
      ...req.body,
      user_id: req.session.user_id,
      status: 'Pending', 
    });

    res.status(201).json(newReport);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Update a reported incident by ID (not finished)
router.put('/:id', async (req, res) => {
    try {
      const updatedReport = await Report.update(req.body, {
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      });
  
      if (updatedReport[0] === 0) {
        res.status(404).json({ message: 'No report found with this id!' });
        return;
      }
  
      const updatedData = await Report.findByPk(req.params.id);
  
      res.status(200).json(updatedData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

// Delete a reported incident
router.delete('/:id', async (req, res) => {
  try {
    const reportData = await Report.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!reportData) {
      res.status(404).json({ message: 'No report found with this id!' });
      return;
    }

    res.status(200).json({ message: 'Incident report deleted successfully' });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;