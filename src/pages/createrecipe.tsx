import { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore"; 
import { notification } from 'antd';

type Data = {
    title: string;
    time: string;
    category: string;
    ingredients: string[];
    images: string[];
    description: string;
}

type NotificationType = 'success' | 'info' | 'warning' | 'error';

export default function CreateRecipe() {
    const [category, setCategory] = useState<string>('');
    const [ingredient, setIngredient] = useState<string>('');
    const [ingredients, setIngredients] = useState<string[]>([]);
    const [image, setImage] = useState<string>('');
    const [images, setImages] = useState<string[]>([]);
    const [price, setPrice] = useState(40);
    const [productsData, setProductsData] = useState<Data>({
        title: '',
        time: '',
        category: '',
        ingredients: [],
        images: [],
        description: '',
    });
    const [alldata, setAlldata] = useState<Data>();

    const [api, contextHolder] = notification.useNotification();
    
    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCategory(e.target.value);
    }

    const handleIngredientChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIngredient(e.target.value);
    }

    const addIngredient = () => {
        if (ingredient) {
            setIngredients([...ingredients, ingredient]);
            setIngredient('');
        }
    }
    const openNotificationWitherror = (type: NotificationType) => {
        api[type]({
          message: "Iltimos Formni to'ldiring",
        });
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setImage(e.target.value);
    }

    const handlePrice = (e: any)=> {
        setPrice(e.target.value)
    }

    const addImage = () => {
        if (image) {
            setImages([...images, image]);
            setImage('');
        }
    }

    const setProductsSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const updatedData = { ...productsData, category, price, ingredients, images };
        if (productsData.title == '' || productsData.description == "" || updatedData.price == 0 || productsData.time == null || updatedData.category == '' || updatedData.images.length == 0 || updatedData.ingredients.length == 0) {
            openNotificationWitherror('error');
        }else {
            const setdata = async ()=> {
                await addDoc(collection(db, "products"), {
                    ...updatedData
                });
                const openNotificationWithIcon = (type: NotificationType) => {
                    api[type]({
                      message: 'Maxsulot qoshildi',
                    });
                };
                openNotificationWithIcon('success');
            }
            setdata();
        }
    }

    const openmodal = ()=> {
        (document.getElementById('my_modal_2') as any).showModal();
    }

    const handleanalitet = ()=> {
        const updatedData = { ...productsData, category, ingredients, images };
        setAlldata(updatedData);
    }

    return (
        <div>
            <div className="max-w-[520px] mx-auto mt-[30px]">
            {contextHolder}
                <div className="flex flex-col pb-[30px] text-center">
                    <h1 className="text-[25px] font-semibold">Add New Recipe</h1>
                    <div className="flex flex-col gap-[20px] px-[10px] mt-[20px]">
                        <label className="form-control w-full max-w-[100%] text-left">
                            <label className="label-text">Title:</label>
                            <input
                                required
                                onChange={(e) => setProductsData({ ...productsData, title: e.target.value })}
                                type="text"
                                placeholder="Enter your meal name"
                                className="input input-bordered w-full max-w-[100%]"
                            />
                        </label>
                        <label className="form-control w-full max-w-[100%] text-left">
                            <label className="label-text">Cooking time:</label>
                            <input
                                onChange={(e) => setProductsData({ ...productsData, time: e.target.value })}
                                type="number"
                                placeholder="Enter preparation time your meal"
                                className="input input-bordered w-full max-w-[100%]"
                            />
                        </label>
                        <label>
                            <select onChange={handleCategoryChange} className="select select-bordered w-full">
                                <option disabled selected>No category</option>
                                <option value="Qog'utilgan">Qog'utilgan</option>
                                <option value="Dudlangan">Dudlangan</option>
                                <option value="Qaynatilgan">Qaynatilgan</option>
                                <option value="OlovdaQishirilgan">Olovda qishirilgan</option>
                                <option value="Shirinlik">Shirinlik</option>
                                <option value="Disert">Disert</option>
                            </select>
                        </label>
                        <label>
                            <input type="range" onChange={(e)=> handlePrice(e)} min={0} max="600" value={price} className="range range-xs" />
                            <div className="mx-auto flex justify-center items-center">
                                <span className="text-[20px] text-accent">{price}.000 so'm</span>
                            </div>
                        </label>
                        <div className="text-left">
                            <label className="label-text">Ingredients:</label>
                            <div className="flex gap-[10px] justify-between items-center">
                                <input
                                    onChange={handleIngredientChange}
                                    value={ingredient}
                                    type="text"
                                    placeholder="Enter ingredients of meal"
                                    className="input input-bordered w-full max-w-[100%]"
                                />
                                <button onClick={addIngredient} className="btn w-[80px] bg-accent text-primary-content text-[20px]">+</button>
                            </div>
                            <div className="flex gap-[12px] mt-[8px] items-center">
                                <p>Ingredients:</p>
                                <div className="p-[5px] flex gap-[10px] rounded-[18px] border">
                                    {ingredients.length > 0 ? ingredients.map((item, index) => (
                                        <p key={index}>{index} :{item},</p>
                                    )) : (<p>No Ingredients yet</p>)}
                                </div>
                            </div>
                        </div>
                        <div className="text-left">
                            <label className="label-text">Image URL:</label>
                            <div className="flex justify-between gap-[10px] items-center">
                                <input
                                    onChange={handleImageChange}
                                    value={image}
                                    type="text"
                                    placeholder="Enter image URL"
                                    className="input input-bordered w-full max-w-[100%]"
                                />
                                <button onClick={addImage} className="btn bg-accent text-primary-content w-[80px] text-[20px]">+</button>
                            </div>
                            <div className="flex flex-col gap-[12px] mt-[8px] text-left">
                                <p >Images:</p>
                                <div className="p-[5px] rounded-[18px] text-wrap border">
                                    {images.length > 0 ? images.map((item, index) => (
                                        <p key={index}>{item}</p>
                                    )) : (<p>No images yet</p>)}
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col text-left">
                            <h1>Method:</h1>
                            <textarea
                                onChange={(e) => setProductsData({ ...productsData, description: e.target.value })}
                                className="textarea textarea-bordered"
                                placeholder="Enter method of meal"
                            />
                        </div>
                        <div className="flex justify-center gap-[10px] flex-wrap">
                            <button type="submit" onClick={setProductsSubmit} className="btn bg-info w-[245px] text-primary-content">Apply</button>
                            <button onClick={()=>{
                                openmodal()
                                handleanalitet()
                            }} className="btn bg-accent w-[245px] text-primary-content">Preview</button>
                        </div>
                        <dialog id="my_modal_2" className="modal">
                            <div className="modal-box max-w-[1000px] min-h-[800px] flex flex-col gap-[30px] mx-auto">
                                <div className="flex justify-center items-center py-[20px] px-[20px] bg-slate-400 max-w-[950px] h-[100%] rounded-[12px] flex-wrap gap-[10px]">
                                        {alldata?.images.map((item, index) => (
                                            <img key={index} className="w-[300px] rounded-[12px] h-[200px]" src={item} alt="images" />
                                        ))}
                                </div>
                                <div className="flex flex-col text-left">
                                    <h1>Title: {alldata?.title}</h1>
                                    <h1>Category: {alldata?.category}</h1>
                                    <h1>Cooking time: {alldata?.time}</h1>
                                    <h1>Ingredients:</h1>
                                    <div className="flex gap-[10px]">
                                        {alldata?.ingredients.map((item, index) => (
                                            <p key={index}>{index} :{item},</p>
                                        ))}
                                    </div>
                                    <h1>Description: {alldata?.description}</h1>
                                </div>
                                <div className="modal-action">
                                    <form method="dialog">
                                        <button className="btn">OK</button>
                                    </form>
                                </div>
                            </div>
                            <form method="dialog" className="modal-backdrop">
                                <button className="w-[120px]">close</button>
                            </form>
                        </dialog>
                    </div>
                </div>
            </div>
        </div>
    )
}