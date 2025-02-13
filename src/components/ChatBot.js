import React, { useState, useRef, useContext } from 'react';
import { EventContext } from '../context/EventContext';
import styles from './ChatBot.module.css';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: 'Hello! I can help you find information about our events. Try asking about:', type: 'bot' },
    { text: '• Recent events\n• Upcoming events\n• Event details', type: 'bot' }
  ]);
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef(null);
  const { events } = useContext(EventContext);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleBotResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();
    let botResponse = '';

    if (lowerMessage.includes('recent')) {
      botResponse = events.recent.length > 0 
        ? `Recent events:\n${events.recent.map(event => `• ${event.title} - ${event.date}`).join('\n')}`
        : "Soory there is no event present at this time ";
    }
    else if (lowerMessage.includes('upcoming')) {
      botResponse = events.upcoming.length > 0
        ? `Upcoming events:\n${events.upcoming.map(event => `• ${event.title} - ${event.date}`).join('\n')}`
        : "Please contact us directly on whats app for recent events";
    }
    else if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
      botResponse = "Hello! How can I help you today? You can ask about recent or upcoming events.";
    }
    else {
      botResponse = "I'm not sure about that. You can ask about:\n• Recent events\n• Upcoming events";
    }

    return botResponse;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    // Add user message
    setMessages(prev => [...prev, { text: inputText, type: 'user' }]);

    // Get and add bot response
    const botResponse = handleBotResponse(inputText);
    setTimeout(() => {
      setMessages(prev => [...prev, { text: botResponse, type: 'bot' }]);
      scrollToBottom();
    }, 500);

    setInputText('');
  };

  return (
    <div className={styles.chatbotContainer}>
      {!isOpen && (
        <button 
          className={styles.chatbotButton}
          onClick={() => setIsOpen(true)}
        >
          Chat with us
        </button>
      )}

      {isOpen && (
        <div className={styles.chatbotWindow}>
          <div className={styles.chatHeader}>
            <h3>Event Assistant</h3>
            <button 
              className={styles.closeButton}
              onClick={() => setIsOpen(false)}
            >
              ×
            </button>
          </div>

          <div className={styles.messagesContainer}>
            {messages.map((message, index) => (
              <div 
                key={index} 
                className={`${styles.message} ${styles[message.type]}`}
              >
                {message.text.split('\n').map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSubmit} className={styles.inputForm}>
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type your message..."
              className={styles.input}
            />
            <button type="submit" className={styles.sendButton}>
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ChatBot; 