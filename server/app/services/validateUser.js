const Joi = require("joi");

// Declares the different fields of the user table
const username = Joi.string().min(2).max(20).required().messages({
  "string.min": "Le pseudo doit contenir au moins 2 caractères",
  "string.max": "Le pseudo ne doit pas dépasser 20 caractères",
  "string.empty": "Le pseudo ne peut pas être vide",
});
const email = Joi.string().email().required().messages({
  "string.email": "Merci d'inscrire un email valide",
  "string.empty": "L'email est obligatoire",
});
const password = Joi.string()
  .pattern(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&:;ù#àâäéèêëîïôöùûüÿç])[A-Za-z\d@$!%*?&:;ù#àâäéèêëîïôöùûüÿç]{12,}$/
  )
  .min(12)
  .required();

// Schema of SingUp form
const signInSchema = Joi.object({
  username,
  email,
  password,
});

// Validation of SingUp form :
const validateSignup = (req, res, next) => {
  const { error } = signInSchema.validate(req.body, { abortEarly: true });

  if (error === undefined) {
    next();
  } else {
    res.status(400).json({ validationErrors: error.details });
  }
};

// Schema of edit profile :
const profileSchema = Joi.object({
  username,
  email,
});

// Validation of Profile edit form :
const validateProfileEdit = (req, res, next) => {
  const { error } = profileSchema.validate(req.body, { abortEarly: true });

  if (error === undefined) {
    next();
  } else {
    res.status(400).json({ validationErrors: error.details });
  }
};

module.exports = { validateSignup, validateProfileEdit };
