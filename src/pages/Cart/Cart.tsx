import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/Header/Header";
import { AppDispatch, RootState } from "../../store/store";
import CartItem from "../../components/CartItems/CartItems";
import { useEffect, useState } from "react";
import { Product } from "../../interfaces/product.interfaces";
import axios from "axios";
import { PREFIX } from "../../helpers/API";
import styles from "./Cart.module.css";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import { cartActions } from "../../store/cart.slice";

const DELIVERY_FEE = 169;

export function Cart() {
    const [cartProducts, setCartProducts] = useState<Product[]>([]);
    const items = useSelector((s: RootState) => s.cart.items);
    const jwt = useSelector((s: RootState) => s.user.jwt);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate()
    const total = items.map((i) => {
            const product = cartProducts.find((p) => p.id === i.id);
            if (!product) {
              return 0;
            }
            return i.count * product.price;
          })
          .reduce((acc: number, i: number) => (acc += i), 0);

    const getItem = async (id: number) => {
        const {data} = await axios.get<Product>(`${PREFIX}/products/${id}`);
        return data;
    };

    const loadAllItems = async () => {
        const res = await Promise.all(items.map(i => getItem(i.id)));
        setCartProducts(res);
    }

    const checkout = async () => {
         await axios.post(`${PREFIX}/order`, {
            products: items
        }, {
             headers: {
                Authorization: `Bearer ${jwt}`
             }
        });
      dispatch(cartActions.clean());
      navigate("/success")
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
        <div className={styles["line"]}>
            <div className={styles["text"]}>Итог</div>
            <div className={styles["price"]}>{total} <span>₽</span></div>
        </div>
        <hr className={styles["hr"]}/>
        <div className={styles["line"]}>
            <div>Доставка</div>
            <div className={styles["price"]}>{DELIVERY_FEE} <span>₽</span></div>
        </div>
        <hr className={styles["hr"]}/>
        <div className={styles["line"]}>
            <div>Итог <span className={styles["total-count"]}>({items.length})</span></div>
            <div className={styles["price"]}>{total + DELIVERY_FEE} <span>₽</span></div>
        </div>
        <div className={styles["checkout"]}>
                <Button appearence="big" onClick={checkout}>оформить</Button>
        </div>
    </>
}