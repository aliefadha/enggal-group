import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { AppRoutes } from "./routes";

function App() {
  return (
    <div className="flex flex-col">
      <Navbar />
      <AppRoutes />
      <Footer />
    </div>
  );
}

export default App;
