def split_array(numberOfOne, numberOfTwo, target=3):
    arr = [1] * numberOfOne + [2] * numberOfTwo  # Construct the array
    result = []
    
    # Ensure a better mix of 1s and 2s
    mixed_arr = []
    while numberOfOne > 0 or numberOfTwo > 0:
        if numberOfTwo > 0:
            mixed_arr.append(2)
            numberOfTwo -= 1
        if numberOfOne > 0:
            mixed_arr.append(1)
            numberOfOne -= 1
    
    temp = []
    current_sum = 0
    for num in mixed_arr:
        temp.append(num)
        current_sum += num
        if current_sum == target:
            result.extend(temp)
            temp = []
            current_sum = 0
    if temp:
        result.extend(temp)
    
    return result

# Example usage:
numberOfOne = 9
numberOfTwo = 4
print(split_array(numberOfOne, numberOfTwo))