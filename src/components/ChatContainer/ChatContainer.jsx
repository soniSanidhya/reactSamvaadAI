import React from 'react';

function ChatContainer(append) {
    return (
        <div
              id="chat"
              className="flex flex-col justify-end"
            >
              <AudioContextProvider>
                
              {append.map((element, index) => (
                <div key={index} className="my-1">
                  <Message message={element.message} by={element.by} />
                </div>
              ))}
              </AudioContextProvider>
            </div>
    );
}

export default ChatContainer;