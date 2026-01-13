import { Navigation } from '@/components/Navigation';
import MessagesSidebar from '@/components/messages/MessagesSidebar';
import MessagesContent from '@/components/messages/MessagesContent';
import { useMessagesData } from '@/hooks/useMessagesData';
import { useState } from 'react';

export default function Messages() {
  const [showSidebar, setShowSidebar] = useState(true);
  
  const {
    selectedChat,
    messageText,
    setMessageText,
    searchQuery,
    setSearchQuery,
    chats,
    messages,
    loading,
    sending,
    currentUserId,
    userRole,
    messagesLimit,
    handleSelectChat,
    handleSendMessage,
    handleBookingResponse,
    handleDeleteChat,
  } = useMessagesData();
  
  const handleChatSelect = (chat: any) => {
    handleSelectChat(chat);
    setShowSidebar(false);
  };
  
  const handleBackToList = () => {
    setShowSidebar(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="h-[calc(100vh-4rem)] flex overflow-hidden">
        <div className={`${showSidebar ? 'block' : 'hidden'} lg:block w-full lg:w-96`}>
          <MessagesSidebar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            chats={chats}
            selectedChat={selectedChat}
            onSelectChat={handleChatSelect}
            loading={loading}
          />
        </div>
        <div className={`${!showSidebar ? 'block' : 'hidden'} lg:block flex-1`}>
          <MessagesContent
            selectedChat={selectedChat}
            messages={messages}
            currentUserId={currentUserId}
            messageText={messageText}
            onMessageTextChange={setMessageText}
            onSendMessage={handleSendMessage}
            onBookingResponse={handleBookingResponse}
            onDeleteChat={handleDeleteChat}
            onBackToList={handleBackToList}
            sending={sending}
            userRole={userRole}
            messagesLimit={messagesLimit}
          />
        </div>
      </div>
    </div>
  );
}