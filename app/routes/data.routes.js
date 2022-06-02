const { authJwt } = require("../middleware");
const controller = require("../controllers/data.controller");
module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.get("/api/data/calon", controller.hasilPerCalon);

  app.get("/api/data/totalall", controller.jmlDtp);

  app.get("/api/data/hasiltps", controller.hasilTps);

  app.get("/api/data/pengumuman", controller.getPengumuman);

  app.get("/api/data/calonsatuan", controller.calonAll);

  app.post("/api/data/insertdatautama", controller.insertDataUtama);

  app.patch("/api/data/updatedtp", controller.updateDTP);


//   app.get(
//     "/api/test/mod",
//     [authJwt.verifyToken, authJwt.isModerator],
//     controller.moderatorBoard
//   );
//   app.get(
//     "/api/test/admin",
//     [authJwt.verifyToken, authJwt.isAdmin],
//     controller.adminBoard
//   );
};

