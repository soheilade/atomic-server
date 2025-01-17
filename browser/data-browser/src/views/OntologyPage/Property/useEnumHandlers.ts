import {
  Resource,
  Core,
  core,
  useArray,
  useStore,
  Store,
  DataBrowser,
} from '@tomic/react';
import { useCallback } from 'react';

export function useEnumHandlers(
  property: Resource<Core.Property>,
  ontology: Resource<Core.Ontology>,
) {
  const store = useStore();

  const [allowsOnly, setAllowsOnly] = useArray(
    property,
    core.properties.allowsOnly,
    { commit: true },
  );
  const [instances, setInstances] = useArray(
    ontology,
    core.properties.instances,
    { commit: true },
  );

  const addTag = useCallback(
    async (tag: Resource) => {
      const newTags = [...allowsOnly, tag.getSubject()];
      const newInstances = [...(instances ?? []), tag.getSubject()];

      await setAllowsOnly(newTags);
      await setInstances(newInstances);

      await tag.save(store);
    },
    [instances, allowsOnly, setAllowsOnly, setInstances, store],
  );

  const removeTag = useCallback(
    async (subject: string) => {
      const filteredTags = allowsOnly.filter(tag => tag !== subject);
      await setAllowsOnly(filteredTags);

      // If the tag is not used in any other property, remove from ontology and delete it.
      if (!(await isTagUsed(subject, ontology, store))) {
        const filteredInstances = instances?.filter(
          instance => instance !== subject,
        );

        await setInstances(filteredInstances);
        await store.getResourceLoading(subject).destroy(store);
      }
    },
    [allowsOnly, setAllowsOnly, instances, setInstances, store],
  );

  return {
    addTag,
    removeTag,
  };
}

const isTagUsed = async (
  tagSubject: string,
  ontology: Resource<Core.Ontology>,
  store: Store,
) => {
  const tag = store.getResourceLoading<DataBrowser.Tag>(tagSubject);

  if (tag.props.parent !== ontology.getSubject()) {
    return true;
  }

  for (const property of ontology.props.properties ?? []) {
    const propertyResource = await store.getResourceAsync(property);

    if (propertyResource.props.allowsOnly?.includes(tagSubject)) {
      return true;
    }
  }

  return false;
};
