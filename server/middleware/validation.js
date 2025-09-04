const { body, param, query, validationResult } = require('express-validator');

const handleValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  next();
};

// Pets
const createPetRules = [
  body('name').trim().notEmpty().withMessage('name es requerido'),
  body('age').trim().notEmpty().withMessage('age es requerido'),
  body('area').trim().notEmpty().withMessage('area es requerido'),
  body('justification').trim().notEmpty().withMessage('justification es requerido'),
  body('email').isEmail().withMessage('email inválido'),
  body('phone').trim().notEmpty().withMessage('phone es requerido'),
  body('type').trim().notEmpty().withMessage('type es requerido')
];

const updatePetStatusRules = [
  param('id').isMongoId().withMessage('id inválido'),
  body('status').optional().isIn(['Pending','Approved','Rejected']).withMessage('status inválido'),
  body('email').optional().isEmail().withMessage('email inválido'),
  body('phone').optional().trim().notEmpty().withMessage('phone inválido')
];

// Users
const registerRules = [
  body('name').trim().notEmpty(),
  body('email').isEmail(),
  body('password').isLength({ min: 6 }),
  body('role').optional().isIn(['user','admin'])
];

const loginRules = [
  body('email').isEmail(),
  body('password').notEmpty()
];

// Adoptions
const createAdoptionRules = [
  body('petId').isMongoId(),
  body('applicantName').trim().notEmpty(),
  body('applicantEmail').isEmail(),
  body('message').trim().notEmpty()
];

module.exports = {
  handleValidation,
  createPetRules,
  updatePetStatusRules,
  registerRules,
  loginRules,
  createAdoptionRules,
  param,
  query
};
