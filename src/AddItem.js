
import React, { useState } from "react";
import { InputText } from 'primereact/inputtext';
import './AddItem.css'
import { InputTextarea } from "primereact/inputtextarea";
import { InputNumber } from 'primereact/inputnumber';
import { min } from "lodash";
import { Button } from 'primereact/button'; import { store } from './store/store';

import { useNavigate } from "react-router-dom";
export default function AddItem() {
    const [image, setImage] = useState("");
    const [name, setName] = useState("");
    const [subHeader, setSubHeader] = useState("");
    const [description, setDescription] = useState("Enter description");
    const [price, setPrice] = useState("");
    const navigate = useNavigate();
    function add() {
        console.log(image)
        if(image!=""&&name!=""&&subHeader!="",description!=""&&price!="")
        {    store.dispatch({ type: 'addProduct', payload: {name:name,subHeader:subHeader,description:description,img:image,price:price}})
              navigate(`/home/true/items`);
              alert(" הוסף בהצלחה ")
        }
    }
    return (
        <>  
            <div class="from" >
                <p>add item:</p>
                <div className="p-inputgroup" >
                    <span className="p-inputgroup-addon">
                        <i className="pi pi-gift"></i>
                    </span>
                    <InputText placeholder="Name" onChange={(e) => setName(e.target.value)} />
                </div>

                <div className="p-inputgroup" >
                    <span className="p-inputgroup-addon">
                        <i className="pi pi-image"></i>
                    </span>
                    <InputText placeholder="URL" onChange={(e) => setImage(e.target.value)} />
                </div>
                <div className="p-inputgroup" >
                    <span className="p-inputgroup-addon">
                        <i className="pi pi-info"></i>
                    </span>
                    <InputText placeholder="SubHeader" onChange={(e) => setSubHeader(e.target.value)} maxLength={30} />
                </div>
                <div className="p-inputgroup">
                    <span className="p-inputgroup-addon">
                        <i className="pi pi-dollar"></i>
                    </span>
                    <InputNumber value={price} onValueChange={(e) => setPrice(e.value)} mode="decimal" showButtons min={0} className="price" />
                </div>


                <div >
                    <InputTextarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} cols={50} maxLength={145} className="textArea" />
                </div>

                <button onClick={add}>add the card</button>
            </div>
        </>
    )
}