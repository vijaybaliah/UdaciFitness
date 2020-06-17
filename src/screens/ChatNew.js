import React, { useState, Component } from "react";
import { View, Text } from "react-native";
import SendBird from 'sendbird';
import { render } from "react-dom";

class ChatNew extends Component {

  state = {
    channelUrl: '',
    channel: null,
    chatList: [],
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


  getchatHistory = () => {
    const { navigation } = this.props;
    const { channelUrl } = this.state;
    const channel = navigation.getParam('channel');
    console.log('channel: ', channel);
    const sb = SendBird.getInstance();
    if (channel) {
        channel.enter((response, error3) => {
          if (error3) {
            console.log('error3: ', error3);
          }

          const previousMessageListQuery = channel.createPreviousMessageListQuery();
					previousMessageListQuery.load(10, true, (messages, error4) => {
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
          console.log('response: ', response);
          // this.registerCommonHandler(channelUrl, channelHandler);
          // sb.addChannelHandler(channelUrl, channelHandler);
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
  render() {
    const { chatList } = this.state;
    return (
      <View>
        {
          chatList.map(chatMessages => {
          return (<Text>{chatMessages.message}</Text>)
          })
        }
      </View>
    );
  }
}

export default ChatNew;
