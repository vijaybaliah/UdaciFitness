import React, { Component } from 'react';
import {
  Platform,
  View,
  FlatList,
  Text,
  Alert,
  BackHandler,
  Clipboard,
  Keyboard,
  Button
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import {
  initChatScreen,
  getChannelTitle,
  createChatHandler,
  onSendButtonPress,
  getPrevMessageList,
  onUserBlockPress,
  onMessageDelete,
  onUserMessageCopy,
  onUserUpdateMessage,
  clearMessageSelection,
  channelExit
} from '../actions/chatActions';
import {
  openChannelProgress
} from '../actions/openChannelActions';
// import { Button, Spinner, MessageInput, Message, AdminMessage } from '../components';
// import { BarIndicator } from 'react-native-indicators';
import {
  sbGetGroupChannel,
  sbGetOpenChannel,
  sbCreatePreviousMessageListQuery,
  sbAdjustMessageList,
  sbMarkAsRead
} from '../actions/sendbirdActions';
import appStateChangeHandler from '../appStateChangeHandler';
import SendBird from 'sendbird';

class Chat extends Component {

  constructor(props) {
    super(props);
    this.flatList = null;
    this.state = {
      channel: null,
      isLoading: false,
      previousMessageListQuery: null,
      textMessage: ''
    };
  }

  componentDidMount() {
    this.willFocusSubsription = this.props.navigation.addListener('willFocus', () => {
      this._init();
    });
    this.appStateHandler = appStateChangeHandler.getInstance().addCallback('CHAT', () => {
      this._init();
    });
    this.props.navigation.setParams({
      handleHeaderLeft: this._onBackButtonPress
    });
    BackHandler.addEventListener('hardwareBackPress', this._onBackButtonPress);
    this._init();
  }

  componentWillUnmount() {
    this.appStateHandler();
    this.willFocusSubsription.remove();
    BackHandler.removeEventListener('hardwareBackPress', this._onBackButtonPress);
  }

  _init = () => {
    this.props.initChatScreen();
    const { channelUrl, isOpenChannel } = this.props.navigation.state.params;
    if (isOpenChannel) {
      sbGetOpenChannel(channelUrl).then(channel => this.setState({ channel }, () => this._componentInit()));
    } else {
      sbGetGroupChannel(channelUrl).then(channel => this.setState({ channel }, () => this._componentInit()));
    }
  };

  _componentInit = () => {
    const { channelUrl, isOpenChannel } = this.props.navigation.state.params;
    this.props.openChannelProgress(false);
    this.props.getChannelTitle(channelUrl, isOpenChannel);
    this.props.createChatHandler(channelUrl, isOpenChannel);
    this._getMessageList(true);
    if (!isOpenChannel) {
      sbMarkAsRead({ channelUrl });
    }
  };

  componentDidUpdate(prevProps) {
    const { channelUrl, isOpenChannel } = this.props.navigation.state.params;
    const { title, memberCount, list, exit, selectedMessages } = this.props;

    if (!isOpenChannel) {
      this.state.textMessage ? this.props.typingStart(channelUrl) : this.props.typingEnd(channelUrl);
    }

    // if (memberCount !== prevProps.memberCount || title !== prevProps.title) {
    //   const setParamsAction = NavigationActions.setParams({
    //     params: { memberCount, newTitle: title },
    //     key: this.props.navigation.state.key
    //   });
    //   this.props.navigation.dispatch(setParamsAction);
    // }

    const { params } = this.props.navigation.state;
    if (
      selectedMessages &&
      selectedMessages.length !== 0 &&
      (params.chooseTitle !== 'Choose' || selectedMessages !== prevProps.selectedMessages)
    ) {
      this._updateHeadersOnMessagePress(selectedMessages);
    }
    if ((!selectedMessages || selectedMessages.length === 0) && params.chooseTitle === 'Choose') {
      this.props.navigation.setParams({
        configurableHeaderLeft: undefined,
        configurableHeaderRight: undefined,
        chooseTitle: null,
        newTitle: title
      });
    }

    if (list !== prevProps.list) {
      this.setState({ isLoading: false });
    }

    if (exit && prevProps.exit !== exit) {
      this.setState({ isLoading: false }, () => {
        this.props.navigation.goBack();
      });
    }
  }

  _onBackButtonPress = () => {
    if (this.props.selectedMessages && this.props.selectedMessages.length !== 0) {
      this._onEditingCancel();
      return this.props.clearMessageSelection();
    }
    const { channelUrl, isOpenChannel, _initListState } = this.props.navigation.state.params;
    if (_initListState) _initListState();
    this.setState({ isLoading: true }, () => {
      this.props.channelExit(channelUrl, isOpenChannel);
    });
    return true;
  };

  _onTextMessageChanged = textMessage => {
    this.setState({ textMessage });
  };

  _onUserBlockPress = userId => {
    Alert.alert('User Block', 'Are you sure want to block user?', [
      { text: 'Cancel' },
      {
        text: 'OK',
        onPress: () => this.props.onUserBlockPress(userId)
      }
    ]);
  };

  _getMessageList = init => {
    if (!this.state.previousMessageListQuery && !init) {
      return;
    }
    const { channelUrl, isOpenChannel } = this.props.navigation.state.params;
    this.setState({ isLoading: true }, () => {
      if (init) {
        sbCreatePreviousMessageListQuery(channelUrl, isOpenChannel)
          .then(previousMessageListQuery => {
            this.setState({ previousMessageListQuery }, () => {
              this.props.getPrevMessageList(this.state.previousMessageListQuery);
            });
          })
          .catch(error => this.props.navigation.goBack());
      } else {
        this.props.getPrevMessageList(this.state.previousMessageListQuery);
      }
    });
  };

  _onSendButtonPress = () => {
    if (this.state.textMessage) {
      const { channelUrl, isOpenChannel } = this.props.navigation.state.params;
      const { textMessage } = this.state;
      this.setState({ textMessage: '' }, () => {
        this.props.onSendButtonPress(channelUrl, isOpenChannel, textMessage);
        if (this.props && this.props.list && this.props.list.length > 0) {
          this.flatList.scrollToIndex({
            index: 0,
            viewOffset: 0
          });
        }
      });
    }
  };

  _selectMessages = messages => {
    const sb = SendBird.getInstance();
    return (
      <View style={{ flexDirection: 'row' }}>
        {sb.currentUser.userId === messages[0].sender.userId && (
          <Button
            containerViewStyle={{ marginLeft: 0, marginRight: 0 }}
            buttonStyle={{ paddingLeft: 10, paddingRight: 10 }}
            iconRight={{
              name: 'edit',
              type: 'font-awesome',
              color: '#7d62d9',
              size: 22
            }}
            backgroundColor="transparent"
            onPress={() => {
              if (this.props.selectedMessages[0].isFileMessage() || this.props.selectedMessages[0].isAdminMessage()) {
                return;
              }
              this.setState({
                textMessage: this.props.selectedMessages[0].message,
                editing: true
              });
            }}
          />
        )}
        <Button
          containerViewStyle={{ marginLeft: 0, marginRight: 0 }}
          buttonStyle={{ paddingLeft: 10, paddingRight: 10 }}
          iconRight={{
            name: 'copy',
            type: 'font-awesome',
            color: '#7d62d9',
            size: 22
          }}
          backgroundColor="transparent"
          onPress={() => {
            if (this.props.selectedMessages[0].isFileMessage()) {
              return;
            }
            this.props.onUserMessageCopy();
            Clipboard.setString(this.props.selectedMessages[0].message);
          }}
        />
        {sb.currentUser.userId === messages[0].sender.userId && (
          <Button
            containerViewStyle={{ marginLeft: 0, marginRight: 0 }}
            buttonStyle={{ paddingLeft: 10, paddingRight: 14 }}
            iconRight={{
              name: 'trash',
              type: 'font-awesome',
              color: '#7d62d9',
              size: 22
            }}
            backgroundColor="transparent"
            onPress={() => {
              this._deleteSelectedMessageAlert(this.props.selectedMessages[0]);
            }}
          />
        )}
      </View>
    );
  };

  _deleteSelectedMessageAlert = message => {
    if (message.isAdminMessage()) {
      return;
    }
    const { channelUrl, isOpenChannel } = this.props.navigation.state.params;
    Alert.alert('Delete Message', 'Are you sure want to delete message?', [
      { text: 'Cancel' },
      {
        text: 'OK',
        onPress: () => this.props.onMessageDelete(channelUrl, isOpenChannel, message)
      }
    ]);
  };

  _updateHeadersOnMessagePress = messages => {
    const sb = SendBird.getInstance();
    const configurableHeaderRight = this._selectMessages(messages);
    this.props.navigation.setParams({
      chooseTitle: 'Choose',
      configurableHeaderLeft: (
        <Button
          containerViewStyle={{ marginLeft: 0, marginRight: 0 }}
          buttonStyle={{ paddingLeft: 14 }}
          icon={{
            name: 'times',
            type: 'font-awesome',
            color: '#7d62d9',
            size: 22
          }}
          backgroundColor="transparent"
          onPress={() => {
            this.props.clearMessageSelection();
          }}
        />
      ),
      configurableHeaderRight: configurableHeaderRight
    });
  };

  _renderList = rowData => {
    const message = rowData.item;
    const { isOpenChannel } = this.props.navigation.state.params;
    const { channel } = this.state;
    if (message.isUserMessage() || message.isFileMessage()) {
      return (
        <View>
          <Text>{message}</Text>
        </View>
        // <Message
        //   key={message.messageId ? message.messageId : message.reqId}
        //   isShow={message.sender.isShow}
        //   isUser={message.isUser}
        //   profileUrl={message.sender.profileUrl.replace('http://', 'https://')}
        //   onAvatarPress={() => this._onUserBlockPress(message.sender.userId)}
        //   nickname={message.sender.nickname}
        //   time={message.time}
        //   isEdited={message.isEdited}
        //   readCount={isOpenChannel || !channel ? 0 : channel.getReadReceipt(message)}
        //   message={message}
        // />
      );
    } else if (message.isAdminMessage()) {
      return <Text>{message.message}</Text>;
    } else {
      return <View />;
    }
  };

  _renderTyping = () => {
    const { isOpenChannel } = this.props.navigation.state.params;
    return isOpenChannel ? null : (
      <View style={styles.renderTypingViewStyle}>
        <View style={{ opacity: this.props.typing ? 1 : 0, marginRight: 8 }}>
          <Text>loading</Text>
        </View>
        <Text style={{ color: '#cbd0da', fontSize: 10 }}>{this.props.typing}</Text>
      </View>
    );
  };

  _onEditingCancel = () => {
    this.setState({
      textMessage: '',
      editing: false
    });
    Keyboard.dismiss();
  };

  _onEditingApprove = () => {
    const { channelUrl, isOpenChannel } = this.props.navigation.state.params;
    this.props.onUserUpdateMessage(channelUrl, isOpenChannel, this.props.selectedMessages[0], this.state.textMessage);
    this._onEditingCancel();
  };

  render() {
    return (
      <View style={styles.containerViewStyle}>
        <Spinner visible={this.state.isLoading} />
        <View style={styles.messageListViewStyle}>
          <FlatList
            ref={elem => (this.flatList = elem)}
            renderItem={this._renderList}
            data={this.props.list}
            extraData={this.state}
            keyExtractor={(item, index) => item.messageId + ''}
            onEndReached={() => this._getMessageList(false)}
            onEndReachedThreshold={0}
          />
        </View>
        <View style={styles.messageInputViewStyle}>
          {this._renderTyping()}
          {/* <MessageInput
            onRightPress={this.state.editing ? this._onEditingApprove : this._onSendButtonPress}
            editing={this.state.editing}
            textMessage={this.state.textMessage}
            onChangeText={this._onTextMessageChanged}
          /> */}
        </View>
      </View>
    );
  }
}

function mapStateToProps({ chat }) {
  let { title, memberCount, list, exit, typing, selectedMessages } = chat;

  list = sbAdjustMessageList(list);
  return { title, memberCount, list, exit, typing, selectedMessages };
}

export default connect(
  mapStateToProps,
  {
    openChannelProgress,
    initChatScreen,
    getChannelTitle,
    createChatHandler,
    onSendButtonPress,
    getPrevMessageList,
    onUserUpdateMessage,
    onUserBlockPress,
    onUserMessageCopy,
    clearMessageSelection,
    onMessageDelete,
    channelExit
  }
)(Chat);

const styles = {
  renderTypingViewStyle: {
    flexDirection: 'row',
    marginLeft: 14,
    marginRight: 14,
    marginTop: 4,
    marginBottom: 0,
    paddingBottom: 0,
    height: 14
  },
  containerViewStyle: {
    backgroundColor: '#f1f2f6',
    flex: 1
  },
  messageListViewStyle: {
    flex: 10,
    transform: [{ scaleY: -1 }]
  },
  messageInputViewStyle: {
    flex: 1,
    marginBottom: 0,
    flexDirection: 'column',
    justifyContent: 'center'
  }
};
