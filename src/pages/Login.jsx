//rrd
import { Form, useActionData } from "react-router-dom";
import { Link } from "react-router-dom";

//components
import { FormInput } from "../components";

//react
import { useEffect } from "react";

//custom-hooks
import { useLogin } from "../hooks/useLogin";
import { useRegister } from "../hooks/useRegister";

export const action = async ({ request }) => {
  let formData = await request.formData();
  let email = formData.get("email");
  let password = formData.get("password");
  return { email, password };
};

function Login() {
  const userData = useActionData();

  const { loginUser, isPanding } = useLogin();
  const { isPanding: IsPandingUseRegister, registerWithGoogle } = useRegister();

  useEffect(() => {
    if (userData) {
      loginUser(userData.email, userData.password);
    }
  }, [userData]);
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
      <div className="hidden lg:block h-full bg-orange-50 bg-[url('./login.jpg')] bg-center bg-cover"></div>
      <div className=" h-full  grid place-items-center bg-[url('./login.jpg')] lg:bg-none bg-center bg-cover">
        <div className=" card bg-base-100 w-96 shadow-xl  p-8">
          <Form method="post" className="flex flex-col items-center gap-5">
            <h1 className=" text-3xl font-semibold">Login</h1>
            <FormInput type="text" label="email" name="email" />
            <FormInput type="password" label="password" name="password" />
            <div className=" w-full">
              {!isPanding && (
                <button className="btn btn-primary btn-block">Login</button>
              )}
              {isPanding && (
                <button disabled className="btn btn-primary btn-block">
                  Loading...
                </button>
              )}
            </div>
          </Form>
          <div className=" w-full mt-5">
            {!IsPandingUseRegister && (
              <button
                onClick={registerWithGoogle}
                className="btn btn-secondary btn-block"
              >
                Google
              </button>
            )}
            {IsPandingUseRegister && (
              <button
                disabled
                onClick={registerWithGoogle}
                className="btn btn-secondary btn-block"
              >
                Loading...
              </button>
            )}
          </div>
          <div className="text-center mt-5">
            If you don't have account,
            <Link to="/register" className="link link-primary">
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
