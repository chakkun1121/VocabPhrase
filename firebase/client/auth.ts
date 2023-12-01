import {
  signInWithPopup,
  GoogleAuthProvider,
  User,
  AuthError,
  onAuthStateChanged,
} from "firebase/auth";
import { useCallback, useEffect, useState } from "react";
import { atom, useRecoilValue, useSetRecoilState } from "recoil";

import { auth } from "../";
import { recoilPersist } from "recoil-persist";

const provider = new GoogleAuthProvider();
provider.addScope("https://www.googleapis.com/auth/drive.appdata");
provider.addScope("https://www.googleapis.com/auth/drive.file	");

type UserState = User | null | undefined;
const { persistAtom } = recoilPersist({
  key: "userState",
  storage: typeof window === "undefined" ? undefined : localStorage, // or settionStorage
});
export const userState = atom<UserState>({
  key: "userState",
  default: undefined,
  effects_UNSTABLE: [persistAtom],
});

export const useUser = () => {
  const user = useRecoilValue(userState);
  return user;
};

export const useAuth = () => {
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user.uid);
      } else {
        console.log("no user");
      }
    });

    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export const useSignin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<AuthError>();
  const setUser = useSetRecoilState(userState);

  const signIn = useCallback(async () => {
    setLoading(true);
    setError(undefined);

    try {
      const user = await signInWithPopup(auth, provider);
      setUser(user.user);

      return user;
    } catch (err) {
      setError(err as AuthError);
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [signIn, loading, error] as const;
};
