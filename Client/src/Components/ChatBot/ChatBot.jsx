import React, { useEffect } from "react";
import "./ChatBot.css";
import ChatBotIcon from "./ChatBotIcon";
import ChatForm from "./ChatForm";
import { useState, useRef } from "react";
import ChatMessage from "./ChatMessage";
import { companyInfo } from "./companyInfo";

const ChatBot = () => {
  const [chatHistory, setChatHistory] = useState([
    { hideInChat: true, role: "model", text: companyInfo },
  ]);
  const [showChatBot, setShowChatBot] = useState(false);
  const [pets, setPets] = useState([]);
  const chatBodyRef = useRef();

  const fetchPets = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/approvedPets`);
      const data = await response.json();
      if (response.ok) {
        setPets(data);
      } else {
        console.error("Failed to fetch pets:", data.error);
      }
    } catch (error) {
      console.error("Error fetching pets:", error);
    }
  };

  useEffect(() => {
    fetchPets();
  }, []);

  useEffect(() => {
    if (pets.length > 0) {
      const petsInfo = `
        Aquí tienes una lista de las mascotas disponibles para adopción:
        ${pets.map(pet => `
          - **Nombre:** ${pet.name}
          - **Edad:** ${pet.age}
          - **Tipo:** ${pet.type}
          - **Área:** ${pet.area}
          - **Justificación:** ${pet.justification}
        `).join('')}
        Puedes preguntarme más detalles sobre cualquiera de estas mascotas.
      `;
      setChatHistory(prev => [...prev, { hideInChat: true, role: 'model', text: petsInfo }]);
    }
  }, [pets]);


  const generateBotResponse = async (history) => {
    const updateHistory = (text, isError = false) => {
      setChatHistory((prev) => [
        ...prev.filter((msg) => msg.text !== "Pensando..."),
        { role: "model", text, isError },
      ]);
    };
    history = history.map(({ role, text }) => ({
      role: role === "model" ? "model" : "user",
      parts: [{ text }],
    }));

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: history }),
    };

    const apiUrl = process.env.REACT_APP_GEMINI_API_URL;

    if (!apiUrl) {
      throw new Error("La URL de la API no está configurada.");
    }

    try {
      const response = await fetch(apiUrl, requestOptions);
      const data = await response.json();

      if (!response.ok)
        throw new Error(
          data.error.message || "Error en la respuesta de la API"
        );

      const botText = data.candidates?.[0]?.content?.parts?.[0]?.text
        .replace(/\*\*(.*?)\*\*/g, "$1")
        .trim();

      updateHistory(botText);
    } catch (error) {
      updateHistory(error.message || "Ha ocurrido un error", true);
    }
  };

  useEffect(() => {
    chatBodyRef.current.scrollTo({
      top: chatBodyRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [chatHistory]);
  return (
    <div className={`container ${showChatBot ? "show-chatbot" : ""}`}>
      <button
        onClick={() => setShowChatBot((prev) => !prev)}
        id="chatbot-toggler"
      >
        <span className="material-symbols-rounded">mode_comment</span>
        <span className="material-symbols-rounded">close</span>
      </button>
      <div className="chatbot-popup">
        {/* ChatBot Header */}
        <div className="chat-header">
          <div className="header-info">
            <ChatBotIcon />
            <h2 className="logo-text">AdopmeBOT</h2>
          </div>
          <button
            onClick={() => setShowChatBot((prev) => !prev)}
            className="header-button"
          >
            <span className="material-symbols-rounded">
              keyboard_arrow_down
            </span>
          </button>
        </div>
        {/* ChatBot Body */}
        <div ref={chatBodyRef} className="chat-body">
          <div className="message bot-message">
            <ChatBotIcon />
            <p className="message-text">
              👋 ¡Hola! Bienvenido. Esta es una plataforma para ayudar a que más
              mascotas encuentren un hogar. Si estás buscando adoptar o publicar
              una mascota, estoy aquí para ayudarte. También puedes preguntarme sobre las mascotas que tenemos disponibles.
            </p>
          </div>
          {chatHistory.map((chat, index) => (
            <ChatMessage key={index} chat={chat} />
          ))}
        </div>
        {/* ChatBot Footer */}
        <div className="chat-footer">
          <ChatForm
            chatHistory={chatHistory}
            setChatHistory={setChatHistory}
            generateBotResponse={generateBotResponse}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
