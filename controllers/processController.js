const Process = require('../models/Process');  // Note the capital 'P'

exports.createProcess = async (req, res) => {
  try {
    const newProcess = new Process(req.body);  // Use capital 'P'
    const savedProcess = await newProcess.save();

    res.status(201).json({
      message: 'Client Process submitted successfully',
      process: savedProcess
    });
  } catch (error) {
    res.status(400).json({
      message: 'Error submitting client Process',
      error: error.message
    });
  }
};

exports.getProceses = async (req, res) => {
  try {
    const proceses = await Process.find()
      .sort({ createdAt: -1 })
      .select('-__v'); 

    res.status(200).json(proceses);
  } catch (error) {
    res.status(500).json({
      message: 'Error retrieving Proceses',
      error: error.message
    });
  }
};

exports.getProcessById = async (req, res) => {
  try {
    const processItem = await Process.findById(req.params.id).select('-__v');  // Use capital 'P', changed variable name

    if (!processItem) {
      return res.status(404).json({ message: 'Process not found' });
    }

    res.status(200).json(processItem);
  } catch (error) {
    res.status(500).json({
      message: 'Error retrieving Process',
      error: error.message
    });
  }
};

exports.updateProcess = async (req, res) => {
  try {
    const updatedProcess = await Process.findByIdAndUpdate(  // Use capital 'P'
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedProcess) {
      return res.status(404).json({ message: 'Process not found' });
    }

    res.status(200).json({
      message: 'Process updated successfully',
      Process: updatedProcess
    });
  } catch (error) {
    res.status(400).json({
      message: 'Error updating Process',
      error: error.message
    });
  }
};

exports.deleteProcess = async (req, res) => {
  try {
    const deletedProcess = await Process.findByIdAndDelete(req.params.id);  // Use capital 'P'

    if (!deletedProcess) {
      return res.status(404).json({ message: 'Process not found' });
    }

    res.status(200).json({
      message: 'Process deleted successfully',
      Process: deletedProcess
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error deleting Process',
      error: error.message
    });
  }
};
