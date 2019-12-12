## Create user

>api/users/new

1. Backend receives POST to /api/users/new with body `username, email, password`
2. Backend checks if username is available, if yes proceed, else break
3. Backend creates a hash of the password and stores it to table `users` along with rest of credentials
4. Backend creates a verification link and saves it to `userverification` table
5. When verification link is activated, user is activated and the entry is dropped from `userverification`

## Verify user

>api/users/verify

1. Backend receives verification hash as POST
2. Check for hash in `userverification`
3. Activates the account associated with the hash, and deletes verification entry

## Login

>api/users/login

1. Backend receives `username` or `e-mail` and `password` as POST
2. Temporary hash is created with supplied `password`
3. If the hashes match, new hash is generated to the database and the new hash is supplied to the user as a token