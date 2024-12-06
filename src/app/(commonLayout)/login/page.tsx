"use client";

import CMForm from "@/components/form/CMForm";
import CMInput from "@/components/form/CMInput";
import { useUser } from "@/context/user.provider";
import { useUserLogin } from "@/hooks/auth.hook";
import loginValidationSchema from "@/schemas/login.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Spinner } from "@nextui-org/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";

const LoginPage = () => {
  const searchParams = useSearchParams();

  const router = useRouter();

  const { setIsLoading: userLoading } = useUser();

  const redirect = searchParams?.get("redirect");

  const { mutate: handleUserLogin, isPending, isSuccess } = useUserLogin();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
    handleUserLogin(data);
    userLoading(true);
  };

  useEffect(() => {
    if (!isPending && isSuccess) {
      if (redirect) {
        router.push(redirect);
      } else {
        router.push("/");
      }
    }
  }, [isPending, isSuccess, redirect, router]);

  const registerURL = redirect ? `/register?redirect=${redirect}` : "/register";

  return (
    <section className="min-h-[calc(100vh-70px)] h-full overflow-y-auto flex items-center justify-center py-8">
      <div className="flex w-[90%] md:w-[35%] flex-col items-center justify-center border shadow-lg rounded-lg p-4 md:p-8">
        <h3 className="my-2 text-lg md:text-2xl font-bold ">
          Login with ClickMart
        </h3>
        <p className="mb-4">Welcome Back! Let&lsquo;s Get Started.</p>
        <div className="w-full">
          <CMForm
            resolver={zodResolver(loginValidationSchema)}
            onSubmit={onSubmit}
          >
            <div className="py-3 text-gray-900">
              <CMInput label="Email" name="email" type="email" />
            </div>
            <div className="py-3 text-gray-900 flex flex-col gap-2">
              <CMInput label="Password" name="password" type="password" />
              <Link
                href="/forgot-password"
                className="hover:text-primary hover:underline text-sm"
              >
                Forgot Password?
              </Link>
            </div>

            <Button
              color="primary"
              className="mt-1 mb-3 w-full"
              size="lg"
              type="submit"
            >
              {isPending ? <Spinner size="sm" color="white" /> : "Login"}
            </Button>
          </CMForm>
          <div className="text-center text-sm">
            Don&lsquo;t have account ?{" "}
            <Link
              href={registerURL}
              className="font-semibold hover:text-primary"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
