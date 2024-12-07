export function wordTruncate(name:string, wordLimit:number) {
    const words = name.split(' ');
    if (words.length > wordLimit) {
      // return words.slice(0, wordLimit).join(' ') + '...';
      return words.slice(0, wordLimit).join(' ');
    }
    return name;
  }