import React, {ChangeEvent, ComponentType, EventHandler, PropsWithChildren, useEffect} from 'react'
import {RootState} from '../../rootReducer'
import {useDispatch, useSelector} from 'react-redux'
import {IColumn, IFilter} from "./dataViewTypes";
import '../dataView/dataView.css'
import {setFilterValue, setSort} from './dataViewSlice';
import useDataView from "./useDataView";
import { ColumnTypes } from './dataViewEnum';

// import {RootState} from '../../app/rootReducer'
// import {setCurrentPage, setFilterValue, setPerPage, setSort} from "./dataViewSlice";
//
// import './dataView.css'
//
// import {ActionTypes, ColumnTypes, DWProps, Filter, FProps, RProp} from './dataViewTypes';
// import CreatableSelect from "react-select/creatable";
// import {ValueType} from "react-select/src/types";
// import {Pagination} from 'react-bootstrap';
//
// type InputEvent = ChangeEvent<HTMLInputElement>
// type SelectEvent = ChangeEvent<HTMLSelectElement>
type ChangeHandler = (e: ChangeEvent<HTMLInputElement>) => void
// type SelectHandler = (e: SelectEvent) => void
// type KeyboardEventHandler = EventHandler<React.KeyboardEvent>;

const SortUp = () =>
    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="sort-amount-up"
         className="svg-inline--fa fa-sort-amount-up fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg"
         viewBox="0 0 512 512">
        <path fill="currentColor"
              d="M304 416h-64a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h64a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16zM16 160h48v304a16 16 0 0 0 16 16h32a16 16 0 0 0 16-16V160h48c14.21 0 21.38-17.24 11.31-27.31l-80-96a16 16 0 0 0-22.62 0l-80 96C-5.35 142.74 1.77 160 16 160zm416 0H240a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h192a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16zm-64 128H240a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h128a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16zM496 32H240a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h256a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z"></path>
    </svg>

const SortDown = () =>
    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="sort-amount-down"
         className="svg-inline--fa fa-sort-amount-down fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg"
         viewBox="0 0 512 512">
        <path fill="currentColor"
              d="M304 416h-64a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h64a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16zm-128-64h-48V48a16 16 0 0 0-16-16H80a16 16 0 0 0-16 16v304H16c-14.19 0-21.37 17.24-11.29 27.31l80 96a16 16 0 0 0 22.62 0l80-96C197.35 369.26 190.22 352 176 352zm256-192H240a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h192a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16zm-64 128H240a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h128a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16zM496 32H240a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h256a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z"></path>
    </svg>


export type ItemType<P = any> = { [K in keyof P]: string | number }

interface DWProps<T> {
    data: T[],
    columns: IColumn[],
}

interface TableProps {
    columns: IColumn[],
}

export function DataView<T extends ItemType>({data, columns}: PropsWithChildren<DWProps<T>>) {

    const {sort, filters} = useSelector((state: RootState) => state.dataView)

    const {updateURL} = useDataView();

    useEffect(() => {
        updateURL();
    })

    console.log(filters);

    return <div className={'data-view'}>
        <Table data={data} columns={columns}/>

        {/*<PaginationInfo/>*/}
        {/*<Table columns={columns} actions={actions} renderActionColumn={renderActionColumn} data={data}/>*/}
        {/*<PaginationButtons/>*/}
    </div>
}

// const Table = ({columns, actions, renderActionColumn, data}: DWProps) => {
function Table<T extends ItemType>({data, columns}: DWProps<T>) {
    return <div className={'table-view'}>
        <table className="table table-bordered">
            <thead>
            <TitleRaw columns={columns}/>
            <FilterRaw columns={columns}/>
            </thead>
            {/*<tbody>{data.map((item, index) => (*/}
            {/*    <tr key={index} style={{backgroundColor : item.color}}>*/}
            {/*        {columns.map((column, columnIndex) => {*/}
            {/*            switch (column.type) {*/}
            {/*                case ColumnTypes.serial:*/}
            {/*                    return <td key={columnIndex}>{index + 1}</td>*/}
            {/*                case ColumnTypes.string:*/}
            {/*                case ColumnTypes.select:*/}
            {/*                {*/}
            {/*                    let field: string = column.field.toString();*/}
            {/*                    let data = item;*/}

            {/*                    field.split('.').forEach((elem : string) => {*/}
            {/*                        if(data){*/}
            {/*                            // @ts-ignore*/}
            {/*                            data = data[elem];*/}
            {/*                        }*/}
            {/*                    });*/}
            {/*                    return <td key={columnIndex}>{data}</td>*/}
            {/*                }*/}
            {/*                case ColumnTypes.render : {*/}
            {/*                    return <td key={columnIndex}>{column.render && column.render(item)}</td>*/}
            {/*                }*/}
            {/*            }*/}
            {/*            return <td/>*/}
            {/*        })}*/}
            {/*        <td>{renderActionColumn(item)}</td>*/}
            {/*    </tr>*/}
            {/*))}*/}
            {/*</tbody>*/}
        </table>
    </div>
}


function TitleRaw({columns}: TableProps) {
    const dispatch = useDispatch()
    const {sort} = useSelector((state: RootState) => state.dataView)

    const handleSort = (field: string) => {
        dispatch(setSort(field));
    }

    return <tr>{columns.map((column, index) => (
        <th key={'title' + index}
            className={column.sortable ? 'pointer' : ''}
            onClick={() => handleSort(column.field)}>
            <div className={'filter'}>
                <div>{column.title}</div>
                {column.field === sort && <SortUp/>}
                {`-${column.field}` === sort && <SortDown/>}
            </div>
        </th>))}
        <th/>
    </tr>
}

function FilterRaw ({columns}: TableProps){

    const dispatch = useDispatch()
    const {filters} = useSelector((state: RootState) => state.dataView)

    const onChangedValue: ChangeHandler = e => {
        dispatch(setFilterValue({
            field: e.target.name,
            value: e.target.value
        }));
    }

    // const handleKeywordKeyPress : KeyboardEventHandler = e =>{
    //     if(e.key == 'Enter'){
    //         dispatch(setFilterValue({
    //             field: e.target.name,
    //             value: e.target.value
    //         }));
    //     }
    // };

    // const onChangeSelect = (filter : ValueType<any>, field :string) => {
    //     dispatch(setFilterValue({
    //         field: field,
    //         value: filter ? filter.id : ''
    //     }));
    // }

    return <tr>{columns.map((column, index) => {
        if (column.filterable) {

            let filter : IFilter = filters.find(filter => filter.field === column.field) || {field : column.field, value : ''};
            console.log(filter);
            //
            // let selectFilter : Filter = filters.find(filter => filter.field === column.selectField)
            //     || {field : column.field.toString(), value : ''};
            //
            //
            // if(column.type === ColumnTypes.render && column.selectData?.length && column.selectData.length > 0){
            //     const options = (column.selectData || []).map((filter) => {return {id : filter.id, text : filter.value}});
            //     return  <td key={index} style={column.style}>
            //         <CreatableSelect
            //             placeholder={column.title}
            //             isClearable
            //             isMulti={false}
            //             onChange={(filter) => onChangeSelect(filter, column.selectField || '' )}
            //             getOptionLabel={v => v.text}
            //             getOptionValue={v => v.id}
            //             options={options }
            //             value={options.find(o => o.id == selectFilter.value)}
            //         />
            //     </td>
            // }

            switch (column.type) {
                case ColumnTypes.string:
                case ColumnTypes.render:
                {
                    // return <td key={index} style={column.style}>
                    return <td key={index}>
                        <input name={column.field}
                               value={filter.value}
                               onChange={onChangedValue}
                        />
                    </td>
                }
                // case ColumnTypes.select: {
                //     const options = (column.selectData || []).map((filter) => {return {id : filter.id, text : filter.value}});
                //     return  <td key={index} style={column.style}>
                //         <CreatableSelect
                //             placeholder={column.title}
                //             isClearable
                //             isMulti={false}
                //             onChange={(filter) => onChangeSelect(filter, column.selectField || '' )}
                //             getOptionLabel={v => v.text}
                //             getOptionValue={v => v.id}
                //             options={options }
                //             value={options.find(o => o.id == selectFilter.value)}
                //         />
                //     </td>
                // }
            }
        }
        return <td key={index}/>;
    })}
        <td/>
    </tr>
}


//
// const PaginationInfo = () => {
//     const dispatch = useDispatch();
//     const {pagination} = useSelector((state: RootState) => state.dataView)
//
//     const perPage = (number : number) => {dispatch(setPerPage(number))}
//
//     const perPageVariants = [2, 5, 10, 15, 20, 25, 50];
//
//     return <div className={'pagination'}>
//         {pagination.totalCount > 0 && <div className={'row'}>
//            <div>Показаны записи {pagination.firstRow}-{pagination.lastRow} из {pagination.totalCount}</div>
//             <select onChange={e => perPage(Number(e.target.value))} value={pagination.perPage}>
//                 {perPageVariants.map(variant => <option key={variant} value={variant} className={variant == pagination.perPage ? 'active' : ''}>{variant}</option>)}
//             </select>
//         </div>}
//     </div>
// }
//
// const PaginationButtons= () => {
//     const dispatch = useDispatch();
//     const {pagination} = useSelector((state: RootState) => state.dataView)
//
//     const page = (number : number) => {dispatch(setCurrentPage(number))}
//
//     return <div className={'pagination'}>
//         <Pagination>
//             {pagination.needFirstPageButton && <Pagination.First onClick={()=> page(1)}/>}
//             {pagination.needPrevPageButton && <Pagination.Prev onClick={()=> page(pagination.currentPage - 1)}/>}
//             {pagination.items.map((item) => {
//                 return <Pagination.Item key={item} active={(item === pagination.currentPage)} onClick={()=> page(item)}>
//                     {item}
//                 </Pagination.Item>
//             })}
//             {pagination.needNextPageButton && <Pagination.Next onClick={()=> page(pagination.currentPage + 1)}/>}
//             {pagination.needLastPageButton && <Pagination.Last onClick={()=> page(pagination.pageCount)}/>}
//         </Pagination>
//     </div>
// }
//

//
// const TitleRaw = ({columns}: RProp) => {
//     const dispatch = useDispatch()
//     const {sort} = useSelector((state: RootState) => state.dataView)
//
//     const handleSort = (field :string) => {
//         dispatch(setSort(field));
//     }
//
//     return <tr>{columns.map((column, index) => (
//         <th key={`title${index}`}
//             className={column.sortable? 'pointer' : ''}
//             onClick={() => handleSort(column.field)}
//         >
//             <div className={'filter'}>
//                 <div>{column.title}</div>
//                 {column.field === sort && <i className="fas fa-sort-alpha-up"/>}
//                 {`-${column.field}` === sort && <i className="fas fa-sort-alpha-down"/>}
//             </div>
//
//         </th>))}
//         <th/>
//     </tr>
// }
//

