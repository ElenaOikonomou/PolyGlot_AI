import React from 'react'
import { useLocation, useNavigate } from "react-router-dom";
import NavBar from './NavBar';


const ResultPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const translatedText = location.state?.translatedText || "No translation available"
    const inputText = location.state?.inputText || "No text available"
    
  return (
    <div className="p-4 flex flex-col items-center">
      <NavBar/>
        <h2 className="text-lg md:text-xl font-semibold mb-2 text-center">Original Text</h2>
        <textarea readOnly className="w-full max-w-lg p-2 border rounded-md text-sm md:text-base resize-none" value={inputText || ""}></textarea>
        <h2 className="text-lg font-semibold mb-2">Your Translation</h2>
        <textarea value={translatedText} readOnly className="w-full p-2 border rounded-md" rows="4"></textarea>
        <button
         className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-lg"
        onClick={() => navigate("/")}
        
        >Start over
        
        </button>
    </div>
  )
}

export default ResultPage