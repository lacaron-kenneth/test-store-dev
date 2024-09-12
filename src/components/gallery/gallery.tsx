import classNames from 'classnames';
import styles from './gallery.module.scss';
import { Merch } from '../merch/merch';

export interface GalleryProps {
    className?: string;
}

/**
 * This component was created using Codux's Default new component template.
 * To create custom component templates, see https://help.codux.com/kb/en/article/kb16522
 */
export const Gallery = ({ className }: GalleryProps) => {
    return (
        <div className={styles.gallery}>
            <Merch />
            <Merch />
            <Merch />
        </div>
    );
};
