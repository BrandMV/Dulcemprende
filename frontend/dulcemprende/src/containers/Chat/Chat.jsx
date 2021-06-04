import React, {useState, useRef} from 'react'
import { useSelector } from "react-redux";
import firebase from 'firebase/app'
import 'firebase/firestore'
import {useCollectionData} from 'react-firebase-hooks/firestore'
import man from '../../images/hombre.svg'
import './style.css'

firebase.initializeApp({
    apiKey: "AIzaSyBhl1ZuhkejVMIF1K86vLDMvet9MerueDQ",
    authDomain: "dulcemprendechat.firebaseapp.com",
    projectId: "dulcemprendechat",
    storageBucket: "dulcemprendechat.appspot.com",
    messagingSenderId: "635514364221",
    appId: "1:635514364221:web:28ee7e691f3c8502a82554",
    measurementId: "G-00CF81F09M"
})

const firestore = firebase.firestore()

const Chat = () => {



  const auth = useSelector((state) => state.auth);

    return (
    <>
        <div className="App">
            <header>
                <h1>Hola {auth.user.fullName}</h1>
                <a href={`/`}><h2>Regresar</h2></a>
            </header>

            <section>
                {auth.authenticate ? <ChatComponent /> : <h1>Debes de tener una cuenta para comenzar a chatear!</h1> }
            </section>
        </div>
    </>
    )
}

const ChatComponent = () =>{

    const uRef = useRef()
    const auth = useSelector((state) => state.auth);
    const messagesRef = firestore.collection('messages')
    const query = messagesRef.orderBy('createdAt').limit(25);
    const [messages] = useCollectionData(query, {idField: 'id'})
    console.log(messages);
    const [formValue, setformValue] = useState()
    const sendMessage = async(e) => {
        e.preventDefault()

        const { _id } = auth.user
        
        await messagesRef.add({
            text: formValue,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            _id
        })

        setformValue('')
        uRef.current.scrollIntoView({ behavior: 'smooth' })
    }    
    return (
        <>
            <main className="chatMain">
                {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
                <div ref={uRef}></div>
                <span ref={uRef}></span>
            </main>
            <form onSubmit={sendMessage} className="chatForm">
                <input value={formValue} onChange={(e) => setformValue(e.target.value)} className="chatInput"/>
                <button type="submit" className="chatButton">🍬</button>
            </form>
        </>
    )
}

const ChatMessage= (props) => {
  const auth = useSelector((state) => state.auth);

    const { text, uid } = props.message 
    console.log(auth);
    const messageClass = uid === auth.user._id ? 'sent' : 'received'
    return(
       <div className={`message ${messageClass}`}>
           <img src={man} />
           <p className="para">{text}</p>

       </div>
    )

}
export default Chat
