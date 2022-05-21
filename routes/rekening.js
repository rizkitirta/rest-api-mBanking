const express = require('express')
const router = express.Router()
const { Rekening, User } = require('../models')
const authenticateToken = require('../service/auth')

router.get('/', async function (req, res, next) {
    try {
        const data = await Rekening.findAll()
        res.json({ message: 'Berhasil mengambil data', data });
    } catch (err) {
        res.json({ message: 'Gagal mengambil data' });
        console.log(err)
    }
})

router.post('/', authenticateToken, async function (req, res, next) {
    try {
        const userId = req.user.user.id;
        const data = await Rekening.create({
            'user_id': userId,
            'no_rekening': req.body.no_rekening,
            'no_kartu': req.body.no_kartu,
            'status': req.body.status,
            'type': req.body.type,
            'nama': req.body.nama,
            'nama_alias': req.body.nama_alias,
            'alamat': req.body.alamat,
            'tanggal_pembuatan': Date.now(),
        })

        res.json({ message: 'Berhasil mengambil data', data });
    } catch (err) {
        res.json({ message: 'Gagal mengambil data' });
        console.log(err)
    }
})
router.get('/:id', authenticateToken, async function (req, res, next) {
    try {
        const data = await Rekening.findOne({
            where: { id: req.params.id },
            include: {
                model: User,
                attributes: ['id', 'username', 'email', 'createdAt', 'updatedAt'],
            }
        })

        if (!data) return res.json({ success: false, message: 'Rekening tidak ditemukan!' });

        res.json({ success: true, message: 'Berhasil mengambil data', data });
    } catch (err) {
        res.json({ message: 'Gagal mengambil data' });
        console.log(err)
    }
})
router.get('/delete/:id', authenticateToken, async function (req, res, next) {
    try {
        const data = await Rekening.findOne({
            where: { id: req.params.id },
        })

        if (!data) return res.json({ success: false, message: 'Rekening tidak ditemukan!' });
        data.destroy()

        res.json({ success: true, message: 'Berhasil menghapus data' });
    } catch (err) {
        res.send(err)
        console.log(err)
    }
})

module.exports = router;