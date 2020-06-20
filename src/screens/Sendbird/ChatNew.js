import React, { useState, Component } from "react";
import { View, Text, Platform, Button as ButtonNative } from "react-native";
import SendBird from 'sendbird';
import { render } from "react-dom";
import InputText from '../../components/UI/InputText/InputText';
import Button from '../../components/UI/Button/Button';

class ChatNew extends Component {

  state = {
    channelUrl: '',
    channel: null,
    chatList: [],
    chatInput: '',
    webcount: 0,
  }
  componentDidMount() {
    const { navigation } = this.props;
    const channelUrl = navigation.getParam('channelUrl');
    const channel = navigation.getParam('channel');
    this.setState({
      channelUrl,
      channel,
    })
    console.log('channelUrl: ', channelUrl);
    this.getchatHistory();
  }



  registerCommonHandler = (channelUrl, channelHandler) => {
    channelHandler.onMessageReceived = (channel, message) => {
      if (channel.url === channelUrl) {

        this.setState((prev) => {
          const current = [...prev.chatList, message];
          return { chatList: current }
        })
        // if (channel.isGroupChannel()) {
        //   sbMarkAsRead({ channel });
        // }
      }
    };
    channelHandler.onMessageUpdated = (channel, message) => {

      if (channel.url === channelUrl) {
        console.log('message3: ', message);
      }
    };
    channelHandler.onMessageDeleted = (channel, messageId) => {
      if (channel.url === channelUrl) {
        console.log('messageId: ', messageId);
        // dispatch({
        //   type: MESSAGE_DELETED,
        //   payload: messageId
        // });
      }
    };
  };

  getchatHistory = () => {
    const { navigation } = this.props;
    const channel = navigation.getParam('channel');
    const channelUrl = navigation.getParam('channelUrl');
    console.log('channel: ', channel);
    const sb = SendBird.getInstance();
    let channelHandler = new sb.ChannelHandler();
    if (channel) {
        channel.enter((response, error3) => {
          if (error3) {
            console.log('error3: ', error3);
          }

          const previousMessageListQuery = channel.createPreviousMessageListQuery();
					previousMessageListQuery.load(10, false, (messages, error4) => {
						if (error4) {
							console.log('error4: ', error4);
						}
            // console.log('messages: ', messages);
            this.setState({chatList: messages});
					})
          // channel.sendUserMessage(params, function (message, error) {
          //   if (error) {
          //     return;
          //   }

          //   console.log('sendUserMessage: ', message);
          // });
          // console.log('response: ', response);
          this.registerCommonHandler(channelUrl, channelHandler);
          sb.addChannelHandler(channelUrl, channelHandler);
        })
    }
        // resolve(channel);
  }
  // const [ chatList, setChatList ] = useState(null);
  // 
  // 
  // const channelUrl = navigation.getParam('channelUrl');
  // const sb = SendBird.getInstance();
  // let channelHandler = new sb.ChannelHandler();
  // sb.OpenChannel.getChannel(channelUrl, (channel, error2) => {
  //   if (error2) {
  //     console.log('GroupChannel error: ', error2);
  //     // reject(error);
  //   } else {
  //     channel.enter((response, error3) => {
  //       if (error3) {
  //         console.log('error3: ', error3);
  //       }


  //       channel.sendUserMessage(params, function (message, error) {
  //         if (error) {
  //           return;
  //         }

  //         console.log('sendUserMessage: ', message);
  //       });
  //       console.log('response: ', response);
  //       this.registerCommonHandler(channelUrl, channelHandler);
  //       sb.addChannelHandler(channelUrl, channelHandler);
  //     })
  //     // resolve(channel);

  //   }
  // });

  handleOnMessageChange = (chatInput) => {
    this.setState({chatInput})
  }

  handleSendMessage = (channel) => {
    const { navigation } = this.props;
    const { chatInput } = this.state;

    if (channel) {
      const sb = SendBird.getInstance();
      const params = new sb.UserMessageParams();
      params.message = chatInput;
      channel.enter((response, error3) => {
        channel.sendUserMessage(params, (message, error) => {
          if (error) {
            return;
          }

          this.setState((prev) => {
            return {
              chatList: [...prev.chatList, message],
              chatInput: '',
            }
          })
          console.log('sendUserMessage: ');
        });
      })
    }
  }


  render() {
    const { chatList, chatInput, channel } = this.state;
    const filteredChat = chatList.filter((list, pos) => {
      return chatList.indexOf(list)== pos; 
    })
    return (
      <View>
        <View>
          {
            filteredChat.map(chatMessages => {
            return (
                <Text key={chatMessages.messageId}>
                  {chatMessages.message}
                </Text>
              )
            })
          }
        </View>
        <View>
          <InputText
            value={chatInput}
            onChange={this.handleOnMessageChange}
          />
        </View>
        <View>
          {
            Platform.OS === 'web' ?
            <ButtonNative
              onPress={() => this.handleSendMessage(channel)}
              title={'send'}
              color={'#fccd03'}
            /> :
            <Button onClick={() => this.handleSendMessage(channel)}>
              {'send'}
            </Button>
          }
        </View>
      </View>
    );
  }
}

export default ChatNew;
