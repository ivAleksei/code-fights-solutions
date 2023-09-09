console.clear();

function solution(prices, notes, x) {
    let sum = 0;
    for (let k in prices) {
        let obj = {
            price: prices[k],
            note: notes[k]
        }

        let split = obj.note.split(' ');
        let map_note = {
            'Same': obj => obj.price,
            'higher': obj => {
                let percent = +split[0].replace('%', '');
                return (100 * obj.price) / (100 + percent)
            },
            'lower': obj => {
                let percent = +split[0].replace('%', '');
                return obj.price * 100 / (100 - percent);
            }
        }

        if (map_note[split[1]]) obj.in_store = map_note[split[1]](obj);
        if (map_note[split[0]]) obj.in_store = map_note[split[0]](obj);
        obj.ovp = obj.price - obj.in_store;
        sum += obj.ovp;
    }

    return sum <= x;
}

let output = solution(
    [110, 95, 70],
    ["10.0% higher than in-store",
        "5.0% lower than in-store",
        "Same as in-store"],
    5
);

console.log(`Output: `, output);