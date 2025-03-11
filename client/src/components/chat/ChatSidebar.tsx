import { useState, useRef, useEffect } from 'react';
import {
  Box,
  List,
  Badge,
  Drawer,
  Avatar,
  Button,
  Divider,
  Tooltip,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
  Stack,
} from '@mui/material';
import Iconify from '../iconify';
import Scrollbar from '../scrollbar';
import { useResponsive } from '../../hooks/use-responsive';

// Types
interface Message {
  id: string;
  content: string;
  senderId: string;
  timestamp: Date;
  read: boolean;
}

interface User {
  id: string;
  name: string;
  avatar: string;
  status: 'online' | 'offline' | 'busy' | 'away';
}

interface ChatSidebarProps {
  open: boolean;
  onClose: () => void;
  currentUser: User;
  recipient: User;
  messages: Message[];
  onSendMessage: (content: string) => void;
  typing?: boolean;
}

// Status color mapping
const getStatusColor = (status: User['status']) => {
  switch (status) {
    case 'online':
      return 'success.main';
    case 'busy':
      return 'error.main';
    case 'away':
      return 'warning.main';
    default:
      return 'text.disabled';
  }
};

export default function ChatSidebar({
  open,
  onClose,
  currentUser,
  recipient,
  messages,
  onSendMessage,
  typing = false,
}: ChatSidebarProps) {
  const [message, setMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isDesktop = useResponsive('up', 'md');

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  const renderContent = (
    <>
      {/* Chat Header */}
      <Box
        sx={{
          py: 2,
          px: 2.5,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Stack direction="row" alignItems="center" spacing={1}>
          <Box position="relative">
            <Avatar src={recipient.avatar} alt={recipient.name} />
            <Box
              sx={{
                width: 12,
                height: 12,
                borderRadius: '50%',
                bgcolor: getStatusColor(recipient.status),
                position: 'absolute',
                bottom: 0,
                right: 0,
                border: '2px solid white',
              }}
            />
          </Box>
          <Box>
            <Typography variant="subtitle1">{recipient.name}</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {recipient.status}
            </Typography>
          </Box>
        </Stack>

        <Stack direction="row" spacing={1}>
          <IconButton>
            <Iconify icon="eva:phone-fill" />
          </IconButton>
          <IconButton>
            <Iconify icon="eva:video-fill" />
          </IconButton>
          <IconButton onClick={onClose}>
            <Iconify icon="eva:close-fill" />
          </IconButton>
        </Stack>
      </Box>

      <Divider />

      {/* Messages List */}
      <Scrollbar sx={{ height: 'calc(100% - 140px)' }}>
        <List disablePadding sx={{ px: 2.5, pt: 2 }}>
          {messages.map(msg => (
            <Box
              key={msg.id}
              sx={{
                mb: 2,
                display: 'flex',
                alignItems: 'flex-start',
                ...(msg.senderId === currentUser.id && {
                  flexDirection: 'row-reverse',
                }),
              }}
            >
              <Avatar
                src={
                  msg.senderId === currentUser.id
                    ? currentUser.avatar
                    : recipient.avatar
                }
                sx={{ width: 32, height: 32, mr: 1, ml: 1 }}
              />
              <Box
                sx={{
                  maxWidth: '70%',
                  borderRadius: 1,
                  px: 2,
                  py: 1.5,
                  ...(msg.senderId === currentUser.id
                    ? {
                        bgcolor: 'primary.lighter',
                        color: 'primary.darker',
                      }
                    : {
                        bgcolor: 'grey.100',
                        color: 'text.primary',
                      }),
                }}
              >
                <Typography variant="body2">{msg.content}</Typography>
                <Typography
                  variant="caption"
                  sx={{
                    display: 'block',
                    textAlign:
                      msg.senderId === currentUser.id ? 'right' : 'left',
                    color: 'text.secondary',
                    mt: 0.5,
                  }}
                >
                  {new Date(msg.timestamp).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </Typography>
              </Box>
            </Box>
          ))}

          {typing && (
            <Box
              sx={{
                mb: 2,
                display: 'flex',
                alignItems: 'flex-start',
              }}
            >
              <Avatar
                src={recipient.avatar}
                sx={{ width: 32, height: 32, mr: 1 }}
              />
              <Box
                sx={{
                  maxWidth: '70%',
                  borderRadius: 1,
                  px: 2,
                  py: 1.5,
                  bgcolor: 'grey.100',
                  color: 'text.primary',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box
                    sx={{
                      width: 6,
                      height: 6,
                      borderRadius: '50%',
                      bgcolor: 'text.secondary',
                      mx: 0.5,
                      animation: 'pulse 1s infinite',
                      '&:nth-of-type(2)': {
                        animationDelay: '0.2s',
                      },
                      '&:nth-of-type(3)': {
                        animationDelay: '0.4s',
                      },
                      '@keyframes pulse': {
                        '0%': {
                          opacity: 0.5,
                        },
                        '50%': {
                          opacity: 1,
                        },
                        '100%': {
                          opacity: 0.5,
                        },
                      },
                    }}
                  />
                  <Box
                    sx={{
                      width: 6,
                      height: 6,
                      borderRadius: '50%',
                      bgcolor: 'text.secondary',
                      mx: 0.5,
                      animation: 'pulse 1s infinite',
                      animationDelay: '0.2s',
                    }}
                  />
                  <Box
                    sx={{
                      width: 6,
                      height: 6,
                      borderRadius: '50%',
                      bgcolor: 'text.secondary',
                      mx: 0.5,
                      animation: 'pulse 1s infinite',
                      animationDelay: '0.4s',
                    }}
                  />
                </Box>
              </Box>
            </Box>
          )}

          <div ref={messagesEndRef} />
        </List>
      </Scrollbar>

      <Divider />

      {/* Message Input */}
      <Box sx={{ p: 2, position: 'relative' }}>
        <TextField
          fullWidth
          placeholder="Type a message"
          value={message}
          onChange={e => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          multiline
          maxRows={4}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  color="primary"
                  disabled={!message.trim()}
                  onClick={handleSendMessage}
                >
                  <Iconify icon="eva:paper-plane-fill" />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>
    </>
  );

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      variant={isDesktop ? 'persistent' : 'temporary'}
      PaperProps={{
        sx: {
          width: 400,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >
      {renderContent}
    </Drawer>
  );
}
