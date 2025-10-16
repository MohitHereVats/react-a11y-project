export function add(numbers: string): number {
  if (numbers === '') {
    return 0;
  }

  let delimiter = /[,\n]/;
  let numberString = numbers;

  // Check for custom delimiter
  if (numbers.startsWith('//')) {
    const delimiterEndIndex = numbers.indexOf('\n');
    const delimiterSection = numbers.substring(2, delimiterEndIndex);
    numberString = numbers.substring(delimiterEndIndex + 1);

    // Handle multiple delimiters of any length
    if (delimiterSection.startsWith('[')) {
      const delimiters = delimiterSection.match(/\[([^\]]+)\]/g);
      if (delimiters) {
        const escapedDelimiters = delimiters
          .map(d => d.slice(1, -1))
          .map(d => d.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
          .join('|');
        delimiter = new RegExp(escapedDelimiters);
      }
    } else {
      // Single character delimiter
      const escapedDelimiter = delimiterSection.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      delimiter = new RegExp(escapedDelimiter);
    }
  }

  const nums = numberString
    .split(delimiter)
    .map(n => n.trim())
    .filter(n => n !== '')
    .map(Number);

  // Check for negative numbers
  const negatives = nums.filter(n => n < 0);
  if (negatives.length > 0) {
    throw new Error(`Negative numbers not allowed: ${negatives.join(', ')}`);
  }

  // Sum numbers, ignoring those greater than 1000
  return nums
    .filter(n => n <= 1000)
    .reduce((sum, n) => sum + n, 0);
}
