import { useCallback, useEffect, useRef } from 'react'
import { useState } from 'react'


function App() {

  const [password, setPassword] = useState("")
  const [length, setLength] = useState(10)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setcharAllowed] = useState(false)

  //useRef hook
  const passwordRef=useRef(null)

  const generatePassword=useCallback(()=>{
    let pass=""
    // let str=""
     let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(numberAllowed)
      str+="0123456789"
    if(charAllowed)
      str+="`~!@#$%^&*()?{}[]|,.<>:;/"
    for (let i = 1; i <= length; i++) 
    {
      let char=Math.floor(Math.random()* str.length + 1)
      pass+=str.charAt(char)
    }
    setPassword(pass)
    console.log(password)
    
  },
  [length,numberAllowed,charAllowed,setPassword])

  const copyPasswordToClipBoard=useCallback(()=>{
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0,99)
    window.navigator.clipboard.writeText(password)
  },[password])


  useEffect(()=>{
    generatePassword()
  },
  [length,numberAllowed,charAllowed,generatePassword])
  return (
    <>
      <div className='w-full h-screen bg-black flex text-center justify-center flex-col '>
        <h1 className='text-white font-bold mb-10 mt-14 text-2xl'>Password generator</h1>
        <div className='w-96 h-36 bg-teal-500 mb-48 pt-2   mx-auto overflow-hidden rounded-md '>
          <input type="text"
            className='w-64 px-3 py-1 outline-none rounded rounded-e-none'
            placeholder='Password'
            value={password}
            readOnly
            ref={passwordRef}
           />
          <button
            className='outline-none bg-blue-700 text-white px-3 py-1 rounded-e '
            onClick={copyPasswordToClipBoard}
            >
            Copy
           </button>

          <div
            className='w-full mt-10 flex gap-x-3'>
            <div>
              <input 
              type="range"
              min={8}
              max={100}
              className='cursor-pointer'
              onChange={(e)=>{setLength(e.target.value)}}
              />
               <label>Length:{length}</label>
            </div>
            <div>
              <input 
              type="checkbox"
              className='cursor-pointer'
              id='numberInput'
              value={numberAllowed}
              onChange={()=>{
                setNumberAllowed((prev)=> !prev)
              }}
               />
               <label htmlFor="numberInput">Numbers</label>
            </div>
            <div>
              <input 
              type="checkbox"
              className='cursor-pointer'
              id='charInput'
              value={charAllowed}
              onChange={()=>{
                setcharAllowed((prev)=>!prev)
              }}
               />
               <label htmlFor="charInput">Characters</label>
            </div>
          </div>
        </div>
        <button onClick={generatePassword} className='text-white font-bold -mt-24 bg-green-700 w-40 py-2 m-auto rounded-md text-center'>Regenerate</button>
      </div>
    </>
  )
}

export default App
