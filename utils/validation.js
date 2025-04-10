const { body, query, param } = require('express-validator');

const validateRegistration = [
  body('username').notEmpty().withMessage('Username is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
];

const validateLogin = [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required')
];

const validateTaskCreation = [
  body('title').notEmpty().withMessage('Title is required'),
  body('description').optional().isString(),
  body('status').optional().isIn(['pending', 'in-progress', 'completed']),
  body('dueDate').isISO8601().withMessage('Valid due date is required')
];

const validateTaskUpdate = [
  param('id').isInt().withMessage('Valid task ID is required'),
  body('title').optional().notEmpty().withMessage('Title cannot be empty'),
  body('description').optional().isString(),
  body('status').optional().isIn(['pending', 'in-progress', 'completed']),
  body('dueDate').optional().isISO8601().withMessage('Valid due date is required')
];

const validateGetTasks = [
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100'),
  query('status').optional().isIn(['pending', 'in-progress', 'completed'])
];

module.exports = {
  validateRegistration,
  validateLogin,
  validateTaskCreation,
  validateTaskUpdate,
  validateGetTasks
};