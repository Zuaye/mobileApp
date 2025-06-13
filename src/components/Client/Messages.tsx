"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  Search,
  MoreVertical,
  Image as ImageIcon,
  Paperclip,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/components/ui/avatar";

interface Message {
  id: string;
  content: string;
  sender: "client" | "agent";
  timestamp: Date;
  attachments?: string[];
}

interface Conversation {
  id: string;
  agent: {
    id: string;
    name: string;
    avatar?: string;
    isOnline: boolean;
  };
  lastMessage: Message;
  unreadCount: number;
}

export default function Messages() {
  const [selectedConversation, setSelectedConversation] = useState<
    string | null
  >(null);
  const [message, setMessage] = useState("");

  // Données de test
  const conversations: Conversation[] = [
    {
      id: "1",
      agent: {
        id: "a1",
        name: "Jean Dupont",
        avatar: "/avatars/agent1.jpg",
        isOnline: true,
      },
      lastMessage: {
        id: "m1",
        content: "Bonjour, je suis intéressé par la parcelle à Douala",
        sender: "client",
        timestamp: new Date(),
      },
      unreadCount: 2,
    },
    // Ajoutez d'autres conversations ici
  ];

  const handleSendMessage = () => {
    if (!message.trim()) return;
    // Logique d'envoi de message
    setMessage("");
  };

  const selectedAgent = conversations.find(
    (c) => c.id === selectedConversation
  )?.agent;

  return (
    <div className="h-[calc(100vh-8rem)] md:h-[calc(100vh-4rem)]">
      <AnimatePresence mode="wait">
        {selectedConversation ? (
          // Vue conversation
          <motion.div
            key="conversation"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 20 }}
            className="h-full flex flex-col bg-white dark:bg-slate-900"
          >
            {/* En-tête de la conversation */}
            <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setSelectedConversation(null)}
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <Avatar>
                <AvatarImage src={selectedAgent?.avatar} />
                <AvatarFallback>
                  {selectedAgent?.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h3 className="font-medium text-slate-900 dark:text-white">
                  {selectedAgent?.name}
                </h3>
                <p className="text-sm text-slate-500">
                  {selectedAgent?.isOnline ? "En ligne" : "Hors ligne"}
                </p>
              </div>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-5 w-5" />
              </Button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <p className="text-center text-sm text-slate-500">
                Aucun message dans cette conversation
              </p>
            </div>

            {/* Zone de saisie */}
            <div className="p-4 border-t border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon">
                  <Paperclip className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <ImageIcon className="h-5 w-5" />
                </Button>
                <Input
                  placeholder="Écrivez votre message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  className="flex-1"
                />
                <Button onClick={handleSendMessage}>
                  <Send className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </motion.div>
        ) : (
          // Vue liste des conversations
          <motion.div
            key="list"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 20 }}
            className="h-full flex flex-col bg-white dark:bg-slate-900"
          >
            <div className="p-4 border-b border-slate-200 dark:border-slate-800">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Rechercher une conversation..."
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto">
              {conversations.map((conversation) => (
                <motion.div
                  key={conversation.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50"
                  onClick={() => setSelectedConversation(conversation.id)}
                >
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Avatar>
                        <AvatarImage src={conversation.agent.avatar} />
                        <AvatarFallback>
                          {conversation.agent.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      {conversation.agent.isOnline && (
                        <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-white dark:border-slate-900" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-slate-900 dark:text-white truncate">
                          {conversation.agent.name}
                        </p>
                        <span className="text-xs text-slate-500">
                          {conversation.lastMessage.timestamp.toLocaleTimeString()}
                        </span>
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-400 truncate">
                        {conversation.lastMessage.content}
                      </p>
                    </div>
                    {conversation.unreadCount > 0 && (
                      <div className="ml-2 bg-[#f39200] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {conversation.unreadCount}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
