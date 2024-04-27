import React, { useRef, useState } from 'react'
import { IoSend } from 'react-icons/io5'

// import * as firebase from 'firebase/app'
// import 'firebase/firestore';
// import 'firebase/auth';
// import 'firebase/analytics';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, query, orderBy, limit, addDoc, serverTimestamp } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';


const BotComponent = () => {

    const [botMessage, setBotMessage] = useState()
    // firebase.initializeApp({
    //     apiKey: "AIzaSyB3UWpxEgCMORVPFzlAt4zZ_b0u60zJ8ug",
    //     authDomain: "andern-48094.firebaseapp.com",
    //     projectId: "andern-48094",
    //     storageBucket: "andern-48094.appspot.com",
    //     messagingSenderId: "963473385774",
    //     appId: "1:963473385774:web:3b1ffbdb80881fb63bb2bf",
    // })
    const firebaseApp = initializeApp({
        apiKey: "AIzaSyB3UWpxEgCMORVPFzlAt4zZ_b0u60zJ8ug",
        authDomain: "andern-48094.firebaseapp.com",
        projectId: "andern-48094",
        storageBucket: "andern-48094.appspot.com",
        messagingSenderId: "963473385774",
        appId: "1:963473385774:web:3b1ffbdb80881fb63bb2bf",
    })
    
    // const auth = firebase.auth;
    // const firestore = firebase.firestore;
    // const analytics = firebase.analytics;
    const auth = getAuth(firebaseApp);
    const firestore = getFirestore(firebaseApp);
    const analytics = getAnalytics(firebaseApp);
    const [user] = useAuthState(auth);


    const inputChangeHandler = (e) => {
        // console.log(e.target.value)
        setBotMessage(e.target.value)
    }

    const onSubmit = (e ) => {
        e.preventDefault()
    }

    function SignIn() {

  const signInWithGoogle = () => {
    // const provider = new firebase.auth.GoogleAuthProvider();
    // auth.signInWithPopup(provider);
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  }

  return (
    <>
      <button className="bg-pryBlue text-white p-2 text-sm rounded-lg " onClick={signInWithGoogle}>Sign in with Google to chat bot</button>
      {/* <p>Do not violate the community guidelines or you will be banned for life!</p> */}
    </>
  )

}

function SignOut() {
  return auth?.currentUser && (
    <button className="bg-pryBlue text-white p-2 text-sm rounded-lg " onClick={() => signOut(auth)}>Sign Out</button>
  )
}

function ChatRoom() {
  const dummy = useRef();
//   const messagesRef = firestore.collection('messages');
//   const query = messagesRef.orderBy('createdAt').limit(25);
    const messagesRef = collection(firestore, 'messages');
    const q = query(messagesRef, orderBy('createdAt'), limit(25));

//   const [messages] = useCollectionData(query, { idField: 'id' });
    const [messages] = useCollectionData(q, { idField: 'id' });

  const [formValue, setFormValue] = useState('');

  const sendMessage = async (e) => {
    e.preventDefault();

    const { uid, photoURL } = auth.currentUser;

    await addDoc(messagesRef, {
      text: formValue,
    //   createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      createdAt: serverTimestamp(),
      uid,
      photoURL
    })

    setFormValue('');
    dummy.current.scrollIntoView({ behavior: 'smooth' });
  }

  return (<>
    <main>

      {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}

      <span ref={dummy}></span>

    </main>

    <form onSubmit={sendMessage} className='flex gap-3 my-4 ' >

      <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="Send a text" className='outline  outline-1 outline-slate-800 rounded-3xl p-2 ' />

      <button type="submit" disabled={!formValue}  >
        <IoSend size={28} />
      </button>

    </form>
  </>)
}


function ChatMessage(props) {
  const { text, uid, photoURL } = props.message;

  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

  return (<>
    <div className="flex items-center gap-2 text-sm my-2  ">
      <img src={photoURL || 'https://api.adorable.io/avatars/23/abott@adorable.png'} className='w-[20px] h-[20px] rounded-full ' />
      <p className='bg-pryBlue px-1 rounded-md text-white ' >{text}</p>
    </div>
  </>)
}


  return (
    <div className=' flex flex-col shadow-2xl rounded-b-3xl mt-9 max-h-[500px] ' >
        <div className='bg-pryBlue text-white  p-4 pt-32 rounded-t-3xl ' >
            <h1 className='text-xl' >Hello there 👋🏽</h1>
            <h1 className='text-xl' >How are you feeling?</h1>
        </div>
        <div className='overflow-x-scroll  ' >
            <div className='border-2 p-4 pt-10 flex flex-col ' >
                {user ? <ChatRoom /> : <SignIn />}
                <SignOut />
                {/* <p className='text-sm font-semibold justify-self-end ' >{botMessage ? botMessage : 'Send us a message' }</p>
                <p className='text-sm justify-self-start '  >{!botMessage && "We typically reply in few minutes"}</p> */}
            </div>
        </div>

        {/* <div className=' p-4 rounded-b-2xl border-2 flex items-center ' > */}
            {/* <ChatRoom /> */}
            {/* <form className='flex gap-3' onSubmit={onSubmit} >
                <input type="text" className=' outline  outline-1 outline-slate-800 rounded-3xl p-2  ' value={botMessage} onChange={(e) => inputChangeHandler(e)} />
                <button type='submit' >
                    
                </button>
            </form> */}
        {/* </div> */}
    </div>
  )
}




export default BotComponent
