import { Post } from '@/components/lib/models';
import { connectToDb } from '@/components/lib/utils';
import { NextResponse } from 'next/server';

export const GET = async () => {
	try {
		connectToDb();

		const posts = await Post.find();
		return NextResponse.json(posts);
	} catch (error) {
		console.log(error);
		throw new Error('Failed to fetch blog posts!');
	}
};
