
function isEnglishAlpha(str) {

    const regex = /^[a-zA-Z]+$/;
    return regex.test(str);
}

function validateAndSubmit(event) {
    event.preventDefault(); 
    
    let isValid = true; 

    const appName = $('#appName').val();
    const $appNameError = $('#errorAppName');
    
    if (appName.trim() === "") {
        $appNameError.text("الرجاء إدخال اسم التطبيق.");
        isValid = false;
    } else if (!isEnglishAlpha(appName)) {
        $appNameError.text("اسم التطبيق يجب أن يكون أحرف إنجليزية فقط (لا فراغات أو أرقام).");
        isValid = false;
    } else {
        $appNameError.text("");
    }

    const manufacturer = $('#manufacturer').val();
    const $manufacturerError = $('#errorManufacturer');
    
    if (manufacturer.trim() === "") {
        $manufacturerError.text("الرجاء إدخال اسم الشركة المصنعة.");
        isValid = false;
    } else if (!isEnglishAlpha(manufacturer)) {
        $manufacturerError.text("اسم الشركة يجب أن يكون أحرف إنجليزية فقط.");
        isValid = false;
    } else {
        $manufacturerError.text("");
    }
    
    const appUrl = $('#appUrl').val();
    const $appUrlError = $('#errorAppUrl');
    
    if (!appUrl.startsWith("http://") && !appUrl.startsWith("https://")) {
        $appUrlError.text("الرجاء إدخال رابط URL صحيح (يبدأ بـ http:// أو https://).");
        isValid = false;
    } else {
        $appUrlError.text("");
    }
    
    const category = $('#category').val();
    if (category === "") {
        isValid = false; 
    }

    if (isValid) {
        
        const newAppData = {
            appName: appName,
            manufacturer: manufacturer,
            appUrl: appUrl,
            isFree: $('input[name="isFree"]:checked').val(),
            category: category,
            summary: $('#summary').val()
        };
        sessionStorage.setItem('newAppData', JSON.stringify(newAppData));
        
        window.location.href = "apps.html";
        
        return false;
    }
    
    return false;
}

$(document).ready(function() {
    
    $('#appRows').on('click', '.toggle-details', function() {
        const appId = $(this).data('id'); 
        const $detailsRow = $('#details-' + appId);
        
        $detailsRow.slideToggle(300); 
    });

    loadNewApp();
});


function loadNewApp() {
    const storedData = sessionStorage.getItem('newAppData');

    if (storedData) {
        const newApp = JSON.parse(storedData);
        const newId = Date.now(); 

        const newRow = `
            <tr data-app-id="${newId}" style="background-color: #e6f7ff; font-weight: bold;">
                <td>${newApp.appName} (جديد)</td>
                <td>${newApp.manufacturer}</td>
                <td>${newApp.category}</td>
                <td>${newApp.isFree}</td>
                <td><button class="toggle-details" data-id="${newId}">عرض/إخفاء</button></td>
            </tr>
            <tr class="details-row" id="details-${newId}">
                <td colspan="5">
                    <strong>شرح مختصر:</strong> ${newApp.summary}<br>
                    <strong>عنوان الموقع:</strong> <a href="${newApp.appUrl}" target="_blank">${newApp.appUrl}</a><br>
                    <strong>ملتيميديا:</strong> الرجاء إضافة صورة أو فيديو هنا...
                </td>
            </tr>
        `;
        
        $('#appRows').prepend(newRow);
        
        sessionStorage.removeItem('newAppData'); 
    }
}