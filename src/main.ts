#!/usr/bin/env node
import { ConfigHandler } from './classes/ConfigHandler';
import { FileMover } from './classes/FileMover';

const configHandler = new ConfigHandler();

(async () => {
  for (const destinationBySource of configHandler.workload()) {
    const fileMover = new FileMover(destinationBySource);
    fileMover.moveFile();
  }
})();
