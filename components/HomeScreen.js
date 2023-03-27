import React, { useEffect } from 'react';
import { db } from '../firebase-config';
import Head from 'next/head'
import Image from 'next/image'

import { Inter } from 'next/font/google'
import { useState } from 'react'
import {collection, getDocs,addDoc} from "firebase/firestore"
import axios from 'axios'
import Router from 'next/router';
const inter = Inter({ subsets: ['latin'] })
function HomeScreen() {
    const [newtitle,setTitle] = useState("")
    const [newdescription,setDescription] = useState("")
    const [newurl,setUrl] = useState("")
    const [coins,setCoins] = useState(0)
    const [userTokens,setUserTokens] = useState([])
    const userCollectionRef = collection(db,"users")
    const notificationCollectionRef = collection(db,"notifications")
    useEffect(() => {
        const userLogged = localStorage.getItem("userLogin")
        if(userLogged){
            alert("loggedin")
        }else{
            Router.push("/")
        }
    },[])
    const onSubmit = async (e) =>{
      e.preventDefault();
      // console.log(description.target.value)
      const data = await getDocs(userCollectionRef)
      
      console.log(data)
      const userDeviceTokens =await data.docs.map((doc) =>({...doc.data()}))
      console.log(userDeviceTokens)
      
      const deviceTokens = userDeviceTokens.map((val) => {
        return val.token
      })
      setUserTokens(deviceTokens)
      console.log(deviceTokens)
      let datasend
      if (newtitle && newdescription && newurl && coins) {
        datasend = {tokens:deviceTokens,
          title:newtitle.target.value,
          body:newdescription.target.value,
          url:newurl.target.value,
          coins:coins.target.value}  
          await axios.post("https://digitvl-notifier-nodejs-git-main-muiezarif.vercel.app/send-notification",datasend,{headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Credentials': 'true'
      }}).then(async (res)=>{
              alert("Notification sent")
              const refDoc =await addDoc(notificationCollectionRef,{message:newdescription.target.value || null,title:newtitle.target.value || null,url:newurl.target.value || null}).then((res) =>{
                  console.log("res")
                  console.log(res)
              }).catch(err => console.log(err))
        //     firestore().collection("notifications").add({
        //     title:title.target.value,
        //     message:description.target.value,
        //     url:url.target.value
        // })
            console.log(res)
          }).catch(async err => {
            if(err.code === "ERR_NETWORK"){
              const refDoc = await addDoc(notificationCollectionRef,{message:newdescription.target.value || null,title:newtitle.target.value || null,url:newurl.target.value || null}).then((res) =>{
                console.log("res")
                
  
            }).catch(err => console.log(err))
            console.log(refDoc.id)
            }
            console.log(err)
          })
      }else{
        alert("Fill All fields")
        return;
      }
      
      
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
  {/* {userTokens} */}
          </div>
        </div>
      </div>
    )
}

export default HomeScreen;
