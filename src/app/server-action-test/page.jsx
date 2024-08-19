import { addPost, deletePost } from '@/components/lib/actions';

const ServerActionTest = () => {
	return (
		<div>
			<form action={addPost}>
				<input type='text' placeholder='Title' name='title' />
				<input type='text' placeholder='Description' name='desc' />
				<input type='text' placeholder='Slug' name='slug' />
				<input type='text' placeholder='User ID' name='userId' />
				<input type='submit' value='Create Post' />
			</form>

			<form action={deletePost}>
				<input type='text' placeholder='Post ID' name='id' />
				<input type='submit' value='Delete Post' />
			</form>
		</div>
	);
};

export default ServerActionTest;
