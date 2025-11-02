import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { StateModel } from '../models/State';
import { LgaModel } from '../models/Lga';

export class HealthController {
  static async checkHealth(req: Request, res: Response): Promise<void> {
    try {
      const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
      
      const statesCount = await StateModel.countDocuments();
      const lgasCount = await LgaModel.countDocuments();

      const health = {
        status: 'healthy',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        environment: process.env.NODE_ENV || 'development',
        database: {
          status: dbStatus,
          states: statesCount,
          lgas: lgasCount,
        },
        memory: {
          used: `${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)}MB`,
          total: `${Math.round(process.memoryUsage().heapTotal / 1024 / 1024)}MB`,
        },
      };

      res.status(200).json({
        success: true,
        message: '✅ API is healthy',
        data: health,
      });
    } catch (error: any) {
      res.status(503).json({
        success: false,
        message: '❌ API is unhealthy',
        error: error.message,
      });
    }
  }

  static async checkReadiness(req: Request, res: Response): Promise<void> {
    try {
      const isDbConnected = mongoose.connection.readyState === 1;
      const statesCount = await StateModel.countDocuments();

      if (!isDbConnected || statesCount === 0) {
        res.status(503).json({
          success: false,
          message: 'API not ready',
          data: {
            database: isDbConnected ? 'connected' : 'disconnected',
            dataSeeded: statesCount > 0,
          },
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: '✅ API is ready',
        data: {
          database: 'connected',
          dataSeeded: true,
        },
      });
    } catch (error: any) {
      res.status(503).json({
        success: false,
        message: '❌ API not ready',
        error: error.message,
      });
    }
  }
}

