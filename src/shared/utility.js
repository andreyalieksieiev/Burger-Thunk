export const updateObject = (oldObject, updatedProperties) => { // получяем старый обект и обновленние свойства
    return {
        ...oldObject,
        ...updatedProperties
    };
};

export const checkValidity = (value, rules) => {  // получяем значения а потом правило
    let isValid = true;
    if (!rules) {
        return true;
    }

    if (rules.required) {      // проверяем есть ли в правилах обязательное правило
        isValid = value.trim() !== '' && isValid; //isValid = значению сравнения ( если оно не равно пустой строке )
    }

    if (rules.minLength) {                        // правило мин 5 елементов ввода
        isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {                         // правило мах 5 елементов ввода
        isValid = value.length <= rules.maxLength && isValid;
    }

    return isValid;
}