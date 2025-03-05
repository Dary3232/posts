import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import { Container } from "../ui/Container";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/slices/authSlice";
import { Button } from "../ui/Button";
import * as SC from "./styles";

export const Root = () => {
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const onClickExitBtn = () => {
        dispatch(logout());
        navigate('/auth');
    }

    useEffect(() => {
        navigate('/');
    }, [navigate]);

    return (
        <>
            <Container>
                <SC.Menu>
                    <SC.MenuItem to={'/'}>Главная</SC.MenuItem>
                    <SC.MenuItem to={'/posts'}>Список постов</SC.MenuItem>
                    {user && <SC.MenuItem to={'/posts/add'}>Добавление поста</SC.MenuItem>}
                    {user && <Button onClick={onClickExitBtn} label={'Выход'} />}
                    {!user && <SC.MenuItem to={'/auth'}>Авторизация</SC.MenuItem>}
                    {!user && <SC.MenuItem to={'/registration'}>Регистрация</SC.MenuItem>}
                </SC.Menu>
            </Container>
            <Outlet />
        </>
    )
}