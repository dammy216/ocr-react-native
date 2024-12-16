import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Keyboard, Platform } from 'react-native';
import { Bubble, GiftedChat, IMessage, InputToolbar, Send } from 'react-native-gifted-chat';
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
      (Platform.OS === 'ios' || Platform.OS === 'android') && Keyboard.dismiss();
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
        placeholder='質問を入力してください…'
        renderAvatarOnTop={true}
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: 1, // ユーザーのID
        }}
        renderAvatar={(props) => <Ionicons {...props} name="cube-outline" size={24} color="black" />}
        renderBubble={(props) => <Bubble {...props} wrapperStyle={{ left: { ...styles.aiBubble } }} />}
        listViewProps={{ contentContainerStyle: { ...styles.listViewContainer }, }}
        renderInputToolbar={(props) => <InputToolbar  {...props} containerStyle={styles.inputToolbar} />}
        renderSend={(props) => (
          <Send {...props} alwaysShowSend={true} disabled={!props.text} containerStyle={styles.sendButton}>
            <Ionicons name="send" size={24} color={!props.text ? 'gray' : 'blue'} />
          </Send>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  chatContainer: {
    flex: 1,
    marginTop: Platform.OS === 'web' ? 16 : 0,
  },
  aiBubble: {
    backgroundColor: '#fff',
  },
  listViewContainer: {
    flexGrow: 1,
    justifyContent: 'flex-end',
    marginHorizontal: Platform.OS === 'web' ? '15%' : 0,
  },
  inputToolbar: {
    marginTop: Platform.OS === 'web' ? 32 : 0,
    marginBottom: Platform.OS === 'web' ? 32 : 16,
    width: Platform.OS === 'web' ? '70%' : '90%',
    alignSelf: 'center',
    borderRadius: 20,
    borderTopWidth: 0,
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
  },
  sendButton: {
    justifyContent: 'center',
    marginRight: 12,
  },
});

export default AiChatView;