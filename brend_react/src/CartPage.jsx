import React from 'react';
import { useCart } from "./CartContext";
import './CartPage.css';

const CartPage = () => {
    const { cartItems, clearCart } = useCart();

    const handleCheckout = () => {
        alert('Uspešno izvršena kupovina!');
        clearCart();
    };

    return (
        <div className="cart-page-container">
            <h2>🛒 Vaša korpa</h2>
            {cartItems.length === 0 ? (
                <p className="empty-cart">Korpa je prazna.</p>
            ) : (
                <>
                    <div className="cart-items">
                        {cartItems.map((item, index) => (
                            <div key={index} className="cart-item">
                                <h3>{item.naziv}</h3>
                                <p>{item.opis}</p>
                                <p><strong>Cena:</strong> {item.cena} RSD</p>
                            </div>
                        ))}
                    </div>
                    <button className="checkout-button" onClick={handleCheckout}>Završi kupovinu</button>
                </>
            )}
        </div>
    );
};

export default CartPage;
