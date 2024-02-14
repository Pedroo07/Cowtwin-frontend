import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Login.css'
import axios from 'axios'

export const Login = () => {
  const [isActive,setIsActive] = useState(true)
  const [password, setPassword] = useState<string>()

  const handleLogin = (event: React.ChangeEvent<HTMLInputElement>) => {
    const pass = event.target.value
    setPassword(pass)
  }
  const handleButtonClick  = async () => {
    const url = "https://cowtwin.onrender.com/login-user"
    if(password && password.length >= 8){
      const data = {
        password
      }
      const response = await axios.post(url, data)
      console.log(response)
    }else{
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
          <img src={isActive ? "src/img/sol.png" : "src/img/lua.png" } alt="" className='btn-tema' onClick={alterarModo}/>
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
            <input type="password" placeholder="Senha" onChange={handleLogin}/>
          </div>
          <button className='get-btn' onClick={handleButtonClick}>Login</button>
        </div>
      </section>
    </main>
  </body>
  )
}
