const inputs = document.querySelectorAll("input, textarea");

    // Добавляем обработчик события 'input' для каждого инпута
    inputs.forEach(input => {
        input.addEventListener("input", () => {
            // Удаляем класс .error, если он есть
            if (input.classList.contains("error")) {
                input.classList.remove("error");
            }
        });
    });




//проверяем что все обязательные поля формы ('.req') правильно заполненны

function formValidate(form) {
    let error = 0;
    const inputs = form.querySelectorAll(".req");

    inputs.forEach(input => {
        formRemoveError(input);

        if (input.classList.contains("email") && isEmailInvalid(input)) {
            formAddError(input);
            error++;
        } else if (input.classList.contains("phone") && isPhoneInvalid(input)) {
            formAddError(input);
            error++;
        } else if (input.getAttribute("type") === "checkbox" && !input.checked) {
            formAddError(input);
            error++;
        } else if (isEmpty(input)) {
            formAddError(input);
            error++;
        }
    });

    return error == 0; // true, если ошибок нет, иначе false
}

// проверяем заполненность поля
function isEmpty(input) {
    return input.value.trim() === "";
}


//подсвечиваем элемент который не заполнен или с ошибкой
function formAddError(input) {
    // input.parentElement.classList.add("_error");
    input.classList.add("error");
}
//перестаем подсвечивать элемент с ошибкой
function formRemoveError(input) {
    // input.parentElement.classList.remove("_error");
    input.classList.remove("error");
}

//функция теста email
function isEmailInvalid(input) {
    // return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);

    // Проверка на пустое значение
    if (!input || !input.value) {
        return true;
    }

    // Улучшенное регулярное выражение для проверки email
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // Возвращаем true, если email корректен
    return !emailRegex.test(input.value);
}

function isPhoneInvalid(input) {
    // Проверка на пустое значение
    if (!input || !input.value) {
        return true; // Пустое поле считается невалидным
    }

    // Регулярное выражение для проверки телефона
    // Пример: +7 (999) 999-99-99 или 89999999999
    const phoneRegex = /^(\+7|8)[\s\-]?\(?\d{3}\)?[\s\-]?\d{3}[\s\-]?\d{2}[\s\-]?\d{2}$/;

    // Возвращаем true, если телефон НЕ корректен
    return !phoneRegex.test(input.value.trim());
}
