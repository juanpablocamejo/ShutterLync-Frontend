import { MatPaginatorIntl } from '@angular/material';

export class SpanishMatPaginatorIntl extends MatPaginatorIntl {
    constructor() {
        super();
        this.itemsPerPageLabel = 'Resultados por página:';
        this.nextPageLabel = 'Siguiente';
        this.previousPageLabel = 'Anterior';
        this.getRangeLabel = (page: number, pageSize: number, length: number) => {
            if (length === 0 || pageSize === 0) { return `0 de ${length}`; }
            length = Math.max(length, 0);
            const startIndex = page * pageSize;
            const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
            return `${startIndex + 1} - ${endIndex} de ${length}`;
        };
    }

}
