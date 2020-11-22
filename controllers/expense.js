const Expense = require('../models/Expense');
const Wallets = require('../models/Wallets');
const errorHandler = require('../utils/errorHandler');

module.exports.getAll = async function (req, res) {
    try {
        const expenses = await Expense.find({user: req.user.id});
        res.status(200).json(expenses);
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.getByCategoryId = async function (req, res) {
    try {
        const walletsCandidates = await Wallets.find({user: req.user.id});

        let wallets = walletsCandidates.reduce((acc, wallet) => {
            acc[wallet._id] = wallet;
            return acc;
        }, {});

        const expenses = await Expense.find({
            category: req.params.categoryId,
            user: req.user.id
        });

        res.status(200).json({expenses, wallets});
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.create = async function (req, res) {
    const wallet = await Wallets.findById(req.body.wallet);
    const updated = {budget: wallet.budget - Number(req.body.expense)};

    try {
        await Wallets.updateOne(
            {_id: req.body.wallet},
            {$set: updated},
            {new: true}
        );

        const expense = await new Expense({
            expense: req.body.expense,
            description: req.body.description,
            category: req.body.category,
            wallet: req.body.wallet,
            user: req.user.id
        }).save();

        res.status(201).json(expense);
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.remove = async function (req, res) {
    try {
        const expense = await Expense.findById(req.params.id);
        const wallet = await Wallets.findById(expense.wallet);

        if (wallet) {
            const updated = {budget: wallet.budget + Number(expense.expense)};

            await Wallets.updateOne(
                {_id: expense.wallet},
                {$set: updated},
                {new: true}
            );
        }

        await Expense.remove({_id: expense.id});

        res.status(200).json({
            message: 'Expense successfully removed'
        });
    } catch (e) {
        errorHandler(res, e);
    }
};
