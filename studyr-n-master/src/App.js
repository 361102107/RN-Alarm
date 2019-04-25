import React from "react";
import storeFun from "./store";
import { Provider } from "react-redux";
import Route from "./routes";
// import realm from "./realms/index";
global.store = storeFun();
// global.realm = realm();


const User = {
    id: 0,
    name: "吉泽明步",
    phone: "13452145875"
};


const Users = [{
    id: 0,
    name: "吉泽明步",
    phone: "13452145875"
},{
    id: 1,
    name: "苍老师",
    phone: "13452145875"
},{
    id: 2,
    name: "麻苍稀",
    phone: "13452145875"
}];

// global.realm.write(() => {
//     for (let i =0;i < Users.length;i++) {
//         let item=Users[i];
//         global.realm.create("User",{
//             id: Number(item.id),
//             name: item.name,
//             phone: item.phone
//         },true);
//     }
// });
export default function() {
    return (
        <Provider store={store}>
            <Route />
        </Provider>
    );
}
