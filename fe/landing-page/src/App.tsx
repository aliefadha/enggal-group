import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { AppRoutes } from "./routes";

function App() {
  return (
    <div className="gap-y-10 flex flex-col">
      <Navbar />
      <AppRoutes />
      <Footer />
    </div>
  );
}

export default App;
