// "use client";
// import { useState, useEffect, useRef } from "react";

// export default function ChatbotUI() {
//   const [messages, setMessages] = useState([
//     { sender: "bot", text: "Hi there! 👋 I'm your AI assistant. How can I help you today?" },
//   ]);
//   const [input, setInput] = useState("");
//   const [conversation, setConversation] = useState(""); // Full conversation
//   const [showSettings, setShowSettings] = useState(true);
//   const [language, setLanguage] = useState("Dutch");
//   const [emailType, setEmailType] = useState("Formal");
//   const [emailLength, setEmailLength] = useState("Medium");
//   const [tone, setTone] = useState("Professional");
//   const [formality, setFormality] = useState(70);
//   const [signature, setSignature] = useState("");
//   const [template, setTemplate] = useState("");
//   const [notifications, setNotifications] = useState(true);
//   const [soundAlert, setSoundAlert] = useState(false);

//   const messagesEndRef = useRef(null);

//   const languages = ["English", "Dutch", "Spanish", "French", "German", "Italian"];
//   const tones = ["Friendly", "Professional", "Persuasive", "Casual", "Polite"];
//   const templates = ["Leave Request", "Meeting Invitation", "Follow-up Email"];

//   const handleSend = async () => {
//     if (!input.trim()) return;

//     // Append user's message to conversation
//     const updatedConversation = conversation + `user: ${input}\n`;
//     setConversation(updatedConversation);
//     setMessages(prev => [...prev, { sender: "user", text: input }]);
//     setInput("");

//     try {
//       // Call FastAPI backend
//       const res = await fetch("http://localhost:8000/chatbot", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ 
//         chat: updatedConversation,
//         language: language,
//         email_type: emailType,
//         email_length: emailLength,
//         tune: tone,
//         signature: signature
//            }),
//       });

//       const data = await res.json();
//       const botReply = data.ans;

//       // Append bot reply to conversation
//       const newConversation = updatedConversation + `bot: ${botReply}\n`;
//       setConversation(newConversation);
//       setMessages(prev => [...prev, { sender: "bot", text: botReply }]);

//       // Desktop notification
//       if (notifications && "Notification" in window) {
//         Notification.requestPermission().then(permission => {
//           if (permission === "granted") {
//             new Notification("Email Bot", { body: botReply });
//           }
//         });
//       }

//       // Sound alert
//       if (soundAlert) {
//         const audio = new Audio("/notification.mp3");
//         audio.play();
//       }

//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handleKeyDown = (e) => {
//     if (e.key === "Enter") handleSend();
//   };

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   return (
//     <div className="flex h-screen bg-gradient-to-b from-gray-50 to-gray-100 text-black">

//       {/* Sidebar - Settings */}
//       <div className="w-80 bg-white border-r p-5 flex flex-col shadow-lg overflow-y-auto">
//         <h2 className="text-2xl font-bold mb-5">Settings</h2>

//         {showSettings && (
//           <div className="space-y-5 text-black font-sans">
//             {/* Language */}
//             <div>
//               <label className="block mb-2 text-lg font-semibold">Language</label>
//               <select
//                 value={language}
//                 onChange={(e) => setLanguage(e.target.value)}
//                 className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 outline-none text-black text-base"
//               >
//                 {languages.map(lang => <option key={lang} value={lang}>{lang}</option>)}
//               </select>
//             </div>

//             {/* Email Type */}
//             <div>
//               <label className="block mb-2 text-lg font-semibold">Email Type</label>
//               <select
//                 value={emailType}
//                 onChange={(e) => setEmailType(e.target.value)}
//                 className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 outline-none text-black text-base"
//               >
//                 <option value="Formal">Formal</option>
//                 <option value="Informal">Informal</option>
//               </select>
//             </div>

//             {/* Email Length */}
//             <div>
//               <label className="block mb-2 text-lg font-semibold">Email Length</label>
//               <select
//                 value={emailLength}
//                 onChange={(e) => setEmailLength(e.target.value)}
//                 className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 outline-none text-black text-base"
//               >
//                 <option value="Short">Short</option>
//                 <option value="Medium">Medium</option>
//                 <option value="Long">Long</option>
//               </select>
//             </div>

//             {/* Tone */}
//             <div>
//               <label className="block mb-2 text-lg font-semibold">Tone / Style</label>
//               <select
//                 value={tone}
//                 onChange={(e) => setTone(e.target.value)}
//                 className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 outline-none text-black text-base"
//               >
//                 {tones.map(t => <option key={t} value={t}>{t}</option>)}
//               </select>
//             </div>

//             {/* Formality */}
//             <div>
//               <label className="block mb-2 text-lg font-semibold">Formality ({formality}%)</label>
//               <input
//                 type="range"
//                 min="0"
//                 max="100"
//                 value={formality}
//                 onChange={(e) => setFormality(e.target.value)}
//                 className="w-full"
//               />
//             </div>

//             {/* Signature */}
//             <div>
//               <label className="block mb-2 text-lg font-semibold">Signature / Closing</label>
//               <input
//                 type="text"
//                 placeholder="Your Name / Signature"
//                 value={signature}
//                 onChange={(e) => setSignature(e.target.value)}
//                 className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 outline-none text-black text-base"
//               />
//             </div>

//             {/* Quick Templates */}
//             <div>
//               <label className="block mb-2 text-lg font-semibold">Quick Templates</label>
//               <select
//                 value={template}
//                 onChange={(e) => setTemplate(e.target.value)}
//                 className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 outline-none text-black text-base"
//               >
//                 <option value="">None</option>
//                 {templates.map(temp => <option key={temp} value={temp}>{temp}</option>)}
//               </select>
//             </div>

//             {/* Notifications */}
//             <div className="flex items-center space-x-2">
//               <input type="checkbox" checked={notifications} onChange={(e)=>setNotifications(e.target.checked)} className="h-5 w-5" />
//               <label className="text-base font-medium">Enable Desktop Notifications</label>
//             </div>

//             {/* Sound Alert */}
//             <div className="flex items-center space-x-2">
//               <input type="checkbox" checked={soundAlert} onChange={(e)=>setSoundAlert(e.target.checked)} className="h-5 w-5" />
//               <label className="text-base font-medium">Enable Sound Alert</label>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Chat Area */}
//       <div className="flex-1 flex flex-col justify-between relative text-black font-sans">

//         {/* Header */}
//         <div className="bg-white shadow-md p-5 border-b border-gray-200">
//           <h1 className="text-3xl font-bold">Email Bot</h1>
//         </div>

//         {/* Messages */}
//         <div className="p-6 overflow-y-auto flex-1 flex flex-col space-y-4">
//           {messages.map((msg, idx) => (
//             <div
//               key={idx}
//               className={`max-w-xl p-5 rounded-2xl shadow-md break-words leading-relaxed text-base ${
//                 msg.sender === "bot"
//                   ? "bg-gray-100 text-gray-900 self-start font-medium"
//                   : "bg-gradient-to-r from-blue-500 to-indigo-500 text-white self-end font-semibold"
//               }`}
//             >
//               {msg.text}
//             </div>
//           ))}
//           <div ref={messagesEndRef} />
//         </div>

//         {/* Input Field */}
//         <div className="p-4 flex items-center bg-white shadow-md rounded-t-xl">
//           <input
//             type="text"
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             onKeyDown={handleKeyDown}
//             placeholder="Type your message..."
//             className="flex-1 p-4 border border-gray-300 rounded-l-2xl focus:ring-2 focus:ring-blue-400 outline-none text-black text-base"
//           />
//           <button
//             onClick={handleSend}
//             className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-6 py-3 rounded-r-2xl hover:scale-105 transform transition-all duration-200 shadow-md hover:shadow-lg text-lg font-semibold"
//           >
//             Send
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }




// "urooba "

// "use client";
// import { useState, useEffect, useRef } from "react";

// export default function ChatbotUI() {
//   const [messages, setMessages] = useState([
//     { sender: "bot", text: "Hi there! 👋 I'm your AI assistant. How can I help you today?" },
//   ]);
//   const [input, setInput] = useState("");
//   const [conversation, setConversation] = useState(""); 
//   const [showSettings, setShowSettings] = useState(true);

//   // Sidebar States
//   const [language, setLanguage] = useState("Dutch");
//   const [emailType, setEmailType] = useState("Formal");
//   const [emailLength, setEmailLength] = useState("Medium");
//   const [tone, setTone] = useState("Professional");
//   const [formality, setFormality] = useState(70);
//   const [signature, setSignature] = useState("");
//   const [template, setTemplate] = useState("");
//   const [notifications, setNotifications] = useState(true);
//   const [soundAlert, setSoundAlert] = useState(false);

//   const messagesEndRef = useRef<HTMLDivElement | null>(null);

//   const languages = ["English", "Dutch", "Spanish", "French", "German", "Italian"];
//   const tones = ["Friendly", "Professional", "Persuasive", "Casual", "Polite"];
//   const templates = ["Leave Request", "Meeting Invitation", "Follow-up Email"];

//   // Storage keys
//   const STORAGE_KEYS = {
//     language: "chatbot_language",
//     emailType: "chatbot_emailType",
//     emailLength: "chatbot_emailLength",
//     tone: "chatbot_tone",
//     formality: "chatbot_formality",
//     signature: "chatbot_signature",
//     template: "chatbot_template",
//     notifications: "chatbot_notifications",
//     soundAlert: "chatbot_soundAlert",
//   };

//   // Load states from localStorage on mount
//   useEffect(() => {
//     if (typeof window === "undefined") return;

//     const storedLanguage = localStorage.getItem(STORAGE_KEYS.language);
//     const storedEmailType = localStorage.getItem(STORAGE_KEYS.emailType);
//     const storedEmailLength = localStorage.getItem(STORAGE_KEYS.emailLength);
//     const storedTone = localStorage.getItem(STORAGE_KEYS.tone);
//     const storedFormality = localStorage.getItem(STORAGE_KEYS.formality);
//     const storedSignature = localStorage.getItem(STORAGE_KEYS.signature);
//     const storedTemplate = localStorage.getItem(STORAGE_KEYS.template);
//     const storedNotifications = localStorage.getItem(STORAGE_KEYS.notifications);
//     const storedSoundAlert = localStorage.getItem(STORAGE_KEYS.soundAlert);

//     if (storedLanguage) setLanguage(storedLanguage);
//     if (storedEmailType) setEmailType(storedEmailType);
//     if (storedEmailLength) setEmailLength(storedEmailLength);
//     if (storedTone) setTone(storedTone);
//     if (storedFormality) setFormality(Number(storedFormality));
//     if (storedSignature) setSignature(storedSignature);
//     if (storedTemplate) setTemplate(storedTemplate);
//     if (storedNotifications) setNotifications(storedNotifications === "true");
//     if (storedSoundAlert) setSoundAlert(storedSoundAlert === "true");
//   }, []);

//   // Save states to localStorage when updated
//   useEffect(() => { localStorage.setItem(STORAGE_KEYS.language, language); }, [language]);
//   useEffect(() => { localStorage.setItem(STORAGE_KEYS.emailType, emailType); }, [emailType]);
//   useEffect(() => { localStorage.setItem(STORAGE_KEYS.emailLength, emailLength); }, [emailLength]);
//   useEffect(() => { localStorage.setItem(STORAGE_KEYS.tone, tone); }, [tone]);
//   useEffect(() => { localStorage.setItem(STORAGE_KEYS.formality, formality.toString()); }, [formality]);
//   useEffect(() => { localStorage.setItem(STORAGE_KEYS.signature, signature); }, [signature]);
//   useEffect(() => { localStorage.setItem(STORAGE_KEYS.template, template); }, [template]);
//   useEffect(() => { localStorage.setItem(STORAGE_KEYS.notifications, notifications.toString()); }, [notifications]);
//   useEffect(() => { localStorage.setItem(STORAGE_KEYS.soundAlert, soundAlert.toString()); }, [soundAlert]);

//   const handleSend = async () => {
//     if (!input.trim()) return;
//     const updatedConversation = conversation + `user: ${input}\n`;
//     setConversation(updatedConversation);
//     setMessages(prev => [...prev, { sender: "user", text: input }]);
//     setInput("");

//     try {
//       const res = await fetch("http://localhost:8000/chatbot", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ 
//           chat: updatedConversation,
//           language: language,
//           email_type: emailType,
//           email_length: emailLength,
//           tune: tone,
//           signature: signature
//         }),
//       });

//       const data = await res.json();
//       const botReply = data.ans;
//       const newConversation = updatedConversation + `bot: ${botReply}\n`;
//       setConversation(newConversation);
//       setMessages(prev => [...prev, { sender: "bot", text: botReply }]);

//       if (notifications && "Notification" in window) {
//         Notification.requestPermission().then(permission => {
//           if (permission === "granted") {
//             new Notification("Email Bot", { body: botReply });
//           }
//         });
//       }

//       if (soundAlert) {
//         const audio = new Audio("/notification.mp3");
//         audio.play();
//       }
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === "Enter") handleSend();
//   };

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   return (
//     <div className="flex h-screen bg-gradient-to-b from-gray-50 to-gray-100 text-black">
//       {/* Sidebar */}
//       <div className="w-80 bg-white border-r p-5 flex flex-col shadow-lg overflow-y-auto">
//         <h2 className="text-2xl font-bold mb-5">Settings</h2>
//         {showSettings && (
//           <div className="space-y-5 text-black font-sans">
//             {/* Language */}
//             <div>
//               <label className="block mb-2 text-lg font-semibold">Language</label>
//               <select value={language} onChange={(e) => setLanguage(e.target.value)} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 outline-none text-black text-base">
//                 {languages.map(lang => <option key={lang} value={lang}>{lang}</option>)}
//               </select>
//             </div>
//             {/* Email Type */}
//             <div>
//               <label className="block mb-2 text-lg font-semibold">Email Type</label>
//               <select value={emailType} onChange={(e) => setEmailType(e.target.value)} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 outline-none text-black text-base">
//                 <option value="Formal">Formal</option>
//                 <option value="Informal">Informal</option>
//               </select>
//             </div>
//             {/* Email Length */}
//             <div>
//               <label className="block mb-2 text-lg font-semibold">Email Length</label>
//               <select value={emailLength} onChange={(e) => setEmailLength(e.target.value)} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 outline-none text-black text-base">
//                 <option value="Short">Short</option>
//                 <option value="Medium">Medium</option>
//                 <option value="Long">Long</option>
//               </select>
//             </div>
//             {/* Tone */}
//             <div>
//               <label className="block mb-2 text-lg font-semibold">Tone / Style</label>
//               <select value={tone} onChange={(e) => setTone(e.target.value)} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 outline-none text-black text-base">
//                 {tones.map(t => <option key={t} value={t}>{t}</option>)}
//               </select>
//             </div>
//             {/* Formality */}
//             <div>
//               <label className="block mb-2 text-lg font-semibold">Formality ({formality}%)</label>
//               <input type="range" min="0" max="100" value={formality} onChange={(e) => setFormality(Number(e.target.value))} className="w-full" />
//             </div>
//             {/* Signature */}
//             <div>
//               <label className="block mb-2 text-lg font-semibold">Signature / Closing</label>
//               <input type="text" placeholder="Your Name / Signature" value={signature} onChange={(e) => setSignature(e.target.value)} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 outline-none text-black text-base" />
//             </div>
//             {/* Quick Templates */}
//             <div>
//               <label className="block mb-2 text-lg font-semibold">Quick Templates</label>
//               <select value={template} onChange={(e) => setTemplate(e.target.value)} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 outline-none text-black text-base">
//                 <option value="">None</option>
//                 {templates.map(temp => <option key={temp} value={temp}>{temp}</option>)}
//               </select>
//             </div>
//             {/* Notifications */}
//             <div className="flex items-center space-x-2">
//               <input type="checkbox" checked={notifications} onChange={(e)=>setNotifications(e.target.checked)} className="h-5 w-5" />
//               <label className="text-base font-medium">Enable Desktop Notifications</label>
//             </div>
//             {/* Sound Alert */}
//             <div className="flex items-center space-x-2">
//               <input type="checkbox" checked={soundAlert} onChange={(e)=>setSoundAlert(e.target.checked)} className="h-5 w-5" />
//               <label className="text-base font-medium">Enable Sound Alert</label>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Chat Area */}
//       <div className="flex-1 flex flex-col justify-between relative text-black font-sans">
//         <div className="bg-white shadow-md p-5 border-b border-gray-200">
//           <h1 className="text-3xl font-bold">Email Bot</h1>
//         </div>
//         <div className="p-6 overflow-y-auto flex-1 flex flex-col space-y-4">
//           {messages.map((msg, idx) => (
//             <div key={idx} className={`max-w-xl p-5 rounded-2xl shadow-md break-words leading-relaxed text-base ${
//               msg.sender === "bot"
//                 ? "bg-gray-100 text-gray-900 self-start font-medium"
//                 : "bg-gradient-to-r from-blue-500 to-indigo-500 text-white self-end font-semibold"
//             }`}>
//               {msg.text}
//             </div>
//           ))}
//           <div ref={messagesEndRef} />
//         </div>
//         <div className="p-4 flex items-center bg-white shadow-md rounded-t-xl">
//           <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={handleKeyDown} placeholder="Type your message..." className="flex-1 p-4 border border-gray-300 rounded-l-2xl focus:ring-2 focus:ring-blue-400 outline-none text-black text-base" />
//           <button onClick={handleSend} className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-6 py-3 rounded-r-2xl hover:scale-105 transform transition-all duration-200 shadow-md hover:shadow-lg text-lg font-semibold">
//             Send
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }


// "use client";
// import { useState, useEffect, useRef } from "react";
// import { Menu, X } from "lucide-react"; // For hamburger and close icons

// export default function ChatbotUI() {
//   const [messages, setMessages] = useState([
//     { sender: "bot", text: "Hi there! 👋 I'm your AI assistant. How can I help you today?" },
//   ]);
//   const [input, setInput] = useState("");
//   const [conversation, setConversation] = useState(""); 
//   const [showSettings, setShowSettings] = useState(true);
//   const [sidebarOpen, setSidebarOpen] = useState(false); // Mobile sidebar state

//   // Sidebar States
//   const [language, setLanguage] = useState("Dutch");
//   const [emailType, setEmailType] = useState("Formal");
//   const [emailLength, setEmailLength] = useState("Medium");
//   const [tone, setTone] = useState("Professional");
//   const [formality, setFormality] = useState(70);
//   const [signature, setSignature] = useState("");
//   const [template, setTemplate] = useState("");
//   const [notifications, setNotifications] = useState(true);
//   const [soundAlert, setSoundAlert] = useState(false);

//   const messagesEndRef = useRef<HTMLDivElement | null>(null);

//   const languages = ["English", "Dutch", "Spanish", "French", "German", "Italian"];
//   const tones = ["Friendly", "Professional", "Persuasive", "Casual", "Polite"];
//   const templates = ["Leave Request", "Meeting Invitation", "Follow-up Email"];

//   // Storage keys
//   const STORAGE_KEYS = {
//     language: "chatbot_language",
//     emailType: "chatbot_emailType",
//     emailLength: "chatbot_emailLength",
//     tone: "chatbot_tone",
//     formality: "chatbot_formality",
//     signature: "chatbot_signature",
//     template: "chatbot_template",
//     notifications: "chatbot_notifications",
//     soundAlert: "chatbot_soundAlert",
//   };

//   // Load states from localStorage on mount
//   useEffect(() => {
//     if (typeof window === "undefined") return;
//     const storedLanguage = localStorage.getItem(STORAGE_KEYS.language);
//     const storedEmailType = localStorage.getItem(STORAGE_KEYS.emailType);
//     const storedEmailLength = localStorage.getItem(STORAGE_KEYS.emailLength);
//     const storedTone = localStorage.getItem(STORAGE_KEYS.tone);
//     const storedFormality = localStorage.getItem(STORAGE_KEYS.formality);
//     const storedSignature = localStorage.getItem(STORAGE_KEYS.signature);
//     const storedTemplate = localStorage.getItem(STORAGE_KEYS.template);
//     const storedNotifications = localStorage.getItem(STORAGE_KEYS.notifications);
//     const storedSoundAlert = localStorage.getItem(STORAGE_KEYS.soundAlert);

//     if (storedLanguage) setLanguage(storedLanguage);
//     if (storedEmailType) setEmailType(storedEmailType);
//     if (storedEmailLength) setEmailLength(storedEmailLength);
//     if (storedTone) setTone(storedTone);
//     if (storedFormality) setFormality(Number(storedFormality));
//     if (storedSignature) setSignature(storedSignature);
//     if (storedTemplate) setTemplate(storedTemplate);
//     if (storedNotifications) setNotifications(storedNotifications === "true");
//     if (storedSoundAlert) setSoundAlert(storedSoundAlert === "true");
//   }, []);

//   // Save states to localStorage when updated
//   useEffect(() => { localStorage.setItem(STORAGE_KEYS.language, language); }, [language]);
//   useEffect(() => { localStorage.setItem(STORAGE_KEYS.emailType, emailType); }, [emailType]);
//   useEffect(() => { localStorage.setItem(STORAGE_KEYS.emailLength, emailLength); }, [emailLength]);
//   useEffect(() => { localStorage.setItem(STORAGE_KEYS.tone, tone); }, [tone]);
//   useEffect(() => { localStorage.setItem(STORAGE_KEYS.formality, formality.toString()); }, [formality]);
//   useEffect(() => { localStorage.setItem(STORAGE_KEYS.signature, signature); }, [signature]);
//   useEffect(() => { localStorage.setItem(STORAGE_KEYS.template, template); }, [template]);
//   useEffect(() => { localStorage.setItem(STORAGE_KEYS.notifications, notifications.toString()); }, [notifications]);
//   useEffect(() => { localStorage.setItem(STORAGE_KEYS.soundAlert, soundAlert.toString()); }, [soundAlert]);

//   const handleSend = async () => {
//     if (!input.trim()) return;
//     const updatedConversation = conversation + `user: ${input}\n`;
//     setConversation(updatedConversation);
//     setMessages(prev => [...prev, { sender: "user", text: input }]);
//     setInput("");

//     try {
//       const res = await fetch("http://localhost:8000/chatbot", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ 
//           chat: updatedConversation,
//           language: language,
//           email_type: emailType,
//           email_length: emailLength,
//           tune: tone,
//           signature: signature
//         }),
//       });

//       const data = await res.json();
//       const botReply = data.ans;
//       const newConversation = updatedConversation + `bot: ${botReply}\n`;
//       setConversation(newConversation);
//       setMessages(prev => [...prev, { sender: "bot", text: botReply }]);

//       if (notifications && "Notification" in window) {
//         Notification.requestPermission().then(permission => {
//           if (permission === "granted") {
//             new Notification("Email Bot", { body: botReply });
//           }
//         });
//       }

//       if (soundAlert) {
//         const audio = new Audio("/notification.mp3");
//         audio.play();
//       }
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === "Enter") handleSend();
//   };

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   return (
//     <div className="flex h-screen bg-gradient-to-b from-gray-50 to-gray-100 text-black">
//       {/* Sidebar (desktop) */}
//       <div className="hidden md:flex w-80 bg-white border-r p-5 flex-col shadow-lg overflow-y-auto">
//         <h2 className="text-2xl font-bold mb-5">Settings</h2>
//         {showSettings && (
//           <div className="space-y-5 text-black font-sans">
//             {/* Language */}
//             <div>
//               <label className="block mb-2 text-lg font-semibold">Language</label>
//               <select value={language} onChange={(e) => setLanguage(e.target.value)} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 outline-none text-black text-base">
//                 {languages.map(lang => <option key={lang} value={lang}>{lang}</option>)}
//               </select>
//             </div>
//             {/* Email Type */}
//             <div>
//               <label className="block mb-2 text-lg font-semibold">Email Type</label>
//               <select value={emailType} onChange={(e) => setEmailType(e.target.value)} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 outline-none text-black text-base">
//                 <option value="Formal">Formal</option>
//                 <option value="Informal">Informal</option>
//               </select>
//             </div>
//             {/* Email Length */}
//             <div>
//               <label className="block mb-2 text-lg font-semibold">Email Length</label>
//               <select value={emailLength} onChange={(e) => setEmailLength(e.target.value)} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 outline-none text-black text-base">
//                 <option value="Short">Short</option>
//                 <option value="Medium">Medium</option>
//                 <option value="Long">Long</option>
//               </select>
//             </div>
//             {/* Tone */}
//             <div>
//               <label className="block mb-2 text-lg font-semibold">Tone / Style</label>
//               <select value={tone} onChange={(e) => setTone(e.target.value)} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 outline-none text-black text-base">
//                 {tones.map(t => <option key={t} value={t}>{t}</option>)}
//               </select>
//             </div>
//             {/* Formality */}
//             <div>
//               <label className="block mb-2 text-lg font-semibold">Formality ({formality}%)</label>
//               <input type="range" min="0" max="100" value={formality} onChange={(e) => setFormality(Number(e.target.value))} className="w-full" />
//             </div>
//             {/* Signature */}
//             <div>
//               <label className="block mb-2 text-lg font-semibold">Signature / Closing</label>
//               <input type="text" placeholder="Your Name / Signature" value={signature} onChange={(e) => setSignature(e.target.value)} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 outline-none text-black text-base" />
//             </div>
//             {/* Quick Templates */}
//             <div>
//               <label className="block mb-2 text-lg font-semibold">Quick Templates</label>
//               <select value={template} onChange={(e) => setTemplate(e.target.value)} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 outline-none text-black text-base">
//                 <option value="">None</option>
//                 {templates.map(temp => <option key={temp} value={temp}>{temp}</option>)}
//               </select>
//             </div>
//             {/* Notifications */}
//             <div className="flex items-center space-x-2">
//               <input type="checkbox" checked={notifications} onChange={(e)=>setNotifications(e.target.checked)} className="h-5 w-5" />
//               <label className="text-base font-medium">Enable Desktop Notifications</label>
//             </div>
//             {/* Sound Alert */}
//             <div className="flex items-center space-x-2">
//               <input type="checkbox" checked={soundAlert} onChange={(e)=>setSoundAlert(e.target.checked)} className="h-5 w-5" />
//               <label className="text-base font-medium">Enable Sound Alert</label>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Mobile Sidebar (drawer) */}
//       {sidebarOpen && (
//         <div className="fixed inset-0 z-50 flex">
//           <div className="w-72 bg-white p-5 shadow-lg overflow-y-auto">
//             <div className="flex justify-between items-center mb-5">
//               <h2 className="text-2xl font-bold">Settings</h2>
//               <button onClick={() => setSidebarOpen(false)}><X className="h-6 w-6" /></button>
//             </div>
//             {showSettings && (
//               <div className="space-y-5 text-black font-sans">
//                 {/* Copy same settings content here */}
//                 {/* Language */}
//                 <div>
//                   <label className="block mb-2 text-lg font-semibold">Language</label>
//                   <select value={language} onChange={(e) => setLanguage(e.target.value)} className="w-full p-3 border border-gray-300 rounded-md">
//                     {languages.map(lang => <option key={lang} value={lang}>{lang}</option>)}
//                   </select>
//                 </div>
//                 {/* Email Type */}
//                 <div>
//                   <label className="block mb-2 text-lg font-semibold">Email Type</label>
//                   <select value={emailType} onChange={(e) => setEmailType(e.target.value)} className="w-full p-3 border border-gray-300 rounded-md">
//                     <option value="Formal">Formal</option>
//                     <option value="Informal">Informal</option>
//                   </select>
//                 </div>
//                 {/* Email Length */}
//                 <div>
//                   <label className="block mb-2 text-lg font-semibold">Email Length</label>
//                   <select value={emailLength} onChange={(e) => setEmailLength(e.target.value)} className="w-full p-3 border border-gray-300 rounded-md">
//                     <option value="Short">Short</option>
//                     <option value="Medium">Medium</option>
//                     <option value="Long">Long</option>
//                   </select>
//                 </div>
//                 {/* Tone */}
//                 <div>
//                   <label className="block mb-2 text-lg font-semibold">Tone / Style</label>
//                   <select value={tone} onChange={(e) => setTone(e.target.value)} className="w-full p-3 border border-gray-300 rounded-md">
//                     {tones.map(t => <option key={t} value={t}>{t}</option>)}
//                   </select>
//                 </div>
//                 {/* Formality */}
//                 <div>
//                   <label className="block mb-2 text-lg font-semibold">Formality ({formality}%)</label>
//                   <input type="range" min="0" max="100" value={formality} onChange={(e) => setFormality(Number(e.target.value))} className="w-full" />
//                 </div>
//                 {/* Signature */}
//                 <div>
//                   <label className="block mb-2 text-lg font-semibold">Signature / Closing</label>
//                   <input type="text" placeholder="Your Name / Signature" value={signature} onChange={(e) => setSignature(e.target.value)} className="w-full p-3 border border-gray-300 rounded-md" />
//                 </div>
//                 {/* Quick Templates */}
//                 <div>
//                   <label className="block mb-2 text-lg font-semibold">Quick Templates</label>
//                   <select value={template} onChange={(e) => setTemplate(e.target.value)} className="w-full p-3 border border-gray-300 rounded-md">
//                     <option value="">None</option>
//                     {templates.map(temp => <option key={temp} value={temp}>{temp}</option>)}
//                   </select>
//                 </div>
//                 {/* Notifications */}
//                 <div className="flex items-center space-x-2">
//                   <input type="checkbox" checked={notifications} onChange={(e)=>setNotifications(e.target.checked)} className="h-5 w-5" />
//                   <label className="text-base font-medium">Enable Desktop Notifications</label>
//                 </div>
//                 {/* Sound Alert */}
//                 <div className="flex items-center space-x-2">
//                   <input type="checkbox" checked={soundAlert} onChange={(e)=>setSoundAlert(e.target.checked)} className="h-5 w-5" />
//                   <label className="text-base font-medium">Enable Sound Alert</label>
//                 </div>
//               </div>
//             )}
//           </div>
//           {/* Overlay */}
//           <div className="flex-1 bg-black bg-opacity-50" onClick={() => setSidebarOpen(false)}></div>
//         </div>
//       )}

//       {/* Chat Area */}
//       <div className="flex-1 flex flex-col justify-between relative text-black font-sans">
//         <div className="bg-white shadow-md p-5 border-b border-gray-200 flex justify-between items-center">
//           <h1 className="text-3xl font-bold">Email Bot</h1>
//           <button className="md:hidden" onClick={() => setSidebarOpen(true)}>
//             <Menu className="h-7 w-7" />
//           </button>
//         </div>
//         <div className="p-6 overflow-y-auto flex-1 flex flex-col space-y-4">
//           {messages.map((msg, idx) => (
//             <div key={idx} className={`max-w-xl p-5 rounded-2xl shadow-md break-words leading-relaxed text-base ${
//               msg.sender === "bot"
//                 ? "bg-gray-100 text-gray-900 self-start font-medium"
//                 : "bg-gradient-to-r from-blue-500 to-indigo-500 text-white self-end font-semibold"
//             }`}>
//               {msg.text}
//             </div>
//           ))}
//           <div ref={messagesEndRef} />
//         </div>
//         <div className="p-4 flex items-center bg-white shadow-md rounded-t-xl">
//           <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={handleKeyDown} placeholder="Type your message..." className="flex-1 p-4 border border-gray-300 rounded-l-2xl focus:ring-2 focus:ring-blue-400 outline-none text-black text-base" />
//           <button onClick={handleSend} className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-6 py-3 rounded-r-2xl hover:scale-105 transform transition-all duration-200 shadow-md hover:shadow-lg text-lg font-semibold">
//             Send
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";
import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react"; // For hamburger and close icons

export default function ChatbotUI() {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi there! 👋 I'm your AI assistant. How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const [conversation, setConversation] = useState(""); 
  const [showSettings, setShowSettings] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false); // Mobile sidebar state
  const [isTyping, setIsTyping] = useState(false); // <-- new state

  // Sidebar States
  const [language, setLanguage] = useState("Dutch");
  const [emailType, setEmailType] = useState("Formal");
  const [emailLength, setEmailLength] = useState("Medium");
  const [tone, setTone] = useState("Professional");
  const [formality, setFormality] = useState(70);
  const [signature, setSignature] = useState("");
  const [template, setTemplate] = useState("");
  const [notifications, setNotifications] = useState(true);
  const [soundAlert, setSoundAlert] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const languages = ["English", "Dutch", "Spanish", "French", "German", "Italian"];
  const tones = ["Friendly", "Professional", "Persuasive", "Casual", "Polite"];
  const templates = ["Leave Request", "Meeting Invitation", "Follow-up Email"];

  // Storage keys
  const STORAGE_KEYS = {
    language: "chatbot_language",
    emailType: "chatbot_emailType",
    emailLength: "chatbot_emailLength",
    tone: "chatbot_tone",
    formality: "chatbot_formality",
    signature: "chatbot_signature",
    template: "chatbot_template",
    notifications: "chatbot_notifications",
    soundAlert: "chatbot_soundAlert",
  };

  // Load states from localStorage on mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    const storedLanguage = localStorage.getItem(STORAGE_KEYS.language);
    const storedEmailType = localStorage.getItem(STORAGE_KEYS.emailType);
    const storedEmailLength = localStorage.getItem(STORAGE_KEYS.emailLength);
    const storedTone = localStorage.getItem(STORAGE_KEYS.tone);
    const storedFormality = localStorage.getItem(STORAGE_KEYS.formality);
    const storedSignature = localStorage.getItem(STORAGE_KEYS.signature);
    const storedTemplate = localStorage.getItem(STORAGE_KEYS.template);
    const storedNotifications = localStorage.getItem(STORAGE_KEYS.notifications);
    const storedSoundAlert = localStorage.getItem(STORAGE_KEYS.soundAlert);

    if (storedLanguage) setLanguage(storedLanguage);
    if (storedEmailType) setEmailType(storedEmailType);
    if (storedEmailLength) setEmailLength(storedEmailLength);
    if (storedTone) setTone(storedTone);
    if (storedFormality) setFormality(Number(storedFormality));
    if (storedSignature) setSignature(storedSignature);
    if (storedTemplate) setTemplate(storedTemplate);
    if (storedNotifications) setNotifications(storedNotifications === "true");
    if (storedSoundAlert) setSoundAlert(storedSoundAlert === "true");
  }, []);

  // Save states to localStorage when updated
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.language, language); }, [language]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.emailType, emailType); }, [emailType]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.emailLength, emailLength); }, [emailLength]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.tone, tone); }, [tone]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.formality, formality.toString()); }, [formality]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.signature, signature); }, [signature]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.template, template); }, [template]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.notifications, notifications.toString()); }, [notifications]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.soundAlert, soundAlert.toString()); }, [soundAlert]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const updatedConversation = conversation + `user: ${input}\n`;
    setConversation(updatedConversation);
    setMessages(prev => [...prev, { sender: "user", text: input }]);
    setInput("");
    setIsTyping(true); // start typing

    try {
      const res = await fetch("http://localhost:8000/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          chat: updatedConversation,
          language: language,
          email_type: emailType,
          email_length: emailLength,
          tune: tone,
          signature: signature
        }),
      });

      const data = await res.json();
      const botReply = data.ans;
      const newConversation = updatedConversation + `bot: ${botReply}\n`;
      setConversation(newConversation);
      setMessages(prev => [...prev, { sender: "bot", text: botReply }]);

      if (notifications && "Notification" in window) {
        Notification.requestPermission().then(permission => {
          if (permission === "granted") {
            new Notification("Email Bot", { body: botReply });
          }
        });
      }

      if (soundAlert) {
        const audio = new Audio("/notification.mp3");
        audio.play();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsTyping(false); // stop typing
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSend();
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  return (
    <div className="flex h-screen bg-gradient-to-b from-gray-50 to-gray-100 text-black">
      {/* Sidebar (desktop) */}
      <div className="hidden md:flex w-80 bg-white border-r p-5 flex-col shadow-lg overflow-y-auto">
        <h2 className="text-2xl font-bold mb-5">Settings</h2>
        {showSettings && (
          <div className="space-y-5 text-black font-sans">
            {/* Language */}
            <div>
              <label className="block mb-2 text-lg font-semibold">Language</label>
              <select value={language} onChange={(e) => setLanguage(e.target.value)} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 outline-none text-black text-base">
                {languages.map(lang => <option key={lang} value={lang}>{lang}</option>)}
              </select>
            </div>
            {/* Email Type */}
            <div>
              <label className="block mb-2 text-lg font-semibold">Email Type</label>
              <select value={emailType} onChange={(e) => setEmailType(e.target.value)} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 outline-none text-black text-base">
                <option value="Formal">Formal</option>
                <option value="Informal">Informal</option>
              </select>
            </div>
            {/* Email Length */}
            <div>
              <label className="block mb-2 text-lg font-semibold">Email Length</label>
              <select value={emailLength} onChange={(e) => setEmailLength(e.target.value)} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 outline-none text-black text-base">
                <option value="Short">Short</option>
                <option value="Medium">Medium</option>
                <option value="Long">Long</option>
              </select>
            </div>
            {/* Tone */}
            <div>
              <label className="block mb-2 text-lg font-semibold">Tone / Style</label>
              <select value={tone} onChange={(e) => setTone(e.target.value)} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 outline-none text-black text-base">
                {tones.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            {/* Formality */}
            <div>
              <label className="block mb-2 text-lg font-semibold">Formality ({formality}%)</label>
              <input type="range" min="0" max="100" value={formality} onChange={(e) => setFormality(Number(e.target.value))} className="w-full" />
            </div>
            {/* Signature */}
            <div>
              <label className="block mb-2 text-lg font-semibold">Signature / Closing</label>
              <input type="text" placeholder="Your Name / Signature" value={signature} onChange={(e) => setSignature(e.target.value)} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 outline-none text-black text-base" />
            </div>
            {/* Quick Templates */}
            <div>
              <label className="block mb-2 text-lg font-semibold">Quick Templates</label>
              <select value={template} onChange={(e) => setTemplate(e.target.value)} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 outline-none text-black text-base">
                <option value="">None</option>
                {templates.map(temp => <option key={temp} value={temp}>{temp}</option>)}
              </select>
            </div>
            {/* Notifications */}
            <div className="flex items-center space-x-2">
              <input type="checkbox" checked={notifications} onChange={(e)=>setNotifications(e.target.checked)} className="h-5 w-5" />
              <label className="text-base font-medium">Enable Desktop Notifications</label>
            </div>
            {/* Sound Alert */}
            <div className="flex items-center space-x-2">
              <input type="checkbox" checked={soundAlert} onChange={(e)=>setSoundAlert(e.target.checked)} className="h-5 w-5" />
              <label className="text-base font-medium">Enable Sound Alert</label>
            </div>
          </div>
        )}
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col justify-between relative text-black font-sans">
        <div className="bg-white shadow-md p-5 border-b border-gray-200 flex justify-between items-center">
          <h1 className="text-3xl font-bold">Email Bot</h1>
          <button className="md:hidden" onClick={() => setSidebarOpen(true)}>
            <Menu className="h-7 w-7" />
          </button>
        </div>
        <div className="p-6 overflow-y-auto flex-1 flex flex-col space-y-4">
          {messages.map((msg, idx) => (
            <div key={idx} className={`max-w-xl p-5 rounded-2xl shadow-md break-words leading-relaxed text-base ${
              msg.sender === "bot"
                ? "bg-gray-100 text-gray-900 self-start font-medium"
                : "bg-gradient-to-r from-blue-500 to-indigo-500 text-white self-end font-semibold"
            }`}>
              {msg.text}
            </div>
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <div className="max-w-xs p-4 rounded-2xl shadow bg-gray-200 text-gray-700 self-start italic">
              Bot is typing...
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
        <div className="p-4 flex items-center bg-white shadow-md rounded-t-xl">
          <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={handleKeyDown} placeholder="Type your message..." className="flex-1 p-4 border border-gray-300 rounded-l-2xl focus:ring-2 focus:ring-blue-400 outline-none text-black text-base" />
          <button onClick={handleSend} className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-6 py-3 rounded-r-2xl hover:scale-105 transform transition-all duration-200 shadow-md hover:shadow-lg text-lg font-semibold">
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
