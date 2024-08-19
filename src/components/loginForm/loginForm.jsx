'use client';

import Link from 'next/link';
import { useFormState } from 'react-dom';
import { handleLogin } from '../lib/actions';
import styles from './loginForm.module.css';

const LoginForm = () => {
	const [state, formAction] = useFormState(handleLogin, undefined);

	return (
		<form className={styles.form} action={formAction}>
			<input type='text' placeholder='Username' name='username' />
			<input type='password' placeholder='Password' name='password' />
			<button>Login with Credentials</button>
			{state?.error}
			<Link href='/register'>
				Don&apos;t have an account? <strong>Register</strong>
			</Link>
		</form>
	);
};

export default LoginForm;
