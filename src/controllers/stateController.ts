import { Request, Response } from 'express';
import { StateModel } from '../models/State';
import { LgaModel } from '../models/Lga';
import { IApiResponse, IState, IStateWithLgas } from '../types';

export class StateController {
  static async getAllStates(req: Request, res: Response): Promise<void> {
    try {
      const { region } = req.query;
      
      const filter: any = {};
      if (region) {
        filter.region = region;
      }

      const states = await StateModel.find(filter).sort({ name: 1 }).lean();

      if (!states) {
        const response: IApiResponse<null> = {
          success: false,
          message: 'No states found',
        };
        res.status(404).json(response);
        return;
      }

      const response: IApiResponse<IState[]> = {
        success: true,
        message: '✨ States fetched successfully',
        data: states as any,
      };

      res.status(200).json(response);
    } catch (error: any) {
      console.error('❌ Error fetching states:', error);
      const response: IApiResponse<null> = {
        success: false,
        message: 'Failed to fetch states',
        error: error.message,
      };
      res.status(500).json(response);
    }
  }

  static async getStateById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const state = await StateModel.findById(id).lean();

      if (!state) {
        const response: IApiResponse<null> = {
          success: false,
          message: 'State not found',
        };
        res.status(404).json(response);
        return;
      }

      const response: IApiResponse<IState> = {
        success: true,
        message: '✨ State fetched successfully',
        data: state as any,
      };

      res.status(200).json(response);
    } catch (error: any) {
      console.error('❌ Error fetching state:', error);
      const response: IApiResponse<null> = {
        success: false,
        message: 'Failed to fetch state',
        error: error.message,
      };
      res.status(500).json(response);
    }
  }

  static async getStateByCode(req: Request, res: Response): Promise<void> {
    try {
      const { code } = req.params;

      const state = await StateModel.findOne({ code: code.toUpperCase() }).lean();

      if (!state) {
        const response: IApiResponse<null> = {
          success: false,
          message: 'State not found',
        };
        res.status(404).json(response);
        return;
      }

      const response: IApiResponse<IState> = {
        success: true,
        message: '✨ State fetched successfully',
        data: state as any,
      };

      res.status(200).json(response);
    } catch (error: any) {
      console.error('❌ Error fetching state:', error);
      const response: IApiResponse<null> = {
        success: false,
        message: 'Failed to fetch state',
        error: error.message,
      };
      res.status(500).json(response);
    }
  }

  static async getStateWithLgas(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const state = await StateModel.findById(id).lean();

      if (!state) {
        const response: IApiResponse<null> = {
          success: false,
          message: 'State not found',
        };
        res.status(404).json(response);
        return;
      }

      const lgas = await LgaModel.find({ stateId: id }).sort({ name: 1 }).lean();

      const stateWithLgas = {
        ...state,
        lgas: lgas as any,
        lgaCount: lgas.length,
      };

      const response: IApiResponse<IStateWithLgas> = {
        success: true,
        message: '✨ State with LGAs fetched successfully',
        data: stateWithLgas as any,
      };

      res.status(200).json(response);
    } catch (error: any) {
      console.error('❌ Error fetching state with LGAs:', error);
      const response: IApiResponse<null> = {
        success: false,
        message: 'Failed to fetch state with LGAs',
        error: error.message,
      };
      res.status(500).json(response);
    }
  }

  static async getStatesGroupedByRegion(req: Request, res: Response): Promise<void> {
    try {
      const states = await StateModel.find().sort({ region: 1, name: 1 }).lean();

      const grouped = states.reduce((acc: any, state: any) => {
        const region = state.region;
        if (!acc[region]) {
          acc[region] = [];
        }
        acc[region].push(state);
        return acc;
      }, {});

      const response: IApiResponse<any> = {
        success: true,
        message: '✨ States grouped by region fetched successfully',
        data: grouped,
      };

      res.status(200).json(response);
    } catch (error: any) {
      console.error('❌ Error fetching grouped states:', error);
      const response: IApiResponse<null> = {
        success: false,
        message: 'Failed to fetch grouped states',
        error: error.message,
      };
      res.status(500).json(response);
    }
  }
}

