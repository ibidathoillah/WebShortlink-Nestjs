import { Test, TestingModule } from '@nestjs/testing';
import { ShortLinkController } from './shortlink.controller';
import { ShortLinkService } from './shortlink.service';

describe('ShortLinkController', () => {
  let shortLink: TestingModule;

  beforeAll(async () => {
    shortLink = await Test.createTestingModule({
      controllers: [ShortLinkController],
      providers: [ShortLinkService],
    }).compile();
  });

  describe('getHello', () => {
    it('should return "Hello World!"', () => {
      const shortLinkController = shortLink.get<ShortLinkController>(ShortLinkController);
      expect(shortLinkController.getHello()).toBe('Hello World!');
    });
  });
});
