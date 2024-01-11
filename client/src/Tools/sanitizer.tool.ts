export default function sanitize(input: string | null): string | null
{
      if (!input) return null;
      // Remove leading and trailing whitespaces
      let result = input.trim();
      // Remove backslashes
      result = result.replace(/\\/g, '');
      // Convert special characters to HTML entities
      result = result.replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');

      return result;
}