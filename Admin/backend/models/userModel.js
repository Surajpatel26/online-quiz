const pool = require('../config/db').pool; // Import the pool object

// Fetch all users' names and emails from the database
const getAllUsers = async () => {
    try {
        const result = await pool.query('SELECT name, email FROM users');
        return result.rows;
    } catch (err) {
        throw new Error('Error fetching users: ' + err.message);
    }
};

module.exports = {
    getAllUsers,
};
