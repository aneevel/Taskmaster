const os = require('os');
const mongoose = require('mongoose');

const getHealthStatus = async (req, res) => {
    try {
        // Check database connection
        const dbStatus = mongoose.connection.readyState === 1 ? 'UP' : 'DOWN';
        const dbResponseTime = await checkDatabaseResponseTime();

        // System metrics
        const systemMetrics = {
            uptime: process.uptime(),
            memoryUsage: {
                total: os.totalmem(),
                free: os.freemem(),
                used: os.totalmem() - os.freemem()
            },
            cpuLoad: os.loadavg()[0] // 1 minute load average
        };

        const healthStatus = {
            status: dbStatus === 'UP' ? 'UP' : 'DEGRADED',
            timestamp: new Date().toISOString(),
            services: {
                database: {
                    status: dbStatus,
                    responseTime: dbResponseTime,
                    lastChecked: new Date().toISOString()
                }
            },
            system: systemMetrics,
            version: process.env.npm_package_version || '1.0.0'
        };

        res.status(healthStatus.status === 'UP' ? 200 : 503).json(healthStatus);
    } catch (error) {
        res.status(500).json({
            status: 'DOWN',
            timestamp: new Date().toISOString(),
            error: error.message
        });
    }
};

// Helper function to check database response time
async function checkDatabaseResponseTime() {
    const start = Date.now();
    try {
        await mongoose.connection.db.admin().ping();
        return Date.now() - start;
    } catch (error) {
        return -1;
    }
}

module.exports = {
    getHealthStatus
}; 