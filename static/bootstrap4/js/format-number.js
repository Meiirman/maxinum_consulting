$(function() {
    $("[data-format-number]").text(function (_, text) {
        const formatNumberAs = $(this).data("formatNumber");
        const number = parseFloat(text) || 0;
        $(this).data("formattedNumber", number)
        if (!formatNumberAs || formatNumberAs == "price") {
            return formatPrice(number);
        } else if (formatNumberAs == "number") {
            return formatNumber(number);
        } else if (formatNumberAs == "number-2") {
            return formatNumber2(number).split("\u00A0").join(" ");
        } else if (formatNumberAs == "number2") {
            return formatNumber2(number);
        }
        
    });
});