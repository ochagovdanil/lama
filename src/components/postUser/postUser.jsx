import { getUser } from '../lib/data';
import styles from './postUser.module.css';

async function PostUser({ userId }) {
	const user = await getUser(userId);

	return (
		<div className={styles.container}>
			<div className={styles.title}>Author</div>
			<div className={styles.username}>{user.username}</div>
		</div>
	);
}

export default PostUser;
