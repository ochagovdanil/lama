import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';
import Credentials from 'next-auth/providers/credentials';
import { connectToDb } from './utils';
import { User } from './models';
import bcrypt from 'bcryptjs';
import { authConfig } from './auth.config';

const loginWithCredentials = async credentials => {
	try {
		// Checking if a username exists
		connectToDb();

		const user = await User.findOne({ username: credentials.username });

		if (!user) throw new Error('Wrong credentials!');

		// Checking if a password is correct
		const isPasswordCorrect = await bcrypt.compare(
			credentials.password,
			user.password
		);

		if (!isPasswordCorrect) throw new Error('Wrong credentials!');

		// Success
		return user;
	} catch (error) {
		console.log(error);
		throw new Error(
			'Something went wrong when trying to login with user credentials!'
		);
	}
};

export const { handlers, signIn, signOut, auth } = NextAuth({
	...authConfig,
	providers: [
		GitHub({
			clientId: process.env.GITHUB_CLIENT_ID,
			clientSecret: process.env.GITHUB_CLIENT_SECRET,
		}),
		Credentials({
			async authorize(credentials) {
				try {
					const user = await loginWithCredentials(credentials);
					return user;
				} catch (error) {
					console.log(error);
					return null;
				}
			},
		}),
	],
	callbacks: {
		async signIn({ account, profile }) {
			if (account.provider === 'github') {
				try {
					// Checking if a user already exists
					connectToDb();

					const user = await User.findOne({ email: profile.email });

					// Create the new user
					if (!user) {
						const newUser = new User({
							username: profile.login,
							email: profile.email,
							image: profile.avatar_url,
						});

						await newUser.save();
					}
				} catch (error) {
					console.log(error);
					return false;
				}
			}

			return true;
		},
	},
	...authConfig.callbacks,
});
