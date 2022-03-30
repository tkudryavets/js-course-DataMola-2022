const costs = [5,4,3,2,1];
let result = 0;
for(let i=1; i<costs.length; i++){
    if(costs[i]>costs[i-1])
        result += (costs[i]-costs[i-1]);
}
console.log(result);
