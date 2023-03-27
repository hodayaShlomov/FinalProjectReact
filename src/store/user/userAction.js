

export function addUser(user){
    return { type: 'addUser', payload: user }
}
export function setUser(user){
    return { type: 'setUser', payload: user }
}

