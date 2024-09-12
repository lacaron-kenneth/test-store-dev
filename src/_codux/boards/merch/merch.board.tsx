import { createBoard } from '@wixc3/react-board';
import { Merch } from '../../../components/merch/merch';

export default createBoard({
    name: 'Merch',
    Board: () => <Merch />,
    isSnippet: true,
    environmentProps: {
        windowWidth: 610,
    },
});
