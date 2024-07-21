import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";
import { db } from "../firebase";
import { useSelector } from "react-redux";
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
    time: number,
    price : number,
    count: number
}

type NotificationType = 'success' | 'info' | 'warning' | 'error';

export default function Card() {
    const [api, contextHolder] = notification.useNotification();
    const userdata:any = useSelector((state: {todos: {}}) => state.todos);
    const [user] = useState(userdata.userdata)
    // const [count, setCount]= useState(1);
    const [data, setData] = useState<DataType[]>([])
    const getdatafunc = async ()=>{
        const querySnapshot = await getDocs(collection(db, `${user.uid}`));
            const alldata = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));
        setData(alldata as any);
    }

    localStorage.setItem("cartdata", `${data.length}`);

    const handleDelete = async (id : string) => {
        // (document.getElementById(`my_modal_${id}`) as any).close();
        await deleteDoc(doc(db, `${user.uid}`, `${id}`));
        const openNotificationWithIcon = (type: NotificationType) => {
            api[type]({
              message: "Maxsulot o'chirildi",
            });
        };
        openNotificationWithIcon('success');
        
    }

    useEffect(()=> {
        getdatafunc()
    }, [])
    return (
        <>
            <div className="">
            {contextHolder}
                <h1 className="mt-[80px] ml-[125px] text-[40px] font-medium">Shopping cart</h1>
                <div className="flex gap-[100px] justify-center mt-[50px] flex-wrap w-full">
                    {/* card wrapper */}
                    <div className="">
                        <div className="flex flex-col gap-[30px] w-[700px]">
                            {data?.map((item)=> (
                                <div key={item.id} className="max-w-[700px] sm:max-w-[500px] md:max-w-[700px] rounded-[12px] p-[10px] flex justify-between items-center h-[100px] border-b">
                                    <div className="flex items-center gap-[20px]">
                                        <img className="w-[80px] h-[60px] rounded-[8px]" src={item.images[0]} alt="images" />
                                        <div className="">
                                            <h1>{item.title}</h1>
                                            <p>{item.price}.000 so'm</p>
                                        </div>
                                        <div className="flex items-center gap-[10px]">
                                            <button className="w-[35px] rounded-[12px] text-[22px] bg-primary-content h-[35px]">-</button>
                                            <p>{item.count}</p>
                                            <button className="w-[35px] rounded-[12px] text-[22px] bg-primary-content h-[35px]">+</button>
                                        </div>
                                    </div>
                                    <div className="">
                                        <button onClick={()=> {handleDelete(item.id)}} className="btn w-[50px] h-[20px] bg-error">delete</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* sub total */}
                    <div className="">
                        <div className="w-[400px] bg-primary-content rounded-[12px]">
                            <div className="flex gap-[50px] flex-col p-[30px]">
                                <div className="flex flex-col gap-[20px]">
                                    <h1><span className="text-[20px] font-medium">Subtotal: </span> 0.000 so'm</h1>
                                    <h1><span className="text-[20px] font-medium">Total</span>: 0.000 so'm</h1>
                                </div>
                                <button className="btn w-full bg-base-100">Checkout</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}