import { produce } from 'immer'

const initialState = {
    usersList: [
        { password: "1", name: "יוסי כהן", phone: "039089319", city: "בני ברק" },
        { password: "2", name: "שושי לוי", phone: "0556756006", city: "ירושלים" },
        { password: "3", name: "חיים גולדברג", phone: "0557852204", city: "פתח תקווה" },
        { password: "4", name: "רחל לב", phone: "0559874405", city: "בני ברק" },
        { password: "5", name: "יעל ", phone: "0568974555", city: "פתח תקווה" },
        { password: "6", name: "נעמה", phone: "0556740058", city: "אלעד" }
    ],
    directorsList: [
        { password: "1", name: "יוסי כהן", phone: "039089319", city: "בני ברק" },
        { password: "2", name: "שושי לוי", phone: "0556756006", city: "ירושלים" },
    ]
}
export const usersReducer = produce((state, action) => {
    switch (action.type) {
        case 'addUser':
            state.usersList.push(action.payload);
            break;
        case 'setUser': {
            var i = state.usersList.findIndex(usr => usr.password === action.payload.password)
            console.log(i);
            state.usersList[i] = action.payload;
            break;
        }

    }
}, initialState)