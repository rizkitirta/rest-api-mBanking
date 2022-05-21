const { response } = require('express');
const express = require('express')
const router = express.Router()
const { Profile, User, Rekening } = require('../models');
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
        console.log(err)
        res.json({ success: false, message: 'Gagal mengambil data' });
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
        console.log(err)
        res.json({ success: false, message: 'Gagal mengambil data' });
    }
});
router.post('/aktivasi', authenticateToken, async function (req, res, next) {
    try {
        const user = await User.findOne({
            where: {
                email: req.body.email,
            }
        })
        if (!user) return res.json({ success: false, message: 'Email tidak ditemukan!' });

        const profile = await Profile.findOne({
            where: {
                kode_aktivasi: req.body.kode,
                user_id: user.id,
            }
        })

        if (!profile) return res.json({ success: false, message: 'Kode Aktivasi tidak ditemukan!' });
        const data = await profile.update({ is_active: true })

        res.json({ message: 'Aktivasi akun berhasil' });
    } catch (err) {
        console.log(err)
        res.json({ success: false, message: 'Aktivasi akun gagal' });
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
            include: [
                Profile,
                {
                    model: Rekening,
                    attributes: ['id', 'no_rekening', 'no_kartu', 'status', 'type', 'nama', 'nama_alias', 'alamat', 'tanggal_pembuatan'],
                    where: {
                        status: 'AKTIF'
                    }
                }],
        })
        res.json({ message: 'Berhasil mengambil data', data });
    } catch (err) {
        console.log(err)
        res.json({ success: false, message: 'Gagal mengambil data' });
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
        console.log(err)
        res.json({ success: false, message: 'Gagal mengambil data' });
    }
})

module.exports = router