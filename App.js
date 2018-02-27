import React, {Component} from 'react';
import {Alert, Button, Text, TextInput, View} from 'react-native';
import {StackNavigator} from 'react-navigation';


class AccountItemsScreen extends Component {
    render() {
        const {params} = this.props.navigation.state;
        const key = params ? params.key : '';
        return (
            <View>
                <Text>key: {JSON.stringify(key)}</Text>
            </View>
        );
    }
}

class KeyInputScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            'key': '',
        };
    }
    render() {
        return (
            <View 
                style={{
                    flex:1,
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <Text>请输入密钥</Text>
                <TextInput
                    style={{
                        width: 120,
                        height: 25,
                        borderColor: 'gray',
                        borderWidth: 1,
                        margin: 3
                    }} placeholder="密钥"
                    onChangeText={(text) => this.setState({key: text})}
                />
                <Button title="进入"
                    onPress={() => {
                        if (this.state.key == '') {
                            Alert.alert('KEY', '请输入密钥');
                            return;
                        }
                        this.props.navigation.navigate('AccountItems', {
                            key: this.state.key,
                        });
                    }}
                />
            </View>
        );
    }
}

const RootStack = StackNavigator (
    {
        KeyInput: {
            screen: KeyInputScreen,
        },
        AccountItems: {
            screen: AccountItemsScreen,
        },
    },
    {
        initialRouteName: 'KeyInput',
    },
);

export default class App extends Component {
    render() {
        return <RootStack />;
    }
}
