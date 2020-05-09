import { toMinutesAndSecondsFormat } from './string-utils';

describe('StringUtils', () => {
  describe('toMinutesAndSecondsFormat', () => {
    it('should convert seconds to mm:ss format properly', () => {
      const twentyFiveMinutesInSeconds: number = 25 * 60;
      expect(toMinutesAndSecondsFormat(twentyFiveMinutesInSeconds)).toEqual("25:00");

      const zeroSeconds: number = 0;
      expect(toMinutesAndSecondsFormat(zeroSeconds)).toEqual("00:00");

      const fiveMinutesInSeconds: number = 5 * 60;
      expect(toMinutesAndSecondsFormat(fiveMinutesInSeconds)).toEqual("05:00");

      const fifteenMinutesInSeconds: number = 15 * 60;
      expect(toMinutesAndSecondsFormat(fifteenMinutesInSeconds)).toEqual("15:00");
    })
  })
});
