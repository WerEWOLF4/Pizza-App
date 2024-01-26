import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import Header from "../../components/Header/Header";
import Input from "../../components/Input/Input";
import styles from "./Login.module.css";
import { FormEvent, useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { login, userActions } from "../../store/user.slice";
import { useSelector } from "react-redux";

export type LoginForm = { 
    email: {
        value: string;
    };
    password: {
        value: string; 
    };
}

export function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const { jwt, loginErorrMessage} = useSelector((s: RootState) => s.user);

    useEffect(() => {
        if (jwt) {
            navigate("/");
        }
    }, [jwt, navigate])

   const submit = async (e: FormEvent) => {
    e.preventDefault();
    dispatch(userActions.clearLoginError());
    const target = e.target as typeof e.target & LoginForm;
    const { email, password } = target;
    await sendLogin(email.value, password.value);
   }

   const sendLogin = async (email: string, password: string ) => {
    dispatch(login({ email, password}));
    
   }

    return<div className={styles["login"]}>
    <Header>Вход</Header>
    {loginErorrMessage && <div className={styles["error"]}>{loginErorrMessage}</div>}
    <form  className={styles["form"]} onSubmit={submit}>
        <div className={styles["field"]}>
            <label htmlFor="email">Ваш адрес электронной почты</label>
            <Input id="email" name="email" placeholder="Email"/>
        </div>
        <div className={styles["field"]}>
            <label htmlFor="password">Ваш пароль</label>
            <Input id="password" name="password" type="password" placeholder="Password"/>
        </div>
    <Button appearence="big">Вход</Button>
    </form>
        <div className={styles["links"]}>
        <div>Нет аккаунта?</div>
            <Link to="/auth/register">Нет аккаунта? Зарегистрироваться</Link>
        </div>
    </div>
}