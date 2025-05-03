const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    name: {
        type: String, // Fixed "tyoe" to "type"
        required: true, // Fixed "require" to "required"
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    description: { // Fixed "descraption" typo
        type: String, // Fixed "tyoe" to "type"
    },
});

const Category = mongoose.model("Category", categorySchema);
module.exports = Category;
