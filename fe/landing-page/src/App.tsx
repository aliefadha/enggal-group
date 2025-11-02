import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { ScrollToTop } from "./components/ScrollToTop";
import { queryClient } from "./lib/query-client";
import { AppRoutes } from "./routes";
import { QueryClientProvider } from "@tanstack/react-query";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex flex-col">
        <ScrollToTop />
        <Navbar />
        <AppRoutes />
        <Footer />
      </div>
    </QueryClientProvider>
  );
}

export default App;
