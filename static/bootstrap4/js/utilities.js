const priceFormat = new Intl.NumberFormat("ru-RU", {
    minimumFractionDigits: 2,
    currency: "KZT",
    style: "currency",
    currencySign: "accounting"
});

function formatPrice(x) {
    return priceFormat.format(x)
}

const numberFormat = new Intl.NumberFormat("ru-RU")

function formatNumber(x) {
    return numberFormat.format(x)
}
const number2Format = new Intl.NumberFormat("ru-RU", {minimumFractionDigits: 2})

function formatNumber2(x) {
    return number2Format.format(x);
}


