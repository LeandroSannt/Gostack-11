import {container} from 'tsyringe'

import IStorageProvider from "./StorageProviders/models/IStorageProvider";
import DiskStorageProvider from './StorageProviders/implements/DiskStorageProvider';

container.registerSingleton<IStorageProvider>('StorageProvider', DiskStorageProvider);
