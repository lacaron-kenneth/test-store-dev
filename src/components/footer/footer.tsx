import classNames from 'classnames';
import styles from './footer.module.scss';

export interface FooterProps {
    className?: string;
}

/**
 * This component was created using Codux's Default new component template.
 * To create custom component templates, see https://help.codux.com/kb/en/article/kb16522
 */
export const Footer = ({ className }: FooterProps) => {
    return (
        <footer className={classNames(styles.footer, styles.footer1)}>
            <p>© {new Date().getFullYear()} Cyberbacker. All rights reserved.</p>
        </footer>
    );
};
