import ProductCard from "../../../components/ProductCard/ProductCard";
import { MenuListProps } from "./MenuList.props";
import  styles  from "./MenuList.module.css";

export function MenuList({products}: MenuListProps) {
    return <div className={styles.wrappear}>{products.map(products => (
        <ProductCard
        key={products.id}
        id={products.id}
        name={products.name}
        description={products.ingredients.join(", ")}
        rating={products.rating}
        price={products.price}
        image={products.image}
        />
        ))}
    </div>
    }
