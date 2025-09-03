



"use client";
import { useState, useRef, useEffect } from "react";
import { Globe, ShoppingCart, User, Menu, X } from "lucide-react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/store/store';
import { setCartAmmount } from "@/store/slice/cartSlice"
import { usegetCartTotalAmmount } from "@/services/cart.service"


export default function Navbar() {
    const [currency, setCurrency] = useState("AED");
    const [mobileOpen, setMobileOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [dropdownOpenMob, setDropdownOpenMob] = useState(false);

    const session = useSession();
    const dispatch = useDispatch<AppDispatch>();

    console.log("user session", session)

    const dropdownRef = useRef<HTMLDivElement>(null);

    const count = useSelector((state: RootState) => state.cart.value);

    const { data: cartAmmount } = usegetCartTotalAmmount(session?.status === "authenticated")
    const [cartCount, setCartCount] = useState(0)


    // 👉 Close dropdown if clicked outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setDropdownOpen(false);
                setDropdownOpenMob(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);



    }, []);


    useEffect(() => {

        dispatch(setCartAmmount(cartAmmount?.ammount))

    }, [cartAmmount])


    return (
        <div className="w-full bg-black text-white lg:px-[150px] sticky top-0 z-50">
            {/* Top Bar */}
            <div className="flex justify-between items-center text-sm px-6 lg:px-16 py-2">
                <div className="hidden md:flex space-x-2">
                    <span className="text-gray-300">Monday - Friday</span>
                    <span className="text-yellow-400">09:00 AM - 11:00 PM</span>
                </div>
                <div className=" hidden md:flex space-x-6">
                    <select
                        value={currency}
                        onChange={(e) => setCurrency(e.target.value)}
                        className="bg-black text-white text-sm focus:outline-none"
                    >
                        <option value="AED">AED</option>
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                    </select>
                    <a href="#" className="hover:text-yellow-400">
                        Faq
                    </a>
                    <a href="#" className="hover:text-yellow-400">
                        About Us
                    </a>
                </div>
            </div>

            {/* Main Navbar */}
            <div className="flex items-center justify-between px-6 lg:px-16 py-4">
                {/* Left: Logo */}
                <div className="flex items-center space-x-2">
                    <Link href={"/"} className="text-3xl font-bold text-yellow-500" >
                        AS
                    </Link>
                </div>

                {/* Middle: Menu Items (Desktop) */}
                <div className="hidden md:flex space-x-10 text-[16px]">
                    <div className="h-6 border-l border-white"></div>

                    <div className="group relative">
                        <button className="hover:text-yellow-400">All Categories ▾</button>
                        <div className="absolute left-0 mt-2 hidden group-hover:block bg-white text-black rounded shadow-md p-2">
                            <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                                Category 1
                            </a>
                            <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                                Category 2
                            </a>
                        </div>
                    </div>
                    <div className="group relative">
                        <button className="hover:text-yellow-400">Pages ▾</button>
                        <div className="absolute left-0 mt-2 hidden group-hover:block bg-white text-black rounded shadow-md p-2">
                            <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                                Page 1
                            </a>
                            <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                                Page 2
                            </a>
                        </div>
                    </div>
                    <a href="#" className="hover:text-yellow-400">
                        Collections
                    </a>
                    <div className="group relative">
                        <button className="hover:text-yellow-400">Blogs ▾</button>
                        <div className="absolute left-0 mt-2 hidden group-hover:block bg-white text-black rounded shadow-md p-2">
                            <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                                Blog 1
                            </a>
                            <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                                Blog 2
                            </a>
                        </div>
                    </div>
                    <a href="#" className="hover:text-yellow-400">
                        Contact Us
                    </a>
                </div>

                {/* Right: Icons */}
                <div className="flex items-center space-x-4 relative">
                    {/* User Dropdown */}
                    <div className="relative" ref={dropdownRef}>
                        <button
                            onClick={() => setDropdownOpen((prev) => !prev)}
                            className="hidden md:flex bg-white text-black rounded-full p-2"
                        >
                            <User size={18} />
                        </button>

                        {dropdownOpen && (
                            <div className="absolute right-0  mt-2 w-40 bg-white text-black border rounded-lg shadow-lg py-2 z-50">



                                <Link
                                    href="/orders"
                                    className="block px-4 py-2 text-sm hover:bg-gray-100"
                                >
                                    My Account
                                </Link>

                                {

                                    session?.status === "authenticated" ?
                                        <button
                                            onClick={() => signOut()}
                                            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                                        >
                                            Logout
                                        </button>

                                        :

                                        <Link
                                            href="/login"
                                            className="block px-4 py-2 text-sm hover:bg-gray-100"
                                        >
                                            Login
                                        </Link>


                                }
                            </div>
                        )}
                    </div>

                    {/* Globe */}
                    <button className="hidden md:flex bg-white text-black rounded-full p-2">
                        <Globe size={18} />
                    </button>

                    {/* Cart */}
                    {
                        session?.status === "authenticated" &&

                        <Link href={"/cart"}>
                            <button className="hidden md:flex items-center space-x-2 border border-white rounded-full px-4 py-2 hover:bg-yellow-500 hover:text-black">
                                <ShoppingCart size={18} />
                                {

                                    <span>{currency}
                                        {
                                            count ? `${count}.00`

                                                :
                                                "0.00"

                                        }

                                    </span>
                                }

                            </button>
                        </Link>



                    }

                    <button className="md:hidden p-2" onClick={() => setDropdownOpenMob((prev) => !prev)}
                    >
                        <User size={24} />
                    </button>

                    {dropdownOpenMob && (
                        <div className="absolute right-0 top-[50px] w-40 bg-white text-black border rounded-lg shadow-lg py-2 z-50">

                            <Link
                                href="/login"
                                className="block px-4 py-2 text-sm hover:bg-gray-100"
                            >
                                Login
                            </Link>


                            <Link
                                href="/orders"
                                className="block px-4 py-2 text-sm hover:bg-gray-100"
                            >
                                My Account
                            </Link>

                            <button
                                onClick={() => signOut()}
                                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                            >
                                Logout
                            </button>
                        </div>
                    )}


                    <Link className="md:hidden p-2" href="/cart">
                        <ShoppingCart size={24} />
                    </Link>
                    {/* Mobile Menu Button */}
                    <button className="md:hidden p-2" onClick={() => setMobileOpen(true)}>
                        <Menu size={24} />
                    </button>

                </div>
            </div>

            {/* Mobile Sidebar (Right Side) */}
            <div
                className={`fixed top-0 right-0 h-full w-64 bg-black text-white transform ${mobileOpen ? "translate-x-0" : "translate-x-full"
                    } transition-transform duration-300 ease-in-out z-50`}
            >
                {/* Close Button */}
                <div className="flex justify-between items-center px-6 py-4 border-b border-gray-700">
                    <span className="text-2xl font-bold text-yellow-500">XS</span>
                    <button onClick={() => setMobileOpen(false)}>
                        <X size={24} />
                    </button>
                </div>

                {/* Menu Links */}
                <nav className="flex flex-col space-y-4 px-6 py-6 text-lg">
                    <a href="#" className="hover:text-yellow-400">
                        All Categories
                    </a>
                    <a href="#" className="hover:text-yellow-400">
                        Pages
                    </a>
                    <a href="#" className="hover:text-yellow-400">
                        Collections
                    </a>
                    <a href="#" className="hover:text-yellow-400">
                        Blogs
                    </a>
                    <a href="#" className="hover:text-yellow-400">
                        Contact Us
                    </a>
                </nav>
            </div>

            {/* Overlay */}
            {mobileOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40"
                    onClick={() => setMobileOpen(false)}
                ></div>
            )}
        </div>
    );
}



