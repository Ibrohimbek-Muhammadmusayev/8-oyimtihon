import { createUserWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { NavLink, useNavigate } from "react-router-dom";
import { auth, provider } from "../firebase";
import { FormEvent, useState } from "react";
import { notification } from 'antd';

type UserType = {
    username: string;
    email: string;
    password: string;
    images: string;
}
type NotificationType = 'success' | 'info' | 'warning' | 'error';

export default function Signup(){
    const navigate = useNavigate();
    const [users, setUser] = useState<UserType>({
        username: "",
        email: "",
        password: "",
        images: "",
    })
    const [api, contextHolder] = notification.useNotification();

    const handleSignin = ()=> {
        signInWithPopup(auth, provider)
            .then((result) => {
                const user = result.user;
                console.log(user);
                localStorage.setItem("token", JSON.stringify(user));    
                navigate("/");
            })
            .catch((error) => {
            alert(error.message);
        });
    }


    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, users.email, users.password)
        .then((userCredential) => {
            const user = userCredential.user;
            updateProfile(user, {
                displayName: users.username,
                photoURL: users.images,
            })
            .then(()=> {
                navigate('/')
                localStorage.setItem("token", JSON.stringify(user));
                
            })
            console.log(user);
            
        })
        .catch((error) => {
            const errorMessage = error.message;
            const openNotificationWithIcon = (type: NotificationType) => {
                api[type]({
                  message: errorMessage,
                });
            };
            openNotificationWithIcon('error');
        });
      };
    return(
        <div className="w-full h-[100vh] items-center">
            {contextHolder}
            <form className="max-w-[350px] flex flex-col pt-[130px] gap-[15px] items-center mx-auto">
                <h1 className="text-[30px] font-bold">Signup</h1>
                <label className="w-full">
                    <p className="text-[18px] font-semibold">User name:</p>
                    <input
                        onChange={(e)=> setUser({...users, username: e.target.value})}
                        type="text"
                        required
                        placeholder="User name"
                        className="input input-bordered input-primary w-full"
                    />
                </label>
                <label className="w-full">
                    <p className="text-[18px] font-semibold">Photo URL:</p>
                    <input
                        onChange={(e)=> setUser({...users, images: e.target.value})}
                        type="url"
                        required
                        placeholder="Photo URL"
                        className="input input-bordered input-primary w-full"
                    />
                </label>
                <label className="w-full">
                    <p className="text-[18px] font-semibold">Email:</p>
                    <input
                        onChange={(e)=> setUser({...users, email: e.target.value})}
                        type="Email"
                        required
                        placeholder="example@email.com"
                        className="input input-bordered input-primary w-full"
                    />
                </label>
                <label className="w-full">
                    <p className="text-[18px] font-semibold">Password:</p>
                    <input
                        onChange={(e)=> setUser({...users, password: e.target.value})}
                        type="password"
                        required
                        placeholder="Password"
                        className="input input-bordered input-primary w-full"
                    />
                </label>
                <div className="flex flex-col w-full gap-[20px]">
                    <button onClick={handleSubmit} type="submit" className="btn bg-primary text-white">Signup</button>
                    <button onClick={handleSignin} className="btn bg-[#0c0a0ad5] text-white">Google</button>
                    <NavLink to={'/login'}>
                        <button className="w-[350px] btn bg-secondary text-white">I have an account</button>
                    </NavLink>
                </div>
            </form>
        </div>
    )
}