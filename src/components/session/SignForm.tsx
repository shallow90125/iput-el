"use client";

import { Button, Input, Link } from "@nextui-org/react";
import { signIn } from "next-auth/react";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

type Props = {
  isSignUp: boolean;
};

type Form = {
  email: string;
  password: string;
};

export default function SignForm(props: Props): React.ReactNode {
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Form>();
  const [error, setError] = useState<string>();

  return (
    <form
      className="grid place-items-center gap-4"
      onSubmit={handleSubmit(async (data) => {
        const res = await signIn(props.isSignUp ? "signup" : "signin", {
          email: data.email,
          password: data.password,
          redirect: false,
        });
        if (!res?.ok) {
          setError("email or password is invalid");
        } else {
          router.push("/dashboard");
        }
      })}
    >
      <div className=" text-xl font-bold">
        {props.isSignUp ? "Sign Up" : "Sign In"}
      </div>
      <Input
        variant="bordered"
        type="email"
        label="email"
        {...register("email", {
          required: "required",
        })}
        isInvalid={!!errors.email || !!error}
        errorMessage={errors.email?.message}
      />
      <Input
        variant="bordered"
        type="password"
        label="password"
        {...register("password", {
          required: "required",
        })}
        isInvalid={!!errors.password || !!error}
        errorMessage={errors.password?.message || error}
      />
      {props.isSignUp ? (
        <>
          <Button type="submit" color="primary">
            Sign Up
          </Button>
          <Link href="/signin" as={NextLink}>
            Sign In
          </Link>
        </>
      ) : (
        <>
          <Button type="submit" color="primary">
            Sign In
          </Button>
          <Link href="/signup" as={NextLink}>
            Sign Up
          </Link>
        </>
      )}
    </form>
  );
}
