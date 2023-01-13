import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import styles from "../styles/Home.module.css";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { EDITION_ADDRESS } from "../constants/addresses";

export default function Form() {
  const [message, setMessage] = useState<null | string | undefined>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent?.status) {
        case "succeeded":
          setIsSuccess(true);
          setMessage("Your payment was successfull!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [router, stripe]);

  const URL = process.env.NEXT_PUBLIC_DOMAIN || "http://localhost:3000";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return console.log("not loaded");
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: URL,
      },
    });

    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occured.");
    }

    setIsLoading(false);
  };

  return (
    <>
      {message ? (
        <>
          {isSuccess && (
            <a
              href={`https://testnets.opensea.io/assets/mumbai/${EDITION_ADDRESS}/0`}
              className={styles.mainButton}
              target="_blank"
              rel="noreferrer"
            >
              Check out your NFT
            </a>
          )}
          <h1>{message}</h1>
        </>
      ) : (
        <form className={styles.PaymentForm} onSubmit={handleSubmit}>
          <PaymentElement />
          <button
            className={`${styles.mainButton} ${styles.payButton}`}
            disabled={isLoading || !stripe || !elements}
            id="submit"
          >
            <span id="button-text">{isLoading ? "Loading..." : "Pay now"}</span>
          </button>
          {message && <div>{message}</div>}
        </form>
      )}
    </>
  );
}
