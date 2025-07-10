'use client';

import { Button, Input, Stack, Text, Anchor, Group, TextInput } from "@mantine/core";
import { IMaskInput } from "react-imask";
import { useForm } from "@mantine/form";
import { useState, useEffect } from "react";
import { auth } from "@/api/auth/auth";
import { phoneMapper } from "@/utils/phoneMapper";
import { notifications } from "@mantine/notifications";
import { createOtp } from "@/api/auth/createOtp";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

type AuthStep = 'phone' | 'code';

export default function AuthForm() { 
    const [step, setStep] = useState<AuthStep>('phone');
    const [timer, setTimer] = useState(30);
    const [isTimerActive, setIsTimerActive] = useState(false);
    const [loading, setLoading] = useState(false);
    
    const { login } = useAuth();
    const router = useRouter();

    const form = useForm({
        initialValues: {
            phone: '',
            code: ''
        },
        validate: {
            phone: (value) => {
                if (!value) return 'Введите номер телефона';
                if (value.length < 18) return 'Введите полный номер телефона';
                return null;
            },
            code: (value) => {
                if (!value) return 'Введите код из SMS';
                if (value.length < 4) return 'Код должен содержать минимум 4 цифры';
                return null;
            }
        }
    });

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isTimerActive && timer > 0) {
            interval = setInterval(() => {
                setTimer(prev => prev - 1);
            }, 1000);
        } else if (timer === 0) {
            setIsTimerActive(false);
        }
        return () => clearInterval(interval);
    }, [isTimerActive, timer]);

    const handlePhoneSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        const validation = form.validateField('phone');
        
        if (!validation.hasError) {
            try {
                const response = await createOtp({
                    phone: phoneMapper(form.values.phone)
                });

                setStep('code');
                setTimer(response.data.retryDelay / 1000);
                setIsTimerActive(true);

            } catch (error) {
                notifications.show({
                    title: 'Ошибка отправки SMS',
                    message: '',
                    color: 'red'
                });
            } finally {
                setLoading(false);
            }
        }
    };

    const handleCodeSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const validation = form.validateField('code');
        
        if (!validation.hasError) {
            setLoading(true);
            try {
                const response = await auth({
                    phone: phoneMapper(form.values.phone), 
                    code: parseInt(form.values.code)
                });
                
                login(response.data);
                
                notifications.show({
                    title: 'Авторизация успешна',
                    message: 'Добро пожаловать!',
                    color: 'green'
                });
                
                router.push('/');
                
            } catch (error) {
                notifications.show({
                    title: 'Ошибка авторизации',
                    message: 'Неверный код',
                    color: 'red'
                });
                form.setFieldError('code', 'Неверный код');
            } finally {
                setLoading(false);
            }
        } else {
            setLoading(false);
        }
    };

    const handleResendCode = async () => {
        setLoading(true);
        try {
            const response = await createOtp({
                phone: phoneMapper(form.values.phone)
            });

            setTimer(response.data.retryDelay / 1000);
            setIsTimerActive(true);

        } catch (error) {
            notifications.show({
                title: 'Ошибка повторной отправки SMS',
                message: '',
                color: 'red'
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={step === 'phone' ? handlePhoneSubmit : handleCodeSubmit}>
        <Stack gap={'lg'} w={{base: '100%', sm: 328}}>
            
                <Input 
                    w="100%" 
                    placeholder="Телефон" 
                    component={IMaskInput} 
                    mask="+7 (000) 000-00-00"
                    value={form.values.phone}
                    onAccept={(value: string) => form.setFieldValue('phone', value)}
                    onBlur={() => form.validateField('phone')}
                    disabled={step === 'code'}
                    error={form.errors.phone}
                />
                {form.errors.phone && (
                    <Text size="sm" c="var(--color-error)" mt={5}>
                        {form.errors.phone}
                    </Text>
                )}
           
            
            {step === 'code' && (
                <>
                    <Input 
                        w="100%" 
                        placeholder="Код из SMS"
                        value={form.values.code}
                        onChange={(event) => form.setFieldValue('code', (event.target as HTMLInputElement).value)}
                        onBlur={() => form.validateField('code')}
                        maxLength={6}
                        error={form.errors.code}
                    />
                    {form.errors.code && (
                        <Text size="sm" c="var(--color-error)" mt={5}>
                            {form.errors.code}
                        </Text>
                    )}
                </>
            )}
            
            <Button 
                w={{base: '100%', sm: 328}}
                type="submit"
                loading={loading}
            >
                {step === 'phone' ? 'Продолжить' : 'Войти'}
            </Button>

            {step === 'code' && (
                <Group  gap={5}>
                    {isTimerActive ? (
                        <Text size="sm" c="var(--text-secondary)">
                            Запросить код повторно можно через {timer} секунд
                        </Text>
                    ) : (
                        <a
                            onClick={handleResendCode}
                        >
                            Отправить еще раз
                        </a>
                    )}
                </Group>
            )}
        </Stack>
        </form>
    );
}