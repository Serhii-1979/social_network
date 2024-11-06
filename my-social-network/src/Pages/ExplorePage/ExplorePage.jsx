// ExplorePage.jsx
import React, { useEffect, useState } from "react";
import styles from './ExplorePage.module.css';
import { $api } from "../../utils/api.ts"; // Предполагаем, что вы используете axios с установленным baseURL для API

function ExplorePage() {
    const [posts, setPosts] = useState([]);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
        // Функция для загрузки постов
        const fetchPosts = async () => {
            try {
                const response = await $api.get("/post"); // Получаем все посты
                const allPosts = response.data;
                
                // Рандомно выбираем 12 постов
                const randomPosts = allPosts
                    .sort(() => 0.5 - Math.random())
                    .slice(0, 16);

                setPosts(randomPosts);
            } catch (error) {
                console.error("Ошибка при загрузке постов:", error);
            }
        };

        fetchPosts();
    }, []);

    return (
        <div className={`${styles.container} ${isVisible ? styles.fadeIn : ''}`}>
            <div className={styles.cont_img}>
                {posts.length > 0 ? (
                    posts.map((post) => (
                        <img key={post._id} src={post.image_url} alt={post.caption || "Random post"} />
                    ))
                ) : (
                    <p>Загрузка...</p>
                )}
            </div>
        </div>
    );
}

export default ExplorePage;
