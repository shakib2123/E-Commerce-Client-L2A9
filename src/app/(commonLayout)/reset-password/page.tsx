"use client";

import CMForm from "@/components/form/CMForm";
import CMInput from "@/components/form/CMInput";
import { useResetPassword } from "@/hooks/auth.hook";
import { Button, Spinner } from "@nextui-org/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";

const ResetPassword = () => {
  const id = useSearchParams().get("id");
  const token = useSearchParams().get("token");
  const router = useRouter();

  const { mutate: resetPassword, isPending, isSuccess } = useResetPassword();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const userData = {
      id,
      token,
      newPassword: data.newPassword,
    };

    resetPassword(userData);
  };

  useEffect(() => {
    if (!isPending && isSuccess) {
      router.push("/login");
    }
  }, [isPending, isSuccess, router]);

  return (
    <section className="min-h-screen flex items-center justify-center text-gray-900 py-8 px-3">
      <div className="max-w-sm mx-auto">
        <h2 className="text-xl font-bold mb-4 text-center">
          Provide Your New Password To Change Password
        </h2>
        <CMForm onSubmit={onSubmit}>
          {/* email */}
          <div className="max-w-xl">
            <CMInput
              label="New Password"
              name="newPassword"
              type="password"
              required
              className="md:min-w-80"
            />
          </div>
          <Button color="primary" type="submit" className="w-full mt-4">
            {isPending ? <Spinner size="sm" color="white" /> : "Submit"}
          </Button>
        </CMForm>
      </div>
    </section>
  );
};

export default ResetPassword;
