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
        (document.getElementById(`my_modal_${id}`) as any).close();
        await deleteDoc(doc(db, "products", `${id}`));
        const openNotificationWithIcon = (type: NotificationType) => {
            api[type]({
              message: "Maxsulot o'chirildi",
            });
        };
        openNotificationWithIcon('success');
    }

    const openmodal = (id: string)=> {
        (document.getElementById(`my_modal_${id}`) as any).showModal();
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
            <div className="mt-[10px] mb-[10px] w-full flex justify-center gap-[20px] flex-wrap">
                {data.length != 0 ? (
                    data?.map((item : DataType)=> (
                        <div key={item.id} className="w-[350px] h-[400px] overflow-hidden rounded-[8px] bg-primary-content">
                            <button onClick={()=>{
                                openmodal(item.id)
                            }} className="w-[30px] border hover:bg-primary-content cursor-pointer ml-[310px] mt-[10px] flex justify-center items-center h-[30px] bg-slate-400 rounded-full">
                                {/* <img className="w-[25px] h-[25px]" src="./../../public/close.svg" alt="close logo" /> */}
                                <h1>X</h1>
                            </button>
                            <dialog id={`my_modal_${item.id}`} className="modal">
                                <div className="modal-box w-[500px] max-w-5xl">
                                    <h3 className="font-bold text-lg">Do you want to delete this recipe ?</h3>
                                    {/* <p className="py-4">Click the button below to close</p> */}
                                    <div className="flex justify-between">
                                        <button onClick={()=> {handleDelete(item.id)}} className="btn bg-error mt-[24px]">Delete</button>
                                        <div className="modal-action">
                                            <form method="dialog">
                                                <button className="btn bg-primary-content">Exit</button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </dialog>
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
                        <span className="loading loading-bars w-[80px]"></span>
                    </div>
                )}
            </div>
        </div>
    )
}