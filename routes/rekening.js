const express = require('express')
const router = express.Router()
const { Rekening, User, Saldo } = require('../models')
const authenticateToken = require('../service/auth')

router.get('/', async function (req, res, next) {
    try {
        const data = await Rekening.findAll()
        res.json({ message: 'Berhasil mengambil data', data });
    } catch (err) {
        console.log(err)
        res.json({ message: 'Gagal mengambil data' });
    }
})

router.put('/:id', authenticateToken, async function (req, res, next) {
    try {
        const rekening = await Rekening.findByPk(req.params.id);
        if (!rekening) return res.json({ success: false, message: 'Rekening tidak ditemukan!' });

        const data = await rekening.update({
            'status': req.body.status,
            'type': req.body.type,
            'nama': req.body.nama,
            'nama_alias': req.body.nama_alias,
            'alamat': req.body.alamat,
        })

        res.json({ message: 'Berhasil mengupdate data', data });
    } catch (err) {
        console.log(err)
        res.json({ message: 'Gagal mengupdate data' });
    }
})

router.post('/', authenticateToken, async function (req, res, next) {
    try {
        const userId = req.user.user.id;
        const noRekening = Math.floor(Math.random() * 1000000000000);
        const noKartu = Math.floor(Math.random() * 1000000000);

        const data = await Rekening.create({
            'user_id': userId,
            'no_rekening': noRekening,
            'no_kartu': noKartu,
            'status': req.body.status,
            'type': req.body.type,
            'nama': req.body.nama,
            'nama_alias': req.body.nama_alias,
            'alamat': req.body.alamat,
            'tanggal_pembuatan': Date.now(),
        })

        Saldo.create({
            'rekening_id': data.id,
            'saldo': req.body.saldo_awal,
        })

        res.json({ message: 'Berhasil membuat data', data });
    } catch (err) {
        console.log(err)
        res.json({ message: 'Gagal membuat data' });
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
        console.log(err)
        res.json({ message: 'Gagal mengambil data' });
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
        console.log(err)
        res.json({ message: 'Gagal mengambil data' });
    }
})

module.exports = router;