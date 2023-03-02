import Head from 'next/head'
import Image from 'next/image'

import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { useState } from 'react'
import {db} from "../../firebase-config"
import {collection, getDocs} from "firebase/firestore"
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [title,setTitle] = useState("")
  const [description,setDescription] = useState("")
  const [url,setUrl] = useState("")
  const [coins,setCoins] = useState(0)
  const [userTokens,setUserTokens] = useState([])
  const userCollectionRef = collection(db,"userToken")
  const onSubmit = async (e) =>{
    e.preventDefault();
    // console.log(description.target.value)
    const data = await getDocs(userCollectionRef)
    console.log(data)
    const userDeviceTokens =await data.docs.map((doc) =>({...doc.data()}))
    console.log(userDeviceTokens)
    setUserTokens(userDeviceTokens)
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
  headers.append('Accept', 'application/json');
  headers.append('Access-Control-Allow-Origin', 'http://localhost:3000');
  headers.append('Access-Control-Allow-Credentials', 'true');

  headers.append('GET', 'POST', 'OPTIONS');
    fetch("https://digitvl-notifier-nodejs.vercel.app/send-notification",{
          method:"post",
          headers:headers,
          body:JSON.stringify({
            tokens:userDeviceTokens,
            title:title.target.value,
            body:description.target.value,
            url:url.target.value,
            coins:coins.target.value
          })
        }).then((res)=>{
            console.log(res)
          firestore().collection("notifications").add({
          title:title.target.value,
          message:description.target.value,
          url:url.target.value
      })
          console.log(res)
        }).catch(err => alert(err))
  }
  return (
    <div className='container'>
      <div className='row'>
        <div className='col-md-12'><h2>Send Notification</h2></div>
        <div className='col-md-12'>
        <form onSubmit={onSubmit}>
  <div class="mb-3">
    <label for="title" class="form-label">Title</label>
    <input type="text" class="form-control" onChange={(val) => setTitle(val)} id="title"/>
  </div>
  <div class="mb-3">
    <label for="description" class="form-label">Description</label>
    <input type="text" class="form-control" onChange={(val) => setDescription(val)} id="description"/>
  </div>
  <div class="mb-3">
    <label for="url" class="form-label">Url</label>
    <input type="text" class="form-control" onChange={(val) => setUrl(val)} id="url"/>
  </div>
  <div class="mb-3">
    <label for="coins" class="form-label">Coins For Notification Earn</label>
    <input type="number" class="form-control" onChange={(val) => setCoins(val)} id="coins"/>
  </div>
  <button type="submit" class="btn btn-primary">Submit</button>
</form>
{JSON.stringify(userTokens)}
        </div>
      </div>
    </div>
  )
}
