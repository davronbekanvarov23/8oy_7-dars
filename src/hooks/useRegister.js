//fire-base
import {
  createUserWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../firebase/fireBaseConfig";

//react
import { useState } from "react";

// redux
import { useDispatch } from "react-redux";
import { login } from "../app/userSlice";

//toasts
import toast from "react-hot-toast";

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
      toast.success(`welcome ${user.displayName} !`);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const registerWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
setIsPanding(true)
    try {
      const result =await signInWithPopup(auth, provider);
      const user = result.user;
      setIsPanding(false)
      toast.success(`Welcome,${user.displayName} `);
      dispatch(login(user));
    } catch (error) {
      const errorMessage = error.message;
      toast.error(errorMessage);
    }
  };
  return { isPanding, registerWithGoogle, register };
};
