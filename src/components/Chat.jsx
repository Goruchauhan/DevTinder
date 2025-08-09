import React, { useState, useEffect } from "react";
import socket from "../socket";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function Chat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [receiver, setReceiver] = useState(null);

  const user = useSelector((s) => s.user);
  const { id: receiverId } = useParams();

  // 1) Join room & fetch receiver
  useEffect(() => {
  if (!user?._id || !receiverId) return;

  const sortedRoomId = [user._id, receiverId].sort().join("_");

  // Leave previous rooms (optional backend support)
  socket.emit("leaveAllRooms");

  // Join current room
  socket.emit("joinRoom", sortedRoomId);
  console.log("🧩 Joined room:", sortedRoomId);

  // Fetch receiver info
  const fetchReceiver = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/user/${receiverId}`, {
        withCredentials: true,
      });

      const receiverData = res.data.user ?? res.data;
      setReceiver(receiverData);
      console.log("📥 Receiver Fetched:", receiverData);
    } catch (err) {
      console.error("❌ Failed to fetch receiver:", err);
    }
  };

  fetchReceiver();

  // Cleanup (if needed, especially when switching users)
  return () => {
    socket.emit("leaveRoom", sortedRoomId); // if you support this on backend
    socket.off("message"); // cleanup old listeners
  };
}, [receiverId, user?._id]);


  // 2) Listen for incoming messages
 useEffect(() => {
  if(!user?._id|| !receiver) return ;
  const handleIncomingMessage = (msg) => {
    console.log("📩 Message received:", msg);
    const fromSelf = msg.senderId === user._id;
    const senderName=fromSelf?user.firstName:receiver.firstName;
    setMessages((prev) => [...prev, { content: msg.message, fromSelf,senderName }]);
  };

  socket.on("message", handleIncomingMessage);
  return () => socket.off("message", handleIncomingMessage);
}, [user?._id,receiver]);

  // 3) Send a message
const sendMessage = (e) => {
  e.preventDefault();
  if (!message.trim()) return;

  const roomId = [user._id, receiverId].sort().join("_");

  socket.emit("message", {
    roomId,
    senderId: user._id,
    receiverId,
    message,
  });

  // ✅ Add this so message appears instantly for sender
  // setMessages((prev) => [
  //   ...prev,
  //   { content: message, fromSelf: true, senderName: user.firstName }
  // ]);

  setMessage(""); // clear input
};


  // 4) Early returns
  if (!user?._id) return <div className="p-4">⏳ Loading user…</div>;
  if (user._id === receiverId)
    return <div className="p-4">🚫 You can’t chat with yourself</div>;
  if (!receiver) return <div className="p-4">⏳ Loading chat…</div>;

  return (
    <div className="p-6 bg-base-200 rounded-box w-full max-w-3xl min-h-[80vh] mx-auto">
      <h2 className="text-lg font-bold mb-2 text-secondary">Chat with {receiver?.firstName||"Loading...."}</h2>
      <div className="h-[60vh] overflow-y-auto border p-4 mb-4 bg-base-100 rounded">
        {messages.map((msg, i) => (
          <div key={i} className={`chat ${msg.fromSelf ? "chat-end" : "chat-start"}`}>
                 <div className="chat-header text-xs mb-1 text-secondary">{msg.senderName}</div>  
            <div className="chat-bubble text-primary">{msg.content}</div>
          </div>
        ))}
      </div>
      <form onSubmit={sendMessage} className="flex gap-2">
        <input
          type="text"
          placeholder="Type a message"
          className="input input-bordered w-full"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit" className="btn btn-primary">Send</button>
      </form>
    </div>
  );
}

