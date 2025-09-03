




"use client";

import React from "react";
import { FaFacebook, FaInstagram, FaTwitter, FaCopyright } from "react-icons/fa";

function Footer() {
    return (
        <footer className="w-full bg-black text-white px-6 md:px-16 lg:px-32 py-12">
            <div className="flex flex-col lg:flex-row gap-12">
                {/* Left Section */}
                <div className="lg:w-1/3 space-y-6">
                    <span className="text-3xl font-bold text-yellow-500">AS</span>
                    <p className="text-gray-300 text-sm leading-relaxed">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi
                        ipsum, id voluptatibus facilis cumque consequatur asperiores
                        repudiandae fugit dolorum odit exercitationem commodi aut minus enim
                        minima sed nulla pariatur quos!
                    </p>
                    <div className="flex items-center gap-2 text-gray-400 text-sm">
                        <FaCopyright />
                        <span>2025 Arabian Smell</span>
                    </div>
                </div>

                {/* Right Section */}
                <div className="lg:w-2/3 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {/* Categories */}
                    <div>
                        <h2 className="text-yellow-500 text-lg font-semibold mb-4">
                            All Categories
                        </h2>
                        <ul className="space-y-2 text-sm">
                            <li>Unisex Perfumes</li>
                            <li>Men&apos;s Fragrances</li>
                            <li>Women&apos;s</li>
                            <li>Fragrances</li>
                        </ul>
                    </div>

                    {/* Best Selling */}
                    <div>
                        <h2 className="text-yellow-500 text-lg font-semibold mb-4">
                            Best Selling
                        </h2>
                        <ul className="space-y-2 text-sm">
                            <li>Arabian 24</li>
                            <li>ISSA</li>
                            <li>Poocha</li>
                            <li>Sheikh Secret</li>
                            <li>Arabian Alchemy</li>
                        </ul>
                    </div>

                    {/* Pages */}
                    <div>
                        <h2 className="text-yellow-500 text-lg font-semibold mb-4">
                            Pages
                        </h2>
                        <ul className="space-y-2 text-sm">
                            <li>About Us</li>
                            <li>Privacy Policy</li>
                            <li>FAQs</li>
                        </ul>
                    </div>

                    {/* Follow Us */}
                    <div>
                        <h2 className="text-yellow-500 text-lg font-semibold mb-4">
                            Follow Us
                        </h2>
                        <div className="flex gap-4">
                            <FaFacebook className="text-white text-xl hover:text-yellow-500 cursor-pointer" />
                            <FaInstagram className="text-white text-xl hover:text-yellow-500 cursor-pointer" />
                            <FaTwitter className="text-white text-xl hover:text-yellow-500 cursor-pointer" />
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
