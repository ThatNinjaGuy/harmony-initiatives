import { defineField } from "sanity";

// Store the verification details for authentication of tokens
const verificationToken = {
  name: "verification-token",
  title: "Verification Token",
  type: "document",
  fields: [
    defineField({
      name: "identifier",
      title: "Identifier",
      type: "string",
    }),
    defineField({
      name: "token",
      title: "Token",
      type: "string",
    }),
    defineField({
      name: "expires",
      title: "Expires",
      type: "datetime",
    }),
  ],
};

export default verificationToken;
