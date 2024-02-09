const router = require('express').Router();
const { Report } = require('../../models');

router.get('/', async (req, res) => {
  try {
    const reportData = await Reports.findAll();
    res.status(201).json(reportData);
  } catch (err) {
    res.status(400).json(err);
  }
});


// Create a new indcident 
router.post('/', async (req, res) => {
  try {
    const newReport = await Reports.create({
      ...req.body,
      user_id: req.session.user_id,
      status: 'Pending', 
    });

    res.status(201).json(newReport);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Update a reported incident
router.put('/:id', async (req, res) => {
    try {
      const updatedReport = await Reports.update(req.body, {
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      });
  
      if (updatedReport[0] === 0) {
        res.status(404).json({ message: 'No report found with this id!' });
        return;
      }
  
      const updatedData = await Reports.findByPk(req.params.id);
  
      res.status(200).json(updatedData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

// Delete a reported incident
router.delete('/:id', async (req, res) => {
  try {
    const reportData = await Reports.destroy({
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