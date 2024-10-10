import classNames from 'classnames';
import styles from './promotion-carousel.module.scss';
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
// @ts-ignore
import productData from '../../data/data_merch'; // Assuming this is the path to your product data
export interface PromotionCarouselProps {
    className?: string;
}

export const PromotionCarousel = ({ className }: PromotionCarouselProps) => {
    const [exclusiveProducts, setExclusiveProducts] = useState<any[]>([]);

    // Filter products that are marked as 'exclusive-apparel'
    useEffect(() => {
        const fetchExclusiveProducts = async () => {
            const filteredProducts = await Promise.all(
                productData
                    .filter(
                        (product: { featured: string }) => product.featured === 'exclusive-apparel'
                    )
                    .map(async (product: { imageThumbnail: (() => any)[] }) => {
                        const image = await product.imageThumbnail[0]();
                        return { ...product, imageUrl: image.default };
                    })
            );
            setExclusiveProducts(filteredProducts);
        };

        fetchExclusiveProducts();
    }, []);

    return (
        <div className={styles.carouselContainer}>
            
            <Swiper
                navigation={{
                    nextEl: '.custom-next',
                    prevEl: '.custom-prev',
                }}
                modules={[Autoplay, Pagination, Navigation]}
                spaceBetween={50}
                centeredSlides={true}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true, // This will pause autoplay on hover
                }}
                pagination={{ clickable: true }}
                loop={true}
                className={styles.carousel}
            >
                <div className="swiper-button-prev custom-prev"></div>
                <div className="swiper-button-next custom-next"></div>
                {exclusiveProducts.map((product, index) => (
                    <SwiperSlide key={index}>
                        <img
                            src={product.imageUrl}
                            alt={product.name}
                            className={styles.carouselImage}
                        />
                        {/* <div className={styles.caption}>
                            <h3>{product.name}</h3>
                            <p>${product.price.toFixed(2)}</p>
                        </div> */}
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};
