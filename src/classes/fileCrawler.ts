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

  public async processLineByLine(path: string) {
    this.filePath = path;
    const fileStream = createReadStream(this.filePath);

    const readline = createInterface({
      input: fileStream,
      crlfDelay: Infinity
    });

    for await (const line of readline) {
      if (line.startsWith(this.DESTINATIONIDENTIFIER)) {
        this.moveFileToNewDestination(line);
        break;
      }
    }
  }

  private moveFileToNewDestination(identifierPath: string): void {
    const destinationAbsoluteDir = this.getFileAbsoluteDestination(identifierPath);
    const newFileAbsolutePath = this.getNewFileAbsolutePath(destinationAbsoluteDir);
    if (this.fileHasMoved(this.filePath, newFileAbsolutePath)) {
      this.moveFile(newFileAbsolutePath, true);
    }
  }

  private getFileAbsoluteDestination(line: string): string {
    const destinationPath = this.getDestinationFromIdentifier(line);
    return this.workingDirPath + destinationPath;
  }

  private getDestinationFromIdentifier(line: string): string {
    return line.split(this.DESTINATIONIDENTIFIER)[1];
  }

  private fileHasMoved(oldPath: string, newPath: string): boolean {
    return oldPath !== newPath;
  }

  private getNewFileAbsolutePath(destinationAbsoluteDir: string): string {
    const filename = basename(this.filePath);
    return destinationAbsoluteDir + filename;
  }

  private moveFile(newFilePath: string, isSalesforceClsFile: boolean): void {
    const newFileAbsoluteDir = dirname(newFilePath);
    if (!existsSync(newFileAbsoluteDir)) {
      mkdirSync(newFileAbsoluteDir, { recursive: true });
    }

    rename(this.filePath, newFilePath, (err) => {
      if (err) throw err;
    });
    console.log(`Moved "${this.filePath}" to "${newFilePath}" `);

    if (isSalesforceClsFile) {
      this.moveMetaXmlFile(newFilePath);
    }
  }
  private moveMetaXmlFile(newFilePath: string): void {
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
