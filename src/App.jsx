import { createContext, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import SkillTree from './components/SkillTree'
import './styles/global.css'

export const LangContext = createContext({ lang: 'en', setLang: () => {} })

function App() {
  const [lang, setLang] = useState('en')

  return (
    <LangContext.Provider value={{ lang, setLang }}>
      <Navbar />
      <Hero key={lang} />
      <SkillTree />
    </LangContext.Provider>
  )
}

export default App
