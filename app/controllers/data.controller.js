// const db = require("../models");
// const User = db.user;
const sql = require("../config/db.js");

exports.calonAll = (req, res) => {
    
    sql.query(`SELECT no_urut,nama_calon, 
    (select sum(data_utama.jml_suara) from data_utama WHERE data_utama.no_urut_calon=tbl_calon.no_urut ) as jml_suara,
    (select sum(tbl_tps.jml_dtp) as jml_dtp from tbl_tps) as jml_dtp
    FROM tbl_calon `, (err, response) => {
        if (err) {
            res.status(500).send(err);
        }
        if (response.length) {
            let percent=0;
            let data1=[];

            response.forEach((value) => {
                percent=(value.jml_suara/value.jml_dtp)*100;
                var data={
                    nama_calon:value.nama_calon,
                    jml_suara:value.jml_suara,
                    no_urut:value.no_urut,
                    persen: percent.toFixed(2),
                };
                data1.push(data);
            });
            
            const Hasil={
                jml_suara1:data1[0].jml_suara,
                jml_suara2:data1[1].jml_suara,
                jml_suara3:data1[2].jml_suara,
                persen1:data1[0].persen,
                persen2:data1[1].persen,
                persen3:data1[2].persen,
                nama_calon1:data1[0].nama_calon,
                nama_calon2:data1[1].nama_calon,
                nama_calon3:data1[2].nama_calon,
            }

            const data ={
                status: 'success',
                hasil:Hasil
            }

            res.status(200).send(data);
        }
        // not found Tutorial with the id
    });


 };


    exports.getPengumuman = (req, res) => {
        
        sql.query(`SELECT * FROM tbl_pengumuman `, (err, response) => {
            if (err) {
                res.status(500).send(err);
            }
            if (response.length) {
                const data ={
                    status: 'success',
                    hasil:response
                }
                res.status(200).send(data);
            }
            // not found Tutorial with the id
        });


    };



exports.jmlDtp = (req, res) => {
    
    sql.query(`SELECT sum(jml_dtp) as total_dtp,sum(jml_rusak) as total_rusak,(select sum(data_utama.jml_suara) from data_utama) as total_suara FROM tbl_tps `, (err, response) => {
        if (err) {
            res.status(500).send(err);
        }
        if (response.length) {
            
            let data ={
                status: 'success',
                hasil:response[0]
            }
            res.status(200).send(data);
        }
        // not found Tutorial with the id
    });


 };



exports.hasilTps = (req, res) => {
    
    sql.query(`SELECT no_tps,nama_tps,lokasi,jml_dtp,jml_rusak,
    (select sum(data_utama.jml_suara) from data_utama where data_utama.no_tps=tbl_tps.no_tps and data_utama.no_urut_calon='01') as jml_suara_paslon1, 
    (select sum(data_utama.jml_suara) from data_utama where data_utama.no_tps=tbl_tps.no_tps and data_utama.no_urut_calon='02') as jml_suara_paslon2,
    (select sum(data_utama.jml_suara) from data_utama where data_utama.no_tps=tbl_tps.no_tps and data_utama.no_urut_calon='03') as jml_suara_paslon3, 
    (select sum(data_utama.jml_suara) from data_utama where data_utama.no_tps=tbl_tps.no_tps) as jml_suara
    FROM tbl_tps `, (err, response) => {
        if (err) {
            res.status(500).send(err);
        }
        if (response.length) {
          
            const data ={
                status: 'success',
                hasil:response
            }
            res.status(200).send(data);
        }
        // not found Tutorial with the id
    });


 };


 exports.hasilPerCalon = (req, res) => {
    
    sql.query(`SELECT no_urut,nama_calon, 
    (select sum(data_utama.jml_suara) from data_utama WHERE data_utama.no_urut_calon=tbl_calon.no_urut ) as jml_suara
    FROM tbl_calon `, (err, response) => {
        if (err) {
            res.status(500).send(err);
        }
        if (response.length) {
            const data ={
                status: 'success',
                hasil:response
            }
            res.status(200).send(data);
        }
        // not found Tutorial with the id
    });


 };


exports.insertDataUtama = (req, res) => {
    const d = new Date();
    let year = d.getFullYear();
    sql.query("INSERT INTO data_utama (no_tps,no_urut_calon,jml_suara,tahun,created_by) value ('"+req.body.no_tps+"','"+req.body.no_urut+"','"+req.body.jml_suara+"',"+year+",'"+req.body.created_by+"')  ", (err, response) => {
        if (err) {
            res.status(500).send(err);
        }
        if (response) {
            const data ={
                status: 'success',
                message:'Berhasil'
            }
            res.status(200).send(data);
        }
        // not found Tutorial with the id
    });
 };



exports.updateDTP = (req, res) => {  
    sql.query("UPDATE tbl_tps set jml_dtp='"+req.body.jml_dtp+"',jml_rusak='"+req.body.jml_rusak+"' where no_tps='"+req.body.no_tps+"'  ", (err, response) => {
        if (err) {
            res.status(500).send(err);
        }
        if (response) {
            const data ={
                status: 'success',
                message:'Berhasil'
            }
            res.status(200).send(data);
        }
        // not found Tutorial with the id
    });
 };


 

