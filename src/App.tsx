import React from "react";
import './App.css';
import {DataView, ItemType} from "./components/dataView/DataView";
import {isNumber} from "util";
import { ColumnTypes } from './components/dataView/dataViewEnum';
import {IColumn} from "./components/dataView/dataViewTypes";
import 'bootstrap/dist/css/bootstrap.min.css';



// const DataViewMy extends DataView;

// interface iservice extends ItemType {
//     id: 1,
//     name: string
// }
//
// const item: iservice = {
//     id: 1,
//     name: 'name'
// }

function App() {

    const data = [
        {
            id : 1,
            name : "name 1"
        },
        {
            id : 2,
            name : "name 2"
        }
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
            <DataView data={data} columns={columns}/>
        </div>
    );
}

export default App;
