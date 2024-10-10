import { createBoard } from '@wixc3/react-board';
import { MemoryRouter } from 'react-router-dom';
import { CheckoutPage } from '../../../components/checkout-page/checkout-page';

export default createBoard({
    name: 'CheckoutPage',
    Board: () => <MemoryRouter><CheckoutPage /> </MemoryRouter>,
    isSnippet: true,
});
