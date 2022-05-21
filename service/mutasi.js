const {Mutasi,Saldo} = require('../models');
const mutasiRekening = async (rekeningId,jumlah,type,keterangan) => {
    try {
        const saldo = await Saldo.findOne({where:{rekening_id:rekeningId}});
        const mutasi = new Mutasi();
        mutasi.rekening_id = rekeningId;
        mutasi.saldo = saldo.saldo;
        mutasi.type = type;
        mutasi.keterangan = keterangan;
        mutasi.tanggal = new Date();
        if (type == 'DEBET') {
            mutasi.debet = jumlah;
        } else {
            mutasi.kredit = jumlah;
        }
        const data = await mutasi.save();

        return data;
    } catch (err) {
        console.log(err);
    }
}

module.exports = mutasiRekening;