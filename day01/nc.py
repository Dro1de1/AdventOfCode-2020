numbers = []
with open("numbers.txt") as f:
	numbers = list(map(int,f.readlines()))
print(numbers)


for i in numbers:
	for j in numbers:
		for k in numbers:
			if i+j+k == 2020:
				print(i*j*k)
