const Support = require('../models/Support');

exports.createSupportRequest = async (req, res) => {
  try {
    const newSupportRequest = new Support(req.body);
    const savedSupportRequest = await newSupportRequest.save();

    res.status(201).json({
      message: 'Support request submitted successfully',
      supportRequest: savedSupportRequest
    });
  } catch (error) {
    res.status(400).json({
      message: 'Error submitting support request',
      error: error.message
    });
  }
};

exports.getSupportRequests = async (req, res) => {
  try {
    const supportRequests = await Support.find()
      .sort({ createdAt: -1 })
      .select('-__v'); // Exclude version key

    res.status(200).json(supportRequests);
  } catch (error) {
    res.status(500).json({
      message: 'Error retrieving support requests',
      error: error.message
    });
  }
};

exports.getSupportRequestById = async (req, res) => {
  try {
    const supportRequest = await Support.findById(req.params.id).select('-__v');

    if (!supportRequest) {
      return res.status(404).json({ message: 'Support request not found' });
    }

    res.status(200).json(supportRequest);
  } catch (error) {
    res.status(500).json({
      message: 'Error retrieving support request',
      error: error.message
    });
  }
};

exports.updateSupportRequest = async (req, res) => {
  try {
    const updatedSupportRequest = await Support.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedSupportRequest) {
      return res.status(404).json({ message: 'Support request not found' });
    }

    res.status(200).json({
      message: 'Support request updated successfully',
      supportRequest: updatedSupportRequest
    });
  } catch (error) {
    res.status(400).json({
      message: 'Error updating support request',
      error: error.message
    });
  }
};

exports.deleteSupportRequest = async (req, res) => {
  try {
    const deletedSupportRequest = await Support.findByIdAndDelete(req.params.id);

    if (!deletedSupportRequest) {
      return res.status(404).json({ message: 'Support request not found' });
    }

    res.status(200).json({
      message: 'Support request deleted successfully',
      supportRequest: deletedSupportRequest
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error deleting support request',
      error: error.message
    });
  }
};
