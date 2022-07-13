const makeMetadata = (config) => {
    if (!config) return;

    const { name, description, image, attributes } = config;

    if (attributes && !Array.isArray(attributes)) {
        // make sure attributes are sent as an array of
        return;
    }

    return {
        name: name || "",
        description: description || "",
        image: image || "",
        attributes: attributes || [],
    };
};

module.exports = { makeMetadata };
