import { Button } from "@nextui-org/react";
import Link from "next/link";

const PaymentCanceled = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center p-4 rounded-lg bg-red-500 text-white">
        <h1 className="text-2xl font-medium">Payment Canceled</h1>
        <p>You have canceled the payment.</p>
        <p>Please try again.</p>

        <Link href={"/"}>
          <Button color="primary" className="mt-4">
            Go Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default PaymentCanceled;
