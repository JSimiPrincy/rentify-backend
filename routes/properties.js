// routes/properties.js
const express = require('express');
const router = express.Router();
const Property = require('../models/Property');

// Create Property

router.post('/', async (req, res) => {
  const property = new Property(req.body);
  try {
    await property.save();
    res.status(201).send(property);
  } catch (error) {
    res.status(400).send(error);
  }
});


// Get Properties
router.get('/', async (req, res) => {
  const properties = await Property.find();
  res.send(properties);
});
router.get('/:id', async (req, res) => {
  const property = await Property.findById(req.params.id);
  res.send(property);
});
// Update Property
router.put('/:id', async (req, res) => {
  try {
    const property = await Property.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.send(property);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete Property
router.delete('/:id', async (req, res) => {
  try {
    await Property.findByIdAndDelete(req.params.id);
    res.send('Deleted');
  } catch (error) {
    res.status(400).send(error);
  }
});

// Like Property
router.post('/:id/like', async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    property.likes += 1;
    await property.save();
    res.send(property);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post('/:id/interested', async (req, res) => {
  const { buyerId } = req.body;
  const property = await Property.findById(req.params.id);
  const buyer = await User.findById(buyerId);
  const seller = await User.findById(property.sellerId);

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'xyz@gmail.com',
      pass: 'abcd1234'
    }
  });

  const mailOptions = {
    from: 'xyz@gmail.com',
    to: buyer.email,
    subject: 'Property Interest',
    text: `You are interested in the property: ${property.title}. Contact the seller at: ${seller.email}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(400).send(error);
    }
    res.send('Email sent: ' + info.response);
  });
});

module.exports = router;
