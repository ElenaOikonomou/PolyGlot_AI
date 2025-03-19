import React from 'react'
import OpenAI from "openai";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import ResultPage from './components/ResultPage'
import NavBar from './components/NavBar'



//setup the OpenAi
//select a model
//engineer a prompt
//use temperature
//use max-tokens
//render the completion

const App = () =>  {
  const [language, setLanguage] = React.useState('Spanish')
  const [inputText, setInputText] = React.useState('')
  
  const [translatedText, setTranslatedText] = React.useState('')
  
  const languages = ['English',' French', 'Spanish']

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
      
      <div className='flex flex-col'>
        <NavBar/>
        <h2 className='text blue-800'>Text to translate</h2>
        <textarea placeholder="Type your text here" onChange={textToTranslate} value= {inputText}></textarea>
        <h2>Select language</h2>
        
       {languages.map((lang, index) => (     
        <label key={index} className='flex items-center'>
          <input type="radio" name="language" value={`${lang}`} onClick = {handleChange} defaultChecked /> {`${lang}`}
          
        </label>))}
       
          <button onClick={generateTranslation} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Translate</button>
        
      
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