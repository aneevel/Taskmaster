export interface HealthStatus {
    status: 'UP' | 'DOWN' | 'DEGRADED';
    timestamp: string;
    services: {
        database: {
            status: 'UP' | 'DOWN';
            responseTime: number;
            lastChecked: string;
        }
    };
    system: {
        uptime: number;
        memoryUsage: {
            total: number;
            free: number;
            used: number;
        };
        cpuLoad: number;
    };
    version: string;
    error?: string;
} 