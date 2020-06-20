import React, {ChangeEvent, useEffect, useMemo, useState} from 'react';
import style from './../pages/MainPage.module.scss';
import _ from 'lodash';

type SearchPropsType = {
    value: string
    onChange: (value: string) => void
    throttle?: number
}
export const Search: React.FC<SearchPropsType> = (props) => {
    const parentOnChange = useMemo(() => {

        const throttledFunction = _.throttle((value: string) => {
            props.onChange(value);
        }, props.throttle);

        return throttledFunction;
    }, [props.onChange, props.throttle])


    useEffect(() => {
        setValue(props.value)
    }, [props.value])


    const [value, setValue] = useState(props.value);

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
        parentOnChange(e.currentTarget.value);
    }

    return <div className={style.search}>
        <input placeholder={'Enter the name...'} value={value} onChange={onChange}/>
    </div>
}
