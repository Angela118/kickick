import numpy as np
import csv
from scipy.spatial import distance
from numpy import array
#from pymongo import MongoClient
import warnings
import sys

warnings.filterwarnings('always')
warnings.filterwarnings('ignore')




def swap(x, i, j):
    x[i], x[j] = x[j], x[i]


#파일 불러오기 
file = open('C:/Users/user/brackets_nodejs/server/recEvent.csv', 'r', encoding='UTF8')
reader = csv.reader(file)

data=[]
for row_list in reader:
    data.append(row_list)
  
file.close()

print(data)
print()

header = []
header = data[0]

del data[0]

for i in range(0, len(data)):
    if data[i][3] == '여자':
        data[i][3] = 100
    elif data[i][3] == '남자':
        data[i][3] = 50
    elif data[i][3] == '혼성':
        data[i][3] = 25

        
dat = data[:]
    
    
#data의 id값 
idArray = []
del data[0][0]
for i in range(1, len(data)):
    idArray.append(data[i][0])
    del data[i][0]



'''
for i in range(0, len(predict)):
    predict[i] = float(predict[i])
'''

#print(data)
print()

#predict = np.array(predict, dtype=np.float64)
data = np.array(data)

data = data[:, 0:5]

print(data)
print()


data = data.astype('float64')

print(data)
print()

#euclidean distance
euc_dst = []
for i in range(1, len(data)):
    euc_dst.append(distance.euclidean(data[0], data[i]))

print(euc_dst)
print()
ar_euc = []
for i in range(0, len(euc_dst)):
    ar_euc.append([i+1, euc_dst[i]])
print(ar_euc)
print()

#sorting    
for size in reversed(range(len(ar_euc))):
    for i in range(size):
        if ar_euc[i][1]>ar_euc[i+1][1]:
            swap(ar_euc, i, i+1)
                

result_data = []
for i in range(0, len(ar_euc)):
    result_data.append(dat[ar_euc[i][0]])
    result_data[i].insert(0, idArray[i])

result_data.insert(0, header)
        
print(result_data)
print()




#recOutput.csv에 저장 
with open('C:/Users/user/brackets_nodejs/server/recOutput.csv','w', encoding='UTF8', newline='') as output:
    writer = csv.writer(output)
    for val in result_data:
        writer.writerow(val)

          
print()

    

    

