// prevFormState has to be accepted within form action (initially it is the same as initialState we passed to useActionState)
import {
  hasMinLength,
  isEmail,
  isEqualsToOtherValue,
  isNotEmpty,
} from "../util/validation.ts";

export const signupAction = (
  prevFormState: { errors: string[] | null },
  formData: FormData,
) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirm-password") as string;
  const firstName = formData.get("first-name") as string;
  const lastName = formData.get("last-name") as string;
  const role = formData.get("role") as string;
  const terms = formData.get("terms") as string;
  const acquisition = formData.getAll("acquisition") as string[]; // "getAll" returns an array

  const errors = [];

  if (isNotEmpty(email) && !isEmail(email)) {
    errors.push("Email is not valid");
  }

  if (!isNotEmpty(password) || !hasMinLength(password, 6)) {
    errors.push("Password must be at least six characters");
    errors.push("You must provide a password with at least six characters");
  }

  if (!isEqualsToOtherValue(password, confirmPassword)) {
    errors.push("Passwords must match");
  }

  if (!isNotEmpty(firstName) || !isNotEmpty(lastName)) {
    errors.push("First and last name must be provided");
  }

  if (!role) {
    errors.push("You must select a role");
  }

  if (!terms) {
    errors.push("You must accept the terms and conditions");
  }

  if (acquisition.length === 0) {
    errors.push("You must select at least one acquisition channel");
  }

  if (errors.length > 0) {
    return {
      errors,
      enteredValues: {
        email,
        password,
        confirmPassword,
        firstName,
        lastName,
        role,
        terms,
        acquisition,
      },
    };
  }
  console.log({ prevFormState });

  return {
    errors: null,
  };
};
