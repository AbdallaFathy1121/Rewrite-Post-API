const dbPostOperations = require("../db/dbPostOperations");
require("dotenv").config();

//API TO Add article
module.exports.AddPost = async (req, res) => {
  const { article, userId } = req.body;
  try {
    await dbPostOperations.addPost(article, userId).then(result => {
      res.status(201).json(result);
    })
  } catch (err) {
    res.status(404).send(err.message);
  }
};
