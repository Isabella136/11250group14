# 11250group14

Member 1: Nathalie Bonin\
Member 2: Gabriel Brosula \
Member 3: Chance Onyiorah\
Member 4: Ryan Roth \
\

# To run
1) Open command line
2) Type "git clone https://github.com/Isabella136/11250group14.git"
3) Run "npm install"
4) Use command "npm run dev" to open project on local host

# To manually backup database to file
1) Open command line
2) Run "npm install -g @cloudant/couchbackup"
3) Run "couchbackup --url https://apikey-v2-32u42j8nnmw8i8o5isa5k73r0zzzcnthi8w7g6c9wnjk:cd7bb0894a63217aff203c2b862ad2fe@172c271b-e2fa-4804-8a56-13d4306682be-bluemix.cloudantnosqldb.appdomain.cloud --db data > cloudant_backup.txt"
