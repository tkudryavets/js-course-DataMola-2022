let arr=[-2,1,-3,4,-1,2,1,-5,4]
let ans = arr[0],
	leftIndex = 0,
	rightIndex = 0,
	sum = 0,
	min_sum = 0,
	min_pos = -1;
for (let r=0; r<arr.length; r++) {
	sum += arr[r];
 	let cur = sum - min_sum;
	if (cur > ans) {
		ans = cur;
		leftIndex = min_pos + 1;
		rightIdex = r;
	}
 
	if (sum < min_sum) {
		min_sum = sum;
		min_pos = r;
	}
}

console.log(`Ответ: ${ans}`)