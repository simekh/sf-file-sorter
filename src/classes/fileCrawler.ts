import { basename, dirname } from 'path';
import { createReadStream, existsSync, mkdirSync, rename } from 'fs';
import { createInterface } from 'readline';

export class fileCrawler {
  workingDirPath;
  DESTINATIONIDENTIFIER;
  filePath;

  constructor(workingDirPath: string) {
    this.workingDirPath = workingDirPath;
    this.DESTINATIONIDENTIFIER = '//__directory__';
    this.filePath = '';
  }

  async processLineByLine(path: string) {
    this.filePath = path;
    const fileStream = createReadStream(this.filePath);

    const readline = createInterface({
      input: fileStream,
      crlfDelay: Infinity
    });

    for await (const line of readline) {
      if (line.startsWith(this.DESTINATIONIDENTIFIER)) {
        this._moveFileToNewDestination(line);
      }
    }
  }

  _moveFileToNewDestination(line: string): void {
    const destinationAbsoluteDir = this._getFileAbsoluteDestination(line);
    const newFileAbsolutePath = this._getNewFileAbsolutePath(destinationAbsoluteDir);
    this._moveFile(newFileAbsolutePath, true);
  }

  _getFileAbsoluteDestination(line: string): string {
    const destinationPath = this._getDestinationFromIdentifier(line);
    return this.workingDirPath + destinationPath;
  }

  _getDestinationFromIdentifier(line: string): string {
    return line.split(this.DESTINATIONIDENTIFIER)[1];
  }

  _getNewFileAbsolutePath(destinationAbsoluteDir: string): string {
    const filename = basename(this.filePath);
    return destinationAbsoluteDir + filename;
  }

  _moveFile(newFilePath: string, isSalesforceClsFile: boolean): void {
    const newFileAbsoluteDir = dirname(newFilePath);
    if (!existsSync(newFileAbsoluteDir)) {
      mkdirSync(newFileAbsoluteDir, { recursive: true });
    }

    rename(this.filePath, newFilePath, (err) => {
      if (err) throw err;
    });
    console.log(`Moved "${this.filePath}" to "${newFilePath}" `);

    if (isSalesforceClsFile) {
      this._moveMetaXmlFile(newFilePath);
    }
  }
  _moveMetaXmlFile(newFilePath: string): void {
    const oldMetaFileAbsolutePath = `${this.filePath}-meta.xml`;
    const newMetaFileAbsolutePath = `${newFilePath}-meta.xml`;

    rename(oldMetaFileAbsolutePath, newMetaFileAbsolutePath, (err) => {
      if (err) {
        throw err;
      }
    });
    console.log(`Moved "${oldMetaFileAbsolutePath}" to "${newMetaFileAbsolutePath}" `);
  }
}
