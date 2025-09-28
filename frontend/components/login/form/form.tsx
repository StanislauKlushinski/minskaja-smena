"use client";
import styles from './form.module.css';
import FormInput from "@/components/formInput/formInput";
import React, {useRef} from "react";
import {useDispatch} from "react-redux";
import {AppDispatch} from "@/services/store";
import {authUserRequest} from "@/services/user/userSlice";

export default function Form() {
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const dispatch = useDispatch<AppDispatch>();

    function onSubmit(event: React.FormEvent) {
        event.preventDefault();
        if (emailRef.current && passwordRef.current) {
            const email = emailRef.current.value;
            const password = passwordRef.current.value;
            dispatch(authUserRequest({
                username: email,
                password: password
            }))
        }
    }

    return (
        <div className={styles.form}>
            <form method="post" onSubmit={onSubmit}>
                <FormInput name={'Логин'} type={'email'} inputRef={emailRef}/>
                <FormInput name={'Пароль'} type={'password'} inputRef={passwordRef}/>
                <p>
                    <input className={styles.loginInputButton} type="submit" name="submit" value="Войти"/>
                </p>
            </form>
        </div>
    );
}