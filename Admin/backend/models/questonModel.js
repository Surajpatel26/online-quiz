const { pool } = require('../config/db');

// Fetch questions based on tech_id and level_id
const getQuestions = async (tech_id, level_id) => {
  let query = 'SELECT * FROM questions WHERE 1=1';
  const values = [];

  if (tech_id) {
    query += ` AND tech_id = $${values.length + 1}`;
    values.push(tech_id);
  }

  if (level_id) {
    query += ` AND level_id = $${values.length + 1}`;
    values.push(level_id);
  }

  const result = await pool.query(query, values);
  return result.rows;
};

// Fetch all technologies
const getTechnologies = async () => {
  const result = await pool.query('SELECT * FROM technologies');
  return result.rows;
};

// Fetch all levels
const getLevels = async () => {
  const result = await pool.query('SELECT * FROM levels');
  return result.rows;
};

// Delete a question by id
const deleteQuestion = async (id) => {
  const result = await pool.query('DELETE FROM questions WHERE question_id = $1 RETURNING *', [id]);
  return result.rows[0];
};

// Update a question by id
const updateQuestion = async (id, questionData) => {
  const {
    question_text,
    option_a,
    option_b,
    option_c,
    option_d,
    correct_option,
    tech_id,
    level_id
  } = questionData;

  // Query to update all the required fields
  const result = await pool.query(
    `UPDATE questions
     SET question_text = $1,
         option_a = $2,
         option_b = $3,
         option_c = $4,
         option_d = $5,
         correct_option = $6,
         tech_id = $7,
         level_id = $8
     WHERE question_id = $9
     RETURNING *`,
    [question_text, option_a, option_b, option_c, option_d, correct_option, tech_id, level_id, id]
  );

  return result.rows[0];
};


module.exports = { getQuestions, getTechnologies, getLevels, deleteQuestion, updateQuestion };
