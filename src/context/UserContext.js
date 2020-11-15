import React, { createContext, useReducer } from 'react'
import faker from 'faker'

const UserContext = createContext({})

const users = new Array(5)

for (let i = 0; i < users.length; i++) {
    let random = {
        name: faker.name.findName(),
        id: Math.random().toString(),
        email: `${faker.name.findName()}@email.com`,
        img: "https://www.w3schools.com/howto/img_avatar.png"
    }
    users[i] = random
}

const initial = { users }

const reducer = (state, action) => {

    switch (action.type) {
        case 'DELETE':
            return {
                ...state,
                users: state.users.filter((item) => item.id !== action.payload)
            }
        case 'UPDATE':
            const index = state.users.findIndex(element => element.id == action.payload.id)
            state.users[index] = action.payload
            return {
                ...state,
            }
        case 'CREATE':
            return {
                ...state,
                users: [
                    ...state.users,
                    action.payload
                ]
            }

        default:
            return state
    }
}

export const UsersProvider = props => {

    const [state, dispatch] = useReducer(reducer, initial)

    return (
        <UserContext.Provider value={{ state, dispatch }} >
            {props.children}
        </UserContext.Provider>
    )
}

export default UserContext