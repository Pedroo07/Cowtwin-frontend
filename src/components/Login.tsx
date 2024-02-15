import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useLocalStorage } from '@uidotdev/usehooks'
import './Login.css'
import axios from 'axios'

export const Login = () => {
  const [isActive, setIsActive] = useState(true)
  const [password, setPassword] = useState<string>()
  const [userId, saveUserId] = useLocalStorage("userId", null)
  const [sessionId, saveSessionId] = useLocalStorage("sessionId", null)

  const handleInputEvent = (event: React.ChangeEvent<HTMLInputElement>) => {
    const pass = event.target.value
    setPassword(pass)
  }
  const handleButtonRegister = async () => {
    const url = "https://cowtwin.onrender.com/create-user"
    if (password && password.length >= 8) {
      const data = {
        password,
        createdAt: Date.now()
      }
      const response = await axios.post(url, data)
      const userId = response.data.id
      console.log(userId)
    } else {
      alert('A sua senha  precisa ter 8 caracteres')
    }
  }
  const handleButtonLogin = async () => {
    const url = "https://cowtwin.onrender.com/login-user"
    if (password && password.length >= 8) {
      const data = {
        password
      }
      const response = await axios.post(url, data)
      if (response.data.isValidLogin) {
        const sessionId = response.data.sessionId
        const userId = response.data.userId
        saveUserId(userId)
        saveSessionId(sessionId)
      }
    } else {
      alert('a senha  precisa ter 8  caracteres')
    }

  }


  const alterarModo = () => {
    setIsActive(!isActive)
  }
  return (
    <body className={isActive ? 'modoclaro' : ''}>

      <main>
        <header className='inicio'>
          <nav>
            <img src={isActive ? "src/img/sol.png" : "src/img/lua.png"} alt="" className='btn-tema' onClick={alterarModo} />
            <div>
              <Link to="/"><button className='stylebuton'>Login</button></Link>
              <Link to="/register"><button >Registre-se</button></Link>
            </div>
          </nav>
        </header>

        <section className='conteudo'>
          <img src="src/img/Ellipse2.svg" alt="Uma mancha amarela e embaçada em forma de circulo" id="manchamarela" />
          <div>
            <img src="src/img/Ellipse1.svg" alt="Uma mancha azul e embaçada em formato de circulo" id="manchazul" />
            <h1>Faça login para entrar no Cowtwin</h1>
            <p>Ainda não tem uma conta?<Link to="/register"><span>Registre-se</span></Link></p>
          </div>

          <img src="src/img/developer.png" alt="Uma imagem de um progamador no notebook com codigo binario no fundo" />

          <div className='login'>
            <div>
              <input type="password" placeholder="Senha" onChange={handleInputEvent} />
            </div>
            <div className='btns'>
              <button className='get-btn' onClick={handleButtonLogin}>Login</button>
              <button className='get-btn' onClick={handleButtonRegister}>Register</button>
            </div>
          </div>
        </section>
      </main>
    </body>
  )
}
