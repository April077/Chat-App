"use client";

import { signIn } from "next-auth/react";
import { Formik, Form, Field } from "formik";
import { useRouter } from "next/navigation";
import GoogleSignUp from "@/components/GoogleSignUp";

interface SignUpFormValues {
  username: string;
  email: string;
  password: string;
}

const SignIn = () => {
  const router = useRouter();
  const initialValues = {
    username: "",
    email: "",
    password: "",
  };

  const handleSubmit = async (values: SignUpFormValues) => {
    try {
      const response = await signIn("credentials", {
        email: values.email,
        password: values.password,
      });
      router.push("/createpost");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex justify-center py-5">
      <div className="w-full rounded-lg max-w-sm bg-white border border-gray-200  shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          <Form className="space-y-6  mb-2" action="#">
            <h5 className="text-xl font-medium text-gray-900 dark:text-white">
              Sign In
            </h5>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Email
              </label>
              <Field
                name="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                placeholder="Email"
                required
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Password
              </label>
              <Field
                name="password"
                id="password"
                type="password"
                placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full  mb-2 text-white bg-rose-700 hover:bg-rose-800 focus:ring-4 focus:outline-none focus:ring-rose-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-rose-600 dark:hover:bg-rose-700 dark:focus:ring-rose-800"
            >
              Sign In
            </button>
          </Form>
        </Formik>
        <div className="text-white flex justify-center items-center mb-2 w-full">
          <hr className="w-full mr-2" />
          Or
          <hr className="w-full full ml-2" />
        </div>
        <GoogleSignUp />
      </div>
    </div>
  );
};

export default SignIn;
