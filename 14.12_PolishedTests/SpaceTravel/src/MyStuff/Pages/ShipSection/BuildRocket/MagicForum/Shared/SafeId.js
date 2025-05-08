

/// mostly used for testing! getting unique ids for each input

export default function toSafeId(text) {
    return text
      .toLowerCase()                      // optional: make it lowercase
      .replace(/[^a-z0-9]+/g, '-')        // replace non-alphanumerics with hyphens
      .replace(/^-+|-+$/g, '');           // trim leading/trailing hyphens
}
  