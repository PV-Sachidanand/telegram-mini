import { Axios } from "@/services/axios";
import { User } from "@telegram-apps/sdk-react";
import { useEffect, useState } from "react";
export default function HomePage() {
  const [user, setUser] = useState<User | undefined>(undefined);

  useEffect(() => {
    const fetchInit = async () => {
      try {
        const response = await Axios.get("/user");
        console.log("response", response);
        setUser(response.data.response);
      } catch (error) {
        console.error("Error fetching init data:", error);
      }
    };
    fetchInit();
  }, []);

  return (
    <div className="flex justify-center items-center font-semibold text-2xl w-full flex-col">
      <h1>Hii This is telegram authenticated page</h1>
      <h1>LoggedIn User : {user?.firstName}</h1>
    </div>
  );
}
