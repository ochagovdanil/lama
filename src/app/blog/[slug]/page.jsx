import Image from 'next/image';
import styles from './singlePost.module.css';
const PostUser = lazy(() => import('@/components/postUser/postUser'));
import { Suspense, lazy } from 'react';
import { getPost } from '@/components/lib/data';
import noAvatar from '../../../../public/noavatar.png';

export const generateMetadata = async ({ params }) => {
	const { slug } = params;
	const post = await getPost(slug);

	return {
		title: post.title,
		description: post.desc,
	};
};

const getData = async slug => {
	const response = await fetch(`http://localhost:3000/api/blog/${slug}`);

	if (!response.ok)
		throw new Error('Something went wrong when fetching blog post [slug]!');

	return response.json();
};

const SinglePostPage = async ({ params }) => {
	const { slug } = params;
	// const post = await getPost(slug);
	const post = await getData(slug);

	return (
		<div className={styles.container}>
			{post.img && (
				<div className={styles.imgContainer}>
					<Image
						src={post.img}
						alt=''
						title=''
						fill
						className={styles.img}
					/>
				</div>
			)}
			<div className={styles.textContainer}>
				<h1 className={styles.title}>{post?.title}</h1>
				<div className={styles.detail}>
					{post.img ? (
						<Image
							src={post.img}
							alt=''
							title=''
							width={50}
							height={50}
							className={styles.avatar}
						/>
					) : (
						<Image
							src={noAvatar}
							alt=''
							title=''
							width={50}
							height={50}
							className={styles.avatar}
						/>
					)}
					{post && (
						<Suspense fallback={<div>Loading...</div>}>
							<PostUser userId={post.userId} />
						</Suspense>
					)}
					<div className={styles.detailText}>
						<div className={styles.detailTitle}>Published</div>
						<div className={styles.detailValue}>
							{post.createdAt}
						</div>
					</div>
				</div>
				<div className={styles.content}>{post.desc}</div>
			</div>
		</div>
	);
};

export default SinglePostPage;
