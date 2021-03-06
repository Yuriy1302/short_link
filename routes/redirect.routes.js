const { Router } = require('express');
const Link = require('../models/Link');
const router = Router();

router.get('/:code', async(req, res) => {
  try {
    
    const link = await Link.findOne({ code: req.params.code }) // params.code совпадает со строкой запроса /:code

    if (link) {
      link.clicks++;
      link.save();

      return res.redirect(link.from);
    }

    res.status(404).json('Ссылка не найдена');
    
  } catch (err) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
  }
});


module.exports = router;
