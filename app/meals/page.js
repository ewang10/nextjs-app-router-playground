import Link from "next/link";

const MealsPage = () => (
    <main>
        <h1>Meals</h1>
        <p><Link href="/meals/share">Share</Link></p>
        <p><Link href="/meals/meal-1">Meal 1</Link></p>
    </main>
);

export default MealsPage;
