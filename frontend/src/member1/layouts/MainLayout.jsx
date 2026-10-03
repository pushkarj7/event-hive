import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import{Outlet} from "react-router-dom";

 export default function MainLayout({ children }) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        {children || <Outlet />}
      </main>
      <Footer />
    </div>
  );
}
