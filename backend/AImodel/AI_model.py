import sys
from cloudant import Cloudant
from cloudant.query import Query
import requests

elecConsumption = [0, 0, 0]
waterConsumption = [0, 0, 0]
gasConsumption = [0, 0, 0]
index = 2

# Retrieve relevant consumption data from Cloudant
client = Cloudant.iam('carbonzeroteam', 'SVp5S642HYROYgP3TTSMPdqPWzC3iLZERAPFu_yCV_vn')
databaseConsumption = client['data']
user = sys.argv[1]
query=Query(databaseConsumption, selector={'user':user, '_id':{'$gt':0}}, sort=[{'_id':'desc'}])
for doc in query(limit=3)['docs']:
    elecConsumption[index] = doc['elecConsumption']
    waterConsumption[index] = doc['waterConsumption']
    gasConsumption[index] = doc['gasConsumption']
    index = index - 1

# Running model deployment (Code source: IBM Cloud Pak for Data Code Snippets)
API_KEY = "zHxD8yFiw_b_AhaW5KpxJ-3OoOJBQ386MdhAXF_dkXeZ"
token_response = requests.post('https://iam.cloud.ibm.com/identity/token', data={"apikey": API_KEY, "grant_type": 'urn:ibm:params:oauth:grant-type:apikey'})
mltoken = token_response.json()["access_token"]
header = {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + mltoken}
consumptionInput = {"input_data":[{'fields': ['elecConsumption1','waterConsumption1','gasConsumption1',
                                                                                    'elecConsumption2','waterConsumption2','gasConsumption2',
                                                                                    'elecConsumption3','waterConsumption3','gasConsumption3'],
                                                                         'values': [[elecConsumption[0],waterConsumption[0],gasConsumption[0],
                                                                                     elecConsumption[1],waterConsumption[1],gasConsumption[1],
                                                                                     elecConsumption[2],waterConsumption[2],gasConsumption[2],]]}]}
results = requests.post('https://us-south.ml.cloud.ibm.com/ml/v4/deployments/a5fff286-3087-4396-8d49-34c664148379/predictions?version=2021-11-26',
                        json=consumptionInput, headers={'Authorization': 'Bearer ' + mltoken})
print(results.json())
