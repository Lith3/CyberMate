const AbstractRepository = require("./AbstractRepository");

class UserRepository extends AbstractRepository {
  constructor() {
    // Call the constructor of the parent class (AbstractRepository)
    // and pass the table name "message" as configuration
    super({ table: "message" });
  }

  // The C of CRUD - Create operation

  async create(userId, date, content, topicId) {
    // Execute the SQL INSERT query to add a new message to the "message" table
    const [result] = await this.database.query(
      `insert into ${this.table} (user_id, date, content, topic_id) values (?,?,?,?)`,
      [userId, date, content, topicId]
    );

    // Return the ID of the newly inserted message
    return result.affectedRows;
  }

  // The Rs of CRUD - Read operations

  async read(id) {
    // Execute the SQL SELECT query to retrieve a specific message by its ID
    const [rows] = await this.database.query(
      `select * from ${this.table} where id = ?`,
      [id]
    );

    // Return the first row of the result, which represents the message
    return rows[0];
  }

  // The U of CRUD - Update operation
  // TODO: Implement the update operation to modify an existing message

  // async update(message) {
  //   ...
  // }

  // The D of CRUD - Delete operation
  // TODO: Implement the delete operation to remove an message by its ID

  // async delete(id) {
  //   ...
  // }
}

module.exports = UserRepository;
