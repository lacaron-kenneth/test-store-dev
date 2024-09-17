import { createBoard } from '@wixc3/react-board';
import { MiniCart } from '../../../components/mini-cart/mini-cart';

export default createBoard({
    name: 'MiniCart',
    Board: () => <MiniCart />,
    isSnippet: true,
});
