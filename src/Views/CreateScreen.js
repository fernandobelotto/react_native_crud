import React, { useContext, useState } from 'react'
import { View } from 'react-native'
import { Button, TextInput, Card, Avatar, Snackbar } from 'react-native-paper';
import UserContext from '../context/UserContext';

export default function CreateScreen(props) {

    const [user, setUser] = useState(props.route.params || { name: '', email: '' });
    const { state, dispatch } = useContext(UserContext)

    const [visible, setVisible] = useState(false)

    const handleButton = () => {
        if (!props.route.params) {
            if (user.name.length < 3 || user.email < 3) return setVisible(true)
            dispatch({ type: 'CREATE', payload: { ...user, id: Math.random().toString() } })
        } else {
            dispatch({ type: 'UPDATE', payload: user })
        }
        props.navigation.goBack()
    }

    const onDismissSnackBar = () => setVisible(false);

    return (

        <View >
            <Card>
                <Card.Content>
                    <View style={{ display: 'flex', alignItems: 'center', height: 150, justifyContent: 'center' }}>
                        <Avatar.Image size={100} source={{ uri: user.img }} />
                    </View>
                    <TextInput
                        style={{ marginBottom: 15 }}
                        label="Name"
                        value={user.name}
                        onChangeText={name => setUser({ ...user, name })}
                    />
                    <TextInput
                        style={{ marginBottom: 15 }}
                        label="Email"
                        value={user.email}
                        onChangeText={email => setUser({ ...user, email })}
                    />
                    <Button mode={'contained'}
                        onPress={() => handleButton()}

                    >{!props.route.params ? "Create new user" : "Update user"}</Button>
                </Card.Content>
            </Card>
            <Snackbar
                onDismiss={onDismissSnackBar}
                visible={visible}
                action={{
                    label: 'OK!',
                    onPress: onDismissSnackBar,
                }}>
                Please, insert an valid email and name
             </Snackbar>
        </View>
    )
}