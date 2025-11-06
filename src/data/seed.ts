import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { StateModel } from '../models/State';
import { LgaModel } from '../models/Lga';
import { nigeriaStates, nigeriaLgas } from './nigeriaData';
import { logger } from '../utils/logger';
import { connectDatabase } from '../config/database';
import { RegionEnum } from '../types';

dotenv.config();

const seedDatabase = async (): Promise<void> => {
  try {
    await connectDatabase()

    logger.info('Clearing existing data...');
    await StateModel.deleteMany({});
    await LgaModel.deleteMany({});
    logger.success('Existing data cleared');

    logger.info('Seeding states...');
    const createdStates = await StateModel.insertMany(nigeriaStates);
    logger.success(`${createdStates.length} states created`);

    logger.info('Seeding LGAs...');
    const lgasToInsert = [];

    for (const state of createdStates) {
      const stateLgas = nigeriaLgas[state.code];
      
      if (stateLgas) {
        for (const lgaName of stateLgas) {
          lgasToInsert.push({
            name: lgaName,
            stateId: state._id,
          });
        }
      }
    }

    const createdLgas = await LgaModel.insertMany(lgasToInsert);
    logger.success(`${createdLgas.length} LGAs created`);

    const stats = {
      totalStates: createdStates.length,
      totalLgas: createdLgas.length,
      regions: {
        [RegionEnum.NORTH_CENTRAL]: createdStates.filter(s => s.region === RegionEnum.NORTH_CENTRAL).length,
        [RegionEnum.NORTH_EAST]: createdStates.filter(s => s.region === RegionEnum.NORTH_EAST).length,
        [RegionEnum.NORTH_WEST]: createdStates.filter(s => s.region === RegionEnum.NORTH_WEST).length,
        [RegionEnum.SOUTH_EAST]: createdStates.filter(s => s.region === RegionEnum.SOUTH_EAST).length,
        [RegionEnum.SOUTH_SOUTH]: createdStates.filter(s => s.region === RegionEnum.SOUTH_SOUTH).length,
        [RegionEnum.SOUTH_WEST]: createdStates.filter(s => s.region === RegionEnum.SOUTH_WEST).length,
      },
    };

    console.log('\n📊 Seed Statistics:');
    console.log('==================');
    console.log(`Total States: ${stats.totalStates}`);
    console.log(`Total LGAs: ${stats.totalLgas}`);
    console.log('\nStates by Region:');
    Object.entries(stats.regions).forEach(([region, count]) => {
      console.log(`  ${region}: ${count}`);
    });
    console.log('\n Database seeded successfully!\n');

    await mongoose.connection.close();
    logger.info('Database connection closed');
    process.exit(0);
  } catch (error) {
    logger.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();

