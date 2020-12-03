// import {IService} from "../service/serviceTypes";
import {ReactNode} from "react";
import { ColumnTypes } from "./dataViewEnum";


export interface IDataView {
    data : [],
    filters : IFilter[],
    sort? : string,
    pagination? : IPagination
    errors? : IErrorItem[]
}

export interface IFilter {
    field : string,
    value : string,
    data? :  FilterItem[]
}

export interface FilterItem {
    id : any,
    value : any
}

export interface IErrorItem{
    field : string,
    text : string
}

export interface IPagination{
    currentPage: number,
    pageCount: number,
    perPage: number,
    totalCount: number,
    firstRow: number,
    lastRow: number,
    needFirstPageButton: boolean,
    needLastPageButton: boolean,
    needPrevPageButton: boolean,
    needNextPageButton: boolean,
    items:  number[]
}


export interface IColumn {
    type: ColumnTypes.string | ColumnTypes.checkbox | ColumnTypes.render | ColumnTypes.serial | ColumnTypes.select
    title: string
    field : string,

    sortable: boolean
    filterable: boolean

    render? : (item : any) => ReactNode
    // selectField? : string
    // selectData? : FilterItem[]
    // style? : {}
}



//
// export enum ActionTypes {
//     receive = 'receive',
//     create = 'create',
//     update = 'update'
// }
//
// export enum ModelTypes {
//     primary = 'primary',
//     string = 'string',
//     relation = 'relation',
//     date = 'date',
// }
//
//
//

//
// export interface DataResult {
//     data: [],
//     error : IError
// }
//
// export interface DataResultWithHeaders {
//     data: [],
//     error : IError,
//     headers : IHeaders
// }
//
// export interface DataFilterResult {
//     data: FilterItem[],
//     error : {}
// }
//
//
// export interface DataServiceResult {
//     data: IService[],
//     error : IError
// }
//
// export interface DataScanResult {
//     data: {
//         new : boolean,
//         nld : string[],
//         person : {
//             name  : string,
//             surname : string,
//             patronymic : string
//         }
//     },
//     error : {
//         status : string,
//         message : string
//     }
// }
//
// export interface IHeaders {
//     'x-pagination-current-page' : string,
//     'x-pagination-page-count' : string,
//     'x-pagination-per-page' : string,
//     'x-pagination-total-count' : string
// }
//
//
//

//

//

//
//
// export interface RProp {
//     columns: IColumn[]
// }
//
//
// export interface DRProps {
//     index: number,
//     item: IService,
//     columns: IColumn[]
// }
//
//
// export interface FProps {
//     columns: IColumn[],
//     actions: IActions
// }
//
// export interface IActions {
//     [k: string]: any
// }
//
// export interface IError{
//     status : string,
//     fields : any
// }
//
// // export interface IErrorField{
// //     [key : string] : [],
// //     text : []
// // }
//
//
//
// export interface IErrorItem{
//     field : string,
//     text : string
// }
//
//
// // type keyOfServiceItem = keyof ServiceItem;
//
// // in process
// export interface IColumn {
//     title: string
//     type: ColumnTypes.string | ColumnTypes.checkbox | ColumnTypes.render | ColumnTypes.serial | ColumnTypes.select
//     field : string,
//     // field: keyOfServiceItem
//     sortable: boolean
//     filterable: boolean
//
//     render? : (item : any) => ReactNode
//     selectField? : string
//     selectData? : FilterItem[]
//     style? : {}
// }
//
// export interface IModelItem {
//     label : string,
//     type :  ModelTypes.relation | ModelTypes.string | ModelTypes.date | ModelTypes.primary,
//     value : string,
//     isRequired : boolean,
//     field : string,
//
//     data : FilterItem[],
//
//     // isExtraField? : boolean // дополнительное поле которого не будет на форме
//     onCreate : boolean, // ? при каких экшенах юзаем
//     onUpdate : boolean, // ? при каких экшенах юзаем
// }
//
//



