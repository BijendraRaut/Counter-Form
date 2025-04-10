const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");
const auth = require("../middleware/auth");
const {
  validateTaskCreation,
  validateTaskUpdate,
  validateGetTasks,
} = require("../utils/validation");

router.post("/", auth, validateTaskCreation, taskController.createTask);
router.get("/", auth, validateGetTasks, taskController.getAllTasks);
router.get("/:id", auth, taskController.getTaskById);
router.put("/:id", auth, validateTaskUpdate, taskController.updateTask);
router.delete("/:id", auth, taskController.deleteTask);

module.exports = router;
