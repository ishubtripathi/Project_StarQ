import { useState } from "react";

import ChatHeader from "../components/chat/ChatHeader";
import ChatMessages from "../components/chat/ChatMessages";
import ChatInput from "../components/chat/ChatInput";

import { sendQuery } from "../services/queryService";
import { getActiveDocument } from "../services/activeDocument";

import type { ChatMessage } from "../types/chat";


export default function Chat() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Hello! I'm StarQ. Ask me anything about your documents.",
    },
  ]);

  const [loading, setLoading] = useState(false);

  // Get the document selected/uploaded by the user.
  const activeDocument = getActiveDocument();


  const handleSend = async (content: string) => {
    const trimmedContent = content.trim();

    // Prevent empty messages.
    if (!trimmedContent) {
      return;
    }

    // Make sure a document is selected.
    if (!activeDocument?.document_id) {
      const errorMessage: ChatMessage = {
        id: `${Date.now()}-error`,
        role: "assistant",
        content:
          "Please upload or select a document before asking a question.",
      };

      setMessages((current) => [
        ...current,
        errorMessage,
      ]);

      return;
    }


    // Add user's message immediately.
    const userMessage: ChatMessage = {
      id: `${Date.now()}-user`,
      role: "user",
      content: trimmedContent,
    };

    setMessages((current) => [
      ...current,
      userMessage,
    ]);

    setLoading(true);


    try {
      // Send both the question and the active document ID.
      const response = await sendQuery(
        trimmedContent,
        activeDocument.document_id
      );


      // Add assistant response.
      const assistantMessage: ChatMessage = {
        id: `${Date.now()}-assistant`,
        role: "assistant",
        content: response.answer,
        sources: response.sources,
      };

      setMessages((current) => [
        ...current,
        assistantMessage,
      ]);

    } catch (error) {
      const errorMessage: ChatMessage = {
        id: `${Date.now()}-error`,
        role: "assistant",
        content:
          error instanceof Error
            ? error.message
            : "Something went wrong while processing your question.",
      };

      setMessages((current) => [
        ...current,
        errorMessage,
      ]);

    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="flex h-screen flex-col bg-[#0b0b0b]">

      <ChatHeader
        documentName={activeDocument?.filename}
      />

      <ChatMessages
        messages={messages}
        loading={loading}
      />

      <ChatInput
        onSend={handleSend}
        disabled={loading}
      />

    </div>
  );
}