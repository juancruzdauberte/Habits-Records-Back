import { Schema } from "express-validator";
import { checkSchema } from "express-validator";

const habitSchemaValidator: Schema = {
  title: {
    trim: true,
    isLength: {
      options: {
        max: 20,
      },
      errorMessage: "Máximo 20 caracteres",
    },
    escape: true,
    isString: {
      errorMessage: "Solo carateres permitidos",
    },
  },
  description: {
    trim: true,
    optional: { options: { nullable: true } },
    isLength: {
      options: {
        max: 50,
      },
      errorMessage: "Máximo 50 caracteres",
    },
    notEmpty: {
      errorMessage: "El título es obligatorio",
    },
    escape: true,
    isString: {
      errorMessage: "Solo carateres permitidos",
    },
  },
};

export const habitSchema = checkSchema(habitSchemaValidator);
