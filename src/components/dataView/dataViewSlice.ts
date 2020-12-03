import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import { IDataView, IFilter } from './dataViewTypes'


let filters: IFilter[] = [];
let sort: string = '';

// eslint-disable-next-line no-restricted-globals
const params = new URLSearchParams(location.search);
// @ts-ignore
params.forEach((value: string, key: string) => {
    if (key === 'sort') {
        sort = value;
    } else {
        let fieldMatch = key.match(/\[(.*)\]/);
        let field = fieldMatch ? fieldMatch[1] : '';
        if (field === '' || field == null || field.length <= 1) {
            return true;
        }
        filters.push({field, value});
    }
})
const initialState: IDataView = {
    data: [],
    sort : sort,
    filters : filters
}


const dataViewReducer = createSlice({
    name: 'dataView',
    initialState: initialState,
    reducers: {
        // setData(state, {payload}: PayloadAction<DataResult>) {
        //     const {data} = payload
        //     state.data = data;
        // },
        // setPagination(state, {payload}: PayloadAction<DataResultWithHeaders>) {
        //     const {headers} = payload
        //
        //     if(typeof headers === "undefined") return
        //
        //     state.pagination.currentPage =  Number(headers['x-pagination-current-page']);
        //     state.pagination.pageCount = Number(headers['x-pagination-page-count'])
        //     state.pagination.perPage = Number(headers['x-pagination-per-page'])
        //     state.pagination.totalCount =  Number(headers['x-pagination-total-count'])
        //
        //     state.pagination.firstRow =  (Number(state.pagination.currentPage) - 1) * Number(state.pagination.perPage)  + 1;
        //     state.pagination.lastRow =  Number(state.pagination.currentPage) * Number(state.pagination.perPage) > state.pagination.totalCount ? state.pagination.totalCount : Number(state.pagination.currentPage) * Number(state.pagination.perPage);
        //     state.pagination.needFirstPageButton = state.pagination.pageCount > 0 && state.pagination.currentPage != 1;
        //     state.pagination.needLastPageButton =  state.pagination.pageCount > 0 &&  state.pagination.currentPage !=  state.pagination.pageCount;
        //     state.pagination.needPrevPageButton =  state.pagination.needFirstPageButton;
        //     state.pagination.needNextPageButton = state.pagination.needLastPageButton;
        //     state.pagination.items = setPaginationItems(state.pagination)
        // },
        // setCurrentPage(state, {payload} : PayloadAction<number>){
        //     state.pagination.currentPage = payload
        //     state.pagination.items = setPaginationItems(state.pagination)
        // },
        // setPerPage(state, {payload} : PayloadAction<number>){
        //     state.pagination.perPage = payload
        //     state.pagination.items = setPaginationItems(state.pagination)
        // },
        //
        setFilterValue: function (state, {payload}: PayloadAction<IFilter>) {
            const {field, value} = payload;
            let filters = state.filters;
            let filterIndex = filters.findIndex(filter => filter.field === field);
            if (filterIndex !== -1) {
                filters[filterIndex].value = value;
            } else {
                filters = [...filters, {field: field, value: value}]
            }
            state.filters = filters;
        },
        setSort(state, {payload}: PayloadAction<string>) {
            if (state.sort === payload) {
                payload = `-${payload}`
            }
            state.sort = payload;
        },
        //
        // setError(state, {payload}: PayloadAction<IErrorItem>) {
        //     state.errors = [...state.errors, payload]
        // },
        // clearError(state, {payload}: PayloadAction<IErrorItem>) {
        //     state.errors = state.errors.filter(e => e.field !== payload.field)
        // }
    }
})
//
// let filterInitialState: Filter[] = [];
// let sortInitialState: string = '';
// const params = new URLSearchParams(location.search);
//
// // @ts-ignore
// params.forEach((value: string, key: string) => {
//     if (key === 'sort') {
//         sortInitialState = value;
//     } else {
//         let fieldMatch = key.match(/\[(.*)\]/);
//         let field = fieldMatch ? fieldMatch[1] : '';
//
//         if (field === '' || field == null || field.length <= 1) {
//             return true;
//         }
//         let filter: Filter = {field, value}
//         filterInitialState.push(filter);
//     }
// })
//
// const paginationInitialState: IPagination = {
//     currentPage: 1,
//     pageCount: 0,
//     perPage: 10,
//     totalCount: 0,
//     firstRow: 1,
//     lastRow: 20,
//     needFirstPageButton: false,
//     needLastPageButton: false,
//     needPrevPageButton: false,
//     needNextPageButton: false,
//     items: []
// }
//
//

//
//
// export const setParams = () => {
//
//     const {filters, sort , pagination} = store.getState().dataView;
//     const params = new URLSearchParams();
//
//     if (sort !== '' && sort !== undefined) {
//         params.append('sort', sort);
//     }
//
//     filters.forEach(filter => {
//         params.append(`filter[${filter.field}]`, filter.value);
//     });
//     params.append('page', pagination.currentPage.toString());
//     params.append('per-page', pagination.perPage.toString());
//     return params
// }
//
//
//
// export const setPaginationItems = (pagination : IPagination) => {
//     let items = [];
//     if (pagination.pageCount > 1) {
//         let firstPage : number = 0;
//         let lastPage : number = 0;
//         if (pagination.pageCount < 10) {
//             firstPage = 0;
//             lastPage = pagination.pageCount;
//         } else {
//             if (pagination.currentPage < 7) {
//                 firstPage = 0;
//                 lastPage = 10;
//             } else {
//                 if (Number(pagination.currentPage) + 4 > pagination.pageCount) {
//                     firstPage = Number(pagination.pageCount) - 10;
//                     lastPage = pagination.pageCount;
//                 } else {
//                     firstPage = Number(pagination.currentPage) - 6;
//                     lastPage = Number(pagination.currentPage)  + 4;
//                 }
//             }
//         }
//         for (let number :number = firstPage; number < lastPage; number++) {
//             items.push(number + 1);
//         }
//     }
//     return items;
// }
//
//


//
//
// export const receiveData = (receive: Promise<DataResultWithHeaders>): AppThunk => async dispatch => {
//     receive.then(
//         result => {
//             dispatch(setData(result));
//             dispatch(setPagination(result));
//         },
//         reject => {
//
//         }
//     );
// }
//
// export const receiveData2 = (receive: Promise<DataResultWithHeaders>): AppThunk => async dispatch => {
//     receive.then(
//         result => {
//             dispatch(setData(result));
//             dispatch(setPagination(result));
//         },
//         reject => {
//
//         }
//     );
// }



export const {

    // setData,
    // setPagination,
    // setCurrentPage,
    // setPerPage,

    // setFilterValue,
    // setError,
    setSort,
    setFilterValue,
    // clearError
} = dataViewReducer.actions

export default dataViewReducer.reducer
