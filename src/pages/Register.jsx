import { Form, useActionData } from "react-router-dom";
import { FormInput } from "../components";
import { useEffect } from "react";

//customhook
import { useRegister } from "../hooks/useRegister";

import { Link } from "react-router-dom";

export const action = async ({ request }) => {
  let formData = await request.formData();
  let email = formData.get("email");
  let password = formData.get("password");
  let photoURL = formData.get("photoURL");
  let displayName = formData.get("displayName");
  return { email, password, photoURL, displayName };
};

function Register() {
  const userData = useActionData();
  const { register, isPanding, registerWithGoogle } = useRegister();
  useEffect(() => {
    if (userData) {
      register(
        userData.email,
        userData.password,
        userData.displayName,
        userData.photoURL
      );
    }
  }, [userData]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
      <div className="hidden lg:block h-full bg-orange-50 bg-[url('./login.jpg')] bg-center bg-cover"></div>
      <div className=" h-full  grid place-items-center bg-[url('./login.jpg')] lg:bg-none bg-center bg-cover">
        <div className=" card bg-base-100 w-96 shadow-xl  p-8">
          <Form method="post" className="flex flex-col items-center gap-5">
            <h1 className=" text-3xl font-semibold">Register</h1>
            <FormInput type="text" label="displayName" name="displayName" />
            <FormInput type="url" label="photoURL" name="photoURL" />
            <FormInput type="email" label="email" name="email" />
            <FormInput type="password" label="password" name="password" />
            <div className=" w-full">
              {!isPanding && (
                <button className="btn btn-primary btn-block">Register</button>
              )}
              {isPanding && (
                <button disabled className="btn btn-primary btn-block">
                  Loading...
                </button>
              )}
            </div>
          </Form>

          <div className=" w-full mt-5">
            {isPanding && (
              <button
                disabled
                onClick={registerWithGoogle}
                className="btn btn-secondary btn-block"
              >
                Loading...
              </button>
            )}
            {!isPanding && (
              <button
                onClick={registerWithGoogle}
                className="btn btn-secondary btn-block"
              >
                Google
              </button>
            )}
          </div>
          <div className="text-center mt-5">
            If you have an account,
            <Link to="/login" className="link link-primary">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
