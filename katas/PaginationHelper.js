class PaginationHelper {
    #collection = [];
    #itemsPerPage = 0;
    #pageCount = 0;
    #itemCount = 0;
    constructor(collection, itemsPerPage) {
        this.#collection = collection;
        this.#itemsPerPage = itemsPerPage;
        this.#pageCount = Math.ceil(collection.length / itemsPerPage);
        this.#itemCount = collection.length;
    }
    itemCount() {
        return this.#itemCount;
    }
    pageCount() {
        return this.#pageCount;
    }
    pageItemCount(pageIndex) {
        let pageCount = this.#pageCount;
        if (pageIndex >= pageCount || pageIndex < 0) {
            return -1;
        } else if (pageIndex == pageCount - 1) {
            let rem = this.#itemCount % this.#itemsPerPage;
            return rem == 0 ? this.#itemsPerPage : rem;
        }
        return this.#itemsPerPage;
    }
    pageIndex(itemIndex) {
        let itemCount = this.#itemCount;
        if (itemIndex < 0 || itemIndex >= this.#itemCount) {
            return -1;
        }
        return Math.floor(itemIndex / this.#itemsPerPage);
    }
}