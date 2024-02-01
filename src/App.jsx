import { useCallback, useEffect, useState, useRef} from 'react'
import './App.css'

function App() {
  const [length,setLength]=useState(8);
  const [numberAllowed,setNumberAllowed]=useState(false);
  const [charAllowed,setCharAllowed]=useState(false);
  const [password,setPassword]=useState("");
  const passwordRef=useRef(null)

  const copyPassword=useCallback(()=>{
      passwordRef.current?.select();
      window.navigator.clipboard.writeText(password);
  },[password])
  const passwordGenerator=useCallback(()=>{
    let pass=""
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numberAllowed) str+="0123456789"
    if(charAllowed) str+="!@#$%^&*().,~`/[]{}"
    for(let i=1;i<=length;i++){
      let char = Math.floor(Math.random()*str.length+1)
      pass += str.charAt(char)
    }
    setPassword(pass)
  },[length,numberAllowed,charAllowed,setPassword]);

  useEffect(()=>{passwordGenerator()},[length,numberAllowed,charAllowed])
  return (
    <>
    <div className='wrapper'>
      <div className="wrapper-flex">
      <div className='head-txt'>
        <h1 >Password Generator</h1>
        <div className="pass-div">
          <input type="text" value={password} className="Password-field" readOnly ref={passwordRef}></input>
          <button onClick={copyPassword}>copy</button>
        </div>
      </div>
        <div className="settings-div">
          <div className="settings-sub-div">
            <input type="range" min={8} max={18} value={length} onChange={(e)=>{setLength(e.target.value)}} ></input>
            <label> Length : {length}</label>
          </div>
          <div className="settings-sub-div">
            <input type="checkbox" defaultChecked={numberAllowed} id="numberInput" onChange={()=>{setNumberAllowed((prev)=>!prev)}} />
            <label htmlFor="numberInput">Number</label>
          </div>
          <div className="settings-sub-div">
            <input type="checkbox" defaultChecked={charAllowed} id="charInput" onChange={()=>{setCharAllowed((prev)=>!prev)}} />
            <label htmlFor="charInput">Character</label>
          </div>
        </div>
        </div>
    </div>

    </>
  )
}

export default App
