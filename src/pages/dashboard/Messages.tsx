import { Navigation } from '@/components/Navigation';
import MessagesSidebar from '@/components/messages/MessagesSidebar';
import MessagesContent from '@/components/messages/MessagesContent';
import { useMessagesData } from '@/hooks/useMessagesData';

export default function Messages() {
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

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="h-[calc(100vh-4rem)] flex overflow-hidden">
        <MessagesSidebar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          chats={chats}
          selectedChat={selectedChat}
          onSelectChat={handleSelectChat}
          loading={loading}
        />
        <MessagesContent
          selectedChat={selectedChat}
          messages={messages}
          currentUserId={currentUserId}
          messageText={messageText}
          onMessageTextChange={setMessageText}
          onSendMessage={handleSendMessage}
          onBookingResponse={handleBookingResponse}
          onDeleteChat={handleDeleteChat}
          sending={sending}
          userRole={userRole}
          messagesLimit={messagesLimit}
        />
      </div>
    </div>
  );
}