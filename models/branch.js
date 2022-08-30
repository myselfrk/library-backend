const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const BranchSchema = new mongoose.Schema({
  branch_name: {
    type: String,
    required: true
  },
});

BranchSchema.plugin(mongoosePaginate);


module.exports = mongoose.model('Branch', BranchSchema);