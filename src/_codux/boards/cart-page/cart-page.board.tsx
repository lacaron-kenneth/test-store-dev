import { createBoard } from '@wixc3/react-board';
import { CartPage } from '../../../components/cart-page/cart-page';
import { MemoryRouter } from 'react-router-dom';

export default createBoard({
    name: 'CartPage',
    Board: () => <MemoryRouter><CartPage />,</MemoryRouter> ,

    isSnippet: true,
});
