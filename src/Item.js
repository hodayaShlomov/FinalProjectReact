import { useState } from 'react'
// import './Item.css'
import React, { Component } from 'react';
import './Item.css'
import { Navigate } from 'react-router-dom';
import { addToCart, removeToCart } from './store/items/itemsActions';
import { store } from './store/store';
function Item(props) {

    const [name, setName] = useState(props.name)
    const [price, setPrice] = useState(props.price)
    const [description, setDescription] = useState(props.description)
    const [subHeader, setSubHeader] = useState(props.subHeader)
    const [img, setImg] = useState(props.img)
    const [id, setId] = useState(props.index)
    const [amount, SetAmount] = useState(0)

    function addToCart() {
        let item = { id: id, name: name, price: price, amount: 1,img:img }
        store.dispatch({ type: 'addToCart', payload: item });
        SetAmount(amount + 1)
    }
    function removeFromCart() {
        if (amount > 0) {
            store.dispatch({ type: 'removeFromCart', payload: id })
            SetAmount(amount - 1)
        }
    }
   
    return (
        <>
            <div className='cardItem'>
       
                <img src={img} />
                <h1>{name}</h1>
                <p><span>{subHeader}</span></p>
                <p className='price'>{price} $</p>
                <p className='description'>{description}</p>
                <div className='cardFooter'>
                <button onClick={(e) => { removeFromCart() }}>-</button>
                <p id='amount'>{amount}</p>
               <button onClick={(e) => { addToCart() }}>+</button>
                </div>
            </div>
        </>
    );
}
export default Item