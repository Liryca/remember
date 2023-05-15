import React from 'react';
import './Message.css'

interface PropsType {
message:String;
  
}


const Message: React.FC<PropsType>= ({message}) => {
    return (
        <div className={message?'message active':'message'}>
                <p className='message__notice'>{message}</p>
        </div>
    );
};

export default Message;