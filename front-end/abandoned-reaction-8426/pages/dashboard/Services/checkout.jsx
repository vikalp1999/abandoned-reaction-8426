import React, { useRef, useState } from "react";
import { Button, Image, Input } from "@chakra-ui/react";
import style from "../../../styles/checkout.module.css";
import { InfoIcon } from "@chakra-ui/icons";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useRouter } from "next/router";
import { UserUpdater } from "../../../Redux/Login/login.actions";
import Head from 'next/head'
const API = process.env.NEXT_PUBLIC_API_LINK;
const Payment = () => {
  const [isLoading, setIsloading] = useState(false);
  const ref = useRef(null);
  const { user } = useSelector((store) => store.login);
  const nav = useRouter();
  const { singleData } = useSelector((store) => store.service);
  const dispatch = useDispatch();

  const checkout = async () => {
    console.log(user.email, singleData._id)
    let res = await axios.post(`${API}/chargebee/service/addservice`, {
      email: user.email,
      softwareId: singleData._id,
    });

    let data = await res.data;
    localStorage.setItem("token", data.token);
    console.log(data)
    setIsloading(true);
    setTimeout(() => {
      setIsloading(false);
      setTimeout(() => {
        nav.push("/dashboard/services/payment");
      }, 1500);
    }, 2500);

  };

  return (
    <>
      <Head>
        <title>
          Charge Now / Checkout
        </title>
      </Head>
      <p
        style={{
          margin: "auto",
          fontSize: "32px",
          fontWeight: "600",
          color: "#33475b",
          marginTop: "30px",
          marginBottom: "15px",
          marginLeft: "70px",
        }}
      >
        Checkout
      </p>
      <div
        style={{
          width: "90%",
          textAlign: "center",
          borderTop: "1px solid rgb(203,214,226)",
          justifyContent: "center",
          margin: "auto",
        }}
      ></div>
      <div>
        <img className={style.paymentNavImg} src="" alt="payment" />
      </div>
      <div className={style.paymentDiv}>
        <div className={style.paymentpage2div}>
          <div className={style.SubscriptionDiv}>Subscription</div>
          <div style={{ display: "flex", padding: "16px" }}>
            <div style={{ marginRight: "5px", marginTop: "5px" }}>
              <Image
                width="34px"
                src="https://static.hsappstatic.net/buying-experience-components/static-1.1498/images/productIcons/Marketing.svg"
                alt="image"
              />
            </div>
            <div>
              <p style={{ fontWeight: "500", fontSize: "14px" }}>
                {singleData.object}
              </p>
              <p
                style={{
                  fontWeight: "400",
                  fontSize: "12px",
                  lineHeight: "18px",
                  color: "rgb(0,163,141)",
                }}
              >
                Starter product discount (64%)
              </p>
            </div>
          </div>
          <div
            className={style.SubscriptionDiv}
            style={{ borderTop: "1px solid rgb(203, 214, 226)" }}
          >
            Summary
          </div>
          <div
            style={{
              display: "flex",
              padding: "16px",
              color: "#33475b",
              fontSize: "14px",
              fontWeight: "400",
              gap: "48px",
            }}
          >
            <div style={{ marginBottom: "5px" }}>
              <p style={{ marginBottom: "5px" }}>
                1 year subscription, billed annually
              </p>
              <p>
                GST
                <InfoIcon marginLeft="5px" />
              </p>
            </div>
            <div style={{ textAlign: "right!important" }}>
              <p style={{ marginBottom: "5px" }}>${singleData.serviceAmount}</p>
              <p> $0.00</p>
            </div>
          </div>
          <div
            style={{
              borderTop: "2px dashed rgb(223, 227, 235)",
              margin: "0px 16px",
            }}
          ></div>

          <div
            style={{
              fontWeight: "600",
              fontSize: "16px",
              display: "flex",
              justifyContent: "space-between",
              padding: "16px",
            }}
          >
            <p>Order total (including tax)</p>
            <p>${singleData.serviceAmount}</p>
          </div>
          <div
            style={{
              fontWeight: "600",
              fontSize: "14px",
              display: "flex",
              justifyContent: "space-between",
              padding: "16px",
              color: "rgb(0,163,141)",
            }}
          >
            <p>You save</p>
            <p>$384.00</p>
          </div>
        </div>
        <div style={{ padding: "20px" }} className={style.paymentDiv1}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "10px",
            }}
          >
            <p className={style.detailDivText}>Service details</p>
            <p style={{ color: "rgb(0,163,141" }}>Change</p>
          </div>
          <p
            style={{
              fontWeight: "400",
              fontSize: "14px",
              color: "#33475",
              lineHeight: "24px",
              marginBottom: "10px",
            }}
          >
            Used to calculate tax and will appear on billing documents.
          </p>
          <p
            style={{
              fontWeight: "400",
              fontSize: "14px",
              color: "rgb(124,152,182)",
              marginBottom: "20px",
            }}
          >
            Address
          </p>
          <p className={style.detailDivText}>Payment details</p>
          <div className={style.detailsDivInfo}>
            <p style={{ fontWeight: "600" }}>
              Some payments from Indian-issued credit cards can't be accepted
              due to a new directive from the Reserve Bank of India.
            </p>
            <p>
              If you're paying with this type of card, click{" "}
              <span style={{ fontWeight: "600", color: "#0091ae" }}>
                Learn More
              </span>{" "}
              <span style={{ fontWeight: "200" }}>to see next steps.</span>
            </p>
          </div>
          <p
            style={{
              fontWeight: "600",
              fontSize: "14px",
              marginBottom: "20px",
            }}
          >
            Add a debit or credit card
          </p>
          <form>
            <div className={style.cardInputDiv}>
              <p>Card Number*</p>
              <div style={{ display: "flex", gap: "2px" }}>
                <Image
                  src="https://static.hsappstatic.net/buying-experience-components/static-1.1498/images/cardTypes/amex.png"
                  alt="cardimg"
                />
                <Image
                  src="https://static.hsappstatic.net/buying-experience-components/static-1.1752/images/cardTypes/Maestro.png"
                  alt="cardimg"
                />
                <Image
                  src="https://static.hsappstatic.net/buying-experience-components/static-1.1752/images/cardTypes/mastercard.png"
                  alt="cardimg"
                />
                <Image
                  src="https://static.hsappstatic.net/buying-experience-components/static-1.1498/images/cardTypes/visa.png"
                  alt="cardimg"
                />
              </div>
            </div>
            <Input
              backgroundColor=" #f5f8fa"
              name="number"
              type="number"
              label="Credit Card Number"
              placeholder="0000111100001111"
              marginBottom="20px"
            />
            <p style={{ marginBottom: "8px" }}>Expiration date*</p>
            <Input
              backgroundColor=" #f5f8fa"
              htmlSize={4}
              width="auto"
              placeholder="MM/YY"
              marginBottom="20px"
            />
            <p style={{ marginBottom: "8px" }}>Name on card*</p>
            <Input backgroundColor=" #f5f8fa" marginBottom="20px" />
            <p style={{ marginBottom: "8px" }}>Security code*</p>
            <div style={{ display: "flex", gap: "30px" }}>
              <Input
                marginBottom="20px"
                backgroundColor=" #f5f8fa"
                htmlSize={4}
                width="auto"
              />
              <div style={{ display: "flex", gap: "4px" }}>
                <Image
                  src="https://static.hsappstatic.net/ui-images/static-2.422/optimized/credit-card-back.svg"
                  alt="securityImg"
                  width="34px"
                />
                <p style={{ lineHeight: "3" }}>3 digit on back of card</p>
              </div>
            </div>
          </form>
          <Button
            colorScheme="orange"
            onClick={() => {
              checkout();
            }}
            isLoading={isLoading}
          >
            Save & continue
          </Button>
        </div>
      </div>
    </>
  );
};

export default Payment;
