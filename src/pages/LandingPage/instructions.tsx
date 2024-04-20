import Header from './Components/Header'
import Rules from './Components/Rules'
import bgimg from './assets/react.svg'

function App() {
  return (
      <div className='bg-cover w-full  h-screen' style={{
        backgroundImage:`url(${bgimg})`
      }}>
          <Header/>
          <Rules/>
      </div>
  )
}

export default App
