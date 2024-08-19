import Image from 'next/image';
import styles from './contact.module.css';
import contacts from '../../../public/contact.png';

export const metadata = {
	title: 'Lama - Contact Us',
	description: 'Creative Thoughts Agency',
};

const ContactPage = () => {
	return (
		<div className={styles.container}>
			<div className={styles.imgContainer}>
				<Image
					src={contacts}
					alt='Contacts'
					title='Contacts'
					fill
					className={styles.img}
				/>
			</div>
			<div className={styles.formContainer}>
				<form action='#' className={styles.form}>
					<input type='text' placeholder='Name and Surname' />
					<input type='text' placeholder='Email Address' />
					<input type='text' placeholder='Phone Number (Optional)' />
					<textarea name='' id='' placeholder='Message'></textarea>
					<button>Send</button>
				</form>
			</div>
		</div>
	);
};

export default ContactPage;
