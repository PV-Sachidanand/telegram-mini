import { TokenType } from "@/lib/constants";
import { useAuthenticateMutation } from "../../services/authServices";
import { retrieveLaunchParams, useMainButton } from "@telegram-apps/sdk-react";
import { useEffect } from "react";

export default function StartPage() {
  const mainButton = useMainButton();
  const { initDataRaw } = retrieveLaunchParams();
  const {
    mutate: authenticate,
    data,
    isSuccess,
    isPending,
  } = useAuthenticateMutation();

  const handleStart = () => {
    if (initDataRaw) {
      console.log(
        "Enter this into authenticate mutation in Apollo IDE for development: ",
        initDataRaw
      );
      authenticate({ initDataRaw });
    }
  };

  useEffect(() => {
    if (isSuccess && data.success) {
      localStorage.setItem(TokenType.ACCESSS, data.response.token);
      mainButton.hide();
      window.location.href = "/";
    }
  }, [isSuccess, data]);

  useEffect(() => {
    if (mainButton) {
      mainButton.setText("Get Started");
      mainButton.enable().show();
      mainButton.setBgColor("#3d5db8");
      mainButton.on("click", handleStart);
    }
  }, []);

  useEffect(() => {
    if (isPending) {
      mainButton.setText("Loading...");
      mainButton.showLoader();
    } else {
      mainButton.hideLoader();
      mainButton.setText("Get Started");
    }
  }, [isPending]);

  return (
    <div className="w-full justify-center items-center h-full text-center">
      <h1>Hii Start Page</h1>
    </div>
  );
}
