import { useState } from "react";
import { IoClose, IoChatbubbleEllipsesSharp } from "react-icons/io5";

const ChatPopup = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]); // State to store chat messages

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const sendMessage = () => {
    if (message.trim()) {
      // Simulate sending message (you would replace this with actual server logic)
      const newMessage = {
        sender: "You", // Replace with actual sender info
        message,
      };
      // Update message list with new message
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setMessage(""); // Clear input after sending
    }
  };

  return (
    <>
      {/* Floating chat button */}
      <button
        className="fixed bottom-4 right-4 bg-[rgb(140,24,27)] text-white p-3 rounded-full shadow-lg"
        onClick={toggleChat}
      >
        <IoChatbubbleEllipsesSharp size={25} />
      </button>

      {/* Chat window */}
      {isChatOpen && (
        <div className="fixed bottom-16 right-4 w-80 h-96 bg-white rounded-lg shadow-lg flex flex-col z-50">
          {/* Header with "Chat with the Service Owner" */}
          <div className="flex justify-between items-center p-4 bg-[rgb(140,24,27)] text-white rounded-t-lg">
            <h2 className="text-lg font-semibold">Chat with the Service Owner</h2>
            <IoClose size={20} className="cursor-pointer" onClick={toggleChat} />
          </div>

          {/* Chat messages section */}
          <div className="flex-1 p-4 overflow-y-auto">
            {messages.length > 0 ? (
              messages.map((msg, index) => (
                <div key={index} className="mb-2">
                  <strong>{msg.sender}</strong>: {msg.message}
                </div>
              ))
            ) : (
              <p className="text-gray-500">No messages yet.</p>
            )}
          </div>

          {/* Input and Send button */}
          <div className="p-4 border-t flex items-center gap-2">
            <input
              type="text"
              className="w-full p-2 border rounded-lg"
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") sendMessage(); // Send on Enter key
              }}
            />
            <button
              className="bg-[rgb(140,24,27)] text-white px-4 py-2 rounded-lg"
              onClick={sendMessage}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatPopup;
