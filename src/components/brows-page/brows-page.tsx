import classNames from 'classnames';
import styles from './browse-page.module.scss';

export interface BrowsPageProps {
    className?: string;
}

export const BrowsePage = ({ className }: BrowsPageProps) => {
    return <div className={classNames(styles.root, className)}></div>;
};
