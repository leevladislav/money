const Wallet = require('../models/Wallets');
const errorHandler = require('../utils/errorHandler');

module.exports.getAll = async function(req, res) {
    try {
        const wallets = await Wallet.find({user: req.user.id});
        res.status(200).json(wallets);
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.getById = async function(req, res) {
    try {
        const wallet = await Wallet.findById(req.params.id);
        res.status(200).json(wallet);
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.remove = async function(req, res) {
    try {
        await Wallet.remove({_id: req.params.id});
        res.status(200).json({
            message: 'Wallet successfully removed'
        })
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.create = async function(req, res) {
    const wallet = new Wallet({
        name: req.body.name,
        budget: req.body.budget,
        user: req.user.id,
        iconName: req.body.iconName
    });

    try {
        await wallet.save();
        res.status(201).json(wallet);
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.update = async function(req, res) {
    const updated = {
        name: req.body.name,
        budget: req.body.budget,
        iconName: req.body.iconName
    };

    try {
        const wallet = await Wallet.findOneAndUpdate(
            {_id: req.params.id},
            {$set: updated},
            {new: true}
        );

        res.status(200).json(wallet);
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.addIncome = async function(req, res) {
    const wallet = await Wallet.findById(req.params.id);
    const updated = {
        name: req.body.name,
        budget: wallet.budget + Number(req.body.budget)
    };

    try {
        const wallet = await Wallet.findOneAndUpdate(
            {_id: req.params.id},
            {$set: updated},
            {new: true}
        );

        res.status(200).json(wallet);
    } catch (e) {
        errorHandler(res, e);
    }
};
