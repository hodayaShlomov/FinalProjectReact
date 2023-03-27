import { useEffect, useState } from 'react'
import Item from './Item';
import { useSelector } from 'react-redux';
import './items.css'
import { OrderList } from 'primereact/orderlist';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { store } from './store/store';
import DonationForm from './DonationForm';
import { useNavigate } from "react-router-dom";
function Items() {
    const [visible, setVisible] = useState(false);
    const products = useSelector(state => state.products.productsList)
    const cart = useSelector(state => state.products.CartList)
    const navigate = useNavigate();
    const [tot, setTot] = useState(0)

    const itemTemplate = (item) => {
        return ( 
            <div className="flex flex-wrap p-2 align-items-center gap-3">
                <img className="w-4rem shadow-2 flex-shrink-0 border-round" src={item.img} alt={item.name} />
                <div className="flex-1 flex flex-column gap-2 xl:mr-8">
                    <span className="font-bold">{item.name}</span>
                    <div className="flex align-items-center gap-2">
                        <span>{item.amount}</span>
                    </div>
                </div>
                <span className="font-bold text-900">${item.price}</span>
            </div>
        );
    };

    function calculateTotal() {
        let total = 0;
        cart.map((value) => { total = total + value.amount * value.price })
        setTot(total)
    }
    function navi() {
        navigate(`/home/false/donation/${tot}`);
    }
    return (
        <>
            <div >
                <img src='/images/Logo.jpg' />
                <h2> choose your items</h2>
            </div>
            <div >
                <Button className='title' label="Show cart" icon="pi pi-external-link" onClick={() => { setVisible(true); calculateTotal(); }} />
                <Dialog header="THE CART" visible={visible} style={{ width: '40vw' }} onHide={() => setVisible(false)}>
                    <h4>total sum: ${tot}</h4>
                    <div >
                        <OrderList value={cart} itemTemplate={itemTemplate} header="your cards: " ></OrderList>
                    </div>
                    <button onClick={navi} >pay</button>
                </Dialog>
            </div>


            <div className='items'>
                {products.map((value, index) =>
                    <Item key={index} index={index} name={value.name} subHeader={value.subHeader} price={value.price} description={value.description} img={value.img} />)}
            </div>


        </>
    )
}
export default Items