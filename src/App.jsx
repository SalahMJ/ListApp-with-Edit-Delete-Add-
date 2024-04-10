import './App.css'
import UserList from './components/UserListComponent'
import NavigationBar from './components/Navigationbar'

function App() {

  return (
<>
    <header>
      <NavigationBar/>
    </header>
    <div>
    <UserList/>
    </div>
    </>
  )
}

export default App
