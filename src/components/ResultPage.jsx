import React from 'react'
import { useLocation } from "react-router-dom";

const ResultPage = () => {
    const location = useLocation();
    const translatedText = location.state.translatedText || "No translation available"
    
  return (
    <div className='p-4'>
        <h2 className="text-lg font-semibold mb-2">Original Text</h2>
        <textarea></textarea>
        <h2 className="text-lg font-semibold mb-2">Your Translation</h2>
        <textarea value={translatedText} readOnly className="w-full p-2 border rounded-md" rows="4"></textarea>
        <button>Start over</button>
    </div>
  )
}

export default ResultPage