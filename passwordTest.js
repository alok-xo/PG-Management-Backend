import bcrypt from 'bcrypt';

// Replace with the hashed password from your database
const storedHash = '$2b$10$/PFKriFUbXNpAxr3dZSNM.2EEHTgxicv7uHM75v3eSrEKbqvFyooe';

// Replace with the plaintext password you want to test
const passwordToTest = '123456';

bcrypt.compare(passwordToTest, storedHash, (err, result) => {
    if (err) throw err;
    console.log('Do they match?', result);
});
