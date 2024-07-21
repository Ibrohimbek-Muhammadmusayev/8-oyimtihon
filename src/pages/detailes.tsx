import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom"
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

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
    price : number
}

export default function Datailes(){
    const [data, setData] = useState<DataType>()
    const { id } = useParams();
    const getdatafunc = async ()=>{
        const docRef = doc(db, "products", `${id}`);
        const docSnap = await getDoc(docRef);
        const dataadres = docSnap.data();
        setData(dataadres as any)
    }

    useEffect(()=> {
        getdatafunc()
    }, [])

    return (
        <div>
            <div className=" max-w-[1000px] min-h-[800px] flex flex-col gap-[30px] mx-auto pt-[50px]">
                <div className="flex justify-center items-center py-[20px] px-[20px] bg-slate-400 w-full h-[100%] rounded-[12px] flex-wrap gap-[10px]">
                        {data == null ? (
                            <span className="loading loading-dots loading-lg"></span>
                        ) : (
                            data?.images?.map((item: any, index: number) => (
                                <img key={index} className="w-[300px] rounded-[12px] h-[200px]" src={item} alt="images" />
                            ))
                        )}
                </div>
                <div className="flex justify-between">
                    <div className="flex flex-col gap-[20px] text-left">
                        <h1 className="text-[25px] font-semibold">{data?.title}</h1>
                        <div className="flex gap-[10px]">
                            <h1 className="font-medium">Ingredients:</h1>
                                <div className="flex gap-[15px]">
                                    {data?.ingredients.map((item, index) => (
                                        <div key={index} className="badge bg-primary-content">{item}</div>
                                ))}
                            </div>
                        </div>
                        <h1><span className="font-medium">Category:</span> {data?.category}</h1>
                        <h1><span className="font-medium">Cooking time:</span> {data?.time} minutes</h1>
                        <h1><span className="font-medium">Product price:</span> {data?.price}.000 so'm</h1>
                        <div><span className="font-medium">Method:</span> <br /> <span>{data?.description}</span></div>
                    </div>
                    <div className="flex flex-col w-[150px] justify-between">
                        <div className="flex flex-col gap-[10px]">
                            <button className="btn bg-primary-content">Add To Cart</button>
                            <input type="number" placeholder="product count" className="input input-bordered w-full max-w-xs" />
                        </div>
                        <NavLink to={"/"}>
                            <button className="btn w-[150px] bg-base-300">Exit</button>
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    )
}