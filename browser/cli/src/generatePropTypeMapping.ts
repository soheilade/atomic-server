import { Datatype, Resource } from '@tomic/lib';
import { store } from './store.js';
import { ReverseMapping } from './generateBaseObject.js';

const DatatypeToTSTypeMap = {
  [Datatype.ATOMIC_URL]: 'string',
  [Datatype.RESOURCEARRAY]: 'string[]',
  [Datatype.BOOLEAN]: 'boolean',
  [Datatype.DATE]: 'string',
  [Datatype.TIMESTAMP]: 'string',
  [Datatype.INTEGER]: 'number',
  [Datatype.FLOAT]: 'number',
  [Datatype.STRING]: 'string',
  [Datatype.SLUG]: 'string',
  [Datatype.MARKDOWN]: 'string',
  [Datatype.UNKNOWN]: 'JSONValue',
};

export const generatePropTypeMapping = (
  ontology: Resource,
  reverseMapping: ReverseMapping,
): string => {
  const properties = (ontology.get(
    'https://atomicdata.dev/properties/properties',
  ) ?? []) as string[];

  const lines = properties
    .map(subject => generateLine(subject, reverseMapping))
    .join('\n');

  return `interface PropTypeMapping {
    ${lines}
  }`;
};

const generateLine = (subject: string, reverseMapping: ReverseMapping) => {
  const resource = store.getResourceLoading(subject);
  const datatype = resource.get(
    'https://atomicdata.dev/properties/datatype',
  ) as Datatype;

  return `[${reverseMapping[subject]}]: ${DatatypeToTSTypeMap[datatype]}`;
};
