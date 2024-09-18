import { createBoard } from '@wixc3/react-board';
import { PromotionCarousel } from '../../../components/promotion-carousel/promotion-carousel';

export default createBoard({
    name: 'PromotionCarousel',
    Board: () => <PromotionCarousel />,
    isSnippet: true,
});
