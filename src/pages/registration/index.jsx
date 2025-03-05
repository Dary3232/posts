import React, { useState } from "react";
import { Typo } from '../../components/ui/Typo'
import { Container } from '../../components/ui/Container'
import { Form } from "../../components/ui/Form";
import { Field } from "../../components/ui/Field";
import { Input } from "../../components/ui/Input";
import { useNavigate } from "react-router-dom";
import { Button } from '../../components/ui/Button';
import { Modal } from "../../components/ui/Modal";

export const RegistrationPage = () => {

    const [formValues, setFormValues] = useState(
        {
            name: '',
            surname: '',
            email: '',
            password: ''
        }
    );

    const [modalVisible, setModalVisible] = useState(false);
    const [modalText, setModalText] = useState('');

    const handleCloseModal = () => {
        setModalVisible(false);

        if (modalText === "Вы успешно зарегистрировались") {
            navigate('/auth');
        }
    };

    const navigate = useNavigate();

    const onSubmit = (e) => {
        e.preventDefault();
        try {
            const users = JSON.parse(localStorage.getItem('users'));
            const userId = Date.now();
            const newUser = { id: userId, ...formValues };

            if (!users) {
                localStorage.setItem('users', JSON.stringify([newUser]));
                setModalText("Вы успешно зарегистрировались");
                setModalVisible(true);
                return
            }

            if (users.find((user) => user.email === formValues.email)) {
                setModalText("Пользователь с таким email уже существует");
                setModalVisible(true);
                return
            }

            users.push(newUser);

            localStorage.setItem('users', JSON.stringify(users));

            setModalText("Вы успешно зарегистрировались");
            setModalVisible(true);

        } catch (e) {
            console.log(e)
        }
    }

    const onChange = (name, value) => {
        setFormValues({ ...formValues, [name]: value })
    }

    const disabled = !formValues.email || !formValues.password

    return (
        <Container>
            <Typo>Страница регистрации</Typo>
            <Form onSubmit={onSubmit}>
                <Field>
                    <Input
                        type='text'
                        name='name'
                        value={formValues.name}
                        placeholder='Имя'
                        onChange={(e) => onChange(e.target.name, e.target.value)}
                    />
                </Field>
                <Field>
                    <Input
                        type='text'
                        name='surname'
                        value={formValues.surname}
                        placeholder='Фамилия'
                        onChange={(e) => onChange(e.target.name, e.target.value)}
                    />
                </Field>
                <Field>
                    <Input
                        type='email'
                        name='email'
                        value={formValues.email}
                        placeholder='Email'
                        onChange={(e) => onChange(e.target.name, e.target.value)}
                    />
                </Field>
                <Field>
                    <Input
                        type='password'
                        name='password'
                        value={formValues.password}
                        placeholder='Пароль'
                        onChange={(e) => onChange(e.target.name, e.target.value)}
                    />
                </Field>
                <Button type="submit" disabled={disabled} label={'Регистрация'}/>
            </Form>
            {modalVisible && (
                <Modal text={modalText}>
                    <Button onClick={handleCloseModal} label="ОК" />
                </Modal>
            )}
        </Container>
    )
}

