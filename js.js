 //intel-tel-input
 var input = document.querySelector("#phone");
 intlTelInput(input, {
   initialCountry: "auto",
   geoIpLookup: function (success, failure) {
     $.get("https://ipinfo.io", function () { }, "jsonp").always(function (resp) {
       var countryCode = (resp && resp.country) ? resp.country : "us";
       success(countryCode);
     });
   },
 });





 //drag and drop file
 //вывод сообщения о добавлении файлов
 const answer = document.querySelector('.answer');

 document.addEventListener('DOMContentLoaded', () => {
    // const forms = document.querySelectorAll('form');
    const inputFile = document.querySelectorAll('.upload');

    /////////// Загрузка файлов при помощи «Drag-and-drop» /////////// 
    const dropZone = document.querySelector('.upload-label');
   
    const maxFileSize = 5000000; // максимальный размер файла - 5 мб. 
    
    let uploadDragFile = '';

    // Проверка поддержки «Drag-and-drop» 
    if (typeof (window.FileReader) == 'undefined') {
        dropZone.textContent = 'Drag&Drop Не поддерживается браузером!';
        dropZone.classList.add('error');
    }

    // Событие - перетаскивания файла 
    dropZone.ondragover = function () {
        return false;
    };
    dropZone.ondragleave = function () {
        return false;
    };

    let uploadDragFiles = '';
    dropZone.ondrop = function (e) { // Событие - файл перетащили 
        e.preventDefault();

        uploadDragFiles = e.dataTransfer.files;

        // Проверка размера файла 
        if (uploadDragFiles[0].size > maxFileSize) {
            answer.textContent = 'The size exceeds the allowable value!';
            // this.addClass('error');
            return false;
        }

        // Показ загружаемых файлов 
        if (uploadDragFiles.length > 1) {
            if (uploadDragFiles.length <= 4 ) {
                answer.textContent = `Selected ${uploadDragFiles.length} files`;
            } else {
                answer.textContent = `Selected ${uploadDragFiles.length} files`;
            }
        } else {
            answer.textContent =`Selected ${e.dataTransfer.files[0].name}` ;
        }
    }
});



//upload file
document.addEventListener('DOMContentLoaded', () => {
    const inputFile = document.querySelectorAll('.upload');

    /////////// Кнопка «Прикрепить файл» /////////// 
    inputFile.forEach(function(el) {
   
        let fileList;

        // Событие выбора файла(ов) 
        el.addEventListener('change', function (e) {

            // создаём массив файлов 
            fileList = [];
            for (let i = 0; i < el.files.length; i++) {
                fileList.push(el.files[i]);
            }

            // вызов функции для каждого файла 
            fileList.forEach(file => {
                uploadFile(file);
            });
        });

        // Проверяем размер файлов и выводим название 
        const uploadFile = (file) => {

            // файла <5 Мб 
            if (file.size > 5 * 1024 * 1024) {
                alert('Файл должен быть не более 5 МБ.');
                return;
            }

            // Показ загружаемых файлов 
            if (file && file.length > 1) {
                if ( file.length <= 4 ) {
                    answer.textContent = `Выбрано ${file.length} файла`;
                }
                if ( file.length > 4 ) {
                    answer.textContent = `Выбрано ${file.length} файлов`;
                }
            } else {
                answer.textContent = `Selected ${file.name}`;
            }
        }

    });
});





//message submit
document.addEventListener('submit', (event) => {
    event.preventDefault();
    const form = document.querySelector('form');
    const message = document.querySelector('.message');
    form.classList.add('none');
    message.classList.remove('none');
    message.classList.add('show');
});