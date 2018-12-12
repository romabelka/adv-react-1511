export const sortByFirstChar = items => {
  return items
    .sort((a, b) => a.title.charAt(0).toUpperCase() > b.title.charAt(0).toUpperCase() ? 1 : -1)
    .reduce((acc, { title, id }) => {
      const letter = title.charAt(0);
      if (acc[letter]) {
        acc[letter].content = acc[letter].content.concat({ id, title })
      } else {
        acc[letter] = { title: letter, content: [{ id, title }] };
      }

      return { ...acc };
    }, []);
}

export const objToMap = data =>
  Object.keys(data)
    .map(index => ({ title: data[index].title, data: data[index].content }))

