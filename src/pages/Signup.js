
import React,{useState} from 'react'
import '../styles/Login.css'
import Helmte from "../components/Helmte/Helmte"
import {Container,Row,Col,Form,FormGroup} from "reactstrap"
import {Link} from "react-router-dom"
import {  createUserWithEmailAndPassword,updateProfile } from "firebase/auth";

import {ref,uploadBytesResumable,getDownloadURL} from "firebase/storage"

import {setDoc,doc} from "firebase/firestore"
import {useNavigate} from "react-router-dom"

import {db} from "../firebase.config"


import {auth} from "../firebase.config"
import {storage} from "../firebase.config"
import {toast} from 'react-toastify'

const Signup = () => {
const[email,setEmail]=useState('')
const[password,setPassword]=useState('')
const[username,setUsername]=useState('')
const[file,setFile]=useState('null')
const[loading,setLoading]=useState(false)
const navigate=useNavigate()

const signup=async(e)=>{
  e.preventDefault()
  setLoading(true)
  try {
    const userCredential=await createUserWithEmailAndPassword(
      auth,
      email,
      password
      );
      const user=userCredential.user;

      const storageRef=ref(storage,`images/${Date.now()+username}`)
const uploadTask=uploadBytesResumable(storageRef,file)
    uploadTask.on((error)=>{
      toast.error(error.message)

    },()=>{
      getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL)=>{
       //update profile
        await updateProfile(user,{
          displayName:username,
          photoURL:downloadURL
        });
//store user data in the firestore database
await setDoc(doc(db,"users",user.uid),{
  uid:user.uid,
  displayName:username,
  email,
  photoURL:downloadURL,
})
      });
    });
    setLoading(false)
    toast.success('account created')
    navigate('/login')
    // console.log(user);
    
  } catch (error) {
    setLoading(false)
    toast.error('something went wrong');
    
  }
}


  return  <Helmte title="Signup">
      <section>
        <Container>
          <Row>
           {
            loading? (<Col lg='12'className='text-center'><h5 className='fw-bold'>Loading...</h5></Col>):(
              <Col lg='6' className='m-auto text-center'>
              <h3 className='fw-bold mb-4'>Signup</h3>
              <Form className='auth_form' onSubmit={signup}>
              <FormGroup className='form_group'>
                  <input type='text' placeholder='username' 
                  value={username}  onChange={e=>setUsername(e.target.value)}/>
                </FormGroup>
                <FormGroup className='form_group'>
                  <input type='email' placeholder='Enter email' 
                  value={email}  onChange={e=>setEmail(e.target.value)}/>
                </FormGroup>
                <FormGroup className='form_group'>
                  <input type='password' placeholder='Enter password' 
                   value={password}  onChange={e=>setPassword(e.target.value)}/>

                </FormGroup>
                <FormGroup className='form_group'>
                  <input type='file' 
                  onChange={e=>setFile(e.target.files[0])}/>
                </FormGroup>
                <button type='submit' className='buy_btn auth_btn'>Create an account</button>
               <p>All ready have account <Link to='/login'>Login</Link></p>
              </Form>


            </Col>
            )
           }
        
           
          </Row>
        </Container>
      </section>
      
    </Helmte>
  
}

export default Signup;
