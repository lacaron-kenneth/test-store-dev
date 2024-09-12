import { createBoard } from '@wixc3/react-board';
import { Drawer } from '../../../components/drawer/drawer';
import styles from './drawer.board.module.scss';
import classNames from 'classnames';

export default createBoard({
    name: 'Drawer',
    Board: () => <Drawer />,
    isSnippet: true,
});
