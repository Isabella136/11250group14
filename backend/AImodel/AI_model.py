import sys
from cloudant.client import Cloudant
from cloudant.query import Query
import requests

elecConsumption = [0, 0, 0]
waterConsumption = [0, 0, 0]
gasConsumption = [0, 0, 0]
index = 2

# Retrieve relevant consumption data from Cloudant
client = Cloudant('apikey-v2-32u42j8nnmw8i8o5isa5k73r0zzzcnthi8w7g6c9wnjk', 'cd7bb0894a63217aff203c2b862ad2fe', url='https://apikey-v2-32u42j8nnmw8i8o5isa5k73r0zzzcnthi8w7g6c9wnjk:cd7bb0894a63217aff203c2b862ad2fe@172c271b-e2fa-4804-8a56-13d4306682be-bluemix.cloudantnosqldb.appdomain.cloud')
client.connect()
databaseConsumption = client['data']
user = sys.argv[1]
query=Query(databaseConsumption, selector={'user':user, '_id':{'$gt':0}}, sort=[{'_id':'desc'}])
for doc in query(limit=3)['docs']:
    elecConsumption[index] = doc['elecConsumption']
    waterConsumption[index] = doc['waterConsumption']
    gasConsumption[index] = doc['gasConsumption']
    index = index - 1

# Running model deployment (Code source: IBM Cloud Pak for Data Code Snippets)
API_KEY = "qrZUj6eBH9uQARSd6-3ho_7ZtNT6Ydm-5TW-CTL3mJc6"
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
sys.stdout.flush()
