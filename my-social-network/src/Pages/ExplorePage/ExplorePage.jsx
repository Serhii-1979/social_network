import React, { useEffect, useState } from "react";
import styles from './ExplorePage.module.css';
import { $api } from "../../utils/api.ts";
import Posts from '../Posts/Posts';

function ExplorePage() {
    const [posts, setPosts] = useState([]);
    const [isVisible, setIsVisible] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null); // Состояние для выбранного поста

    useEffect(() => {
        setIsVisible(true);
        
        const fetchPosts = async () => {
            try {
                const response = await $api.get("/post");
                const allPosts = response.data;
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

    const handleImageClick = (post) => {
        setSelectedPost(post);
    };

    const handleClose = () => {
        setSelectedPost(null); // Закрываем модальное окно
    };

    return (
        <div className={`${styles.container} ${isVisible ? styles.fadeIn : ''}`}>
            <div className={styles.cont_img}>
                {posts.length > 0 ? (
                    posts.map((post) => (
                        <img
                            key={post._id}
                            src={post.image_url}
                            alt={post.caption || "Random post"}
                            onClick={() => handleImageClick(post)} // Обработчик клика
                        />
                    ))
                ) : (
                    <p>Загрузка...</p>
                )}
            </div>
            
            {selectedPost && (
                <Posts post={selectedPost} onClose={handleClose} /> // Отображаем Posts как модальное окно
            )}
        </div>
    );
}

export default ExplorePage;
