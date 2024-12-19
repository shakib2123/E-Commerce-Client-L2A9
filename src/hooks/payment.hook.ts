import { createProceedToPaymentIntoDB } from "@/services/PaymentService";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCreateProceedToPayment = () => {
  // const queryClient = useQueryClient();
  return useMutation<any, Error, Record<string, unknown>>({
    mutationKey: ["PROCEED_TO_PAYMENT"],
    mutationFn: async (paymentData) =>
      await createProceedToPaymentIntoDB(paymentData),
    onSuccess: () => {
      toast.success("Payment processed successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
