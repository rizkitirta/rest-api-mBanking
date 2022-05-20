const { response } = require('express');
const express = require('express')
const router = express.Router()
const { Profile, User } = require('../models')
const authenticateToken = require('../service/auth')

/* GET users listing. */
router.get('/', authenticateToken, async function (req, res, next) {
    const currentPage = req.query.page || 1
    const perPage = req.query.perPage || 1
    const skip = (parseInt(currentPage) - 1) * parseInt(perPage)

    try {
        const data = await User.findAndCountAll({
            attributes: ['id', 'username', 'email', 'createdAt', 'updatedAt'],
            offset: skip,
            limit: parseInt(perPage),
        })

        res.json({
            message: 'Berhasil mengambil data',
            data: data.rows,
            current_page: parseInt(currentPage),
            next_page: parseInt(currentPage) + 1,
            prev_page: parseInt(currentPage) - 1,
            total_page: Math.ceil(data.count / perPage),
            total_item: Math.ceil(data.count),
        });
    } catch (err) {
        res.json(err.message)
    }
});
router.get('/:id', authenticateToken, async function (req, res, next) {
    try {
        const data = await User.findOne({
            where: {
                id: req.params.id
            },
            attributes: ['id', 'username', 'email', 'createdAt', 'updatedAt'],
        })

        res.json({ message: 'Berhasil mengambil data', data });
    } catch (err) {
        res.json(err.message)
    }
});
router.get('/detail/:id', authenticateToken, async function (req, res, next) {
    try {
        console.log(req.params.id)
        const data = await User.findOne({
            attributes: ['id', 'username', 'email', 'createdAt', 'updatedAt'],
            where: {
                id: req.params.id
            },
        })
        res.json({ message: 'Berhasil mengambil data', data });
    } catch (err) {
        res.json(err)
    }
});

router.post('/profile', authenticateToken, async (req, res, next) => {
    try {
        console.log(req.body)
        const id = req.user.user.id;
        const data = await Profile.create({
            user_id: id,
            nik: req.body.nik,
            nama_depan: req.body.nama_depan,
            nama_belakang: req.body.nama_belakang,
            no_hp: req.body.no_hp,
            tanggal_lahir: req.body.tanggal_lahir,
            tempat_lahir: req.body.tempat_lahir,
        })
        res.json({ message: "Berhasil menambah profile", data })
    } catch (err) {
        res.send(err)
    }
})

module.exports = router