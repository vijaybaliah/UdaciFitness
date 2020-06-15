import React, { Component } from 'react';
import { View, FlatList, TouchableHighlight, Text } from 'react-native';
import { connect } from 'react-redux';
import { getOpenChannelList } from '../actions/openChannelActions';
// import { Button, ListItem, Avatar } from 'react-native-elements'; // TODO: implement these
import { sbCreateOpenChannelListQuery } from '../actions/sendbirdActions';

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
            openChannelList: []
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
    
    _onListItemPress = (channelUrl) => {
        // TODO: enter channel
    }

    _handleScroll = (e) => {
        if (e.nativeEvent.contentOffset.y < -100 && !this.state.refresh) {
            this.setState({ list: [], openChannelList: ds.cloneWithRows([]), refresh: true }, () => {
                this._initOpenChannelList();
            });
        }
    }
    
    _renderList = (rowData) => {
      console.log('rowData: ', rowData);
        return (
          <Text>
            {rowData.name}
          </Text>
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
                    keyExtractor={channel =>  channel.url}
                />
            </View>
        )
    }
}

const styles = {
};

// const ds = new ListView.DataSource({
//     rowHasChanged: (r1, r2) => r1 !== r2
// });

function mapStateToProps({ openChannel })  {
    const { list } = openChannel;

    console.log('list: ', list);
    return { list };
}

export default connect(mapStateToProps, { getOpenChannelList })(OpenChannel);
