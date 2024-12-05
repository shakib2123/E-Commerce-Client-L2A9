"use client";

import CMForm from "@/components/form/CMForm";
import CMInput from "@/components/form/CMInput";
import { useUser } from "@/context/user.provider";
import { useUserRegistration } from "@/hooks/auth.hook";
import registerValidationSchema from "@/schemas/register.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Radio, RadioGroup, Spinner } from "@nextui-org/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";

const RegisterPage = () => {
  const searchParams = useSearchParams();

  const router = useRouter();

  const { setIsLoading: userLoading } = useUser();

  const [role, setRole] = useState("USER");

  const redirect = searchParams?.get("redirect");

  const {
    mutate: handleUserRegistration,
    isPending,
    data: userData,
    isSuccess,
  } = useUserRegistration();

  console.log(userData);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    handleUserRegistration({ ...data, role });
    userLoading(true);
  };

  useEffect(() => {
    if (!isPending && isSuccess) {
      if (redirect) {
        router.push(redirect);
      } else if (userData?.data?.user?.role === "VENDOR") {
        router.push("/vendor/dashboard");
      } else {
        router.push("/");
      }
    }
  }, [isPending, isSuccess, redirect, router, userData?.data?.user?.role]);

  const registerURL = redirect ? `/login?redirect=${redirect}` : "/login";

  return (
    <section className="min-h-[calc(100vh-70px)] h-full overflow-y-auto flex items-center justify-center py-8">
      <div className="flex w-[90%] md:w-[35%] flex-col items-center justify-center border shadow-lg rounded-lg p-4 md:p-8">
        <h3 className="my-2 text-lg md:text-2xl font-bold ">
          Join with ClickMart
        </h3>
        <p className="mb-4">Let&lsquo;s Get Started.</p>
        <div className="w-full">
          <CMForm
            resolver={zodResolver(registerValidationSchema)}
            onSubmit={onSubmit}
          >
            <div className="py-3 text-gray-900">
              <CMInput label="Name" name="name" type="text" />
            </div>
            <div className="py-3 text-gray-900">
              <CMInput label="Email" name="email" type="email" />
            </div>
            <div className="py-3 text-gray-900 flex flex-col gap-2">
              <CMInput label="Password" name="password" type="password" />
            </div>
            <div className="py-3 text-gray-900 flex flex-col gap-2">
              <RadioGroup
                label="Select Your Role"
                isRequired={true}
                defaultValue="USER"
                onChange={(e) => setRole(e.target.value)}
              >
                <Radio value="USER">User</Radio>
                <Radio value="VENDOR">Vendor</Radio>
              </RadioGroup>
            </div>

            <Button
              color="primary"
              className="mt-1 mb-3 w-full"
              size="lg"
              type="submit"
            >
              {isPending ? <Spinner color="white" /> : "Register"}
            </Button>
          </CMForm>
          <div className="text-center text-sm">
            Already have account ?{" "}
            <Link
              href={registerURL}
              className="font-semibold hover:text-primary"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegisterPage;
