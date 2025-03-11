import { useState } from 'react';
import { Button, Container, Typography, Box } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { ChatSidebar } from '../components/chat';

// Mock data
const currentUser = {
  id: 'user1',
  name: 'John Doe',
  avatar:
    'https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_1.jpg',
  status: 'online' as const,
};

const recipient = {
  id: 'user2',
  name: 'Jane Smith',
  avatar:
    'https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_2.jpg',
  status: 'online' as const,
};

const initialMessages = [
  {
    id: '1',
    content: 'Hi there!',
    senderId: 'user2',
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
    read: true,
  },
  {
    id: '2',
    content: 'Hello! How are you?',
    senderId: 'user1',
    timestamp: new Date(Date.now() - 1000 * 60 * 4),
    read: true,
  },
  {
    id: '3',
    content: "I'm doing well, thanks for asking. How about you?",
    senderId: 'user2',
    timestamp: new Date(Date.now() - 1000 * 60 * 3),
    read: true,
  },
];

export default function ChatPage() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState(initialMessages);

  const handleSendMessage = (content: string) => {
    const newMessage = {
      id: `msg_${Date.now()}`,
      content,
      senderId: currentUser.id,
      timestamp: new Date(),
      read: false,
    };
    setMessages([...messages, newMessage]);
  };

  return (
    <>
      <Helmet>
        <title>Chat | Your App</title>
      </Helmet>

      <Container maxWidth="xl">
        <Box sx={{ py: 5 }}>
          <Typography variant="h4" sx={{ mb: 3 }}>
            Chat
          </Typography>

          <Button variant="contained" onClick={() => setOpen(true)}>
            Open Chat
          </Button>

          <ChatSidebar
            open={open}
            onClose={() => setOpen(false)}
            currentUser={currentUser}
            recipient={recipient}
            messages={messages}
            onSendMessage={handleSendMessage}
          />
        </Box>
      </Container>
    </>
  );
}
