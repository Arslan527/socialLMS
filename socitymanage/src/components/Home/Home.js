import React from 'react'
import Nav from '../Nav/Nav'
import Feed from './Feed/Feed'
import Chatbot from '../Chatbot/Chatbot.js'
import './Home.css'


const Home = () => {
   
    return (
        <div className="home">
            <Nav />
            <Feed />
            {/*<Chatbot />  /!* <Bot/> *!/*/}
            
        </div>
    )
}

export default Home