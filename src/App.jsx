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
        <div className="w-full max-w-md md:max-w-lg lg:max-w-xl bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-blue-800 text-lg md:text-xl font-bold text-center">Text to translate</h2>
        <textarea className= "w-full max-w-lg p-2 border rounded-md text-sm md:text-base resize-none" placeholder="Type your text here" onChange={textToTranslate} value= {inputText}></textarea>
        <h2 className='text-blue-800 font-poppins font-bold'>Select language</h2>
        
       {languages.map((lang, index) => (     
        <label key={index} className='flex'>
           
          <input className="m-1" type="radio" name="language" value={lang.name} checked={language === lang.name} onChange = {handleChange}/>
          <img src={lang.flag} alt={lang.name} className='h-4 w-5 mr-2 '/>
          <span>{lang.name}</span> 
          
        </label>))}
         
           <button className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-lg" onClick={generateTranslation}>Translate</button>
          
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