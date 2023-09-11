import React from 'react'

const LoginComponent = () => {
 
    
 
    return (
    <>
    
    <h2>Tu veux jouer ? Connectes toi d'abord</h2>

    <form method='POST' action='/login'> 
      
    <div className='form-control'> 
      
      
      <div className="form-group">
      <label htmlFor="email">Email</label>
      <input type="email" className="form-control" id="email"/>
       </div>
      


      <div className="form-group">
      <label htmlFor="password">Password</label>
      <input type="password" className="form-control"/>
      </div>
  
  
    <button type='submit' className='btn btn-primary'> Se connecter </button>

    </div>
  
  </form>
  </>

  )
}

export default LoginComponent