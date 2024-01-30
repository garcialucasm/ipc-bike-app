import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getTokenFromCookies } from "./authUtils";
import jwt from "jsonwebtoken";

const jwtSecretKey: string =
  "$2b$08$MvbPB9GVM99XdKcyOm2Taeij/osCiKXmnzIYERKbCi8QXPmmqnq";

const withAuth = (WrappedComponent: NextPage) => {
  const SecureComponent: NextPage = (props) => {
    const router = useRouter();

    // Check authentication
    useEffect(() => {
      const isAuthenticated = () => {
        // Get the token from the cookie
        const token: string = getTokenFromCookies() as string;

        if (!token) {
          console.error("Authentication error: Token undefined");
          return false;
        }

        try {
          if (!jwtSecretKey) {
            throw new Error("Authentication error: JWT_SECRET_KEY is not set.");
          }

          // Decode and verify the JWT token
          const decodedToken = jwt.verify(token, jwtSecretKey);

          // Check if the token is valid, and optionally, check additional claims or conditions
          if (decodedToken) {
            return true;
          } else {
            throw new Error("Authentication error: Invalid token.");
          }
        } catch (error) {
          // Handle token verification errors (e.g., token expired, invalid signature, etc.)
          console.error("Authentication error: ", error);
          return false;
        }
      };

      if (!isAuthenticated()) {
        // Redirect to the login page if the user is not authenticated
        router.replace("/login");
      }
    }, [router]);

    return <WrappedComponent {...props} />;
  };

  return SecureComponent;
};

export default withAuth;
