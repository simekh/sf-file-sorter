#!/usr/bin/env node
import { resolve } from 'path';
import { FolderCrawler } from './classes/FolderCrawler';
import { FileCrawler } from './classes/FileCrawler';

const folderCrawler = new FolderCrawler();
const workingDirPath = resolve('test/classes');
const fileCrawler = new FileCrawler(workingDirPath);

(async () => {
  const moveableFiles: string[] = [];
  for await (const filePath of folderCrawler.getMovableFiles(workingDirPath)) {
    moveableFiles.push(filePath);
  }

  for (const filePath of moveableFiles) {
    await fileCrawler.processLineByLine(filePath);
  }
})();