import { readFileSync } from 'fs';
import { resolve } from 'path';

export class ConfigHandler {
  public workload() {
    let configPath = resolve('sf-file-sorter/config.json');
    let rawdata = readFileSync(configPath);
    let config = JSON.parse(rawdata.toString());
    let destinationBySourceFilePath = config['destination-by-source-file-path'];
    return destinationBySourceFilePath;
  }
}
