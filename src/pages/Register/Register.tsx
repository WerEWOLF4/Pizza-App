import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import Header from "../../components/Header/Header";
import Input from "../../components/Input/Input";
import styles from "./Register.module.css";
import { FormEvent, useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { register, userActions } from "../../store/user.slice";
import { useSelector } from "react-redux";

export type RegisterForm = { 
    email: {
        value: string;
    };
    password: {
        value: string; 
    };
    name: {
        value: string; 
    };
}

export function Register() {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const { jwt, registerErorrMessage} = useSelector((s: RootState) => s.user);

    useEffect(() => {
        if (jwt) {
            navigate("/");
        }
    }, [jwt, navigate])

   const submit = async (e: FormEvent) => {
    e.preventDefault();
    dispatch(userActions.clearRegisterError());
    const target = e.target as typeof e.target & RegisterForm;
    const { email, password, name } = target;
    dispatch(register({ email: email.value, password: password.value, name: name.value}));
   }

    return<div className={styles["login"]}>
    <Header>Регистрация</Header>
    {registerErorrMessage && <div className={styles["error"]}>{registerErorrMessage}</div>}
    <form  className={styles["form"]} onSubmit={submit}>
        <div className={styles["field"]}>
            <label htmlFor="email">Ваш адрес электронной почты</label>
            <Input id="email" name="email" placeholder="Email"/>
        </div>
        <div className={styles["field"]}>
            <label htmlFor="password">Ваш пароль</label>
            <Input id="password" name="password" type="password" placeholder="Password"/>
        </div>
        <div className={styles["field"]}>
            <label htmlFor="password">Ваше имя</label>
            <Input id="name" name="name" placeholder="Name"/>
        </div>
    <Button appearence="big">Зарегистрироваться</Button>
    </form>
        <div className={styles["links"]}>
        <div>Есть аккаунта?</div>
            <Link to="/auth/login">Войти</Link>
        </div>
    </div>
}