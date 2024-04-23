document.addEventListener('DOMContentLoaded', function() {
    // مستمع الحدث لتبديل عرض القائمة عند النقر على أيقونة القائمة
    document.getElementById('menu-icon').addEventListener('click', function() {
        var submenu = document.querySelector('.dropdown-menu');
        submenu.style.display = (submenu.style.display === 'block') ? 'none' : 'block';
    });

    // مستمع الحدث لإخفاء القائمة عند النقر خارجها
    document.addEventListener('click', function(event) {
        var menu = document.getElementById('menu-wrapper');
        var target = event.target;
        if (!menu.contains(target)) {
            document.querySelector('.dropdown-menu').style.display = 'none';
        }
    });

    // إضافة مستمعات أحداث `click` إلى الروابط داخل القائمة
    var menuLinks = document.querySelectorAll('.dropdown-menu a');
    menuLinks.forEach(function(link) {
        link.addEventListener('click', function(event) {
            event.preventDefault(); // منع التنقل الافتراضي للروابط
            // توجيه المستخدم إلى القسم المستهدف بسلاسة
            var targetSection = document.querySelector(link.getAttribute('href'));
            targetSection.scrollIntoView({ behavior: 'smooth' });

            // إخفاء القائمة بعد النقر
            var submenu = document.querySelector('.dropdown-menu');
            submenu.style.display = 'none';
        });
    });
});
  

var couponClicked = false;

// وظيفة لعرض خصم الكوبون
function showDiscount() {
    if (!couponClicked) {
        // عرض رسالة التنبيه الأولى
        alert("يرجى استخدام الكوبون أمام صاحب المحل فقط.");
        
        // تأكيد ما إذا كان المستخدم يريد استخدام الكوبون
        var continueConfirmation = confirm("هل ترغب في استخدام الكوبون؟");
        if (continueConfirmation) {
            // عرض تحذير الخصم
            var discountWarning = document.getElementById("discount-warning");
            discountWarning.style.display = "block";
            discountWarning.innerText = "يرجى الانتباه: لا يمكن استخدام الكوبون على التصليحات بقيمة أقل من 100 جنيهاً.";

            // تأكيد المستخدم للمتابعة
            var confirmation = confirm("اضغط موافق لتحصل على نسبة الخصم لديك");
            if (confirmation) {
                // حساب نسبة الخصم
                var discountPercentage = Math.floor(Math.random() * 31);
                if (discountPercentage !== 0) {
                    document.getElementById("coupon").innerHTML = "كوبون الخصم: " + discountPercentage + "%";
                    if (discountPercentage >= 100) {
                        discountWarning.style.display = "none";
                    }
                }
            } else {
                // إخفاء تحذير الخصم
                discountWarning.style.display = "none";
            }
            couponClicked = true;
        } else {
            // إذا اختار المستخدم عدم استخدام الكوبون
            alert("تم إلغاء استخدام الكوبون.");
        }
    } else {
        alert("يمكنك الحصول على الخصم مرة واحدة فقط.");
    }
}

// وظيفة لحساب السعر بعد الخصم
function calculateDiscountedPrice() {
    var originalPriceElement = document.getElementById("original-price");
    var originalPrice = parseFloat(originalPriceElement.value);

    // التحقق من السعر الأصلي
    if (isNaN(originalPrice) || originalPrice <= 0) {
        alert("يرجى إدخال سعر أصلي صالح.");
        return;
    }

    var discountWarning = document.getElementById("discount-warning");

    // التحقق من السعر الأصلي إذا كان أقل من 100 جنيه
    if (originalPrice < 100) {
        alert("لن يتم تطبيق الخصم على التصليحات الأقل من 100 جنيهاً.");
        alert("السعر الأصلي: " + originalPrice.toFixed(2) + " جنيه");
    } else {
        // الحصول على نسبة الخصم من الكوبون
        var couponElement = document.getElementById("coupon");
        var discountPercentage = parseInt(couponElement.innerText.split(":")[1]);
        var discountedPrice = originalPrice - (originalPrice * (discountPercentage / 100));
        alert("تم تطبيق الخصم! السعر بعد الخصم: " + discountedPrice.toFixed(2) + " جنيه");
    }
}

// وظيفة للتحقق مما إذا كان الكوبون مفتوحًا
function checkCouponOpened() {
    var couponElement = document.getElementById("coupon");
    var couponText = couponElement.innerText;

    // تحقق مما إذا كان الكوبون مفتوحًا
    if (couponClicked && couponText !== "كوبون الخصم") {
        calculateDiscountedPrice();
    } else {
        alert("يرجى فتح كوبون الخصم أولاً لمعرفة نسبة الخصم.");
    }
}
