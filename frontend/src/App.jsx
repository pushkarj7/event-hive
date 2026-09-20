 import { useState } from 'react'
// import heroImg from './assets/hero.png'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
import './App.css'

function App() {
let [counter,setCounter]=useState(0);
  
if(counter=>20){
  let addValue =() =>{
setCounter(counter+1)
}
}
if(counter<=0){
let removeValue =() =>{
setCounter(counter-1);
}

}
  return (
    <>
   <h2 className="text-4xl font-bold text-blue-600">
    Event Hive
   </h2>
   <h3>counter value:{counter}</h3>
   <button onClick={addValue}>Increment</button>
   <br/>
   <button onClick={removeValue}>Decrement</button>
   </>
  )
}

export default App
