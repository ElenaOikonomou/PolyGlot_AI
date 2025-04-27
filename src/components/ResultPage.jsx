import React from 'react'
import { useLocation, useNavigate } from "react-router-dom";
import NavBar from './NavBar';


const ResultPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const translatedText = location.state?.translatedText || "No translation available"
    const inputText = location.state?.inputText || "No text available"
    
  return (
    <div className="flex flex-col items-center p-6 md:p-8 lg:p-10">
      <NavBar/>
      <div className="w-full max-w-md md:max-w-lg lg:max-w-xl bg-blue-100 bg-opacity-80 shadow-lg rounded-lg p-8 space-y-8">
        <h2 className="text-violet-700 text-3xl md:text-4xl font-bold text-center  mb-4 transition-all duration-300">Original Text</h2>
        <textarea readOnly className="w-full max-w-lg p-2 border rounded-md text-sm md:text-base resize-none shadow-lg" value={inputText || ""}></textarea>
        <h2 className="text-violet-700 text-3xl md:text-4xl font-bold text-center mb-4 transition-all duration-300">Your Translation</h2>
        <textarea value={translatedText} readOnly className="w-full max-w-lg p-3 border rounded-md shadow-lg" rows="4"></textarea>
        <button
         className="mt-4  px-8 py-4 bg-violet-950 text-white rounded-md hover:bg-violet-700 text-lg transition-all duration-300"
        onClick={() => navigate("/")}
        
        >Start over
        
        </button>
      </div>
    </div>
  )
}

export default ResultPage