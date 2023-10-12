"use client";

import { Avatar } from "@nextui-org/avatar";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import SignInButton from "./SignInButton";

type Props = {
  session: Session | null;
};

export default function UserField(props: Props) {
  return props.session ? (
    <Dropdown>
      <DropdownTrigger>
        <Avatar as="button" src={props.session.user.photoURL ?? ""} />
      </DropdownTrigger>
      <DropdownMenu
        aria-label="user-field"
        onAction={(key) => {
          switch (key) {
            case "signOut":
              signOut();
              break;
          }
        }}
      >
        <DropdownItem key="signOut" className=" text-primary">
          Sign Out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  ) : (
    <SignInButton />
  );
}
