import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Register.css'
import axios from 'axios'

export  const Register = () => {
    const [isActive, setIsActive] = useState(true)
    const [password, Setpassword] = useState<string>()
    
    const handleRegister = (event: React.ChangeEvent<HTMLInputElement>) => {
      const pass = event.target.value

      Setpassword(pass)
    }
    const handleButtonRegister = async () => {
      const url = "https://cowtwin.onrender.com/create-user"
      if(password && password.length >= 8){
        const data = {
          password
        }
        const response = await axios.post(url, data)
        console.log(response)
      }else{
        alert('A sua senha  precisa ter 8 caracteres')
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
            <Link to="/"><button>Login</button></Link>
            <Link to="/register"><button className='stylebuton'>Registre-se</button></Link>
          </div>
        </nav>
      </header>

      <section className='conteudo'>
        <img src="src/img/Ellipse2.svg" alt="Uma mancha amarela e embaçada em forma de circulo" id="manchamarela" />
        <div>
          <img src="src/img/Ellipse1.svg" alt="Uma mancha azul e embaçada em formato de circulo" id="manchazul" />
          <h1>Registre-se para entrar no Cowtwin</h1>
          <p>Já tem uma conta?<Link to="/"><span>Faça login agora</span></Link></p>
        </div>

        <img src="src/img/developer.png" alt="Uma imagem de um progamador no notebook com codigo binario no fundo" />

        <div className='login'>
          <div>
            <input type="password" placeholder="Senha" onChange={handleRegister} />
          </div>
          <button className='get-btn' onClick={handleButtonRegister}>Registre-se</button>
        </div>
      </section>
    </main>
  </body>
  )
}
