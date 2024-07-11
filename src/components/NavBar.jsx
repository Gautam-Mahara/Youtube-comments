import React from "react";
import { motion } from "framer-motion";
export default function NavBar() {
    return (
        <motion.nav
            className='p-5 m-5 bg-gray-800 rounded-lg shadow-lg sticky top-0'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
        >
            <ul className='flex flex-row justify-between'>
                <li><a href="/">Home</a></li>
                <li><a href="/https://gautam0612.github.io/">About</a></li>
                <li><a href="/services">Projects</a></li>
                <li><a href="/Contact">Contact</a></li>
            </ul>
        </motion.nav>
    )
}