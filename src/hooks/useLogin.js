import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/fireBaseConfig";

//react
import { useState } from "react";

// redux
import { useDispatch } from "react-redux";
import { login } from "../app/userSlice";
export const useLogin = () => {
  const dispatch = useDispatch();
  const [isPanding, setIsPanding] = useState(false);

  const loginUser = async (email, password) => {
    setIsPanding(true);
    try {
      const useCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = useCredential.user;
      setIsPanding(false);
      dispatch(login(user));
    } catch (error) {}
  };
  return { isPanding, loginUser };
};
