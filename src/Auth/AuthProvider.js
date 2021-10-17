import React, {createContext, useState} from "react";
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';


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
                        // const credential =await auth().createUserWithEmailAndPassword(email, password);
                        // const {uid} = credential;
                        // console.log(uid);
                        // // your data here (dont forget to store the uid on the document)
                        // const user = {
                        //     username: username,
                        //     phone:'',
                        //     userId: uid,
                        // };
                        // await firestore().collection('users').doc(uid).set(user);
                        await auth().createUserWithEmailAndPassword(email, password).then((authData)=>{
                            console.log(authData.user.uid);

                            const user = {
                            username: username,
                            phone:'',
                            userId: authData.user.uid,
                        };
                        firestore().collection('users').doc(authData.user.uid).set(user);
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