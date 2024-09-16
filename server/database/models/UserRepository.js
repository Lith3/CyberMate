const AbstractRepository = require("./AbstractRepository");

class UserRepository extends AbstractRepository {
  constructor() {
    // Call the constructor of the parent class (AbstractRepository)
    // and pass the table name "user" as configuration
    super({ table: "user" });
  }

  async create(user) {
    // Execute the SQL INSERT query to add a new user to the "user" table
    const [result] = await this.database.query(
      `insert into ${this.table} (username, email, password) values (?,?, ?)`,
      [user.username, user.email, user.password]
    );

    // Return the ID of the newly inserted user
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async read(id) {
    // Execute the SQL SELECT query to retrieve a specific user by its ID
    const [rows] = await this.database.query(
      `select avatar, username, email from ${this.table} where id = ?`,
      [id]
    );

    // Return the first row of the result, which represents the user
    return rows[0];
  }

  async login(email) {
    const [rows] = await this.database.query(
      `select id, password from ${this.table} WHERE email = ?`,
      [email]
    );

    return rows[0];
  }

  // For check if an email address or username is already in use
  async readFinder(column, element, id) {
    if (id === undefined) {
      const [result] = await this.database.query(
        // column can be only mail or username, it is defined in the middleware validateSignUp
        `SELECT COUNT(id) AS count FROM user WHERE ${column} = ?`,
        [element]
      );
      return result[0].count;
    }
    const parsedId = parseInt(id, 10);
    const [result] = await this.database.query(
      // column can be only mail or username, it is defined in the middleware validateSignUp
      `SELECT COUNT(id) AS count FROM user WHERE ${column} = ? AND NOT id = ?`,
      [element, parsedId]
    );
    return result[0].count;
  }

  // The U of CRUD - Update operation

  async update(update, userId) {
    const [result] = await this.database.query(
      `update ${this.table} set username = ?, email = ? where id = ?`,
      [update.username, update.email, userId]
    );

    // Return how many rows were affected
    return result.affectedRows;
  }

  // The D of CRUD - Delete operation

  async delete(userId) {
    await this.database.query(
      `delete message from message  JOIN topic ON topic_id = topic.id JOIN ${this.table} ON topic.user_id = user.id WHERE user.id = ?;`,
      [userId]
    );

    await this.database.query(`delete from topic where user_id = ?`, [userId]);

    const [user] = await this.database.query(
      `delete from ${this.table} where id = ?`,
      [userId]
    );

    return user.affectedRows;
  }

  async editImagePath(userId, filePath) {
    const result = await this.database.query(
      `UPDATE ${this.table} set avatar = ? WHERE id = ?`,
      [filePath, userId]
    );
    return result.affectedRows;
  }
}

module.exports = UserRepository;
