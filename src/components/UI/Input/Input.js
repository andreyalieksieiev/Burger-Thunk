import React from 'react';

import classes from './Input.css';

const input = (props) => {  // функцыя ввода
    let inputElement = null;
    const inputClasses = [classes.InputElement];

    if (props.invalid  && props.shouldValidate && props.touched) {              // если для props.Invalid будет  true ми добавляем новий клас Invalid
        inputClasses.push(classes.Invalid);
    }

    switch (props.elementType) {                   //переключаем реквизи (получили ЕЛЕМЕНТ ВВОДА)
        case ( 'input' ):                        // проверка на ввод
            inputElement = <input 
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />; // и устонавливаем нашу переменную (c именем елемента ввода)
            break;
        case ( 'textarea' ):                     // проверка на текст
            inputElement = <textarea 
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />; // и устонавливаем нашу переменную (c именем елемента ввода)
            break;
        case ( 'select' ):                     // проверка на текст
            inputElement = (
                <select
                    className={inputClasses.join(' ')}
                    value={props.value}
                    onChange={props.changed}>
                    {props.elementConfig.options.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.displyValue}
                        </option>
                    ))}
                </select>
                    ); // и устонавливаем нашу переменную (c именем елемента ввода)
            break;
        default:                                 // по умолчянию тоже устонавливается переменная INPUT
            inputElement = <input
                 className={inputClasses.join(' ')} 
                 {...props.elementConfig}
                 value={props.value}
                 onChange={props.changed} />; 
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label> 
            {inputElement}                       
        </div>
    );
};

export default input;