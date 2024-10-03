import { useLaunchParams } from "@telegram-apps/sdk-react";

export default function ReferralPage() {
  const { startParam } = useLaunchParams();
  console.log(startParam);

  return (
    <div>
      <h1>Referel</h1>
    </div>
  );
}
