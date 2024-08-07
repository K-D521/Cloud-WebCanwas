// import React, { createContext, useContext, useState } from "react";

// const AuthContext = createContext(null);

// export const useAuth = () => useContext(AuthContext);

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   const login = (userData) => {
//     setUser(userData); // Store user data received from login process
//   };

//   const logout = () => {
//     setUser(null); // Clear user data on logout
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

import React, { createContext, useContext, useState, useEffect } from "react";
import {
  CognitoUser,
  AuthenticationDetails,
  CognitoUserPool,
} from "amazon-cognito-identity-js";
import userpool from "../userpool";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    const currentUser = userpool.getCurrentUser();
    if (currentUser) {
      currentUser.getSession((err, session) => {
        if (err) {
          console.error("Session error:", err);
          return;
        }
        if (session.isValid()) {
          // If we have a valid session, we can get the user attributes
          currentUser.getUserAttributes((err, attributes) => {
            if (err) {
              console.error("Error getting user attributes:", err);
              return;
            }
            const userData = {};
            attributes.forEach((attr) => {
              userData[attr.Name] = attr.Value;
            });
            setUser(userData);
            localStorage.setItem("user", JSON.stringify(userData));
          });
        }
      });
    }
  }, []);

  const login = (email, password) => {
    return new Promise((resolve, reject) => {
      const userPool = new CognitoUserPool({
        UserPoolId: process.env.REACT_APP_COGNITO_USER_POOL_ID,
        ClientId: process.env.REACT_APP_COGNITO_CLIENT_ID,
      });

      const user = new CognitoUser({
        Username: email,
        Pool: userPool,
      });

      const authDetails = new AuthenticationDetails({
        Username: email,
        Password: password,
      });

      user.authenticateUser(authDetails, {
        onSuccess: (result) => {
          const userData = {
            email: result.getIdToken().payload.email,
            sub: result.getIdToken().payload.sub,
            // Add any other attributes you need
          };
          setUser(userData);
          localStorage.setItem("user", JSON.stringify(userData));
          resolve(userData);
        },
        onFailure: (err) => {
          console.error("Authentication failed:", err);
          reject(err);
        },
      });
    });
  };

  const logout = () => {
    const currentUser = userpool.getCurrentUser();
    if (currentUser) {
      currentUser.signOut();
    }
    setUser(null);
    localStorage.removeItem("user");
  };

  const value = {
    user,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
