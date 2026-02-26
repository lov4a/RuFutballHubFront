interface IPaginationResponse<T> {
    pageNumber: number;
    pageSize: number;
    totalCount: number;
    items: T[];
}

interface IInfiniteQueryResponse<T, P> {
    pages: IPaginationResponse<T>[];
}


const getNextPageParam = <T extends IPaginationResponse<object>>(lastPage: T, allPages: T[], lastPageParam: number) => {
    const param = lastPage.totalCount - allPages.map((page) => page.items).flat().length;
    return param <= 0 ? undefined : lastPageParam + 1;
};

const selectPagedData = <T extends object>(data: IInfiniteQueryResponse<T, number>) =>
    data.pages
        .map((page) => page)
        .reduce((accumulator, currentValue) => {
            return { total: accumulator.totalCount, body: [...accumulator.items, ...currentValue.items] };
        }) as IPaginationResponse<T>;

export { getNextPageParam, selectPagedData };