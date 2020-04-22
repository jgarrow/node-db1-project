const express = require("express");
const db = require("../../data/dbConfig.js");

const router = express.Router();

// get all accounts
router.get("/", (req, res) => {
    db("accounts")
        .then((response) => {
            res.status(200).json(response);
        })
        .catch((err) => {
            res.status(500).json({ message: "Failed to get accounts" });
        });
});

// get account by id
router.get("/:id", (req, res) => {
    const { id } = req.params;

    db("accounts")
        .where({ id })
        .then((response) => {
            if (response.length) {
                res.status(200).json(response);
            } else {
                res.status(404).json({
                    message: `Account with id ${id} does not exist`,
                });
            }
        })
        .catch((err) =>
            res
                .status(500)
                .json({ message: `Failed to get account with id ${id}` })
        );
});

router.post("/", (req, res) => {
    const account = req.body;

    if (!account.name || !account.budget) {
        res.status(400).json({ message: "Account name and budget required" });
    } else {
        db("accounts")
            .insert(account)
            .then((response) => {
                if (response.length) {
                    res.status(200).json(response);
                } else {
                    res.status(500).json({
                        message: "Failed to create new acount",
                    });
                }
            })
            .catch((err) =>
                res.status(500).json({
                    message: "Failed to create new acount",
                })
            );
    }
});

router.put("/:id", (req, res) => {
    const { id } = req.params;
    const updatedAccount = req.body;

    db("accounts")
        .where({ id })
        .update(updatedAccount)
        .then((response) => {
            if (response > 0) {
                res.status(200).json(response);
            } else {
                res.status(404).json({
                    message: `Account of id ${id} not found`,
                });
            }
        })
        .catch((err) =>
            res
                .status(500)
                .json({ message: `Failed to update account of id ${id}` })
        );
});

router.delete("/:id", (req, res) => {
    const { id } = req.params;

    db("accounts")
        .where({ id })
        .del()
        .then((response) => {
            if (response > 0) {
                res.status(200).json({
                    message: `Account ${id} successfully deleted`,
                });
            } else {
                res.status(400).json({
                    message: `Failed to find account of id ${id}`,
                });
            }
        })
        .catch((err) =>
            res.status(500).json({ message: `Failed to delete account` })
        );
});

module.exports = router;
