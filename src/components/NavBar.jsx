// import React from "react";
// import { motion } from "framer-motion";
// export default function NavBar() {
//     return (
//         <motion.nav
//             className='p-5 m-5 bg-gray-800 rounded-lg shadow-lg sticky top-0'
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 1 }}
//         >
//             <ul className='flex flex-row justify-between'>
//                 <li><a href="/">Home</a></li>
//                 <li><a href="https://gautam0612.github.io/">About</a></li>
//                 <li><a href="/services">Projects</a></li>
//                 <li><a href="/Contact">Contact</a></li>
//             </ul>
//         </motion.nav>
//     )
// }
import React from "react";
import { motion } from "framer-motion";

export default function NavBar() {
    return (
        <motion.nav
            className='p-5 bg-gradient-to-r from-purple-800 via-purple-900 to-black text-white rounded-lg shadow-lg sticky top-0 z-50'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
        >
            <ul className='flex flex-row justify-between items-center space-x-8'>
                <li className='hover:text-blue-400 transition-colors duration-300'>
                    <a href="/">Home</a>
                </li>
                <li className='hover:text-blue-400 transition-colors duration-300'>
                    <a href="https://gautam0612.github.io/">About</a>
                </li>
                <li className='hover:text-blue-400 transition-colors duration-300'>
                    <a href="/services">Projects</a>
                </li>
                <li className='hover:text-blue-400 transition-colors duration-300'>
                    <a href="/Contact">Contact</a>
                </li>
            </ul>
        </motion.nav>
    );
}
