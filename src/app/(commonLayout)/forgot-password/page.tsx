"use client";

import CMForm from "@/components/form/CMForm";
import CMInput from "@/components/form/CMInput";
import { useForgotPassword } from "@/hooks/auth.hook";
import { Button, Spinner } from "@nextui-org/react";
import { FieldValues, SubmitHandler } from "react-hook-form";

const ForgotPassword = () => {
  const { mutate: forgotPassword, isPending, isSuccess } = useForgotPassword();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    forgotPassword(data);
  };

  return (
    <section className="max-w-screen-xl mx-auto px-3 lg:px-0 min-h-screen flex items-center justify-center py-8 text-gray-900">
      {isSuccess ? (
        <h1 className="text-xl">Check your email for password reset link.</h1>
      ) : (
        <div className="max-w-sm">
          <h2 className="text-xl font-bold mb-4 text-center">
            To Reset Your Password Provide Us Your Email!
          </h2>
          <CMForm onSubmit={onSubmit}>
            {/* email */}
            <div>
              <CMInput
                label="Email"
                name="email"
                type="email"
                required
                className="md:min-w-80"
              />
            </div>
            <Button color="primary" type="submit" className="w-full mt-4">
              {isPending ? <Spinner size="sm" color="white" /> : "Submit"}
            </Button>
          </CMForm>
        </div>
      )}
    </section>
  );
};

export default ForgotPassword;
