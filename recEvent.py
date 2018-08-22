import numpy as np
import csv
from sklearn.cluster import KMeans
from numpy import array
from pymongo import MongoClient
import warnings

warnings.filterwarnings('always')
warnings.filterwarnings('ignore')






conn = MongoClient('mongodb://localhost:27017')
db = conn.local
userCollection = db.users6
users = userCollection.find_one({'email':'id@naver.com'})

predict = []
predict = users['age'], users['gender'], users['geoLng'], users['geoLat'];


print(predict)




done = 1

while(done):
    print()



    file = open('C:/Users/user/brackets_nodejs/server/recEvent.csv', 'r')
    reader = csv.reader(file)

    data=[]
    for row_list in reader:
        data.append(row_list)


    data = array(data)    

    file.close()


    X = data[1:,1:5]
    print(X)



        
    number_of_clusters = 6
    print()

    X = np.array(X)

    model = KMeans(n_clusters = number_of_clusters, random_state=0)
    model.fit(X)


    model_labels = model.labels_
    predicted_model = model.predict([predict])

        
    print(model_labels)
    print(predicted_model)

    rec = []
    j=0
    for i in range(0, len(model_labels)):
        if (model_labels[i] == predicted_model):
            rec.append(i)
            j+=1

    result_data = []        

        
    for i in range(0, len(rec)):
        result_data.append(data[rec[i]].tolist())
      

    with open('C:/Users/user/brackets_nodejs/server/recOutput.csv','w', newline='') as output:
        writer = csv.writer(output)
        for val in result_data:
            writer.writerow(val)

print()
    

    

