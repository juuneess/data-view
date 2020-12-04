import { useState } from 'react';
import {useDispatch, useSelector} from "react-redux";
import { RootState } from '../../rootReducer';


const useDataView = () => {

    const dispatch = useDispatch();

    const {data, sort, filters } = useSelector((state: RootState) => state.dataView)
    // const [isOpenCalendar, setIsOpenCalendar] = useState(false);

    // function toggleCalendar() {
    //     setIsOpenCalendar(!isOpenCalendar);
    // }
    //
    function updateURL() {
        // eslint-disable-next-line no-restricted-globals
        const params = new URLSearchParams(location.search);
        filters.forEach((filter, index) => {
            if(filter.value !== null && filter.value !== '' && typeof (filter.value) !== "undefined"){
                params.set(`filter[${filter.field}]`, filter.value);
            }else{
                params.delete(`filter[${filter.field}]`)
            }
        });
        if(sort !== '' && typeof sort !== "undefined"){
            params.set('sort', sort);
        }
        // eslint-disable-next-line no-restricted-globals
        window.history.replaceState({}, "", decodeURIComponent(`${location.pathname}?${params}`));
    }

    return {
        updateURL
    }
};
export default useDataView;