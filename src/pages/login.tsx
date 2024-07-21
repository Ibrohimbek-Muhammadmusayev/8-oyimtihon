import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { NavLink, useNavigate } from "react-router-dom";
import { auth, provider } from "../firebase";
import { useState } from "react";
import { notification } from 'antd';

type UserType = {
    email: string;
    password: string;
}
type NotificationType = 'success' | 'info' | 'warning' | 'error';

export default function Login(){

    const navigate = useNavigate();

    const [user, setUser] = useState<UserType>({
        email: "",
        password: "",
    })

    const [api, contextHolder] = notification.useNotification();

    const handleLoginGoogle = ()=> {
        signInWithPopup(auth, provider)
            .then((result) => {
                const user = result.user;
                console.log(user);
                localStorage.setItem("token", JSON.stringify(user));    
                navigate("/");
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
    }

    const handleLoginEmail = (e: any)=> {
        e.preventDefault();
        signInWithEmailAndPassword(auth, user.email, user.password)
        .then((userCredential) => {
            const user = userCredential.user;

            localStorage.setItem("token", JSON.stringify(user));
            navigate("/");
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
    }
    
    return(
        <div className="w-full pt-[140px]">
            {contextHolder}
            <form className="max-w-[350px] flex flex-col gap-[15px] items-center mx-auto">
                <h1 className="text-[30px] font-bold">Login</h1>
                <label className="w-full">
                    <p className="text-[18px] font-semibold">Email:</p>
                    <input
                        onChange={(e)=> setUser({...user, email: e.target.value})}
                        type="Email"
                        required
                        placeholder="example@email.com"
                        className="input input-bordered input-primary w-full"
                    />
                </label>
                <label className="w-full">
                    <p className="text-[18px] font-semibold">Password:</p>
                    <input
                        onChange={(e)=> setUser({...user, password: e.target.value})}
                        type="password"
                        required
                        placeholder="Password"
                        className="input input-bordered input-primary w-full"
                    />
                </label>
                <div className="flex flex-col w-full gap-[20px]">
                    <button onClick={handleLoginEmail} type="submit" className="btn bg-primary text-white">Login</button>
                    <button onClick={handleLoginGoogle} className="btn bg-[#0c0a0ad5] text-white">Google</button>
                    <NavLink to={'/signup'}>
                        <button className="btn w-[350px] bg-secondary">I have an account</button>
                    </NavLink>
                </div>
            </form>
        </div>
    )
}