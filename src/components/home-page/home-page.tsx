import classNames from 'classnames';
import styles from './home-page.module.scss';
import FigmaLogoCopy1Svg from '../../assets/figma  logo_copy1.svg';
import ChevronRightSvg from '../../assets/chevron right.svg';
import Homeimage3Jpeg from '../../assets/homeimage3.jpeg';
import { Hero } from '../hero/hero';
import { Header } from '../header/header';
import { Gallery } from '../gallery/gallery';
import { Helmet } from 'react-helmet';
export interface HomePageProps {
    className?: string;
}

export const HomePage = ({ className }: HomePageProps) => {
    return (
        <div className={styles.homepage}>
            <Helmet>
                <title>Cyberbacker Store</title>
                <meta name='description' content='Cyberbacker Official Merch Store. Browse different types of merchandises from hoodies to tumblers.'/>
                <meta name='keywords' content='cyberbacker, cyberbacker store, cb merch store, cyberbacker merchandise'/>

            </Helmet>
            <Header />
            <Hero />
            <Gallery />
        </div>
    );
};
