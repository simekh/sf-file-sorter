#!/usr/bin/env node
import { resolve } from 'path';
import { FolderCrawler } from './classes/FolderCrawler';
import { FileCrawler } from './classes/FileCrawler';

const folderCrawler = new FolderCrawler();
const workingDirPath = resolve('temp/classes');
const fileCrawler = new FileCrawler(workingDirPath);

(async () => {
  const moveableFiles: string[] = [];
  for await (const filePath of folderCrawler.getMovableFiles(workingDirPath)) {
    moveableFiles.push(filePath);
  }

  var countMovedFiles = 0;
  for (const filePath of moveableFiles) {
    var hasMovedFile = await fileCrawler.processLineByLine(filePath);
    if (hasMovedFile) {
      countMovedFiles++;
    }
  }
  console.log(`Sf-File-Sorter: Organized ${countMovedFiles} files of ${moveableFiles.length}`);
})();
