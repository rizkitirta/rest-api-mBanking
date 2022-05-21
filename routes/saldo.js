const express = require('express');
const { Saldo, Rekening } = require('../models');
const router = express.Router()
const authenticateToken = require('../service/auth')
const mutasiRekening = require('../service/mutasi');

router.get('/', authenticateToken, async function (req, res, next) {
    try {
        const data = await Saldo.findAll()
        res.json({ success: true, message: 'Berhasil mengambil data', data });
    } catch (err) {
        console.log(err)
        res.json({ success: false, message: 'gagal mengambil data' });
    }
})
router.get('/:noRek', authenticateToken, async function (req, res, next) {
    try {
        const rekening = await Rekening.findOne({
            where: {
                no_rekening: req.params.noRek
            }
        });

        if (!rekening) return res.json({ success: false, message: 'Rekening tidak ditemukan!' });

        const data = await Saldo.findOne({
            where: {
                rekening_id: rekening.id
            },
            attributes: ['saldo', 'updatedAt'],
        })
        res.json({ success: true, message: 'Berhasil mengambil data', data });
    } catch (err) {
        console.log(err)
        res.json({ success: false, message: 'gagal mengambil data' });
    }
})
router.post('/topup/', authenticateToken, async function (req, res, next) {
    try {
        const rekening = await Rekening.findOne({
            where: {
                no_rekening: req.body.no_rek
            }
        });

        if (!rekening) return res.json({ success: false, message: 'Rekening tidak ditemukan!' });

        const saldo = await Saldo.findOne({
            where: {
                rekening_id: rekening.id,
            }
        });
        const data = await saldo.increment({
            'saldo': req.body.saldo,
        }).

            // LOG MUTASI
            mutasiRekening(rekening.id, req.body.saldo, 'DEBET', 'TOPUP')
        res.json({ success: true, message: 'Topup Berhasil' });
    } catch (err) {
        console.log(err)
        res.json({ success: false, message: 'Topup gagal!' });
    }
})
router.post('/transfer/', async function (req, res, next) {
    try {
        // Rek Tujuan
        const rekeningTo = await Rekening.findOne({
            where: {
                no_rekening: req.body.no_rek_to
            }
        });
        // Rek Pengirim
        const rekeningFrom = await Rekening.findOne({
            where: {
                no_rekening: req.body.no_rek_from
            }
        });

        if (!rekeningTo) return res.json({ success: false, message: 'Rekening tidak ditemukan!' });
        if (!rekeningFrom) return res.json({ success: false, message: 'Rekening tidak ditemukan!' });

        // Saldo Tujuan
        const saldoTo = await Saldo.findOne({
            where: {
                rekening_id: rekeningTo.id
            }
        });
        const data = await saldoTo.increment({
            'saldo': req.body.saldo,
        })

        // Saldo Pengirim
        const saldoFrom = await Saldo.findOne({
            where: {
                rekening_id: rekeningFrom.id
            }
        });
        const data2 = await saldoFrom.increment({
            'saldo': -req.body.saldo,
        })

        // LOG MUTASI REKENING
        mutasiRekening(rekeningTo.id, req.body.saldo, 'DEBET', `Transfer dari `+ rekeningFrom.nama)
        mutasiRekening(rekeningFrom.id, req.body.saldo, 'KREDIT', 'Transfer ke ' + rekeningTo.nama)

        res.json({ success: true, message: 'Transfer Berhasil' });
    } catch (err) {
        console.log(err)
        res.json({ success: false, message: 'Transfer Berhasil' });
    }
})

module.exports = router