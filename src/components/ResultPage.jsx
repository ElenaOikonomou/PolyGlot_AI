import React from 'react'
import { useLocation, useNavigate } from "react-router-dom";

const ResultPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const translatedText = location.state?.translatedText || "No translation available"
    
  return (
    <div className='p-4'>
        <h2 className="text-lg font-semibold mb-2">Original Text</h2>
        <textarea readOnly value={location.state?.originalText || ""}></textarea>
        <h2 className="text-lg font-semibold mb-2">Your Translation</h2>
        <textarea value={translatedText} readOnly className="w-full p-2 border rounded-md" rows="4"></textarea>
        <button
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        onClick={() => navigate("/")}
        
        >Start over
        
        </button>
    </div>
  )
}

export default ResultPage