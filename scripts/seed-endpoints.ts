import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';

import { addHours, subHours } from 'date-fns';
import { EndpointsService } from '../src/modules/endpoints/endpoints.service';
import { IDetectDTO } from '../src/entities';

function generateHash(index: number): string {
  return `filehash_${index.toString(36)}`;
}

function getRandomSubset<T>(arr: T[], count: number): T[] {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const endpointService = app.get(EndpointsService);

  // === Step 1: Seed known malicious file hashes ===
  const maliciousHashes = Array.from({ length: 50 }, (_, i) => generateHash(i));
  await endpointService.seedMaliciousFiles(maliciousHashes);

  const now = new Date();

  // === Step 2: Create endpoints with detect DTOs ===
  const totalEndpoints = 35;

  for (let i = 1; i <= totalEndpoints; i++) {
    // Vary call date for different statuses
    let nextExpectedCallDate: Date;
    if (i % 3 === 0) {
      nextExpectedCallDate = subHours(now, 2); // stable
    } else if (i % 3 === 1) {
      nextExpectedCallDate = addHours(now, 2); // unstable
    } else {
      nextExpectedCallDate = addHours(now, 36); // inactive
    }

    // Generate files: 50–100 total, 10–30% malicious
    const totalFiles = 50 + Math.floor(Math.random() * 50);
    const maliciousCount = Math.floor(totalFiles * (0.1 + Math.random() * 0.2));
    const benignCount = totalFiles - maliciousCount;

    const selectedMalicious = getRandomSubset(maliciousHashes, maliciousCount);
    const benignHashes = Array.from(
      { length: benignCount },
      (_, j) => `benign_${i}_${j}`,
    );
    const allFiles = [...selectedMalicious, ...benignHashes];

    const dto: IDetectDTO = {
      endpointId: i.toString(),
      nextExpectedCallDate,
      filesHashes: allFiles,
    };

    const result = await endpointService.detectEndpointMalicious(dto);
    console.log(
      `Endpoint ${i} — Malicious Detected: ${result.maliciousFiles.length}`,
    );
  }

  await app.close();
}

void bootstrap();
