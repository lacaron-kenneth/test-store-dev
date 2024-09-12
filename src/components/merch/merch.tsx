import classNames from 'classnames';
import styles from './merch.module.scss';

export interface MerchProps {
    className?: string;
}

/**
 * This component was created using Codux's Default new component template.
 * To create custom component templates, see https://help.codux.com/kb/en/article/kb16522
 */
export const Merch = ({ className }: MerchProps) => {
    return (
        <div className={styles['merch-card']}>
            <img
                src="https://wixplosives.github.io/codux-assets-storage/add-panel/image-placeholder.jpg"
                alt=""
                className={styles.img}
            />
            <div className={styles.content}>
                <h5>Heading 5</h5>
            </div>
        </div>
    );
};
