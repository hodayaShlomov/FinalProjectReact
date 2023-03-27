import { Routes ,Route } from 'react-router-dom';
import Login from './login';
import Home from './Home'

export default function SmallWorkspace(){


    return(
        
        <Routes>
        <Route path='/home/:isDirector/*' element={<Home/>} exact >
        </Route>
        <Route path='/' element={<Login/>} exact>
        </Route>
      </Routes>
    )
}