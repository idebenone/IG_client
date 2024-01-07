"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { isLoggedIn } from "@/components/api/storageApi";

const authGuard = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  const AuthComponent: React.FC<P> = (props) => {
    const router = useRouter();

    useEffect(() => {
      const userIsLoggedIn = isLoggedIn();

      if (!userIsLoggedIn) {
        router.push("/login");
      }
    }, []);
    return <WrappedComponent {...props} />;
  };
  return AuthComponent;
};

export default authGuard;
