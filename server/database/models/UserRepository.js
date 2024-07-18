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
      `select username, email from ${this.table} where id = ?`,
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
  // TODO: Implement the delete operation to remove an user by its ID

  // async delete(id) {
  //   ...
  // }
}

module.exports = UserRepository;
