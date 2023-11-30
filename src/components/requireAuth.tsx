import { ReactNode, useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { selectAuthState, setAuthState } from "../store/authSlice";

interface RequireAuthProps {
  children: ReactNode;
}

const RequireAuth: React.FC<RequireAuthProps> = ({ children }) => {
  const isAuthenticated = useSelector(selectAuthState);
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated]);

  return isAuthenticated ? children : null;
};

export default RequireAuth;
