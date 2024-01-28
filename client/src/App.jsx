
import './App.css'
import LoginButton from './login'
import Logout from './logout'
import ConditionalElement from './comp'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <LoginButton></LoginButton>
      <Logout></Logout>
      <ConditionalElement></ConditionalElement>
    </>
  )
}

export default App
