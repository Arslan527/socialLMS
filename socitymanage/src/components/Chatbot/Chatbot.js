import React from 'react';
import ReactChatbot from 'react-chatbot-kit';
import 'react-chatbot-kit/build/main.css';
import CloseIcon from '@mui/icons-material/Close';

import chat from './chat.png';
import ActionProvider from './ActionProvider';
import MessageParser from './MessageParser';
import config from './config';

import './Chatbot.css';

const Chatbot = () => {
  const [showBot, settoggleBot] = React.useState(false);
  const handlebot = () => { 
    settoggleBot((pre) => !pre);
  }
  return (
    <>
      {!showBot && (
        <div
          className="ChatIcon chatbot"
          style={{
            right: ' 50px',
            bottom: '40px',
          }}
          onClick={handlebot}
        >
          <img src={chat} alt="" />
        </div>
      )}
      {showBot && (
        <>
          <div className="crossicon" onClick={handlebot}>
            <CloseIcon />
          </div>
          <div className="chatbot">
            <ReactChatbot
              config={config}
              actionProvider={ActionProvider}
              messageParser={MessageParser}
            />
          </div>
        </>
      )}
    </>
  );
};

export default Chatbot;
