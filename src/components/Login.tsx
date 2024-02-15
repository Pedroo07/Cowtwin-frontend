import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useLocalStorage } from '@uidotdev/usehooks'
import axios from 'axios'
import './Login.css'

export const Login = () => {
  const [isActive, setIsActive] = useState(true)
  const [password, setPassword] = useState('')
  const [userId, saveUserId] = useLocalStorage("userId", null)
  const [sessionId, saveSessionId] = useLocalStorage("sessionId", null)

  const handleInputEvent = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  }

  const validatePassword = (pass: string): boolean => {
    return !! pass && pass.length >= 8
  }

  const handleButtonRegister = async () => {
    const url = "https://cowtwin.onrender.com/create-user"
    if (validatePassword(password)) {
      try {
        const response = await axios.post(url, { password, createdAt: Date.now() })
        const userId = response.data.id
        console.log(userId)
      } catch (error) {
        alert('Erro ao registrar usuário. Por favor, tente novamente mais tarde.')
      }
    } else {
      alert('A sua senha precisa ter pelo menos 8 caracteres')
    }
  }

  const handleButtonLogin = async () => {
    const url = "https://cowtwin.onrender.com/login-user"
    if (validatePassword(password)) {
      try {
        const response = await axios.post(url, { password })
        if (response.data.isValidLogin) {
          const { sessionId, userId } = response.data
          saveUserId(userId)
          saveSessionId(sessionId)
        } else {
          alert('Credenciais inválidas. Por favor, verifique sua senha.')
        }
      } catch (error) {
        alert('Erro ao efetuar login. Por favor, tente novamente mais tarde.')
      }
    } else {
      alert('A sua senha precisa ter pelo menos 8 caracteres')
    }
  }

  const toggleTheme = () => {
    setIsActive(!isActive)
  }

  return (
    <body className={isActive ? 'modoclaro' : ''}>
      <main>
        <header className='inicio'>
          <nav>
            <img src={isActive ? "src/img/sol.png" : "src/img/lua.png"} alt="" className='btn-tema' onClick={toggleTheme} />
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
  )}
