import React, { useActionState } from "react";
import {
  hasMinLength,
  isEmail,
  isEqualsToOtherValue,
  isNotEmpty,
} from "../util/validation.ts";

const Signup: React.FC = () => {
  // prevFormState has to be accepted within form action (initially it is the same as initialState we passed to useActionState)
  const signupAction = (
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
      return { errors };
    }
    console.log({ prevFormState });

    return {
      errors: null,
    };
  };

  const [formState, formAction] = useActionState(signupAction, {
    errors: null,
  });

  console.log({ formState });

  return (
    <form action={formAction}>
      <h2>Welcome on board!</h2>
      <p>We just need a little bit of data from you to get you started 🚀</p>

      <div className="control">
        <label htmlFor="email">Email</label>
        <input id="email" type="email" name="email" />
      </div>

      <div className="control-row">
        <div className="control">
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password" />
        </div>

        <div className="control">
          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            id="confirm-password"
            type="password"
            name="confirm-password"
          />
        </div>
      </div>

      <hr />

      <div className="control-row">
        <div className="control">
          <label htmlFor="first-name">First Name</label>
          <input type="text" id="first-name" name="first-name" />
        </div>

        <div className="control">
          <label htmlFor="last-name">Last Name</label>
          <input type="text" id="last-name" name="last-name" />
        </div>
      </div>

      <div className="control">
        <label htmlFor="phone">What best describes your role?</label>
        <select id="role" name="role">
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
          <option value="employee">Employee</option>
          <option value="founder">Founder</option>
          <option value="other">Other</option>
        </select>
      </div>

      <fieldset>
        <legend>How did you find us?</legend>
        <div className="control">
          <input
            type="checkbox"
            id="google"
            name="acquisition"
            value="google"
          />
          <label htmlFor="google">Google</label>
        </div>

        <div className="control">
          <input
            type="checkbox"
            id="friend"
            name="acquisition"
            value="friend"
          />
          <label htmlFor="friend">Referred by friend</label>
        </div>

        <div className="control">
          <input type="checkbox" id="other" name="acquisition" value="other" />
          <label htmlFor="other">Other</label>
        </div>
      </fieldset>

      <div className="control">
        <label htmlFor="terms-and-conditions">
          <input type="checkbox" id="terms-and-conditions" name="terms" />I
          agree to the terms and conditions
        </label>
      </div>
      {formState.errors && (
        <ul className="errors">
          {formState.errors?.map((error) => (
            <li className="error" key={error}>
              {error}
            </li>
          ))}
        </ul>
      )}

      <p className="form-actions">
        <button type="reset" className="button button-flat">
          Reset
        </button>
        <button className="button">Sign up</button>
      </p>
    </form>
  );
};

export default Signup;
