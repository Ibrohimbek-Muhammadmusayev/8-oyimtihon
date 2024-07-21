import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { NavLink } from "react-router-dom";
import { doc, deleteDoc } from "firebase/firestore";
import { notification } from 'antd';
type DataType = {
    title: string,
    description: string,
    images: [
        string
    ],
    ingredients: [
        string
    ],
    category: string,
    id: string,
    price : number,
    time: number
}

type NotificationType = 'success' | 'info' | 'warning' | 'error';

export default function Home() {
    const [data, setData] = useState<DataType[]>([])

    const [api, contextHolder] = notification.useNotification();
    const handleDelete = async (id : string) => {
        await deleteDoc(doc(db, "products", `${id}`));
        const openNotificationWithIcon = (type: NotificationType) => {
            api[type]({
              message: "Maxsulot o'chirildi",
            });
        };
        openNotificationWithIcon('success');
    }
    
    useEffect(()=> {
        const getData = async () => {
            const querySnapshot = await getDocs(collection(db, "products"));
            const alldata = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));
            setData(alldata as any);
        }
        getData()
    }, [])
    return (
        <div className="mt-[50px]">
            {contextHolder}
            <div className="w-full pb-[30px] border-b">
                <h1 className="text-[30px] font-semibold">Recipes</h1>
            </div>
            <div className="mt-[10px] w-full flex justify-center gap-[20px] flex-wrap">
                {data.length != 0 ? (
                    data?.map((item : DataType)=> (
                        <div key={item.id} className="w-[350px] h-[400px] overflow-hidden rounded-[8px] bg-primary-content">
                            <button onClick={()=> handleDelete(item.id)} className="w-[30px] border hover:bg-primary-content cursor-pointer ml-[310px] mt-[10px] flex justify-center items-center h-[30px] bg-slate-400 rounded-full">
                                <img className="w-[25px] h-[25px]" src="./../../public/close.svg" alt="close logo" />
                            </button>
                            <NavLink to={item.id}>
                                <div className="px-[30px] h-[190px] pt-[5px] bg-primary-content">
                                    <h1 className="text-[20px] font-medium">{item.title}</h1>
                                    <div className="w-full h-[100px] text-wrap pt-[15px]">
                                        <p className="text-[16px] text-wrap">{item.description}</p>
                                    </div>
                                    <div className="flex justify-between mt-[10px]">
                                        <p className="text-[16px] badge bg-secondary">{item.time} minutes</p>
                                        <p className="text-[16px] badge bg-accent">{item.price}.000 so'm</p>
                                    </div>
                                </div>
                                <div className="w-[350px] h-[170px]">
                                    <figure>
                                        <img
                                            className="w-full h-[170px]"
                                            src={item.images[0]}
                                            alt="card images"
                                        />
                                    </figure>
                                </div>
                            </NavLink>
                        </div>
                    ))
                ) : (
                    <div className="">
                        <img src="./../../public/130.gif" alt="loading"/>
                    </div>
                )}
            </div>
        </div>
    )
}