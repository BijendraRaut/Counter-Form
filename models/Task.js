const pool = require("../config/db");

class Task {
  static async create({ title, description, status, dueDate, userId }) {
    const [result] = await pool.execute(
      "INSERT INTO tasks (title, description, status, due_date, user_id) VALUES (?, ?, ?, ?, ?)",
      [title, description, status, dueDate, userId]
    );
    return result.insertId;
  }

  static async findAllByUserId(userId, page = 1, limit = 10, status) {
    try {
      const offset = (page - 1) * limit;
      let query = "SELECT * FROM tasks WHERE user_id = ?";
      const params = [userId];

      if (status) {
        query += " AND status = ?";
        params.push(status);
      }

      query += " LIMIT ? OFFSET ?";
      // Convert to numbers explicitly
      params.push(parseInt(limit, 10), parseInt(offset, 10));

      console.log("Final Query:", query); // Debug log
      console.log("Query Params:", params); // Debug log

      const [tasks] = await pool.execute(query, params);
      return tasks;
    } catch (error) {
      console.error("Error in findAllByUserId:", error);
      throw error;
    }
  }

  static async findByIdAndUserId(id, userId) {
    const [tasks] = await pool.execute(
      "SELECT * FROM tasks WHERE id = ? AND user_id = ?",
      [id, userId]
    );
    return tasks[0];
  }

  static async updateByIdAndUserId(
    id,
    userId,
    { title, description, status, dueDate }
  ) {
    // Build the query dynamically based on provided fields
    let query = "UPDATE tasks SET ";
    const updates = [];
    const params = [];

    if (title !== undefined) {
      updates.push("title = ?");
      params.push(title);
    }

    if (description !== undefined) {
      updates.push("description = ?");
      params.push(description);
    }

    if (status !== undefined) {
      updates.push("status = ?");
      params.push(status);
    }

    if (dueDate !== undefined) {
      updates.push("due_date = ?");
      params.push(dueDate);
    }

    if (updates.length === 0) {
      throw new Error("No fields to update");
    }

    query += updates.join(", ") + " WHERE id = ? AND user_id = ?";
    params.push(id, userId);

    await pool.execute(query, params);
  }

  static async deleteByIdAndUserId(id, userId) {
    await pool.execute("DELETE FROM tasks WHERE id = ? AND user_id = ?", [
      id,
      userId,
    ]);
  }

  static async countByUserId(userId, status) {
    let query = "SELECT COUNT(*) as count FROM tasks WHERE user_id = ?";
    const params = [userId];

    if (status) {
      query += " AND status = ?";
      params.push(status);
    }

    const [result] = await pool.execute(query, params);
    return result[0].count;
  }
}

module.exports = Task;
