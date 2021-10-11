module.exports = {
  reactStrictMode: true,
  env: {
    passoo_url: process.env.passoo_url,
    passoo_key: process.env.passoo_key,
    passoo_secret_key: process.env.passoo_secret_key,
    passoo_default_otp: process.env.passoo_default_otp,
    FAUNADB_SECRET_KEY: process.env.FAUNADB_SECRET_KEY,
  },
};
