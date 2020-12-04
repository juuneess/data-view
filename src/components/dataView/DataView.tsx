import React, {ChangeEvent, ComponentType, EventHandler, PropsWithChildren, useEffect} from 'react'
import {RootState} from '../../rootReducer'
import {useDispatch, useSelector} from 'react-redux'
import {IColumn, IFilter} from "./dataViewTypes";
import '../dataView/dataView.css'
import {setFilterValue, setSort} from './dataViewSlice';
import useDataView from "./useDataView";
import {ColumnTypes} from './dataViewEnum';
import {Pencil, SortDown, SortUp} from '../icons';
import {Button, Modal } from 'react-bootstrap';
// import Modal from "../modal/Modal";
import { setModalShow } from '../modal/modalSlice';
import {Modes} from "../modal/ModalTypes";

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


export type ItemType<P = any> = { [K in keyof P]: string | number | P }

interface DWProps<T> {
    data: T[],
    columns: IColumn[],
    modal? : () => JSX.Element
    action?: ({item}: ItemType) => JSX.Element
}

interface TableProps {
    columns: IColumn[],
    action?: ({item}: ItemType) => JSX.Element
}

export function DataView<T extends ItemType>({ data, columns, action, modal }: PropsWithChildren<DWProps<T>>) {

    const dispatch = useDispatch()
    const {updateURL} = useDataView();
    const {show, mode} = useSelector((state: RootState) => state.modal)

    useEffect(() => {
        updateURL();
    })


    const handleCloseModal= () => {
        dispatch(setModalShow(false))
    }

    const update = () => {
        dispatch(setModalShow(false))
    }

    const create = () => {
        dispatch(setModalShow(false))
    }


    return <div className={'data-view'}>

        <Table data={data} columns={columns} action={action}/>

        <Modal show={show} onHide={handleCloseModal}>
            <Modal.Header closeButton>
                {mode === Modes.create && <Modal.Title>Создать</Modal.Title>}
                {mode === Modes.update && <Modal.Title>Обновить</Modal.Title>}
            </Modal.Header>
            <Modal.Body>
                {modal}
            </Modal.Body>
            <Modal.Footer>
                <Button variant={'secondary'} onClick={handleCloseModal}>Отмена</Button>
                {mode === Modes.create &&  <Button variant={'primary'} onClick={update}>Создать</Button>}
                {mode === Modes.update &&  <Button variant={'primary'} onClick={create}>Обновить</Button>}
            </Modal.Footer>
        </Modal>

        {/*<Modal isShow={isShow} hide={()=>dispatch(setIsShow)} bodyContent={<div>ll</div>} title={'titis'}/>*/}
        {/*<PaginationInfo/>*/}
        {/*<Table columns={columns} actions={actions} renderActionColumn={renderActionColumn} data={data}/>*/}
        {/*<PaginationButtons/>*/}
    </div>
}

function Table<T extends ItemType>({data, columns, action}: DWProps<T>) {

    const dispatch = useDispatch()

    const onUpdate = () => {
        dispatch(setModalShow(true))
    }

    return <div className={'table-view'}>
        <table className="table table-bordered">
            <thead>
            <TitleRaw columns={columns} action={action}/>
            <FilterRaw columns={columns} action={action}/>
            </thead>
            <tbody>{data.map((item, index) =>
                <tr key={index} style={{backgroundColor: item.color?.toString()}}>
                    {columns.map((column, columnIndex) => {
                        switch (column.type) {
                            case ColumnTypes.serial:
                                return <td key={columnIndex}>{index + 1}</td>
                            case ColumnTypes.string:
                            case ColumnTypes.select: {
                                let fields = column.field; // допускаем вложенность
                                let data = item;
                                fields.split('.').forEach((field) => {
                                    if (data) {
                                        data = data[field]
                                    }
                                });
                                return <td key={columnIndex}>{data}</td>
                            }
                        }
                        return <td/>
                    })}
                    <td>
                        <div className={'actions'}>
                            <div onClick={onUpdate}><Pencil/></div>
                            <div onClick={onUpdate}><Pencil/></div>
                        </div>
                    </td>
                    {/*{renderAction !== undefined && <td>{ renderAction(item)}</td>}*/}
                </tr>
            )}</tbody>
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


function TitleRaw({columns, action}: TableProps) {
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
        {action !== undefined && <th/>}
    </tr>
}

function FilterRaw({columns, action}: TableProps) {

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

            let filter: IFilter = filters.find(filter => filter.field === column.field) || {
                field: column.field,
                value: ''
            };

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
                case ColumnTypes.render: {
                    // return <td key={index} style={column.style}>
                    return <td key={index}>
                        <input name={column.field}
                               value={filter.value}
                               onChange={onChangedValue}
                               className={'form-control'}
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
        {/*{renderAction !== undefined && <td/>}*/}
    </tr>
}



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

