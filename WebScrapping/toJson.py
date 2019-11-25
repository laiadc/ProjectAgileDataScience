import csv

numbers = {}
with open('doctors.csv', 'r') as csvfile:
    spamreader = csv.reader(csvfile)
    print(spamreader, type(spamreader))
    f = open("doctors.ts", "w")
    f.write("export const doctors={")
    first = True
    firstComma = True
    for row in spamreader:
        print(row[1], row[2])
        if first:
            first = False
            continue
        if not firstComma:
            f.write(f",")
        num = row[2].replace('"', '')
        name = row[1].replace('"', '')
        
        if (numbers.get(num, False)):
            firstComma = True
            continue
        f.write(f"\"{num}\":\"{name}\"")
        numbers[num] = True
        firstComma = False

    f.write("};")
    f.close()