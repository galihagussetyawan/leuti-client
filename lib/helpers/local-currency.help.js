export default function LocalCurrency(price) {

    return new Intl.NumberFormat('id', {
        style: 'currency',
        currency: 'IDR',
    })
        .format(price)
        .replace(',00', '');
}