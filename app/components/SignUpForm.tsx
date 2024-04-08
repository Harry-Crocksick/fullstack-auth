"use client";

import { ReactNode, useState, useEffect } from "react";
import {
  EnvelopeIcon,
  EyeIcon,
  EyeSlashIcon,
  KeyIcon,
  PhoneIcon,
  UserIcon,
} from "@heroicons/react/20/solid";
import { Input, Checkbox, Button } from "@nextui-org/react";
import { z } from "zod";
import validator from "validator";
import {
  Controller,
  SubmitHandler,
  useForm,
  UseFormRegisterReturn,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { passwordStrength } from "check-password-strength";
import PasswordStrength from "./PasswordStrength";
import { registerUser } from "@/utils/actions/authActions";
import { toast } from "react-toastify";

const FormSchema = z
  .object({
    firstName: z
      .string()
      .min(2, "First name must be at least 2 characters")
      .max(45, "First name must be less than 45 characters")
      .regex(new RegExp("^[a-zA-Z]+$"), "No special character allowed!"),
    lastName: z
      .string()
      .min(2, "Last name must be at least 2 characters")
      .max(45, "Last name must be less than 45 characters")
      .regex(new RegExp("^[a-zA-Z]+$"), "No special character allowed!"),
    email: z.string().email("Please enter a valid email address"),
    phone: z
      .string()
      .refine(validator.isMobilePhone, "Please enter a valid phone number"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .max(50, "Password must be less than 50 characters"),
    confirmPassword: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .max(50, "Password must be less than 50 characters"),
    accepted: z.literal(true, {
      errorMap: () => ({
        message: "Please accept all terms",
      }),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password and confirm password doesn't match!",
    path: ["password", "confirmPassword"],
  });

type InputType = z.infer<typeof FormSchema>;

export default function SignUpForm() {
  const {
    register,
    handleSubmit,
    reset,
    control,
    watch,
    formState: { errors },
  } = useForm<InputType>({
    resolver: zodResolver(FormSchema),
  });
  const [passStrength, setPassStrength] = useState(0);

  useEffect(() => {
    setPassStrength(passwordStrength(watch().password).id);
  }, [watch().password]);

  const saveUser: SubmitHandler<InputType> = async (data) => {
    const { accepted, confirmPassword, ...user } = data;
    try {
      const result = await registerUser(user);
      console.dir(result, { depth: null });
      toast.success("Successfully saved user!");
    } catch (error) {
      toast.error("Failed to save user!");
      console.error(error);
    }
  };

  return (
    <form
      className="grid grid-cols-2 gap-3 p-2 shadow border rounded-md"
      onSubmit={handleSubmit(saveUser)}
    >
      <Input
        {...register("firstName")}
        errorMessage={errors.firstName?.message}
        isInvalid={!!errors.firstName}
        label="First Name"
        startContent={<UserIcon className="w-4" />}
      />
      <Input
        {...register("lastName")}
        errorMessage={errors.lastName?.message}
        isInvalid={!!errors.lastName}
        label="Last Name"
        startContent={<UserIcon className="w-4" />}
      />
      <Input
        {...register("email")}
        errorMessage={errors.email?.message}
        isInvalid={!!errors.email}
        className="col-span-2"
        label="Email"
        startContent={<EnvelopeIcon className="w-4" />}
      />
      <Input
        {...register("phone")}
        errorMessage={errors.phone?.message}
        isInvalid={!!errors.phone}
        className="col-span-2"
        label="Phone"
        startContent={<PhoneIcon className="w-4" />}
      />
      <MyInput
        errorMessage={errors.password?.message}
        label="Password"
        hookFormProps={register("password")}
        isInvalid={!!errors.password}
      />
      <PasswordStrength passStrength={passStrength} />
      <MyInput
        errorMessage={errors.confirmPassword?.message}
        label="Confirm Password"
        hookFormProps={register("confirmPassword")}
        isInvalid={!!errors.confirmPassword}
      />
      <Controller
        control={control}
        name="accepted"
        render={({ field }) => (
          <Checkbox
            onChange={field.onChange}
            onBlur={field.onBlur}
            defaultSelected={false}
            className="col-span-2"
          >
            I accept all the terms
          </Checkbox>
        )}
      />
      {!!errors.accepted && (
        <p className="text-red-500">{errors.accepted.message}</p>
      )}
      <Button type="submit" color="primary" className="col-span-2 mx-auto">
        Submit
      </Button>
    </form>
  );
}

function MyInput({
  label,
  errorMessage,
  hookFormProps,
  isInvalid,
}: {
  label: string;
  errorMessage: ReactNode;
  hookFormProps: UseFormRegisterReturn;
  isInvalid: boolean;
}) {
  const [isVisiblePass, setIsVisiblePass] = useState(false);

  const toggleVisiblePass = () => setIsVisiblePass((prev) => !prev);

  return (
    <Input
      {...hookFormProps}
      errorMessage={errorMessage}
      isInvalid={isInvalid}
      className="col-span-2"
      label={label}
      type={isVisiblePass ? "text" : "password"}
      startContent={<KeyIcon className="w-4" />}
      endContent={
        isVisiblePass ? (
          <EyeIcon className="w-4 cursor-pointer" onClick={toggleVisiblePass} />
        ) : (
          <EyeSlashIcon
            className="w-4 cursor-pointer"
            onClick={toggleVisiblePass}
          />
        )
      }
    />
  );
}
