/*

  Implement a radix sort in a function called radixSort.

  You'll probably need several functions
  
  You can implement it using a binary or decimal based bucketing but I'd recommend the decimal based buckets because
  it ends up being a lot more simple to implement.

*/

const getMaxDigits = (nums) => {
  let maxDigits = 0;
  for (let i = 0; i < nums.length; i++) {
    maxDigits = Math.max(maxDigits, nums[i].toString().length);
  }
  return maxDigits;
}

const getDigit = (number, place, max) => {
  const string = number.toString();
  const size = string.length;

  const mod = max - size;
  return string[place - mod] || 0;
}

// console.log(getDigit(1000000, 0));

function radixSort(array) {
  let maxDigits = getMaxDigits(array);
  let n = maxDigits;

  while (maxDigits > 0) {
    let buckets = new Array(10).fill().map(() => []);

    for (let i = 0; i < array.length; i++) {
      // console.log(getDigit(array[i], maxDigits - 1));
      const val = array[i]
      buckets[getDigit(val, maxDigits - 1, n)].push(val);
    }

    // console.log(buckets);

    array = [].concat(...buckets);
    maxDigits--;
  }

  return array;
}

// console.log(radixSort([10000000, 100000, 1000, 100, 10, 1]))

// unit tests
// do not modify the below code
describe("radix sort", function () {
  it("should sort correctly", () => {
    const nums = [
      20,
      51,
      3,
      801,
      415,
      62,
      4,
      17,
      19,
      11,
      1,
      100,
      1244,
      104,
      944,
      854,
      34,
      3000,
      3001,
      1200,
      633
    ];
    const ans = radixSort(nums);
    expect(ans).toEqual([
      1,
      3,
      4,
      11,
      17,
      19,
      20,
      34,
      51,
      62,
      100,
      104,
      415,
      633,
      801,
      854,
      944,
      1200,
      1244,
      3000,
      3001
    ]);
  });
  it("should sort 99 random numbers correctly", () => {
    const fill = 99;
    const nums = new Array(fill)
      .fill()
      .map(() => Math.floor(Math.random() * 500000));
    const ans = radixSort(nums);
    expect(ans).toEqual(nums.sort((a, b) => a - b));
  });
});
