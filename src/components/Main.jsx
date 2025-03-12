import React from 'react'
import OpenAI from "openai";

const Main = () => {
const [language, setLanguage] = React.useState('English')

const languages = ['English',' French', 'Spanish']

function handleChange(event) {
    setLanguage(event.target.value)
}
    
const openai = new OpenAI({
    dangerouslyAllowBrowser: true
});
const completion = await openai.chat.completions.create({
    model: "gpt-4o",
    
    messages: [
        {"role": "user", 
         "content": "translate the given text in textarea in either english, french or spanish "}
    ]
});




  return (
    <div className='flex flex-col'>
      <h2 className='text blue-800'>Text to translate</h2>
      <textarea placeholder="Type your text here"></textarea>
      <h2>Select language</h2>
      
     {languages.map((lang, index) => (     
      <label key={index} className='flex items-center'>
        <input type="radio" name="language" value={lang} onChange = {handleChange} defaultChecked /> English
        <input type="radio" name="language"  value={lang} onChange = {handleChange}/> French
        <input type="radio" name="language"  value={lang} onChange = {handleChange}/> Spanish
      </label>))}
      <button>Translate</button>
    
    </div>
  )
}

export default Main