import React, {createContext, useState} from "react";
import auth from '@react-native-firebase/auth';

export const AuthContext = createContext();

export const AuthProvider = ({children}) =>{
    const [user, setUser] = useState(null);
    return(
        <AuthContext.Provider
            value={{
                user,
                setUser,
                login: async(email, password)=>{
                    try{
                        await auth().signInWithEmailAndPassword(email, password)
                    } catch(e){
                        console.log(e);
                    }
                },
                register: async(username,email, password)=>{
                    try {
                        
                        await auth().createUserWithEmailAndPassword(email, password).then((authData)=>{
                            let account = {}
                            account.email = email.toLowerCase()
                            account.uid = authData.uid
                            account.username = username
                            firebase.database().ref('users/' + authData.uid).set({
                                account
                            }).then(() => {
                                // ******** Now we need to grap a snapshot from the DB to validate account creation and update the redux store locally ********
                                firebase.database().ref('users/' + authData.uid).once('value').then(function (snapshot) {
                                    let updatedUser = snapshot.val();
                                }).then(() => {
                                    dispatch(userSet(updatedUser));

                                })
                            })
                        });
                        
                      } catch (e) {
                        console.log(e);
                      }
                },
                logout: async () =>{
                    try{
                        await auth().signOut();
                    } catch(e){
                        console.log(e);
                    }
                }
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}