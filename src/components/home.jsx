import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import NavBar from './NavBar';
import Footer from './footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 via-gray-700 to-black text-white flex flex-col justify-between">
      <NavBar />
      <motion.div 
        className='p-5 m-5 text-center bg-gray-800 bg-opacity-70 rounded-xl shadow-lg'
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h1 className='font-bold text-3xl p-10 m-10'>Hello, I am Gautam Singh Mahara</h1>
        <br />
        <p className='text-xl font-semibold bg-gray-700 bg-opacity-70 rounded-xl underline line-clamp-3 leading-relaxed p-5'>
          I am a Dedicated Backend Developer and Machine Learning Engineer. I like to make projects for fun and try to solve my own as well as others' problems.
          I believe in making projects that can help people in their daily lives rather than making some projects that are not useful for anyone or copying some Youtuber's project.
          Some of my projects are listed below. You can check them out, and if you like them, you can contact me for more information.
        </p>
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 p-5 m-5">
        <motion.div 
          className="bg-gray-800 bg-opacity-70 p-6 rounded-lg shadow-lg"
          whileHover={{ scale: 1.05 }}z
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-xl font-semibold mb-2"><a href="/pdfHome" className="text-indigo-400">PDF Editor</a></h2>
          <p className="text-gray-300 underline font-bold">Description of Project.</p>
          <p className="text-gray-300 font-semibold">This is a project where you can edit your PDF file. You can add text, images, and many more things in your PDF file.</p>
          <h2><a href="/pdf" className="text-indigo-400">GitHub Link</a></h2>
        </motion.div>
        <motion.div 
          className="bg-gray-800 bg-opacity-70 p-6 rounded-lg shadow-lg"
          whileHover={{ scale: 1.05 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <h2 className="text-xl font-semibold mb-2"><a href="/analyzer" className="text-indigo-400">YouTube Sentiment Analyzer</a></h2>
          <p className="text-gray-300 underline font-bold">Description of Project.</p>
          <p className="text-gray-300 font-semibold">This is a project where you can analyze the sentiment of YouTube comments. You can check whether the comment is positive, negative, or neutral.</p>
          <h2><a href="https://gautam0612/login" className="text-indigo-400">GitHub Link</a></h2>
          <Link>
          </Link>
        </motion.div>
        <motion.div 
          className="bg-gray-800 bg-opacity-70 p-6 rounded-lg shadow-lg"
          whileHover={{ scale: 1.05 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          <h2 className="text-xl font-semibold mb-2"><a href="/api" className="text-indigo-400">Authentication API</a></h2>
          <p className="text-gray-300 underline font-bold">Description of Project</p>
          <p className="text-gray-300 font-semibold">This is a project where you can authenticate your user. You can register, log in, and log out your user.</p>
          <h2><a href="https://github.com/Gautam0612/login" className="text-indigo-400">GitHub Link</a></h2>
        </motion.div>
        <motion.div 
          className="bg-gray-800 bg-opacity-70 p-6 rounded-lg shadow-lg"
          whileHover={{ scale: 1.05 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <h2 className="text-xl font-semibold mb-2"><a href="/simulator" className="text-indigo-400">8085 Simulator</a></h2>
          <p className="text-gray-300 underline font-bold">Description of Project</p>
          <p className="text-gray-300 font-semibold">This is a project where you can simulate the 8085 microprocessor. You can write your code and simulate it.</p>
          <h2><a href="/simulator" className="text-indigo-400">GitHub Link</a></h2>
        </motion.div>
        <motion.div 
          className="bg-gray-800 bg-opacity-70 p-6 rounded-lg shadow-lg"
          whileHover={{ scale: 1.05 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <h2 className="text-xl font-semibold mb-2"><a href="https://assignment-theta-three.vercel.app/" className="text-indigo-400">Weather App</a></h2>
          <p className="text-gray-300 underline font-bold">Description of Project</p>
          <p className="text-gray-300 font-semibold"> 
            This is a project where you can check the weather of any city. You can check the temperature, humidity, and many more things of any city.
          </p>
          <h2><a href="/simulator" className="text-indigo-400">GitHub Link</a></h2>
        </motion.div>
        <motion.div 
          className="bg-gray-800 bg-opacity-70 p-6 rounded-lg shadow-lg"
          whileHover={{ scale: 1.05 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <h2 className="text-xl font-semibold mb-2"><a href="/Gpt" className="text-indigo-400">Genertative Ai</a></h2>
          <p className="text-gray-300 underline font-bold">Description of Project</p>
          <p className="text-gray-300 font-semibold">This is a project where you can simulate the 8085 microprocessor. You can write your code and simulate it.</p>
          <h2><a href="/simulator" className="text-indigo-400">GitHub Link</a></h2>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
}
