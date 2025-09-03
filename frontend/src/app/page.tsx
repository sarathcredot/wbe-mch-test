import Image from "next/image";
import Link from "next/link";
import Navbar from "./components/Navebar";
import BannerHome from "./components/BannerHome";
import ProdListing from "./components/ProdListing";
import TopProducts from "./components/TopProducts";
import Footer from "./components/Footer";
export default function Home() {
  return (
    <div className="w-full h-screen" >

      <Navbar />
      <BannerHome />
      <ProdListing />
      <TopProducts title="Top Selling Products" />
      <Footer />



    </div>
  );
}
