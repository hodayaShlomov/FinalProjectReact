
import { Routes, Route } from 'react-router-dom';
import Items from './Items'
import AddItem from './AddItem'
import Home from './Home'
import DonationForm from './DonationForm'
import Donators from './Donators'
import Login from './login'
export default function Workspace() {

  return (
    <Routes>
      <Route path='/items' element={<Items />}>
      </Route>
      <Route path='/donation/:total' element={<DonationForm />} exact>
      </Route>
      <Route path='/donators' element={<Donators />} exact>
      </Route>
      <Route path='/addItem' element={<AddItem />} exact>
      </Route>
      <Route path='/login' element={<Login />} exact>
      </Route>
      <Route path='/home/*' element={<Home />} exact>
      </Route>

      <Route path='/' element={<Items />} exact>
      </Route>
    </Routes>
  )
}