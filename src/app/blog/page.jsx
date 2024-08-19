import PostCard from '@/components/postCard/postCard';
import styles from './blog.module.css';
import { getPosts } from '@/components/lib/data';

const getData = async () => {
	const response = await fetch('http://localhost:3000/api/blog', {
		next: {
			revalidate: 3_600,
		},
	});

	if (!response.ok)
		throw new Error('Something went wrong when fetching blog posts!');

	return response.json();
};

const BlogPage = async () => {
	// const posts = await getPosts();
	const posts = await getData();

	return (
		<div className={styles.container}>
			{posts.map(post => (
				<div className={styles.post} key={post.id}>
					<PostCard post={post} />
				</div>
			))}
		</div>
	);
};

export default BlogPage;
