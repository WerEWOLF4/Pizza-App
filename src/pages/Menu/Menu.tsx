import { ChangeEvent, useEffect, useState } from "react";
import Search from "../../Search/Search";
import Header from "../../components/Header/Header";
import { PREFIX } from "../../helpers/API";
import { Product } from "../../interfaces/product.interfaces";
import styles from "./Menu.module.css";
import axios  from "axios";
import { MenuList } from "./MenuList/MenuList";

export function Menu() {
    const[products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [filter, setFilter] = useState<string>();

    useEffect(() => {
        getMenu(filter);
    }, [filter]);

    const getMenu = async (name?: string) => {
        try {
            setIsLoading(true);
            await new Promise<void>((resolve) => {
                setTimeout(() => {
                 resolve()
                }, 2000);
            });
            const { data } = await axios.get<Product[]>(`${PREFIX}/products`, {
                params: {
                  name
                }
            });
            setProducts(data);
            setIsLoading(false);
        } catch (e) {
            console.error(e);
            setIsLoading(false);
            return;
        }
    };

    const updateFilter = (e:  ChangeEvent<HTMLInputElement>) => {
        setFilter(e.target.value);
    };

    useEffect(() => {
        getMenu();
    }, []);

    return <>
<div className={styles["head"]}>
    <Header>Меню</Header>
    <Search placeholder="Введите блюда или их содержимое" onChange={updateFilter}/>
</div>
<div>
    {!isLoading && products.length > 0 && <MenuList products={products}/>}
    {isLoading && <>Загрузка данных</>}
    {!isLoading && products.length === 0 && <>По вашему запросу блюда не найдены</>}
</div>
    </>;
}

export default Menu;