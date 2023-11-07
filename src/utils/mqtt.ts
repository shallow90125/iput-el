import { connect } from "mqtt";

export const mqtt = connect(process.env.NEXT_PUBLIC_ADDRESS!, {
  username: process.env.NEXT_PUBLIC_USERNAME,
  password: process.env.NEXT_PUBLIC_PASSWORD,
  clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
});
