import { Request, Response } from 'express';
import { LgaModel } from '../models/Lga';
import { StateModel } from '../models/State';
import { IApiResponse, ILgaPopulated } from '../types';

export class LgaController {
  static async getAllLgas(req: Request, res: Response): Promise<void> {
    try {
      const lgas = await LgaModel.find()
        .populate('stateId', 'name code capital region')
        .sort({ name: 1 })
        .lean();

      const response: IApiResponse<ILgaPopulated[]> = {
        success: true,
        message: '✨ LGAs fetched successfully',
        data: lgas as any,
      };

      res.status(200).json(response);
    } catch (error: any) {
      console.error('❌ Error fetching LGAs:', error);
      const response: IApiResponse<null> = {
        success: false,
        message: 'Failed to fetch LGAs',
        error: error.message,
      };
      res.status(500).json(response);
    }
  }

  static async getLgasByStateId(req: Request, res: Response): Promise<void> {
    try {
      const { stateId } = req.params;

      const state = await StateModel.findById(stateId);
      if (!state) {
        const response: IApiResponse<null> = {
          success: false,
          message: 'State not found',
        };
        res.status(404).json(response);
        return;
      }

      const lgas = await LgaModel.find({ stateId })
        .populate('stateId', 'name code capital region')
        .sort({ name: 1 })
        .lean();

      const response: IApiResponse<ILgaPopulated[]> = {
        success: true,
        message: `✨ LGAs for ${state.name} fetched successfully`,
        data: lgas as any,
      };

      res.status(200).json(response);
    } catch (error: any) {
      console.error('❌ Error fetching LGAs by state:', error);
      const response: IApiResponse<null> = {
        success: false,
        message: 'Failed to fetch LGAs',
        error: error.message,
      };
      res.status(500).json(response);
    }
  }

  static async getLgasByStateCode(req: Request, res: Response): Promise<void> {
    try {
      const { stateCode } = req.params;

      const state = await StateModel.findOne({ code: stateCode.toUpperCase() });
      if (!state) {
        const response: IApiResponse<null> = {
          success: false,
          message: 'State not found',
        };
        res.status(404).json(response);
        return;
      }

      const lgas = await LgaModel.find({ stateId: state._id })
        .populate('stateId', 'name code capital region')
        .sort({ name: 1 })
        .lean();

      const response: IApiResponse<ILgaPopulated[]> = {
        success: true,
        message: `✨ LGAs for ${state.name} fetched successfully`,
        data: lgas as any,
      };

      res.status(200).json(response);
    } catch (error: any) {
      console.error('❌ Error fetching LGAs by state code:', error);
      const response: IApiResponse<null> = {
        success: false,
        message: 'Failed to fetch LGAs',
        error: error.message,
      };
      res.status(500).json(response);
    }
  }

  static async searchLgas(req: Request, res: Response): Promise<void> {
    try {
      const { query } = req.query;

      if (!query || typeof query !== 'string') {
        const response: IApiResponse<null> = {
          success: false,
          message: 'Search query is required',
        };
        res.status(400).json(response);
        return;
      }

      const lgas = await LgaModel.find({
        name: { $regex: query, $options: 'i' },
      })
        .populate('stateId', 'name code capital region')
        .sort({ name: 1 })
        .lean();

      const response: IApiResponse<ILgaPopulated[]> = {
        success: true,
        message: '✨ LGAs search results',
        data: lgas as any,
      };

      res.status(200).json(response);
    } catch (error: any) {
      console.error('❌ Error searching LGAs:', error);
      const response: IApiResponse<null> = {
        success: false,
        message: 'Failed to search LGAs',
        error: error.message,
      };
      res.status(500).json(response);
    }
  }
}

