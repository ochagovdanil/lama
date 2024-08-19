'use client';

import Image from 'next/image';
import styles from './home.module.css';
import brands from '../../public/brands.png';
import hero from '../../public/hero.gif';

const HomePage = () => {
	return (
		<div className={styles.container}>
			<div className={styles.textContainer}>
				<h1 className={styles.title}>Creative Thoughts Agency.</h1>
				<p className={styles.description}>
					Lorem ipsum dolor sit amet, consectetur adipisicing elit.
					Libero nulla illum assumenda dolorem, dolorum aperiam
					adipisci?
				</p>
				<div className={styles.buttons}>
					<button className={styles.button}>Learn More</button>
					<button className={styles.button}>Contact</button>
				</div>
				<div className={styles.brands}>
					<Image
						src={brands}
						alt='Brands'
						title='Brands'
						fill
						className={styles.brandImg}
					/>
				</div>
			</div>
			<div className={styles.imgContainer}>
				<Image
					src={hero}
					alt='Hero'
					title='Hero'
					fill
					className={styles.heroImg}
				/>
			</div>
		</div>
	);
};

export default HomePage;
