import { resolve } from 'path';
import { folderCrawler } from './classes/folderCrawler';
import { fileCrawler } from './classes/fileCrawler';

const folderIterator = new folderCrawler();
const workingDirPath = resolve('test/classes');
const fileIterator = new fileCrawler(workingDirPath);

(async () => {
  for await (const filePath of folderIterator.getFilePaths(workingDirPath)) {
    if (filePath.endsWith('.cls')) {
      await fileIterator.processLineByLine(filePath);
    }
  }
})();
