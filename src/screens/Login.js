import React, { Component } from 'react';
import { View, Button, Text, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { sendbirdLogin } from '../actions/loginActions';

class Login extends Component {
    static navigationOptions = {
        title: 'LOGIN'
    }

    constructor(props) {
        super(props);
        this.state = {
            userId: '',
            nickname: ''
        }
    }

    UNSAFE_componentWillReceiveProps(props) {
        const { user, error } = props;
        if (user) {
            // const resetAction = NavigationActions.reset({
            //     index: 0,
            //     actions: [
            //         NavigationActions.navigate({ routeName: 'Menu' })
            //     ]
            // })
            this.setState({ userId: '', nickname: '' })
            this.props.navigation.navigate('Menu')
        }
    }

    _userIdChanged = (userId) => {
        this.setState({ userId });
    }

    _nicknameChanged = (nickname) => {
        this.setState({ nickname });
    }

    _onButtonPress = () => {
        const { userId, nickname } = this.state;
        this.props.sendbirdLogin({ userId, nickname });
    }

    render() {
        return (
            <View style={{backgroundColor: '#fff', flex: 1}}>
                <View style={styles.containerStyle}>
                    <Text>User ID</Text>
                    <TextInput
                        value={this.state.userId}
                        onChangeText={this._userIdChanged}
                    />
                </View>
                <View style={styles.containerStyle}>
                    <Text>Nickname</Text>
                    <TextInput
                        value={this.state.nickname}
                        onChangeText={this._nicknameChanged}
                    />
                </View>
                <View style={styles.containerStyle}>
                    <Button
                        buttonStyle={{backgroundColor: '#2096f3'}}
                        title='Connect' 
                        onPress={this._onButtonPress}
                    />
                </View>
                <View style={styles.containerStyle}>
                    <Text>{this.props.error}</Text>
                </View>
            </View>
        )
    }
}

const styles = {
    containerStyle: {
        marginTop: 10
    }
}

function mapStateToProps({ sendbirdLogin }) {
    const { error, user } = sendbirdLogin;
    return { error, user };
};

export default connect(mapStateToProps, { sendbirdLogin })(Login);