import React, { useEffect } from "react";
import { useSearchParams } from "react-router";
import useAxios from "../hooks/useAxios";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const axiosPublic = useAxios();

  useEffect(() => {
    if (sessionId) {
      axiosPublic
        .patch(`/payment-success?session_id=${sessionId}`)
        .then((res) => {
          console.log("Payment verified:", res.data);
        })
        .catch((err) => {
          console.error(
            "Payment verification failed:",
            err.response?.data || err.message
          );
        });
    }
  }, [sessionId, axiosPublic]);

  return (
    <div className="text-center py-20">
      <h2 className="text-3xl font-bold text-green-600">
        Payment Successful 🎉
      </h2>
      <p>Your package has been activated.</p>
    </div>
  );
};

export default PaymentSuccess;
