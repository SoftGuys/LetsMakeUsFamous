const fs = require('fs');

const PAGE_SIZE = 12;
const VISIBLE_PAGES = 5;

const utils = {
    getPagination(
        currentPage,
        totalElementsCount) {
        if (Number.isNaN(Number(currentPage))) {
            currentPage = 1;
        }
        console.log(totalElementsCount);
        const lastPage = Math.ceil(totalElementsCount / PAGE_SIZE);
        if (currentPage > lastPage || currentPage < 1) {
            currentPage = 1;
        }

        const pages = [currentPage];
        let pagesCount = 1;
        while (pagesCount < VISIBLE_PAGES) {
            const prevPage = pages[0] - 1;
            const nextPage = pages[pages.length - 1] + 1;

            if (nextPage > lastPage && prevPage < 1) {
                break;
            }

            if (prevPage > 0) {
                pages.unshift(prevPage);
                pagesCount += 1;
            }

            if (nextPage <= lastPage) {
                pages.push(nextPage);
                pagesCount += 1;
            }
        }

        return {
            pages,
            lastPage,
            currentPage,
            pageSize: PAGE_SIZE,
        };
    },
    getDistanceFromLatLong(lat1, lon1, lat2, lon2) {
        const p = 0.017453292519943295;
        const c = Math.cos;
        const a = 0.5 - c((lat2 - lat1) * p) / 2 +
            c(lat1 * p) * c(lat2 * p) *
            (1 - c((lon2 - lon1) * p)) / 2;

        return 12742 * Math.asin(Math.sqrt(a));
    },
    deleteFile(filePath) {
        if (typeof filePath !== 'string') {
            throw new Error('filePath must be a string!');
        }

        fs.unlinkSync(filePath);
    },
};

module.exports = utils;
