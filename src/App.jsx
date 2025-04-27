import React from 'react'
import OpenAI from "openai";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import '../output.css';
import './index.css'
import ResultPage from './components/ResultPage'
import NavBar from './components/NavBar'
import fr_flag from './assets/fr_flag.png'
import jpn_flag from './assets/jpn_flag.png'
import sp_flag from './assets/sp_flag.png'


//setup the OpenAi 
//select a model
//engineer a prompt
//use temperature
//use max-tokens
//render the completion

const App = () =>  {
  const [language, setLanguage] = React.useState('Spanish')
  const [inputText, setInputText] = React.useState('')
  
  const [_translatedText, setTranslatedText] = React.useState('')
  
  const languages = [
      { name: 'French',
        flag: fr_flag  },
      { name: 'Spanish',
        flag: sp_flag  },
      { name: 'Japanese',
        flag: jpn_flag }
  ]
      

  const navigate = useNavigate();
  
  function handleChange(event) {
      setLanguage(event.target.value)
  }

  function textToTranslate(event){
    setInputText(event.target.value)
  }
      
  const openai = new OpenAI(
      {   apiKey: import.meta.env.VITE_NEW_API_KEY ,
          dangerouslyAllowInsecureHTTPRequests: true,
          dangerouslyAllowBrowser: true
      });
     
  
  
  async function generateTranslation(){
  const messages = [
      {
          role: "system",
          content: `You are a helpful text translator that translates 
           to the ${language}. Respond only with the translated text.`},
          {role: "user",
          content: inputText}
         
          ]
  const completion = await openai.chat.completions.create({
      model: "gpt-4o",    
      messages: messages
  })



  setTranslatedText(completion.choices[0].message.content)
  navigate("/result", { state: { translatedText: completion.choices[0].message.content, inputText: inputText }});
  }

  
  
  
  
    return (
      
      <div className="flex flex-col items-center p-4 md:p-6 lg:p-8">
        <NavBar />
        <div className="w-full max-w-md md:max-w-lg lg:max-w-xl bg-blue-100 bg-opacity-80 shadow-lg rounded-lg p-8 space-y-5">
        <h2 className="text-violet-700 text-3xl md:text-4xl font-extrabold text-center mb-6 ">Text to translate</h2>
        <textarea id="text-to-translate"  className="w-full max-w-lg p-5 border bg-blue-50 text-blue-800 rounded-md text-sm md:text-base resize-none shadow-lg"  placeholder="Type your text here" onChange={textToTranslate} value= {inputText}></textarea>
        <h2 className='text-violet-700 font-poppins font-bold  mb-4'>Select language</h2>
        
       {languages.map((lang, index) => (     
        <label key={index} className='flex space-x-2'>
           
          <input
           className="m-1 hidden"  // Hide the default radio button" 
           type="radio"
           name="language" 
           value={lang.name}
           checked={language === lang.name}
           onChange = {handleChange}/>
           <div className="relative">
           <div className="w-6 h-6 border-2 border-violet-700 rounded-full flex items-center justify-center 
                            bg-white hover:bg-violet-200 transition-colors duration-300">
             <div className={`w-3 h-3 rounded-full ${language === lang.name ? 'bg-violet-700' : 'bg-white'} transition-all`}></div>
           </div>
           </div>
           <img src={lang.flag} alt={lang.name} className='h-7 w-9 mr-3'/>
           <span className="text-lg md:text-xl font-semibold text-violet-700">{lang.name}</span> 
          
        </label>))}
         
           <button className="mt-6 px-8 py-4 bg-violet-950 text-white rounded-md hover:bg-violet-700 text-xl font-bold tracking-wide transition-all duration-300 shadow-lg transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-violet-300" onClick={generateTranslation}>Translate</button>
          
        </div>
      </div>
    )

  }
  

  export default function AppWithRoutes() {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/result" element={<ResultPage />} />
        </Routes>
      </Router>
    );
  }