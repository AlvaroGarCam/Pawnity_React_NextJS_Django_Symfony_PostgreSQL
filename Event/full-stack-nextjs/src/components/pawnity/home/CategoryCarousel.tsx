"use client";

import React, { useState } from "react";
import { Carousel } from "@/utils/PrimeReactComponents";
import { Category } from "@/types/Category";
import styles from "@/styles/pawnity/Home.module.css";

interface CategoryCarouselProps {
    categories: Category[];
}

const CategoryCarousel: React.FC<CategoryCarouselProps> = ({ categories }) => {
    const responsiveOptions = [
        {
            breakpoint: "1024px",
            numVisible: 3,
            numScroll: 1,
        },
        {
            breakpoint: "768px",
            numVisible: 2,
            numScroll: 1,
        },
        {
            breakpoint: "560px",
            numVisible: 1,
            numScroll: 1,
        },
    ];

    return (
        <section className={styles.carousel}>
            <h3 className={styles.carouselTitle}>Las mejores experiencias con mascotas</h3>
            <Carousel
                value={categories}
                numVisible={3}
                numScroll={1}
                circular={true}
                autoplayInterval={3000}
                responsiveOptions={responsiveOptions}
                itemTemplate={(category) => (
                    <div className={styles.categoryCard}>
                        <img src={category.imageurl} alt={category.categoryname} className={styles.categoryImage} />
                        <div className={styles.categoryName}>
                            <h3>{category.categoryname}</h3>
                        </div>
                    </div>
                )}
            />
        </section>
    );
};

export default CategoryCarousel;
