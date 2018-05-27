var client = require("../connection.js");

exports.getInfo = (req, res, next) => {
  // client.ping({
  //     requestTimeout: 30000,
  // }, function(error) {
  //     if (error) {
  //         console.error('elasticsearch cluster is down!');
  //     } else {
  //         console.log('Everything is ok');
  //     }
  // });

  client.cluster.health({}, function(err, resp, status) {
    res.status(200).send({
      helthCheck: resp
    });
  });
};

exports.get = (req, res, next) => {
  client
    .search({
      index: "employes",
      type: "users",
      q: `firstName:${req.query.firstName}`
    })
    .then(
      function(resp) {
        res.status(200).send({
          result: resp
        });
      },
      function(err) {
        res.status(500).send({
          result: err.message
        });
      }
    );
};

exports.getById = (req, res, next) => {
  res.status(200).send("Requisição recebida com sucesso!");
};

exports.post = (req, res, next) => {
  console.log(req.body);

  client.index(
    {
      index: "employes",
      type: "users",
      body: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        age: req.body.age
      }
    },
    function(err, resp, status) {
      res.status(201).send({
        helthCheck: resp
      });
    }
  );
};

exports.put = (req, res, next) => {
  let id = req.params.id;
  res.status(201).send(`Requisição recebida com sucesso! ${id}`);
};

exports.delete = (req, res, next) => {
  client.delete(
    {
      index: "employes",
      id: req.params.id,
      type: "users"
    },
    function(err, resp, status) {
      res.status(200).send({
        helthCheck: resp
      });
    }
  );
};
