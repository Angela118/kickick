import numpy as np
import csv
from sklearn.cluster import KMeans
from scipy.spatial import distance
from numpy import array
from pymongo import MongoClient
import warnings
import sys

warnings.filterwarnings('always')
warnings.filterwarnings('ignore')




def swap(x, i, j):
    x[i], x[j] = x[j], x[i]


'''
conn = MongoClient('mongodb://localhost:27017')
db = conn.local
userCollection = db.users6
users = userCollection.find_one({'email':'id@naver.com'})

predict = []
predict = [users['age'], users['gender'], users['nofteam'], users['geoLng'], users['geoLat']];

if predict[1] == '여자':
    predict[1] = 100
elif predict[1] == '남':
    predict[1] = 50
elif predict[1] == '혼성':
    predict[1] = 25
'''


#파일 불러오기 
file = open('C:/Users/user/brackets_nodejs/server/recEvent.csv', 'r')
reader = csv.reader(file)

data=[]
for row_list in reader:
    data.append(row_list)
  
file.close()

print(data)
print()

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

print(data)
print()

#predict = np.array(predict, dtype=np.float64)
data = np.array(data, dtype=np.float64)


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
        
print(result_data)


#recOutput.csv에 저장 
with open('C:/Users/user/brackets_nodejs/server/recOutput.csv','w', newline='') as output:
    writer = csv.writer(output)
    for val in result_data:
        writer.writerow(val)

          
print()

    

    

