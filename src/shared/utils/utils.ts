import { MediaObserver } from '@angular/flex-layout';

export const calcGridColumns = (mediaObserver: MediaObserver, { xs, sm, md, lg, xl }) => {
    const grid = new Map([
        ['xs', xs], ['sm', sm], ['md', md], ['lg', lg], ['xl', xl]
    ]);
    let res: number;
    grid.forEach((nCols, mqAlias) => {
        if (mediaObserver.isActive(mqAlias)) {
            res = nCols;
        }
    });
    return res;
};
