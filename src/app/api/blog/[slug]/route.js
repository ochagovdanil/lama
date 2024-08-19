import { Post } from '@/components/lib/models';
import { connectToDb } from '@/components/lib/utils';
import { NextResponse } from 'next/server';

export const GET = async (_request, { params }) => {
	try {
		const { slug } = params;

		connectToDb();

		const post = await Post.findOne({ slug });
		return NextResponse.json(post);
	} catch (error) {
		console.log(error);
		throw new Error('Failed to fetch blog post [slug]!');
	}
};

export const DELETE = async (_request, { params }) => {
	try {
		const { slug } = params;

		connectToDb();

		const post = await Post.deleteOne({ slug });
		return NextResponse.json('Post deleted!');
	} catch (error) {
		console.log(error);
		throw new Error('Failed to delete blog post [slug]!');
	}
};
