import { createBoard } from '@wixc3/react-board';
import { OrderDetailsPage } from '../../../components/order-details-page/order-details-page';

export default createBoard({
    name: 'OrderDetailsPage',
    Board: () => <OrderDetailsPage />,
    isSnippet: true,
});
