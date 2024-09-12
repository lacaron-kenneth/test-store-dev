import classNames from 'classnames';
import styles from './hero.module.scss';
import FigmaLogoCopy1Svg from '../../assets/figma  logo_copy1.svg';
import ChevronRightSvg from '../../assets/chevron right.svg';
import Homeimage3Jpeg from '../../assets/homeimage3.jpeg';
import homePageStyles from '../home-page/home-page.module.scss';

export interface HeroProps {
    className?: string;
}

/**
 * This component was created using Codux's Default new component template.
 * To create custom component templates, see https://help.codux.com/kb/en/article/kb16522
 */
export const Hero = ({ className }: HeroProps) => {
    return (
        <div className={styles.hero}>
            <div className={styles.content}>
                <h1 className={styles.title}>Welcome to the Cyberbacker Store</h1>
                <h2 className={styles.subtitle}>Exclusive merchandises offered by Cyberbacker</h2>
                <p className={styles.text}>Browse items faster using our exclusive storefront</p>
                <div className={styles.buttons}>
                    <button className={styles.button}>
                        <img src={FigmaLogoCopy1Svg} alt="" />
                        View Merch{' '}
                    </button>
                    <button className={styles.button2}>
                        Learn More
                        <img src={ChevronRightSvg} alt="" />
                    </button>
                </div>
            </div>
            <img src={Homeimage3Jpeg} alt="" className={styles.image} />
        </div>
    );
};
