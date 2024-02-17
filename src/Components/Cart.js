import { useEffect, useState } from "react";
import Cookies from 'universal-cookie';
import cross from "./../Assets/cross.png"
import Navbar from "./Navbar";

export default function Cart(props) {

    const cookies = new Cookies();

    const [cartItems, setCartItems] = useState([]);

    
    const [datum, setDatum] = useState(null);
    const [datum2, setDatum2] = useState(null);
    
    
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                let data = await fetch(`https://dummyjson.com/carts/user/${cookies.get("userId")}`);
                
                if (data.ok) {
                    let res = await data.json();

                    setDatum(res.carts[0]);
                }
            } catch (err) {
                console.error(err);
        }
      }
      fetchProduct();
    }, []);



     if (!datum || datum?.length<=0) return <h1>No data</h1>;

 

    return(
        <>
            <Navbar/>
        <section className="cart">
            <div>
                <p className="cart-title">Cart ({datum.totalProducts} items)</p>

                {datum &&  datum.products.map((dataa)=>(
                    <div className="cart-inner">
                        <div><img className="thumb-cart" src={dataa.thumbnail}></img></div>
                        <div className="title-price">
                            <p className="cart-inner-title">{dataa.title}</p>
                            <p>${dataa.price}</p>
                        </div>
                        <select name="qty" id="qty">
                            <option value="Qty: 1">Qty: 1</option>
                            <option value="Qty: 2">Qty: 2</option>
                            <option value="Qty: 3">Qty: 3</option>
                            <option value="Qty: 4">Qty: 4</option>
                        </select>
                    

                    </div>
                ))}
            </div>


            <div className="cart-item-2">
                <p className="cart-title-2">Price details ({datum.totalProducts} items)</p>
                <div>
                    <p>Total MRP</p>
                    <p>${datum.total}</p>
                </div>
                <div>
                    <p>Discount on MRP</p>
                    <p className="cart-green-item">${datum.total-datum.discountedTotal}</p>
                </div>
                <div>
                    <p>Shipping fee</p>
                    <p><s>$5</s> <span className="cart-green-item">Free</span></p>
                </div>
                <hr/>
                <div>
                    <p className="cart-bold">Total Amount</p>
                    <p className="cart-bold">${datum.discountedTotal}</p>
                </div>
            
            </div>

        </section>
        </>
    )
}