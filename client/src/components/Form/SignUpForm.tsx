import { useState, FormEventHandler } from "react";
import axios from "axios";

import Input from "../UI/Input";

export interface ISignupFields {
  fName: string;
  lName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface IInputField {
  id: keyof ISignupFields;
  label: string;
  type: "text" | "email" | "password";
}

const fields: IInputField[] = [
  { id: "fName", label: "First name", type: "text" },
  { id: "lName", label: "Last name", type: "text" },
  { id: "email", label: "Email", type: "email" },
  { id: "password", label: "Password", type: "password" },
  { id: "confirmPassword", label: "Confirm Password", type: "password" },
];

const SignupForm = () => {
  const [formIsValid, setFormIsValid] = useState(true);

  const [formData, setFormData] = useState<ISignupFields>({
    fName: "",
    lName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<ISignupFields>({
    fName: "",
    lName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const sendData = async () => {
    if (!formIsValid) return;

    const res = await axios.post("/auth/signup", {
      firstName: formData.fName,
      lastName: formData.lName,
      email: formData.email,
      password: formData.password,
    });

    console.log(res.data);
  };

  const formSubmitHandler: FormEventHandler = (e) => {
    e.preventDefault();

    if (formData.fName === "") {
      setErrors((prev) => {
        return { ...prev, fName: "First name can't be empty" };
      });
      setFormIsValid(false);
    }

    if (formData.lName === "") {
      setErrors((prev) => {
        return { ...prev, lName: "Last name can't be empty" };
      });
      setFormIsValid(false);
    }

    if (!formData.email.includes("@") || !formData.email.includes(".")) {
      setErrors((prev) => {
        return { ...prev, email: "Please enter a valid Email" };
      });
      setFormIsValid(false);
    }

    if (formData.password!.length < 8) {
      setErrors((prev) => {
        return { ...prev, password: "Password must be atleast 8 characters" };
      });
      setFormIsValid(false);
    }

    if (formData.confirmPassword !== formData.password) {
      setErrors((prev) => {
        return {
          ...prev,
          confirmPassword: "This doesn't match the entered password",
        };
      });
      setFormIsValid(false);
    }

    sendData();
  };

  return (
    <form onSubmit={formSubmitHandler} className="mx-5 my-7">
      <div className="flex">
        {fields
          .filter((e, i) => i < 2)
          .map((field) => (
            <Input
              key={field.id}
              id={field.id}
              label={field.label}
              type={field.type}
              error={errors[field.id]}
              setData={setFormData}
              setErrors={setErrors}
            />
          ))}
      </div>
      {fields
        .filter((e, i) => i >= 2)
        .map((field) => (
          <Input
            key={field.id}
            id={field.id}
            label={field.label}
            type={field.type}
            error={errors[field.id]}
            setData={setFormData}
            setErrors={setErrors}
          />
        ))}
      <span className="block mx-6">
        By signing up you agree to our{" "}
        <a
          href="/signup"
          className="text-blue-900 underline underline-offset-2"
        >
          Privacy Policy
        </a>
      </span>
      <div className="w-auto h-[7rem] flex items-center justify-center">
        <button
          type="submit"
          className="bg-green-800 text-white uppercase w-80 h-16 mx-5 text-3xl rounded-full"
        >
          Sign up
        </button>
      </div>
    </form>
  );
};

export default SignupForm;
