"use client";

import { Button } from "@nextui-org/button";
import { signIn } from "next-auth/react";

export default function SignInButton(): React.ReactNode {
  return (
    <Button onClick={() => signIn()} color="primary">
      Sign In
    </Button>
  );
}
