const Note = require('../../model/notemodel');

(
    //@get all notes
    //@route /note
    exports.getNotes = (async (req, res, next) => {
        try {
            const note = await Note.find({ user: req.user._id });

            return res.status(200).send({
                success: true,
                notes: note
            })
        } catch (err) {
            console.log(err)
            return next({
                success: false,
                message: "Something went wrong"
            })
        }
    }),

    //@create note
    //@route /note
    exports.createNote = (async (req, res, next) => {
        try {
            let data = req.body;
            data.user = req.user._id;
            const note = await Note.create(data)
            res.status(200).send({
                success: true,
                note
            })
        } catch (err) {
            console.log(err);
            return next("Something went wrong while creating note")
        }
    }),

    //@get single note
    //@route /note/:id
    exports.getNote = (async (req, res, next) => {
        try {
            const note = await Note.findById(req.params.id);
            return res.status(200).send({
                success: true,
                note
            })
        } catch (err) {
            console.log(err);
            return next({
                success: false,
                message: "Something went wrong while fetching note"
            })
        }

    }),


    //@update note
    //@route /note/:id
    exports.updateNote = (async (req, res, next) => {
        try {
            const note = await Note.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
            res.status(200).send({
                success: true,
                note
            })

        } catch (err) {
            console.log(err);
            return next({
                status: false,
                message: "Something went wrong while updating note"
            })
        }
    }),

    //@delete note
    //@route /note/:id
    exports.deleteNote = (async (req, res, next) => {
        try {
            await Note.findByIdAndDelete(req.params.id)
            res.status(200).send({
                success: true,
                message: "Note Deleted Successfully"
            })
        } catch (err) {
            console.log(err);
            return next({
                success: false,
                message: "Something went wrong while deleteing"
            })
        }

    })

)