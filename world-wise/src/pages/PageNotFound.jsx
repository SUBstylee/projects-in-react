import PageNav from '../components/PageNav';
// Uses the same styles as Product
import styles from './Product.module.css';

export default function PageNotFound() {
	return (
		<main className={styles.product}>
			<PageNav />
			<section>
				<div>
					<h1>Page not found 😢</h1>
				</div>
			</section>
		</main>
	);
}
