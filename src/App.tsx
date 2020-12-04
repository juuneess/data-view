import React from "react";
import './App.css';
import {DataView, ItemType} from "./components/dataView/DataView";
// import {isNumber} from "util";
import { ColumnTypes } from './components/dataView/dataViewEnum';
import {IColumn} from "./components/dataView/dataViewTypes";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Pencil} from "./components/icons";


interface IItem extends ItemType {
    id: 1,
    name: string
}


export const Actions = ({ item }: ItemType<IItem>) => {

    const update = () => {
        console.log('update');
    }

    return <div className={'actions'}>
        <div onClick={update}><Pencil/></div>
        <div onClick={update}><Pencil/></div>
    </div>
}

const ModalContent = () => {
    return <div> Modal content </div>
}


function App() {

    const data = [
        {id : 1, name : "name 1"},
        {id : 2, name : "name 2"}
    ];

    const columns : IColumn[] = [
        {
            title: '#',
            type: ColumnTypes.serial,
            field: 'id',
            sortable: false,
            filterable: false
        },
        {
            title: 'Название',
            type: ColumnTypes.string,
            field: 'name',
            sortable: true,
            filterable: true
        },
    ]


    return (
        <div className="app">
            <DataView
                data={data}
                columns={columns}
                action={Actions}
                modal={ModalContent}
            />
        </div>
    );
}

export default App;
