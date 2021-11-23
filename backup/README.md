Must have IBM Cloud account to use
1) Open command line
2) Go to "backup" folder location
3) Login to ibm cloud by typing "ibmcloud login -a cloud.ibm.com -o <user email> -s "dev_space""
4) Run "npm deploy"
5) Go to the updated action on IBM Cloud via the following url: "https://cloud.ibm.com/functions/actions"
6) Open "CloudantBackup" action, then click on "Code" at the left column
7) Go to "Invoke with parameters" then paste the following parameters and press "Apply":
	{
	    "bucket": "cloudant-to-cloud-storage-backup",
	    "key": "data",
	    "cloudant_url": "https://apikey-v2-32u42j8nnmw8i8o5isa5k73r0zzzcnthi8w7g6c9wnjk:cd7bb0894a63217aff203c2b862ad2fe@172c271b-e2fa-4804-8a56-13d4306682be-bluemix.cloudantnosqldb.appdomain.cloud/data",
	    "config": {
	        "endpoint": "s3.us-south.cloud-object-storage.appdomain.cloud",
	        "apiKeyId": "RNJ8dk-Bv8nWcAzJbJmUuWMe06MadOxtAWUTOKht8HS1",
	        "ibmAuthEndpoint": "https://iam.ng.bluemix.net/oidc/token",
	        "serviceInstanceId": "crn:v1:bluemix:public:cloud-object-storage:global:a/8307d003fdcf4f51ad03f097f9cc3df8:e7ee912f-63bc-47f5-9dc8-0cb38adfea15::"
	    }
	}
8) Go to "Invoke"

The cloudant database is now backed up in the Cloud Object Storage and can now be used by Watson Studio

