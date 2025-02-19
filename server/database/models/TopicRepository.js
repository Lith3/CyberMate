const AbstractRepository = require("./AbstractRepository");

class UserRepository extends AbstractRepository {
  constructor() {
    // Call the constructor of the parent class (AbstractRepository)
    // and pass the table name "topic" as configuration
    super({ table: "topic" });
  }

  // The C of CRUD - Create operation

  async create(title, subject, date, userId) {
    // Execute the SQL INSERT query to add a new topic to the "topic" table
    const [result] = await this.database.query(
      `insert into ${this.table} (title, user_id, date, subject) values (?,?,?,?)`,
      [title, userId, date, subject]
    );

    // Return the ID of the newly inserted topic
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async read(id) {
    // Execute the SQL SELECT query to retrieve a specific topic by its ID
    const [rows] = await this.database.query(
      `select * from ${this.table} where id = ?`,
      [id]
    );

    // Return the first row of the result, which represents the topic
    return rows[0];
  }

  async readAll(search) {
    // Execute the SQL SELECT query to retrieve all user from the "user" table
    const [rows] = await this.database.query(
      `select ${this.table}.id, title, username, DATE_FORMAT(date, "%d/%m/%Y") AS date, subject from ${this.table} JOIN user ON user_id = user.id where title LIKE ? OR username LIKE ? ORDER by topic.id DESC`,
      [`%${search}%`, `%${search}%`]
    );

    // Return the array of user
    return rows;
  }

  // The U of CRUD - Update operation
  // TODO: Implement the update operation to modify an existing topic

  // async update(topic) {
  //   ...
  // }

  // The D of CRUD - Delete operation
  // TODO: Implement the delete operation to remove an topic by its ID

  // async delete(id) {
  //   ...
  // }
}

module.exports = UserRepository;
