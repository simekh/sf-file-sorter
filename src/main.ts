#!/usr/bin/env node
import { ConfigHandler } from './classes/ConfigHandler';
import { FileMover } from './classes/FileMover';

const configHandler = new ConfigHandler();

(async () => {
  let configRows = 0;
  let movedFilesCount = 0;
  for (const destinationBySource of configHandler.workload()) {
    configRows++;
    const fileMover = new FileMover(destinationBySource);
    if (fileMover.execute()) {
      movedFilesCount++;
    }
  }

  console.log(`sf-file-sorter: Organized ${movedFilesCount} of ${configRows} possible files`);
})();
