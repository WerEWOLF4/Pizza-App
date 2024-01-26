import { useSelector } from "react-redux";
import Header from "../../components/Header/Header";
import { RootState } from "../../store/store";
import CartItem from "../../components/CartItems/CartItems";
import { useEffect, useState } from "react";
import { Product } from "../../interfaces/product.interfaces";
import axios from "axios";
import { PREFIX } from "../../helpers/API";
import styles from "./Cart.module.css";

export function Cart() {
    const [cartProducts, setCartProducts] = useState<Product[]>([]);
    const items = useSelector((s: RootState) => s.cart.items)

    const getItem = async (id: number) => {
        const {data} = await axios.get<Product>(`${PREFIX}/products/${id}`);
        return data;
    };

    const loadAllItems = async () => {
        const res = await Promise.all(items.map(i => getItem(i.id)));
        setCartProducts(res);
    }

    useEffect(() => {
       loadAllItems();
    }, [items]);

    return<>
    <Header className={styles["header"]}>Корзина</Header>
    {items.map(i => {
			const product = cartProducts.find(p => p.id === i.id);
			if (!product) {
				return;
			}
			return <CartItem key={product.id} count={i.count} {...product} />;
		})}
    </>
}