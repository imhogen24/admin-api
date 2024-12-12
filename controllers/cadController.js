const Cad = require('../models/Cad');

exports.createCadRequest = async (req, res) => {
  try {
    const newCadRequest = new Cad(req.body);
    const savedCadRequest = await newCadRequest.save();

    res.status(201).json({
      message: 'CAD documentation request submitted successfully',
      cadRequest: savedCadRequest
    });
  } catch (error) {
    res.status(400).json({
      message: 'Error submitting CAD documentation request',
      error: error.message
    });
  }
};

exports.getCadRequests = async (req, res) => {
  try {
    const cadRequests = await Cad.find()
      .sort({ createdAt: -1 })
      .select('-__v');

    res.status(200).json(cadRequests);
  } catch (error) {
    res.status(500).json({
      message: 'Error retrieving CAD documentation requests',
      error: error.message
    });
  }
};

exports.getCadRequestById = async (req, res) => {
  try {
    const cadRequest = await Cad.findById(req.params.id).select('-__v');

    if (!cadRequest) {
      return res.status(404).json({ message: 'CAD documentation request not found' });
    }

    res.status(200).json(cadRequest);
  } catch (error) {
    res.status(500).json({
      message: 'Error retrieving CAD documentation request',
      error: error.message
    });
  }
};

exports.updateCadRequest = async (req, res) => {
  try {
    const updatedCadRequest = await Cad.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedCadRequest) {
      return res.status(404).json({ message: 'CAD documentation request not found' });
    }

    res.status(200).json({
      message: 'CAD documentation request updated successfully',
      cadRequest: updatedCadRequest
    });
  } catch (error) {
    res.status(400).json({
      message: 'Error updating CAD documentation request',
      error: error.message
    });
  }
};

exports.deleteCadRequest = async (req, res) => {
  try {
    const deletedCadRequest = await Cad.findByIdAndDelete(req.params.id);

    if (!deletedCadRequest) {
      return res.status(404).json({ message: 'CAD documentation request not found' });
    }

    res.status(200).json({
      message: 'CAD documentation request deleted successfully',
      cadRequest: deletedCadRequest
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error deleting CAD documentation request',
      error: error.message
    });
  }
};
