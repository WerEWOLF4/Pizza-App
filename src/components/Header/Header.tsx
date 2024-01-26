import { HeadingProps } from "./Header.props";
import cn from "classnames";
import styles from "./Header.module.css";

function Header({children, className, ...props }: HeadingProps) {
     return (
        <h1 className={cn(className, styles['h1'])} {...props}>{children}</h1>
    )
  }

  export default Header;