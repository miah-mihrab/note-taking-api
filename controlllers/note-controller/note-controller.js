const Note = require('../../model/notemodel');
const moment = require('moment')
const admin = require('firebase-admin');
const auth = require('firebase').auth()
// let db = admin.firestore();
let db = admin.database();

(
    //@get all notes
    //@route /note
    exports.getNotes = (async (req, res, next) => {
        try {
            // db.collection('notes')
            //     .where('user_uid', '==', req.user.uid)
            //     .onSnapshot(snap => {
            //         let note = []
            //         snap.forEach(e => {
            //             note.push(e.data())
            //         })
            //         return res.status(200).send({
            //             success: true,
            //             notes: note
            //         })
            //     })
            db
                .ref('notes')
                .orderByChild('user_uid')
                .equalTo(req.session.user.uid)
                .once('value', (snapshot) => {
                    let data = []
                    snapshot.forEach(snap => {
                        data.push(snap.val());
                    })
                    return res.status(200).send(data);
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
            let _note = Object.assign({}, req.body);
            _note['created_time'] = moment().format('LLL');
            _note['user_uid'] = req.user.uid
            // FIRESTORE
            // db
            //     .collection('notes')
            //     .add(_note)
            //     .then(note => {

            //         db.collection('notes').doc(note.id)
            //             .set({ fStoreId: note.id }, { merge: true });

            //         _note['fStoreId'] = note.id;

            //         return res
            //             .status(200)
            //             .send({
            //                 success: true,
            //                 _note
            //             })
            //     })

            // RDB
            let note = await db.ref('notes').push(_note);
            await db.ref('notes').child(note.key).update({ dbID: note.key });
            note['dbID'] = note.key
            return res.status(200).send({
                success: true,
                message: "Note Successfully created"
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

            // db.collection('notes')
            //     .doc(req.params.id)
            //     .onSnapshot(snap => {
            //         return res.status(200).send({
            //             success: true,
            //             note: snap.data()
            //         });
            //     })
            db.ref('notes').child(req.params.id).once('value', (snapshot) => {
                return res.status(200).send(snapshot.val())
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
            // await db.collection('notes')
            //     .doc(req.params.id)
            //     .set(req.body, { merge: true })

            await db.ref('notes').child(req.params.id).update(req.body);
            return res.status(200).send({
                success: true,
                message: "Note Updated"
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
            // await db.collection('notes')
            //     .doc(req.params.id)
            //     .delete();

            await db.ref('notes').child(req.params.id).remove();
            return res.status(200).send({
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