import { resolve } from 'path';
import { folderCrawler } from './classes/folderCrawler';
import { fileCrawler } from './classes/fileCrawler';

const folderIterator = new folderCrawler();
const workingDirPath = resolve('test/classes');
const fileIterator = new fileCrawler(workingDirPath);

(async () => {
  var moveableFiles: string[] = [];
  for await (const filePath of folderIterator.movableFiles(workingDirPath)) {
    moveableFiles.push(filePath);
  }

  for (const filePath of moveableFiles) {
    await fileIterator.processLineByLine(filePath);
  }
})();
