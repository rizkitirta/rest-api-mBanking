const express = require('express');
const router = express.Router();
const { User, Profile } = require('../models')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const authenticateToken = require('../service/auth')
const {sendConfirmationEmail} = require('../service/sendMail')


router.post('/register', async function (req, res, next) {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const oldUser = await User.findOne({
      where: {
        email: req.body.email
      }
    });
    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    const data = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: hash,
    })

    const profile = await Profile.create({
      user_id: data.id,
      is_active: false,
      kode_aktivasi: Math.floor(Math.random() * 100000)
    })

    const token = await jwt.sign({ data }, process.env.JWT_SECRET, { expiresIn: 60 * 60 });

    // send mail
    sendConfirmationEmail(data.username,data.email,profile.kode_aktivasi)

    res.json({ message: 'Registrasi berhasil', token });
  } catch (err) {
    res.json(err.message)
  }
});

router.post('/login', async function (req, res, next) {
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email
      }
    })
    if (!user) return res.status(404).json({ message: 'Email tidak ditemukan!' })

    const checkPw = await bcrypt.compareSync(req.body.password, user.password);
    if (!checkPw) return res.status(404).json({ message: 'Password yang anda masukan salah!' })

    const token = await jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: 60 * 60 });

    res.cookie('token',token)
    res.json({ message: 'Login berhasil', token });
  } catch (err) {
    res.json(err.message)
  }
});

module.exports = router;
