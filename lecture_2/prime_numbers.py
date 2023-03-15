import time


def get_prime_numbers(n):
    result = []
    num = 2

    while len(result) < n:
        flag = False
        for item in range(2, num):
            if num % item == 0:
                flag = True
                break
        if flag == False:
            result.append(num)
        num += 1

    return result


if __name__ == "__main__":
    start_time = time.perf_counter()
    get_prime_numbers(1000)
    elapsed_time = time.perf_counter() - start_time
    print(elapsed_time)
