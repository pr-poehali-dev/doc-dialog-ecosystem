import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface Dialog {
  id: number;
  title: string;
  dialog_type: string;
}

interface Message {
  id: number;
  role: string;
  content: string;
  created_at: string;
}

interface AIDialogChatProps {
  dialog: Dialog;
}

const AI_DIALOG_URL = 'https://functions.poehali.dev/7c4b9e29-6778-42e7-9ac9-c30966d1765e';

const AIDialogChat = ({ dialog }: AIDialogChatProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const getUserId = () => {
    const token = localStorage.getItem('token');
    if (!token) return null;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.user_id || payload.userId || payload.sub;
    } catch {
      return null;
    }
  };

  useEffect(() => {
    loadMessages();
  }, [dialog.id]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const loadMessages = async () => {
    try {
      const userId = getUserId();
      if (!userId) return;

      const response = await fetch(`${AI_DIALOG_URL}?action=get_messages&dialog_id=${dialog.id}`, {
        headers: { 'X-User-Id': userId }
      });

      if (!response.ok) throw new Error('Failed to load messages');
      
      const data = await response.json();
      const cleanMessages = (data.messages || []).map((msg: Message) => ({
        ...msg,
        content: (msg.content || '').replace(/\*\*/g, '').trim()
      }));
      setMessages(cleanMessages);
    } catch (error) {
      toast({ title: 'Ошибка', description: 'Не удалось загрузить сообщения', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async () => {
    if (!inputMessage.trim() || sending) return;

    const userMessage = inputMessage.trim();
    setInputMessage('');
    setSending(true);

    setMessages(prev => [...prev, {
      id: Date.now(),
      role: 'user',
      content: userMessage,
      created_at: new Date().toISOString()
    }]);

    try {
      const userId = getUserId();
      if (!userId) return;

      const response = await fetch(AI_DIALOG_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-User-Id': String(userId)
        },
        body: JSON.stringify({
          action: 'send_message',
          dialog_id: dialog.id,
          message: userMessage
        })
      });

      if (!response.ok) throw new Error('Failed to send message');
      
      const data = await response.json();
      
      const cleanMessage = {
        ...data.message,
        content: (data.message.content || '').replace(/\*\*/g, '').trim()
      };
      
      setMessages(prev => [...prev, cleanMessage]);
    } catch (error) {
      toast({ title: 'Ошибка', description: 'Не удалось отправить сообщение', variant: 'destructive' });
      setMessages(prev => prev.slice(0, -1));
    } finally {
      setSending(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Icon name="Loader2" className="animate-spin" size={32} />
      </div>
    );
  }

  return (
    <Card className="flex flex-col h-[calc(100vh-12rem)]">
      <CardHeader className="border-b">
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl">{dialog.title}</CardTitle>
          <div className="text-sm text-muted-foreground">
            AI диалог
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <Icon name="MessageSquare" size={48} className="text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">Начните диалог</h3>
            <p className="text-muted-foreground max-w-md">
              Опишите ситуацию или вопрос, с которым вы столкнулись. 
              AI-ассистент поможет разобраться и найти решение.
            </p>
          </div>
        )}

        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                message.role === 'user'
                  ? 'bg-primary text-primary-foreground ml-auto'
                  : 'bg-blue-50 text-gray-900 border border-blue-100'
              }`}
            >
              {message.role === 'user' ? (
                <div className="whitespace-pre-wrap break-words">{message.content}</div>
              ) : (
                <div className="prose prose-sm max-w-none prose-p:my-2 prose-headings:my-2 prose-ul:my-2 prose-ol:my-2 prose-li:my-0.5">
                  <ReactMarkdown 
                    remarkPlugins={[remarkGfm]}
                    components={{
                      strong: ({node, ...props}) => <strong className="font-bold" {...props} />,
                      p: ({node, ...props}) => <p className="mb-2 last:mb-0" {...props} />,
                      ul: ({node, ...props}) => <ul className="ml-4 mb-2" {...props} />,
                      ol: ({node, ...props}) => <ol className="ml-4 mb-2" {...props} />,
                      li: ({node, ...props}) => <li className="mb-1" {...props} />
                    }}
                  >
                    {message.content}
                  </ReactMarkdown>
                </div>
              )}
              <div
                className={`text-xs mt-2 ${
                  message.role === 'user' ? 'text-primary-foreground/70' : 'text-gray-500'
                }`}
              >
                {new Date(message.created_at).toLocaleTimeString('ru-RU', {
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </div>
            </div>
          </div>
        ))}

        {sending && (
          <div className="flex justify-start">
            <div className="bg-secondary rounded-2xl px-4 py-3">
              <Icon name="Loader2" className="animate-spin" size={20} />
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </CardContent>

      <div className="border-t p-4">
        <div className="flex gap-2">
          <Textarea
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Напишите ваше сообщение..."
            className="min-h-[80px] resize-none"
            disabled={sending}
          />
          <Button
            onClick={sendMessage}
            disabled={!inputMessage.trim() || sending}
            size="lg"
            className="px-6"
          >
            <Icon name="Send" size={20} />
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          Enter — отправить, Shift+Enter — новая строка
        </p>
      </div>
    </Card>
  );
};

export default AIDialogChat;