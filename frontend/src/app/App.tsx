import { Outlet } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SDKProvider } from "@telegram-apps/sdk-react";

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        retry: false,
        gcTime: 0,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <SDKProvider acceptCustomStyles debug>
        <Outlet />
      </SDKProvider>
    </QueryClientProvider>
  );
}

export default App;
