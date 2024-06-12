
const config = require('./dbconfig');
const sql = require('mssql');

async function addPost(article, userId) {
  try {
    const dateNow = new Date();

    let pool = await sql.connect(config);
    let post = await pool.request()
      .input('input_article', sql.NVarChar, article)
      .input('input_userId', sql.NVarChar, userId)
      .input('input_createdAt', sql.DateTime, dateNow)
      .query("Insert INTO Posts (OriginalContent, RewrittenContent, UserId, CreatedAt) OUTPUT inserted.* VALUES (@input_article, @input_article, @input_userId, @input_createdAt)");

    const result = {
      isSuccess: true,
      errors: [],
      message: "تم الإضافة بنجاح",
      data: post.recordset
    };

    return result;
  }
  catch (error) {
    throw error;
  }
}

module.exports = {
  addPost: addPost,
}