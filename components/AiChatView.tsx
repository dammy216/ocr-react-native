import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Bubble, GiftedChat, IMessage } from 'react-native-gifted-chat';
import { Ionicons } from '@expo/vector-icons';
import { processChat } from '@/shared/externalApiRequest';
import uuid from 'react-native-uuid';

const AiChatView = () => {
  const [messages, setMessages] = useState<IMessage[]>([]);

  // 初期メッセージ
  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'こんにちは！ご質問があればお答えします。',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'Dammy',
        },
      },
    ]);
  }, []);

  // AIにチャットを送信
  const onSend = async (newMessages: IMessage[] = []) => {
    try {
      setMessages((previousMessages) => GiftedChat.append(previousMessages, newMessages));

      const userMessage = newMessages[0].text;
      const response = await processChat(userMessage);

      if (response) {
        const aiMessage: IMessage = {
          _id: uuid.v4(),
          text: response,
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'Dammy',
          },
        };

        setMessages((previousMessages) => GiftedChat.append(previousMessages, [aiMessage]));
      }
    } catch (error) {
      const errorMessage: IMessage = {
        _id: uuid.v4(),
        text: 'エラーが発生しました。もう一度お試しください。',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'Dammy',
        },
      };

      setMessages((previousMessages) => GiftedChat.append(previousMessages, [errorMessage]));
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: 1, // ユーザーのID
        }}
        renderAvatar={() => <Ionicons name="cube-outline" size={24} color="black" style={{ marginBottom: 20 }} />}
        renderBubble={(props) => <Bubble {...props} wrapperStyle={{ left: { ...styles.aiBubble } }} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  aiBubble: {
    backgroundColor: '#fff',
  },
});

export default AiChatView;;