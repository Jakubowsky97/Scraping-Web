"use client"
import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { registerForm } from '../data/registerForm'
import Field from './Field'
import { loginForm } from '../data/loginForm'
import { loginSchema, registerSchema } from '../schema/zodSchema'
import Link from 'next/link'

const AuthForm = ({ type = "login", operation }) => {

    const schema = type === "login" ? loginSchema : registerSchema

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(schema),
    })

    const [trigger, { isLoading, isError }] = operation();
    const router = useRouter()


    const onSubmit = async (values) => {
        const data = await trigger(values)
        if (!data.error) {
            router.push(type === "login" ? "/" : "/login")
        }
    }

    const formData = type === "login" ? loginForm : registerForm

    return (
        <div className="max-w-md mx-auto p-4 border rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-center mb-6">{type === "login" ? "Logowanie" : "Rejestracja"}</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {formData.map((item) => (
                    <Field
                        key={item.id}
                        {...item}
                        cb={register}
                        errors={errors} />
                ))}

                <button
                    type="submit"
                    className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    {isLoading ? "Ładowanie..." : type === "login" ? "Zaloguj się" : "Zarejestruj się"}
                </button>

            </form>

            <div className='mt-5'>
                {type === "login" ? (
                    <p>Nie masz konta ? <Link href="/register">Zarejestruj się</Link></p>
                ) : (
                    <p>Masz już konto ? <Link href="/login">Zaloguj się</Link></p>
                )}
            </div>
        </div>
    )
}

export default AuthForm
