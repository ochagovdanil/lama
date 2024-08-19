'use server';

import { revalidatePath } from 'next/cache';
import { Post, User } from './models';
import { connectToDb } from './utils';
import { signIn, signOut } from './auth';
import bcrypt from 'bcryptjs';

export const addPost = async (_previousState, formData) => {
	try {
		const { title, desc, slug, userId } = Object.fromEntries(formData);

		connectToDb();

		const newPost = new Post({
			title,
			desc,
			slug,
			userId,
		});

		await newPost.save();
		revalidatePath('/blog');
		revalidatePath('/admin');
		console.log('New Post was saved to MongoDB!');
	} catch (error) {
		console.log(error);
		return {
			error: 'Something went wrong when creating a new post!',
		};
	}
};

export const deletePost = async formData => {
	try {
		const { id } = Object.fromEntries(formData);

		connectToDb();

		await Post.findByIdAndDelete(id);
		revalidatePath('/blog');
		revalidatePath('/admin');
		console.log(`Post [id=${id}] was deleted from MongoDB!`);
	} catch (error) {
		console.log(error);
		return {
			error: 'Something went wrong when deleting a post by ID!',
		};
	}
};

export const addUser = async (_previousState, formData) => {
	try {
		const { username, email, password, img } = Object.fromEntries(formData);

		connectToDb();

		const newUser = new User({
			username,
			email,
			password,
			img,
		});

		await newUser.save();
		revalidatePath('/admin');
		console.log('New User was saved to MongoDB!');
	} catch (error) {
		console.log(error);
		return {
			error: 'Something went wrong when creating a new user!',
		};
	}
};

export const deleteUser = async formData => {
	try {
		const { id } = Object.fromEntries(formData);

		connectToDb();

		await Post.deleteMany({ userId: id });
		await User.findByIdAndDelete(id);
		revalidatePath('/admin');
		console.log(`User [id=${id}] was deleted from MongoDB!`);
	} catch (error) {
		console.log(error);
		return {
			error: 'Something went wrong when deleting a user by ID!',
		};
	}
};

export const handleGithubLogin = async () => {
	await signIn('github');
};

export const handleGithubLogout = async () => {
	await signOut();
};

// Create a new user
export const handleRegister = async (_previousState, formData) => {
	try {
		// Check for passwords match
		const { username, password, passwordRepeat, email, img } =
			Object.fromEntries(formData);

		if (password !== passwordRepeat)
			return { error: 'Passwords do not match!' };

		connectToDb();

		// Check if the username already exists
		const user = await User.findOne({ username });

		if (user) return { error: 'Username already exists!' };

		// Create the user
		const salt = await bcrypt.genSalt();
		const hashedPassword = await bcrypt.hash(password, salt);

		const newUser = new User({
			username,
			email,
			password: hashedPassword,
			img,
		});

		await newUser.save();
		console.log('New User was saved to MongoDB!');

		return { success: true };
	} catch (error) {
		console.log(error);
		return {
			error: 'Something went wrong when creating a new user!',
		};
	}
};

export const handleLogin = async (_previousState, formData) => {
	try {
		// Check for passwords match
		const { username, password } = Object.fromEntries(formData);

		await signIn('credentials', {
			username,
			password,
		});
	} catch (error) {
		console.log(error);

		if (error.message.includes('CredentialsSignin')) {
			return { error: 'Invalid username or password!' };
		}

		// throw error;
		return {
			error: 'Something went wrong when trying to login with user credentials!',
		};
	}
};
