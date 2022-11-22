import { basename, dirname } from 'path';
import { createReadStream, existsSync, mkdirSync, rename } from 'fs';
import { createInterface } from 'readline';

export class FileCrawler {
  workingDirPath;
  DESTINATIONIDENTIFIER;
  filePath;

  constructor(workingDirPath: string) {
    this.workingDirPath = workingDirPath;
    this.DESTINATIONIDENTIFIER = '//__directory__';
    this.filePath = '';
  }

  public async processLineByLine(path: string): Promise<boolean> {
    this.filePath = path;
    const fileStream = createReadStream(this.filePath);

    const readline = createInterface({
      input: fileStream,
      crlfDelay: Infinity
    });

    var hasMovedFile = false;
    for await (const line of readline) {
      if (line.startsWith(this.DESTINATIONIDENTIFIER)) {
        this.moveFileToNewDestination(line);
        hasMovedFile = true;
        return hasMovedFile;
      }
    }
    return hasMovedFile;
  }

  private moveFileToNewDestination(identifierPath: string): void {
    const destinationDir = this.getFileDestination(identifierPath);
    const newFilePath = this.getNewFilePath(destinationDir);
    if (this.fileShouldMove(newFilePath)) {
      this.moveFile(newFilePath);
    }
  }

  private getFileDestination(line: string): string {
    const destinationPath = this.getDestinationFromIdentifier(line);
    return this.workingDirPath + destinationPath;
  }

  private getDestinationFromIdentifier(line: string): string {
    return line.split(this.DESTINATIONIDENTIFIER)[1];
  }

  private fileShouldMove(newPath: string): boolean {
    const oldPath = this.filePath;
    return oldPath !== newPath;
  }

  private getNewFilePath(destinationDir: string): string {
    const filename = basename(this.filePath);
    return destinationDir + filename;
  }

  private moveFile(newFilePath: string): void {
    const newFileDir = dirname(newFilePath);
    if (!existsSync(newFileDir)) {
      mkdirSync(newFileDir, { recursive: true });
    }

    rename(this.filePath, newFilePath, (err) => {
      if (err) throw err;
    });

    this.moveMetaXmlFile(newFilePath);
  }
  private moveMetaXmlFile(newFilePath: string): void {
    const oldMetaFilePath = `${this.filePath}-meta.xml`;
    const newMetaFilePath = `${newFilePath}-meta.xml`;

    rename(oldMetaFilePath, newMetaFilePath, (err) => {
      if (err) {
        throw err;
      }
    });
  }
}
