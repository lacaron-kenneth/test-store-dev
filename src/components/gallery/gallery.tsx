import classNames from 'classnames';
import styles from './gallery.module.scss';
import { Merch } from '../merch/merch';
// @ts-ignore

import productData from '../../data/data_merch.jsx';


export interface GalleryProps {
    className?: string;
}
export const Gallery = ({ className }: GalleryProps) => {
    return (
        <div className={styles.gallery}>

{/* @ts-ignore */}

            {productData.map((product, index) => (
                <Merch
                    key={product.id}
                    image={product.imageThumbnail[0]} // Access the first function in the array
                    name={product.name}
                    description={product.description}
                    price={product.price}
                />
            ))}
        </div>
    );
};
