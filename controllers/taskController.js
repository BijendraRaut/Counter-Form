const Task = require("../models/Task");
const { validationResult } = require("express-validator");

const taskController = {
  createTask: async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { title, description, status = "pending", dueDate } = req.body;
      const userId = req.userId;

      const taskId = await Task.create({
        title,
        description,
        status,
        dueDate,
        userId,
      });
      const task = await Task.findByIdAndUserId(taskId, userId);

      res.status(201).json(task);
    } catch (error) {
      next(error);
    }
  },

  getAllTasks: async (req, res, next) => {
    try {
      const userId = req.userId;
      // Convert and validate parameters
      const page = req.query.page
        ? Math.max(1, parseInt(req.query.page, 10))
        : 1;
      const limit = req.query.limit
        ? Math.min(100, Math.max(1, parseInt(req.query.limit, 10)))
        : 10;
      const status = ["pending", "in-progress", "completed"].includes(
        req.query.status
      )
        ? req.query.status
        : undefined;

      console.log("Received params:", { userId, page, limit, status }); // Debug log

      const tasks = await Task.findAllByUserId(userId, page, limit, status);

      const totalTasks = await Task.countByUserId(userId, status);
      const totalPages = Math.ceil(totalTasks / limit);

      res.json({
        tasks,
        pagination: {
          page,
          limit,
          totalTasks,
          totalPages,
        },
      });
    } catch (error) {
      console.error("Error in getAllTasks:", error);
      next(error);
    }
  },

  getTaskById: async (req, res, next) => {
    try {
      const { id } = req.params;
      const userId = req.userId;

      const task = await Task.findByIdAndUserId(id, userId);
      if (!task) {
        return res.status(404).json({ message: "Task not found" });
      }

      res.json(task);
    } catch (error) {
      next(error);
    }
  },

  updateTask: async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { id } = req.params;
      const userId = req.userId;
      const { title, description, status, dueDate } = req.body;

      const task = await Task.findByIdAndUserId(id, userId);
      if (!task) {
        return res.status(404).json({ message: "Task not found" });
      }

      await Task.updateByIdAndUserId(id, userId, {
        title,
        description,
        status,
        dueDate,
      });

      const updatedTask = await Task.findByIdAndUserId(id, userId);
      res.json(updatedTask);
    } catch (error) {
      next(error);
    }
  },

  deleteTask: async (req, res, next) => {
    try {
      const { id } = req.params;
      const userId = req.userId;

      const task = await Task.findByIdAndUserId(id, userId);
      if (!task) {
        return res.status(404).json({ message: "Task not found" });
      }

      await Task.deleteByIdAndUserId(id, userId);
      res.json({ message: "Task deleted successfully" });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = taskController;
