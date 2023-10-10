import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { initApp } from "./init-app";

export const nextAuthOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: "Email",
      credentials: {
        username: { label: "username", type: "email" },
        password: { label: "password", type: "password" },
      },
      type: "credentials",
      authorize: async (credentials, req) => {
        try {
          if (!credentials) return null;
          initApp();
          const auth = getAuth();
          const userCredential = await signInWithEmailAndPassword(
            auth,
            credentials.username,
            credentials.password,
          );
          return { user: userCredential.user, id: userCredential.user.uid };
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) token.user = user.user;
      return token;
    },

    session: async ({ session, token }) => {
      session.user = token.user;
      return session;
    },
  },
};
