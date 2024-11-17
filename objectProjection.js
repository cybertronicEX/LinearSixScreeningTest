// 1.3
function objectProjection  (source, prototype)  {

    const projectedObject ={}

    Object.keys(prototype).forEach((keys)=>{
        if(source.hasOwnProperty(keys)){
            projectedObject[keys] = source[keys]
        }
    })

    return projectedObject;
};



const source = { a: 1, b: 2, c: 3 , d:{
    d1:22,
    d2:23
} };
const prototype = { a: null, c: 0, d: 0 };

const projected = objectProjection(source, prototype);
console.log(projected);
