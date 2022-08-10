import { Switch, Route, useLocation } from 'react-router-dom'
// Pages
import Root from '../../pages/root'
import FAQ from '../../pages/faq'

// Components
import Navbar from '../navbar'

export default function Layout () {
  return (
    <div>
        <Navbar currentRoute={ useLocation().pathname }/>
        <hr />
        <Switch>
            <div className='container mx-auto bg-red-100'>
                <Route exact path='/' component={ Root }/>
                <Route path='/faq' component={ FAQ }/>
            </div>
        </Switch>
    </div>
  )
}
