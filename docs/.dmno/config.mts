import { DmnoBaseTypes, defineDmnoService } from 'dmno';

export default defineDmnoService({
  isRoot: true,
  settings: {
    redactSensitiveLogs: true,
    interceptSensitiveLeakRequests: true,
    preventClientLeaks: true,
    dynamicConfig: 'only_static'
  },
  schema: {
    NOTION_TOKEN: {
      sensitive: true,
    },
  },
});
