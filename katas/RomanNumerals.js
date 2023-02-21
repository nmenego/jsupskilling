function solution (roman) {
    // complete the solution by transforming the
    // string roman numeral into an integer
    let numerals = new Map([['M',1000],['D',500],['C',100],['L',50],['X',10],['V',5],['I',1]]);
    let invertedNumerals =  new Map([['DCCCC', 'CM'],['CCCC', 'CD',],['LXXXX','XC',],['XXXX', 'XL',],['VIIII','IX',],['IIII', 'IV' ]]);

    invertedNumerals.forEach(function(value, key) {
        roman = roman.replace(value, key);
    });

    return roman.split('').map((c) => numerals.get(c)).reduce((acc, curr) => {
        return acc + curr;
    }, 0);
}