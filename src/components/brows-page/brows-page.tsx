import classNames from 'classnames';
import styles from './browse-page.module.scss';

export interface BrowsePageProps {
    className?: string;
}

export const BrowsePage = ({ className }: BrowsPageProps) => {
    return <div className={classNames(styles.root, className)}></div>;
};
