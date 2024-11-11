// controllers/messageController.js

import Message from '../models/messageModel.js';

export const loadMessages = async (userId, targetUserId, socket) => {
  try {
    const messages = await Message.find({
      $or: [
        { sender_id: userId, receiver_id: targetUserId },
        { sender_id: targetUserId, receiver_id: userId },
      ],
    }).sort({ created_at: 1 });

    socket.emit('loadMessages', messages);
  } catch (error) {
    socket.emit('error', { error: 'Ошибка при загрузке сообщений' });
  }
};

export const sendMessage = async (userId, targetUserId, messageText, roomId, io) => {
  try {
    const message = new Message({
      sender_id: userId,
      receiver_id: targetUserId,
      message_text: messageText,
      created_at: new Date(),
    });

    await message.save();
    io.to(roomId).emit('receiveMessage', message);
  } catch (error) {
    console.error('Ошибка при отправке сообщения:', error);
  }
};
