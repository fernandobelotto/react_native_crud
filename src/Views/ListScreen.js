import React, { useContext } from 'react'
import { View, Text, FlatList, Alert } from 'react-native'
import { Avatar, Button, Divider, List } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Feather';
import UserContext from '../context/UserContext';

export default function ListScreen(props) {

    const { navigation } = props

    const { state, dispatch } = useContext(UserContext)

    const data = state.users

    return (
        <View>
            <FlatList
                data={data}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => {
                    return (
                        <>
                            <List.Item
                                title={item.name}
                                description={item.email}
                                onPress={() => navigation.navigate('CreateScreen', item)}
                                right={() => <Icon name="trash" size={20} style={{ marginTop: 15 }} onPress={() =>
                                    Alert.alert('Remove user', `Are you sure you want to delete ${item.name} `,
                                        [
                                            { text: 'Yes', onPress: () => dispatch({ type: 'DELETE', payload: item.id }) },
                                            { text: 'No' },
                                        ]
                                    )} />
                                }
                                left={() => <Avatar.Image size={50} source={{ uri: item.img }} />}
                            />
                            <Divider />
                        </>
                    )
                }}
            />
        </View>
    )
}