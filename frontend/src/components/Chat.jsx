import { useState, useRef, useEffect } from "react";
import ChatMessage from "./ChatMessage";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
    inputRef.current?.focus();
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { text: userMessage, isAi: false }]);
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:3000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await response.json();
      setMessages((prev) => [...prev, { text: data.message, isAi: true }]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          text: "Oops! Something went wrong. Please try again.",
          isAi: true,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-gray-800 border-b border-gray-700 px-6 py-4 shadow-sm">
        <h1 className="text-xl font-bold text-pink-400">Abhinavu AI</h1>
      </header>

      {/* Messages */}
      <main className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-400">
            <p className="text-lg font-medium">Start a conversation 👋</p>
            <p className="text-sm">Ask me anything!</p>
          </div>
        ) : (
          messages.map((msg, i) => (
            <ChatMessage
              key={i}
              message={msg.text}
              isAi={msg.isAi} // This will trigger logo for AI messages
            />
          ))
        )}

        {isLoading && (
          <div className="flex items-center justify-center gap-2 text-gray-400">
            <span className="animate-pulse">Thinking...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </main>

      {/* Input */}
      <form
        onSubmit={handleSubmit}
        className="p-4 bg-gray-800 border-t border-gray-700"
      >
        <div className="flex items-center gap-2">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 px-4 py-3 rounded-full border border-gray-600 bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="bg-pink-600 hover:bg-pink-700 text-white p-3 rounded-full transition disabled:opacity-50"
          >
            <PaperAirplaneIcon className="h-5 w-5 rotate-90" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default Chat;
