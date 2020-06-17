import React, { Component } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { getOpenChannelList, clearSelectedOpenChannel } from '../actions/openChannelActions';
import { sbCreateOpenChannelListQuery, onOpenChannelPress } from '../actions/sendbirdActions';
import SendBird from 'sendbird';
import Button from '../components/UI/Button';

class OpenChannel extends Component {
  static navigationOptions = {
    title: 'OPEN CHANNEL'
  }

  constructor(props) {
    super(props);
    this.state = {
      refresh: false,
      openChannelListQuery: null,
      list: [],
      openChannelList: [],
      enterChannel: false,
    }
  }

  componentDidMount() {
    this._initOpenChannelList();
  }

  UNSAFE_componentWillReceiveProps(props) {
    const { list } = props;

    if (list !== this.props.list) {
      if (list.length === 0) {
        this.setState({ list: [], openChannelList: [] });
      } else {
        const newList = [...this.state.list, ...list];
        this.setState({ list: newList, openChannelList: newList });
      }
    }
  }

  componentDidUpdate(prevProps) {
    const { channel } = this.props;
    // if (channel && channel !== prevProps.channel) {
    // 	this.props.clearSelectedOpenChannel();
    // 	this.props.navigation.navigate('Chat', {
    // 		channelUrl: channel.url,
    // 		newTitle: channel.name,
    // 		memberCount: channel.participantCount,
    // 		isOpenChannel: channel.isOpenChannel(),
    // 		_initListState: this._initEnterState
    // 	});
    // }
  }
  _initEnterState = () => {
    this.setState({ enterChannel: false });
  };
  _initOpenChannelList = () => {
    this._getOpenChannelList(true);
  }

  _getOpenChannelList = (init) => {
    if (init) {
      const openChannelListQuery = sbCreateOpenChannelListQuery();
      this.setState({ openChannelListQuery }, () => {
        this.props.getOpenChannelList(this.state.openChannelListQuery);
      });
    } else {
      this.props.getOpenChannelList(this.state.openChannelListQuery);
    }
  }

  registerCommonHandler = (channelUrl, channelHandler) => {
    channelHandler.onMessageReceived = (channel, message) => {
      console.log('message2: ', message);
      // if (channel.url === channelUrl) {
      //   // if (channel.isGroupChannel()) {
      //   //   sbMarkAsRead({ channel });
      //   // }
      // }
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

  _onListItemPress = (channelUrl, channel2) => {
    
    // if (!this.state.enterChannel) {
    // 	this.setState({ enterChannel: true }, () => {
    // 		this.props.onOpenChannelPress(channelUrl);
    // 	});
    // }
    // console.log('channel2: ', channel2);
    
    // sb.OpenChannel.getChannel(CHANNEL_URL, function(openChannel, error) {
    // 	if (error) {
    // 			return;
    // 	}

    // 	openChannel.enter(function(response, error) {
    // 			if (error) {
    // 					return;
    // 			}

    // 	});

    // // });
    const sb = SendBird.getInstance();

    const params = new sb.UserMessageParams();
    params.message = 'Hello React native';
    // console.log('channelUrl: ', channelUrl);
    let channelHandler = new sb.ChannelHandler();
    sb.OpenChannel.getChannel(channelUrl, (channel, error2) => {
      if (error2) {
        console.log('GroupChannel error: ', error2);
      } else {
        this.props.navigation.navigate('Chat', { channelUrl, channel})
        // channel.enter((response, error3) => {
        //   if (error3) {
        //     console.log('error3: ', error3);
        //   }

				// 	const previousMessageListQuery = channel.createPreviousMessageListQuery();
				// 	previousMessageListQuery.load(10, true, (messages, error4) => {
				// 		if (error4) {
				// 			console.log('error4: ', error4);
				// 		}
				// 		console.log('messages: ', messages);
        //   })
          
        //   channel.sendUserMessage(params, function (message, error) {
        //     if (error) {
        //       return;
        //     }

        //     console.log('sendUserMessage: ', message);
        //   });
        //   console.log('response: ', response);
        //   this.registerCommonHandler(channelUrl, channelHandler);
        //   sb.addChannelHandler(channelUrl, channelHandler);
        // })
      }
    });
  }

  _handleScroll = (e) => {
    if (e.nativeEvent.contentOffset.y < -100 && !this.state.refresh) {
      this.setState({ list: [], openChannelList: ds.cloneWithRows([]), refresh: true }, () => {
        this._initOpenChannelList();
      });
    }
  }

  _renderList = (rowData) => {
    return (
      <View style={styles.channelItem}>
        <Button onClick={() => this._onListItemPress(rowData.url, rowData)}>
          {rowData.name}
        </Button>
      </View>
    )
  }

  render() {
    return (
      <View>
        <FlatList
          renderItem={({ item }) => this._renderList(item)}
          data={this.state.list}
          onEndReached={() => this._getOpenChannelList(false)}
          onEndReachedThreshold={-50}
          keyExtractor={channel => channel.url}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  channelItem: {
    marginVertical: 6,
    marginHorizontal: 12, 
  }
});

// const ds = new ListView.DataSource({
//     rowHasChanged: (r1, r2) => r1 !== r2
// });

function mapStateToProps({ openChannel }) {
  const { list, channel } = openChannel;
  return { list, channel };
}

export default connect(mapStateToProps, {
  getOpenChannelList,
  onOpenChannelPress,
  clearSelectedOpenChannel,
})(OpenChannel);
