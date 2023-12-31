import type { BreedOption } from '../types/types';

function getBreedsOptions(breeds: Map<string, string[]>): BreedOption[] {
  const options: BreedOption[] = [];

  for (const [key, value] of breeds.entries()) {
    if (value.length === 0) {
      options.push({
        name: key,
        value: key,
      });
    } else {
      value.forEach((subBreed) => {
        options.push({
          name: `${subBreed} ${key}`,
          value: `${key}-${subBreed}`,
        });
      });
    }
  }

  return options;
}

export default getBreedsOptions;
