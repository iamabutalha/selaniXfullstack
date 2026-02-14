def sumArray(arr):
    if not arr:
        return 0
    return arr[0] + sumArray(arr[1:])


print(sumArray([1,2,3,4]))