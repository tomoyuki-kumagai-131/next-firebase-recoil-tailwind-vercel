import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../lib/firebase";

const AuthContext = createContext();

export function useAuthContext() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const value = { user };

  useEffect(() => {
    const unsubscribed = auth.onAuthStateChanged((user)=> {
      console.log(user);
      setUser(user);
      setIsLoading(false);
    })
    return unsubscribed();
  }, []);

  return (
    <AuthContext.Provider value={value}>
      {!isLoading && children}
    </AuthContext.Provider>
  )
};
