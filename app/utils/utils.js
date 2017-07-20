const utils = {
    getPagination(currentPage, pagesVisibleCount) {
        if (Number.isNaN(Number(currentPage))) {
            currentPage = 1;
        }

        const pages = [currentPage];
        let pagesCount = 0;
        while (pagesCount < pagesVisibleCount) {
            const prevPage = pages[0] - 1;
            const nextPage = pages[pages.length - 1] + 1;

            if (prevPage > 0) {
                pages.unshift(prevPage);
                pagesCount += 1;
            }

            pages.push(nextPage);
            pagesCount += 1;
        }

        return pages;
    },
};

module.exports = utils;
