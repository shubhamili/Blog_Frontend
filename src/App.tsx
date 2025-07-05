import './App.css'
import { Button } from './components/ui/button'
import { Card } from './components/ui/card'

function App() {

  return (
    <>

      <h1 className="text-3xl font-bold underline bg-red-500">
        Hello world!
      </h1>

      <div className="flex min-h-svh flex-col items-center justify-center">
        <Button>Click me</Button>
      </div>

      <Card />


    </>
  )
}

export default App
