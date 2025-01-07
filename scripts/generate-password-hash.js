import crypto from 'crypto';
const password = process.argv[2];
if (!password) {
  console.error('Please provide a password as an argument');
  process.exit(1);
}

const hash = crypto.createHash('sha256').update(password).digest('hex');
console.log('Password hash:', hash); 