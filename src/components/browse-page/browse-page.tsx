import classNames from 'classnames';
import styles from './browse-page.module.scss';
import { Header } from '../header/header';
import { Gallery } from '../gallery/gallery';
import { Helmet } from 'react-helmet';

export interface BrowsePageProps {
    className?: string;
}

export const BrowsePage = ({ className }: BrowsePageProps) => {
    return (
        <div className={classNames(styles.root, className)}>
            <Helmet>
                <title>Browse Cyberbacker Store</title>
                <meta name='description' content='Cyberbacker Official Merch Store. Browse different types of merchandises from hoodies to tumblers.'/>
                <meta name='keywords' content='cyberbacker, cyberbacker store, cb merch store, cyberbacker merchandise'/>
            </Helmet>
            <Header />
            <Gallery />
        </div>
    );
};
