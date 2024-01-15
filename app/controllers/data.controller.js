// const db = require("../models");
// const User = db.user;
const sql = require("../config/db.js");

exports.calonAll = (req, res) => {
    
    sql.query(`SELECT no_urut,nama_calon, 
    (select sum(rekap_suara.jml_suara) from rekap_suara WHERE rekap_suara.no_urut_calon=tbl_calon.no_urut ) as jml_suara,
    (select sum(tbl_tps.jml_dpt) as jml_dpt from tbl_tps) as jml_dpt
    FROM tbl_calon `, (err, response) => {
        if (err) {
            res.status(500).send(err);
        }
        if (response.length) {
            let percent=0;
            let data1=[];

            response.forEach((value) => {
                percent=(value.jml_suara/value.jml_dpt)*100;
                var data={
                    nama_calon:value.nama_calon,
                    jml_suara:value.jml_suara,
                    no_urut:value.no_urut,
                    persen: percent.toFixed(2),
                };
                data1.push(data);
            });
            
            const Hasil={
                jml_suara0:data1[0].jml_suara,
                jml_suara1:data1[1].jml_suara,
                jml_suara2:data1[2].jml_suara,
                jml_suara3:data1[3].jml_suara,
                jml_suara4:data1[4].jml_suara,
                jml_suara5:data1[5].jml_suara,
                jml_suara6:data1[6].jml_suara,
                persen0:data1[0].persen,
                persen1:data1[1].persen,
                persen2:data1[2].persen,
                persen3:data1[3].persen,
                persen4:data1[4].persen,
                persen5:data1[5].persen,
                persen6:data1[6].persen,
                nama_calon0:data1[0].nama_calon,
                nama_calon1:data1[1].nama_calon,
                nama_calon2:data1[2].nama_calon,
                nama_calon3:data1[3].nama_calon,
                nama_calon4:data1[4].nama_calon,
                nama_calon5:data1[5].nama_calon,
                nama_calon6:data1[6].nama_calon,
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
    
    sql.query("SELECT sum(jml_dpt) as total_dtp,sum(jml_rusak) as total_rusak,(select sum(rekap_suara.jml_suara) from rekap_suara) as total_suara FROM tbl_tps ", (err, response) => {
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
    
    sql.query("SELECT idkec,namakec,namakel,sum(jml_dpt) as jml_dpt,sum(jml_rusak) as jml_rusak,(select sum(rekap_suara.jml_suara) from rekap_suara where rekap_suara.idkec=tbl_tps.idkec and rekap_suara.no_urut_calon='00') as jml_suara_paslon0, (select sum(rekap_suara.jml_suara) from rekap_suara where rekap_suara.idkec=tbl_tps.idkec and rekap_suara.no_urut_calon='01') as jml_suara_paslon1, (select sum(rekap_suara.jml_suara) from rekap_suara where rekap_suara.idkec=tbl_tps.idkec and rekap_suara.no_urut_calon='02') as jml_suara_paslon2, (select sum(rekap_suara.jml_suara) from rekap_suara where rekap_suara.idkec=tbl_tps.idkec and rekap_suara.no_urut_calon='03') as jml_suara_paslon3, (select sum(rekap_suara.jml_suara) from rekap_suara where rekap_suara.idkec=tbl_tps.idkec and rekap_suara.no_urut_calon='04') as jml_suara_paslon4, (select sum(rekap_suara.jml_suara) from rekap_suara where rekap_suara.idkec=tbl_tps.idkec and rekap_suara.no_urut_calon='05') as jml_suara_paslon5, (select sum(rekap_suara.jml_suara) from rekap_suara where rekap_suara.idkec=tbl_tps.idkec and rekap_suara.no_urut_calon='06') as jml_suara_paslon6, (select sum(rekap_suara.jml_suara) from rekap_suara where rekap_suara.idkec=tbl_tps.idkec) as jml_suara FROM tbl_tps group by idkec", (err, response) => {
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
    
    sql.query("SELECT no_urut,nama_calon, (select sum(rekap_suara.jml_suara) from rekap_suara WHERE rekap_suara.no_urut_calon=tbl_calon.no_urut ) as jml_suara FROM tbl_calon" , (err, response) => {
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
    sql.query("INSERT INTO rekap_suara (no_tps,no_urut_calon,jml_suara,tahun,created_by,updated_date) value ('"+req.body.no_tps+"','"+req.body.no_urut+"','"+req.body.jml_suara+"',"+year+",'"+req.body.created_by+"', CURRENT_TIMESTAMP)  ", (err, response) => {
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
    sql.query("UPDATE tbl_tps set jml_dpt='"+req.body.jml_dpt+"',jml_rusak='"+req.body.jml_rusak+"' where no_tps='"+req.body.no_tps+"'  ", (err, response) => {
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


 

