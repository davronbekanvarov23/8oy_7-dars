import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase/fireBaseConfig";

//react
import { useState } from "react";

// redux
import { useDispatch } from "react-redux";
import { login } from "../app/userSlice";
export const useRegister = () => {
  const dispatch = useDispatch();
  const [isPanding, setIsPanding] = useState(false);

  const register = async (email, password, displayName, photoURL) => {
    setIsPanding(true);

    try {
      const useCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(auth.currentUser, {
        displayName,
        photoURL,
      });
      const user = useCredential.user;
      setIsPanding(false);
      dispatch(login(user));
    } catch (error) {
      console.log(error);
    }
  };
  return { isPanding, register };
};
