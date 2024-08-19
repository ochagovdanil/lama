'use client';

import { useEffect } from 'react';
import { handleRegister } from '../lib/actions';
import styles from './registerForm.module.css';
import { useFormState } from 'react-dom';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const RegisterForm = () => {
	const [state, formAction] = useFormState(handleRegister, undefined);

	const router = useRouter();

	useEffect(() => {
		state?.success && router.push('/login');
	}, [state?.success, router]);

	return (
		<form className={styles.form} action={formAction}>
			<input type='text' placeholder='Username' name='username' />
			<input type='email' placeholder='Email' name='email' />
			<input type='password' placeholder='Password' name='password' />
			<input
				type='password'
				placeholder='Password repeat'
				name='passwordRepeat'
			/>
			<button>Register</button>
			{state?.error}
			<Link href={'/login'}>
				Have an account? <strong>Login</strong>
			</Link>
		</form>
	);
};

export default RegisterForm;
