$(document).ready(function() {
    $('.toggle-details').on('change', function() {
        var detailsId = $(this).data('details-id');
        $('#' + detailsId).toggle(this.checked);
    });

});

function showForm() {
    var selectedRow = document.querySelector('input[name="select"]:checked');
    if (!selectedRow) {
        alert('الرجاء اختيار صف.');
        return;
    }
    document.getElementById('formPopup').style.display = 'block';
}

function closeForm() {
 
    document.getElementById('formPopup').style.display = 'none';
}


function validateForm() {


    var fullName = document.getElementById('fullName').value;
    var nationalID = document.getElementById('nationalID').value;
    var birthDate = document.getElementById('birthDate').value;
    var phoneNumber = document.getElementById('phoneNumber').value;


    var arabic = /^[\u0600-\u06FF\s]+$/;
    var national = /^(08|07|14|13|12|11|10|09|06|05|04|03|02|01)\d{9}$/;
    var birth = /^\d{2}-\d{2}-\d{4}$/;
    var phone = /^(09[983]\d{7})|(09[456]\d{7})$/;
    var captcha = document.getElementById('captcha').textContent;
    var captchaInput = document.getElementById('captchaInput').value;


   
    if (!arabic.test(fullName)) {
        alert('الاسم الكامل لمقدم الطلب يجب أن يحتوي على أحرف هجائية فقط باللغة العربية.');
        return false;
        
    }
    if (!national.test(nationalID)) {
        alert('  الرقم الوطني يجب أن يكون 11 خانة واول خانتين تدل على المحافظة.');
        return false;
        
    }
    if (!birth.test(birthDate)) {
        alert('تاريخ الولادة يجب أن يكون بالشكل التالي dd-mm-yyyy.');
        return false;
        
    }
    if (!phone.test(phoneNumber)) {
        alert('رقم الموبايل يجب أن يطابق أرقام شبكتي Syriatel و MTN.');
        return false;
        
    }

    if (captcha !== captchaInput) {
        alert('الرمز الذي أدخلته غير صحيح. حاول مرة أخرى.');
        generateCaptcha(); // توليد رمز جديد
        return false;
    } 
    var selectedRow = document.querySelector('input[name="select"]:checked');

    var detailsContent =  selectedRow.closest('tr').textContent;
    var formData = new FormData(document.getElementById('applicantForm'));
    
    var formDetails = '';
    
    formData.forEach(function(value, key) {
        formDetails += `<strong>${key}: </strong> ${value}<br>`;
    });
    

        var newWindow = window.open();
        newWindow.document.write('<html lang="ar" dir="rtl"><head><title>تفاصيل مقدم الطلب</title></head><body>');
        newWindow.document.write('<link rel="stylesheet" href="Style.css">');
        newWindow.document.write('<div class="card"><h1>تفاصيل مقدم الطلب</h1>');
        newWindow.document.write(formDetails);
        newWindow.document.write('</div><div class="card"><h2>تفاصيل العقار</h2>');
        newWindow.document.write(detailsContent);
        newWindow.document.write('</div></body></html>');
        return true;
    

    
}

document.addEventListener('DOMContentLoaded', function() {
    generateCaptcha();
});

function generateCaptcha() {
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var captchaLength = 6;
    var captcha = '';
    for (var i = 0; i < captchaLength; i++) {
        captcha += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    document.getElementById('captcha').textContent = captcha;
}



