function totalArrayobject(values) {
    const totalArray = values.map(val => ({
        ...val,
        total: val.amount * val.quantity
    }))
    return  totalArray.sort((a,b)=>a.total-b.total);
  
}

const data = [
    { amount: 1000, quantity: 13 },
    { amount: 2000, quantity: 120 },
    { amount: 10001, quantity: 1 },
    { amount: 10002, quantity: 1 }
]


const result = totalArrayobject(data)

console.log(result, 'result');
