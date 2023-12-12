
export default () => ({
    port: parseInt(process.env.PORT, 10) || 5000,
    api_url:  process.env.API_URL || `http://localhost:${5000}`,
    frontend_url:  process.env.API_URL || `http://localhost:${3222}`,
    database: {
        host: process.env.POSTGRES_HOST,
        port: parseInt(process.env.POSTGRES_PASSWORD, 10) || 5432,
        user:  process.env.POSTGRES_USER,
        password:process.env.POSTGRES_PASSWORD,
    },
    mail:{
        user: process.env.SMTP_USER,
        password: process.env.SMTP_PASSWORD
    }
});